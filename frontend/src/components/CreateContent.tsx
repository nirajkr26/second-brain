import { useState } from "react"
import { CutIcon } from "../icons/CutIcon"
import { SaveIcon } from "../icons/SaveIcon"
import Button from "./Button"

export const CreateContent = ({ open, onClose }) => {
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")

    return (<div>
        {open && <div className="h-screen w-screen bg-purple-700/25 fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center ">
                <span className="bg-white p-4 rounded-md">
                    <div className="flex justify-end">
                        <div onClick={onClose}>
                            <CutIcon />
                        </div>
                    </div>
                    <div>
                        <Input placeholder="Title" />
                        <Input placeholder="Link" />
                    </div>
                    <div className="flex justify-center">
                        <Button variant="primary" text="Submit" startIcon={<SaveIcon />} />
                    </div>
                </span>
            </div>
        </div>}
    </div>
    )
}

function Input({ placeholder, onChange }: { onChange: () => void }) {
    return (<div>
        <input type="text" placeholder={placeholder} className=" border rounded px-4 py-2 m-2" onChange={onChange}></input>
    </div>)
}
