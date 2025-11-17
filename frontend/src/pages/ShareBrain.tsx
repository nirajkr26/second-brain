import axios from "axios"
import { BACKEND_URL } from "../utils/config"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { BrainIcon } from "../icons/BrainIcon";
import Card from "../components/Card";

const ShareBrain = () => {
    const { shareLink } = useParams();
    const [user, setUser] = useState("");
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true);
    const [expired, setExpired] = useState<string | null>(null)
    const navigate = useNavigate()

    const fetchBrain = async () => {
        try {

            const response = await axios.get(BACKEND_URL + "/api/v1/brain/" + shareLink);

            setUser(response.data?.username)
            setContent(response.data?.content)
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setExpired(err.response?.data?.message || "Link expired or invalid");
            } else {
                setExpired("Something went wrong");
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBrain()
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-red-50">
            <div className="text-3xl font-bolds items-center gap-3 pt-4 flex justify-center cursor-pointer" onClick={() => navigate("/")}>{<BrainIcon />} BRAINLY</div>
            {loading ? <div className="flex grow items-center justify-center font-semibold text-3xl">
                Loading...
            </div> : (expired ? <div className="flex grow items-center justify-center font-semibold text-3xl">
                {expired}
            </div> : <div>
                <p className="flex p-3 justify-center text-xl font-mono">{user}'s Brain</p>
                <div className="flex justify-center gap-4 p-3 flex-wrap  ">
                    {content.map(({ title, link, type }, index) => <Card key={index} title={title} link={link} type={type} />)}
                </div>
            </div>)}
        </div>
    )
}

export default ShareBrain