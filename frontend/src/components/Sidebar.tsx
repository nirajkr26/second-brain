import { useNavigate } from "react-router-dom"
import { BrainIcon } from "../icons/BrainIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"
import { LogoutIcon } from "../icons/LogoutIcon"


const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin")
  }
  return (
    <span className="h-screen pl-4 bg-white border-r w-60 fixed left-0 top-0 ">
      <div className="text-3xl cursor-pointer font-bolds items-center gap-3 pt-4 flex" onClick={() => navigate("/dashboard")}>{<BrainIcon />} BRAINLY</div>
      <div className="pt-4 text-center flex flex-col gap-3 pl-6">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
      <div className="flex w-10  text-center px-2 pl-6 fixed bottom-3">
        <SidebarItem onClick={handleLogout} text="Logout" icon={<LogoutIcon />} />
      </div>
    </span>
  )
}

export default Sidebar