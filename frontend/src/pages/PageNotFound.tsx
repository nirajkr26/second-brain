import { useNavigate } from "react-router-dom"
import { BrainIcon } from "../icons/BrainIcon"
import Button from "../components/Button";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-red-50 flex flex-col">
            <div className="text-3xl font-bolds items-center gap-3 pt-4 flex justify-center cursor-pointer" onClick={() => navigate("/")}>{<BrainIcon />} BRAINLY</div>

            <div className="flex grow flex-col gap-1 mt-20 items-center">
                <p className="text-9xl text-red-700 font-extrabold">404</p>
                <p className="text-xl ">Oops! That page can’t be found</p>
                <p className="text-md">The page you are looking for it maybe deleted</p>
                <div className="pt-4">
                    <Button variant="outline" text="Go To Home" onClick={() => navigate("/")} />
                </div>
            </div>
        </div>
    )
}

export default PageNotFound