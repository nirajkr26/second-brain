import type { ReactElement } from "react";

interface sideBarProps {
  text: String;
  icon: ReactElement;
  onClick?: () => void;
}
const SidebarItem = ({ text, icon, onClick }: sideBarProps) => {
  return (
    <div onClick={onClick} className="flex gap-3 cursor-pointer py-1 px-2 rounded-md items-center text-gray-800 max-w-35 hover:bg-red-100 transition-all">
      {icon} <p className="hidden md:block">{text}</p>
    </div>
  )
}

export default SidebarItem