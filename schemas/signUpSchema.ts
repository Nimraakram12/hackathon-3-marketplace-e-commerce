import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1),
    email: z.string().email({message: "Invalid Email"}),
    password : z.string().min(8, {message: "password must contain atleast 8 characters"})
})