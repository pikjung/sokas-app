'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { IconType } from "react-icons";

interface MenuItemProps {
  menuName: string,
  url: string,
  icon: IconType
}

const MenuItem: React.FC<MenuItemProps> = ({ menuName, url, icon: Icon }) => {
  const pathname = usePathname()
  return (
    <Link href={url}
      className={`
        text-md 
        font-medium
        transition 
        duration-100 
        flex 
        flex-nowrap
        p-2
        hover:text-indigo-500
        ${pathname === url ? 'text-indigo-500' : 'text-slate-900'}
      `}
    >
      <Icon className=" my-auto" size={20} />
      {menuName}
    </Link>
  );
}

export default MenuItem;