import { useEffect, useState } from "react"
import Button from "../components/Button"
import Card from "../components/Card"
import { CreateContent } from "../components/CreateContent"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import Sidebar from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL, FRONTEND_URL } from "../utils/config"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, fetchData } = useContent();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin")
        }
    }, [])

    useEffect(() => {
        if (!modalOpen)
            fetchData();
    }, [modalOpen])

    const shareBrain = async () => {
        const response = await axios.post(BACKEND_URL + "/api/v1/brain/share", {
            share: true
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        const shareUrl = FRONTEND_URL + "/share/" + response.data.hash

        navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard");
    }

    return (
        <div>
            <div className=" ">
                <Sidebar />
            </div>
            <div className="p-4 ml-60 min-h-screen bg-purple-50">
                <div className="flex justify-end gap-4">
                    <Button text="Share Brain" variant="secondary" startIcon={<ShareIcon />} onClick={shareBrain} />
                    <Button onClick={() => setModalOpen(true)} text="Add Content" variant="primary" startIcon={<PlusIcon />} />
                </div>


                <div className="flex flex-wrap gap-4 pt-4">
                    {contents.map(({ type, link, title }, index) =>
                        <Card type={type} link={link} key={index} title={title} />
                    )}

                </div>
                <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />

            </div>
        </div>
    )
}

export default Dashboard
