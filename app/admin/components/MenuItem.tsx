'use client'

import Link from 'next/link';
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MenuItemProps {
  url: string;
  icon: IconType;
  name: string;
  desc: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  url,
  icon: Icon,
  name,
  desc
}) => {
  const path = usePathname();
  const [menuFocus, setMenuFocus] = useState(false)

  return (
    <Link
      href={url}
      className={`
          relative
          flex
          items-center
          justify-center
          first:mb-20
          last:mt-14
          w-16
          p-4 
          ${path === url ? 'bg-indigo-600 text-slate-200' : 'border text-gray-700 hover:text-indigo-600 hover:border-indigo-500'} 
          rounded-2xl 
          mb-4
        `}
      onMouseEnter={() => setMenuFocus(true)}
      onMouseLeave={() => setMenuFocus(false)}
    >
      <Icon size={25} className="" />
      {/* // <span
      //   className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 p-2 flex justify-center items-center text-white rounded-full">3</span> */}
      {menuFocus ? (
        <div className="absolute left-20 p-2 shadow-sm rounded flex flex-wrap border backdrop-blur-sm">
          <p className="text-xs font-semibold text-slate-700">{name}</p>
          <p className="text-xs font-light text-nowrap text-slate-500">{desc}</p>
        </div>
      ) : ''}
    </Link>
  );
}

export default MenuItem;