'use client'

import BottomNavigationItem from "./BottomNavigationItem";
import { navigations } from './Navigations'
import { usePathname } from "next/navigation";


const BottomNavigation = () => {
  const pathname = usePathname() ?? '';
  return (
    <div id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow lg:hidden">
      <div id="tabs" className="flex justify-between">
        {navigations.map((item) => (
          <BottomNavigationItem pathname={pathname} key={item.name} name={item.name} url={item.url} icon={item.icon} />
        ))}
      </div>
    </div>
  );
}

export default BottomNavigation;