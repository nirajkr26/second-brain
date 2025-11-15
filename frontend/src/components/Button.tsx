import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "outline";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary": "bg-purple-700 text-white hover:bg-purple-800 font-light",
    "secondary": "bg-purple-200 text-purple-700 hover:bg-purple-300 hover:text-purple-900 font-light",
    "outline": "border-2 border-purple-700 hover:bg-purple-200 text-black font-semibold" 
}

const defaultStyles = "px-4 flex items-center gap-1 justify-center py-2 rounded-md  cursor-pointer";


const Button = (props: ButtonProps) => {
    const { variant, text, startIcon, onClick, fullWidth, loading } = props

    return (
        <button onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : " "} ${loading ? "opacity-65" : " "}`} disabled={loading}>{startIcon}{text}</button>
    )
}

export default Button