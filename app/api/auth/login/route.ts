import { logInSchema } from "@/schemas/loginSchema";
import { NextResponse, NextRequest } from "next/server";
import { client } from "@/sanity/lib/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const query = `
*[_type == "user"] {
    _id,
    email,
    password
}`;

interface QueryType {
    _id: string;
    email: string;
    password: string;
}

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        const schemaResponse = await logInSchema.safeParseAsync(data);
        if (!schemaResponse.success) {
            return NextResponse.json({ error: "Invalid Email or Password" }, { status: 400 });
        }

        const sanityData: QueryType[] = await client.fetch(query);
        const user = sanityData.find((item: QueryType) => item.email === data.email);
        if (!user) {
            return NextResponse.json({ message: "Invalid Email" }, { status: 400 });
        }

        const passwordComparison = await bcrypt.compare(data.password, user.password || "");
        if (!passwordComparison) {
            return NextResponse.json({ message: "Invalid Password" }, { status: 400 });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "2d" });
        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60, 
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
