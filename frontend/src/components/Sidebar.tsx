import { useNavigate } from "react-router-dom"
import { BrainIcon } from "../icons/BrainIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"
import { LogoutIcon } from "../icons/LogoutIcon"
import { toast } from "react-toastify"


const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out")
    navigate("/signin")
  }

  return (
    <span className="h-screen bg-white border-r w-12 md:w-50 fixed left-0 top-0 ">
      <div className="flex flex-col h-full items-center">

        <div className="text-3xl cursor-pointer  font-bolds items-center gap-3 pt-4 flex" onClick={() => navigate("/dashboard")}>{<BrainIcon />} <p className="hidden md:block">BRAINLY</p></div>
        <div className="pt-4 text-center flex flex-col gap-3">
          <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        </div>
        <div className=" text-center fixed bottom-3">
          <SidebarItem onClick={handleLogout} text="Logout" icon={<LogoutIcon />} />
        </div>
      </div>
    </span>
  )
}

export default Sidebar