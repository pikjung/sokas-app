import MenuItem from "./MenuItem";

import { BiStore } from "react-icons/bi";
import { FaGlobeAsia, FaList, FaUser } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { RiBox3Line } from "react-icons/ri";

const nav = [
  {
    name: 'Dashboard',
    url: '/admin',
    icon: MdDashboard,
    desc: 'Lihat performa aplikasimu disini!'
  },
  {
    name: 'Account',
    url: '/admin/user',
    icon: FaUser,
    desc: 'Atur data user disini!'
  },
  {
    name: 'Area',
    url: '/admin/area',
    icon: FaGlobeAsia,
    desc: 'Lihat bagian area!'
  },
  {
    name: 'Brand',
    url: '/admin/brand',
    icon: FaList,
    desc: 'Input Brand mu disini!'
  },
  {
    name: 'Product',
    url: '/admin/product',
    icon: RiBox3Line,
    desc: 'Lihat product disini!'
  },
  {
    name: 'Store',
    url: '/admin/store',
    icon: BiStore,
    desc: 'Atur data toko customer disini! '
  },
  {
    name: 'Settings',
    url: '/admin/settings',
    icon: GoGear,
    desc: 'Atur profile anda disini!'
  }
]

const Menu = () => {
  return (
    <nav className="relative flex flex-col py-4 items-center">
      {nav.map((item) => (
        <MenuItem key={item.url} url={item.url} icon={item.icon} name={item.name} desc={item.desc} />
      ))}
    </nav>
  );
}

export default Menu;