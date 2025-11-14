import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon"
import { TerminalIcon } from "../icons/TerminalIcon";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter";
}

const Card = ({ title, link, type }: CardProps) => {
    return (
        <div className="rounded-md p-4 min-h-48 min-w-72 flex flex-col gap-4 bg-white outline-slate-200 max-w-72 border border-slate-200">
            <div className="flex justify-between text-md">
                <div className="flex items-center gap-2">
                    <TerminalIcon />
                    {title}
                </div>
                <div className="flex items-center gap-2">
                    <a href={link} target="_blank">
                        <ShareIcon />
                    </a>
                    <DeleteIcon />
                </div>
            </div>
            <div className="">
                {type == "youtube" && <iframe className="w-full rounded-md" src={link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type == "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}

            </div>

        </div>
    )
}

export default Card