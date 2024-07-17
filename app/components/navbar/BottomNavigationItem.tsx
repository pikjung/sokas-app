
import { IconType } from "react-icons";

interface BottomNavigationProps {
  name: string,
  icon: IconType,
  url?: string,
  pathname: string
}

const BottomNavigationItem: React.FC<BottomNavigationProps> = ({ name, icon: Icon, url, pathname }) => {
  const isActive = pathname === url;
  return (
    <a href={url ? url : '#'} className={`w-full focus:text-indigo-500 ${isActive ? 'text-indigo-700' : 'text-slate-900'}  hover:text-indigo-500 justify-center inline-block text-center pt-2 pb-1`}>
      <Icon className="inline-block mb-1" size={25} />
      <span className="tab tab-home block text-xs">{name}</span>
    </a>
  );
}

export default BottomNavigationItem;