import type { ReactElement } from "react";

interface sideBarProps {
  text: String;
  icon: ReactElement;
}
const SidebarItem = ({ text, icon }: sideBarProps) => {
  return (
    <div className="flex gap-3 cursor-pointer py-1 px-2 rounded-md items-center text-gray-800 max-w-35 hover:bg-purple-100 transition-all">
      {icon} {text}
    </div>
  )
}

export default SidebarItem