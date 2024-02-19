import { IconType } from "react-icons";

interface BottomNavigationProps {
  name: string,
  icon: IconType
}

const BottomNavigationItem: React.FC<BottomNavigationProps> = ({ name, icon: Icon }) => {
  return (
    <a href="#" className="w-full focus:text-indigo-500 active:text-indigo-700 hover:text-indigo-500 justify-center inline-block text-center pt-2 pb-1">
      <Icon className="inline-block mb-1" size={25} />
      <span className="tab tab-home block text-xs">{name}</span>
    </a>
  );
}

export default BottomNavigationItem;