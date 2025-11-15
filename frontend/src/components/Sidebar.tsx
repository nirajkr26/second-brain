import { BrainIcon } from "../icons/BrainIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import SidebarItem from "./SidebarItem"


const Sidebar = () => {
  return (
    <span className="h-screen pl-4 bg-white border-r w-60 fixed left-0 top-0 ">
      <div className="text-3xl font-bolds items-center gap-3 pt-4 flex">{<BrainIcon />} BRAINLY</div>
      <div className="pt-4 text-center flex flex-col gap-3 pl-6">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </span>
  )
}

export default Sidebar