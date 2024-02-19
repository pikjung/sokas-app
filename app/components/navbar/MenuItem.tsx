import { IconType } from "react-icons";

interface MenuItemProps {
  menuName: string,
  url: string,
  icon: IconType
}

const MenuItem: React.FC<MenuItemProps> = ({ menuName, url, icon: Icon }) => {
  return (
    <a href={url}
      className="
      text-md 
      font-medium
      text-slate-900 
      transition 
      duration-100 
      flex 
      flex-nowrap
      p-2
      hover:text-indigo-500
      "
    >
      <Icon className=" my-auto" size={20} />
      {menuName}
    </a>
  );
}

export default MenuItem;