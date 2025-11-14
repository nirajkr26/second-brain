import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
    onClick?: () => void;
}

const variantClasses = {
    "primary": "bg-purple-700 text-white hover:bg-purple-800",
    "secondary": "bg-purple-200 text-purple-700 hover:bg-purple-300 hover:text-purple-900"
}

const defaultStyles = "px-4 flex items-center gap-1 justify-center py-2 rounded-md font-light cursor-pointer";

const Button = (props: ButtonProps) => {
    const { variant, text, startIcon, onClick } = props

    return (
        <button onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles}`}>{startIcon}{text}</button>
    )
}

export default Button