import axios from "axios";
import Button from "../components/Button"
import { Input } from "../components/Input"
import { BrainIcon } from "../icons/BrainIcon"
import { BACKEND_URL } from "../utils/config";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../utils/validateToken";
import { toast } from "react-toastify";

export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const signin = async () => {
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            })

            const jwt = response.data.token;
            localStorage.setItem("token", jwt);

            if (jwt){
                toast.success("Logged In")
                navigate("/dashboard")
            }
        } catch (err: any) {
            toast.error(err.response.data?.message || "Some error occured");
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
                <Button text="Sign In" onClick={signin} variant="primary" fullWidth={true} />
                <p className="font-mono text-sm text-gray-500 cursor-pointer" onClick={() => navigate("/signup")}>New User? Sign Up Here</p>
            </div>
        </div>
    )
} 
