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
    "primary": "bg-red-700 text-white hover:bg-red-800 font-light",
    "secondary": "bg-red-200 text-red-700 hover:bg-red-300 hover:text-red-900 font-light",
    "outline": "border-2 border-red-700 hover:bg-red-200 text-black font-semibold" 
}

const defaultStyles = "px-4 flex items-center gap-1 justify-center py-2 rounded-md  cursor-pointer";


const Button = (props: ButtonProps) => {
    const { variant, text, startIcon, onClick, fullWidth, loading } = props

    return (
        <button onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : " "} ${loading ? "opacity-65" : " "}`} disabled={loading}>{startIcon}{text}</button>
    )
}

export default Button