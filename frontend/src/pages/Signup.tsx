import { useEffect, useRef } from "react"
import Button from "../components/Button"
import { Input } from "../components/Input"
import { BrainIcon } from "../icons/BrainIcon"
import { BACKEND_URL } from "../utils/config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { validate } from "../utils/validateToken"
import { toast } from "react-toastify"

export const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const signup = async () => {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            })
            toast.success("User Registered")
            navigate("/signin")
        } catch (err: any) {
            toast.error(err.response.data?.message || "Some error occured")
        }
    }

    useEffect(() => {
        (async () => {
            const isValid = await validate();
            if (isValid) navigate("/dashboard")
        })()
    }, [])

    return (
        <div className="h-screen bg-red-50 flex justify-center items-center">
            <div className="text-3xl font-bolds items-center gap-3 pt-4  flex position fixed top-40">{<BrainIcon />} BRAINLY</div>
            <div className="bg-white p-4 rounded border flex  flex-col gap-2 items-center border-gray-200">
                <div>
                    <Input reference={usernameRef} type="text" placeholder="Username" />
                    <Input reference={passwordRef} type="password" placeholder="Password" />
                </div>
                <Button onClick={signup} text="Sign Up" variant="primary" fullWidth={true} />
                <p className="font-mono text-sm text-gray-500 cursor-pointer" onClick={() => navigate("/signin")}>Existing User? Sign In Here</p>
            </div>
        </div>
    )
} 
