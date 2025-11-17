import axios from "axios";
import Button from "../components/Button"
import { Input } from "../components/Input"
import { BrainIcon } from "../icons/BrainIcon"
import { BACKEND_URL } from "../utils/config";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../utils/validateToken";
import { toast } from "react-toastify";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

export const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();
    const { password, setPassword, validation } = usePasswordValidation();
    const showValidation = password.length >= 1;

    const handleLogin = async () => {
        const username = usernameRef.current?.value.trim();
        const passwordValue = password.trim();

        const isPasswordValid = Object.values(validation).every(Boolean);
        if (!isPasswordValid) {
            toast.error("Password should match all requirements");
            return;
        }

        if (!username || !passwordValue) {
            toast.error("Username and Password are required");
            return;
        }
        try {

            const response = await axios.post(BACKEND_URL + "/api/v1" + (login ? "/signin" : "/signup"), {
                username,
                password: passwordValue
            })

            if (login) {
                const jwt = response.data.token;
                localStorage.setItem("token", jwt);
                toast.success("Logged In")
                navigate("/dashboard")
            } else {
                toast.success("User Registered")
                setPassword("")
                setLogin(true);
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

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === " ") {
                e.preventDefault(); // blocks the space key
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

    return (
        <div className="h-screen bg-red-50 flex flex-col gap-10 justify-center items-center">
            <div className="text-3xl font-bolds items-center gap-3 pt-4  flex">{<BrainIcon />} BRAINLY</div>
            <div className="bg-white p-4 rounded border flex  flex-col gap-2 items-center border-gray-200">
                <div>
                    <Input reference={usernameRef} type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" customProps={{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value.replace(/\s/g, "")), value: password, }} />
                </div>
                <Button text={login ? "Login" : "Sign Up"} onClick={handleLogin} variant="primary" fullWidth={true} />
                <p className="font-mono text-sm text-gray-500 cursor-pointer" onClick={() => setLogin(!login)}>{login ? "New User? Sign Up Here" : "Existing User? Login Here"}</p>

                {showValidation && <div className="text-sm">
                    <p className={validation.upper ? "text-green-600" : "text-red-600"}>
                        • Contains uppercase
                    </p>
                    <p className={validation.lower ? "text-green-600" : "text-red-600"}>
                        • Contains lowercase
                    </p>
                    <p className={validation.number ? "text-green-600" : "text-red-600"}>
                        • Contains number
                    </p>
                    <p className={validation.length ? "text-green-600" : "text-red-600"}>
                        • Minimum 8 characters
                    </p>
                </div>}
            </div>

        </div>
    )
} 
