"use client"
import Image from "next/image"
import { Iceland } from "next/font/google"
import React, { useState } from "react"
import { toast } from "sonner"
import { signUpSchema } from "@/schemas/signUpSchema"
import { useRouter } from "next/navigation"
import Link from "next/link"

const iceland = Iceland({
    subsets: ["latin"],
    weight: ["400"],
})

function SignUp() {
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false) // Loading state
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (loading) return // Prevent multiple submissions

        setLoading(true)

        try {
            const schemaResponse = await signUpSchema.safeParseAsync(inputValues)
            if (!schemaResponse.success) {
                toast.error(schemaResponse.error?.issues[0]?.message || "Invalid input")
                setLoading(false)
                return
            }

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(schemaResponse.data),
            })

            if (!response.ok) {
                const text = await response.text()
                try {
                    const result = JSON.parse(text)
                    toast.error(result.message || "Signup failed")
                } catch {
                    toast.error("Unexpected error occurred")
                }
                setLoading(false)
                return
            }

            const result = await response.json()
            toast.success(result.message)
            router.push("/login")
        } catch (error) {
            console.error("Signup error:", error)
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-end relative bg-[#091d2e] overflow-x-hidden">
            <Image src={"/images/bg_auth.jpg"} alt="background Image" height={1200} width={1200} className="hidden md:block w-full md:h-full md:absolute object-cover" />

            <form
                onSubmit={handleSubmit}
                className="border-[#617277] border-[1px] rounded-3xl w-full md:w-[400px] md:mr-[10%] bg-[#617277]/50 backdrop-blur-xl z-20 flex justify-center items-center flex-col py-5"
            >
                {/* headings */}
                <div className="w-full text-start ml-[10%] mb-10">
                    <h1 className={`${iceland.className} text-5xl text-white underline underline-offset-[12px]`}>Sign Up</h1>
                    <p className="text-lg tracking-widest text-[#C9C9C9] font-thin mt-5">Welcome!</p>
                </div>

                {/* inputs */}
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    <input
                        placeholder="Full Name"
                        type="text"
                        className="outline-none bg-transparent border-[#C9C9C9] border-[1px] text-white text-center w-[90%] md:w-[350px] h-12 rounded-2xl"
                        onChange={(e) => setInputValues({ ...inputValues, name: e.target.value })}
                        value={inputValues.name}
                    />

                    <input
                        placeholder="Email"
                        type="email"
                        className="outline-none bg-transparent border-[#C9C9C9] border-[1px] text-white text-center w-[90%] md:w-[350px] h-12 rounded-2xl"
                        onChange={(e) => setInputValues({ ...inputValues, email: e.target.value })}
                        value={inputValues.email}
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        className="outline-none bg-transparent border-[#C9C9C9] border-[1px] text-white text-center w-[90%] md:w-[350px] h-12 rounded-2xl"
                        onChange={(e) => setInputValues({ ...inputValues, password: e.target.value })}
                        value={inputValues.password}
                    />
                </div>

                <button
                    type="submit"
                    className="w-40 h-10 mt-5 rounded-2xl bg-[#2DC071] flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>

                <p className="text-sm text-white mt-5">
                    Already have an account? <Link href={"/login"} className="underline underline-offset-2">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default SignUp
