import BottomNavigationItem from "./BottomNavigationItem";

import { navigations } from './Navigations'

const BottomNavigation = () => {
  return (
    <div id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow lg:hidden">
      <div id="tabs" className="flex justify-between">
        {navigations.map((item) => (
          <BottomNavigationItem key={item.name} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

export default BottomNavigation;