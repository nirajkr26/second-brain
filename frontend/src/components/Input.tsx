interface InputProps {
    type: "text" | "number" | "password";
    placeholder: string;
    reference?: any;
    customClass?: string;
    customProps?: any;
}

export function Input({ type, placeholder, reference, customClass, customProps }: InputProps) {
    return (<div>
        <input type={type} ref={reference} placeholder={placeholder} className={`border rounded px-4 py-2 m-2 ${customClass}`} {...customProps}></input>
    </div>)
}

