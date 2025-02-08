"use client"
import Image from "next/image"
import { Iceland } from "next/font/google"
import React, { useState } from "react"
import { logInSchema } from "@/schemas/loginSchema"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

const iceland = Iceland({
    subsets: ["latin"],
    weight: ["400"],
})

function LoginPage() {
    const router = useRouter()
    const [inputValues, setInputValues] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const schemaResponse = await logInSchema.safeParseAsync(inputValues)
        if (!schemaResponse.success) {
            toast.error("Invalid Email or Password")
            return
        }

        setLoading(true)
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputValues),
            })

            const result = await response.json()
            if (!response.ok) {
                toast.error(result.message || "Login failed")
                return
            }

            toast.success(result.message)
            router.push("/")
        } catch (error) {
            console.error("Login Error:", error)
            toast.error("An error occurred while logging in.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-end relative bg-[#091d2e] overflow-x-hidden">
            <Image src="/images/bg_auth.jpg" alt="background Image" height={1200} width={1200} className="hidden md:block w-full md:h-full md:absolute object-cover" />
            <form onSubmit={handleSubmit} className="border-[#617277] border-[1px] rounded-3xl w-full md:w-[400px] h-[450px] md:mr-[10%] bg-[#617277]/50 backdrop-blur-xl z-20 flex justify-center items-center flex-col">
                <div className="w-full text-start ml-[10%] mb-10">
                    <h1 className={`${iceland.className} text-5xl text-white underline underline-offset-[12px]`}>Login</h1>
                    <p className="text-lg tracking-widest text-[#C9C9C9] font-thin mt-5">Welcome!</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <input
                        placeholder="Email"
                        type="text"
                        className="outline-none bg-transparent border-[#C9C9C9] border-[1px] text-white text-center w-[90%] md:w-[350px] h-12 rounded-2xl"
                        onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                        value={inputValues.email}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        className="outline-none bg-transparent border-[#C9C9C9] border-[1px] text-white text-center w-[90%] md:w-[350px] h-12 rounded-2xl mt-5"
                        onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                        value={inputValues.password}
                    />
                </div>
                <button type="submit" className="w-40 h-10 mt-5 rounded-2xl bg-[#2DC071]" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-sm text-white mt-5">Don&apos;t have an account? <Link href="/signup" className="underline underline-offset-2">Create Account</Link></p>
            </form>
        </div>
    )
}

export default LoginPage