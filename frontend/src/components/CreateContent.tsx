import { useRef, useState } from "react"
import { CutIcon } from "../icons/CutIcon"
import { SaveIcon } from "../icons/SaveIcon"
import Button from "./Button"
import { Input } from "./Input"
import { BACKEND_URL } from "../utils/config"
import axios from "axios"

type ContentType = "youtube" | "twitter"


export const CreateContent = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>("youtube")

    const addContent = async () => {
        const title = titleRef.current?.value
        const link = linkRef.current?.value

        await axios.post(BACKEND_URL + "/api/v1/content", {
            title,
            link,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }

    return (<div>
        {open && <div className="h-screen w-screen bg-purple-900/25 fixed top-0 left-0 flex transition-all justify-center">
            <div className="flex flex-col justify-center ">
                <span className="bg-white p-4 rounded-md">
                    <div className="flex justify-end">
                        <div onClick={onClose}>
                            <CutIcon />
                        </div>
                    </div>
                    <div>
                        <Input reference={titleRef} type="text" placeholder="Title" />
                        <Input reference={linkRef} type="text" placeholder="Link" />
                    </div>
                    <div className="text-center pb-1">TYPE</div>
                    <div className="flex justify-evenly">
                        <Button text="Youtube" variant={type == "youtube" ? "primary" : "secondary"} onClick={() => { setType("youtube") }} />

                        <Button text="Twitter" variant={type == "twitter" ? "primary" : "secondary"} onClick={() => { setType("twitter") }} />
                    </div>

                    <div className="flex pt-2 justify-center">
                        <Button onClick={addContent} variant="primary" fullWidth={true} text="Save" startIcon={<SaveIcon />} />
                    </div>
                </span>
            </div>
        </div>}
    </div>
    )
}


