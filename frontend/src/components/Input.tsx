interface InputProps {
    type: "text" | "number" | "password";
    placeholder: string;
    reference?: any;
}

export function Input({ type, placeholder, reference }: InputProps) {
    return (<div>
        <input type={type} ref={reference} placeholder={placeholder} className=" border rounded px-4 py-2 m-2"></input>
    </div>)
}

