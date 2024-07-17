'use client'
import MenuItem from "./MenuItem";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { GoGear } from "react-icons/go";
import { MdDashboard, MdLogout } from "react-icons/md";
import { deleteToken } from "../utils/getToken";
import { CiMail, CiTimer } from "react-icons/ci";

const nav = [
  {
    name: 'Pesanan',
    url: '/ssAdmin',
    icon: CiMail,
    desc: 'Check Pesanan disini!'
  },
  {
    name: 'History',
    url: '/ssAdmin/history',
    icon: CiTimer,
    desc: 'Lihat riwayat pesanan!'
  },
]

const Menu = () => {
  const router = useRouter()
  const [menuFocus, setMenuFocus] = useState(false);
  const buttonHandle = () => {
    deleteToken();
    router.push("/admin/login")
  }
  return (
    <nav className="relative flex flex-col py-4 items-center">
      {nav.map((item) => (
        <MenuItem key={item.url} url={item.url} icon={item.icon} name={item.name} desc={item.desc} />
      ))}
      <button
        className={`
          relative
          flex
          items-center
          justify-center
          first:mb-20
          last:mt-14
          w-16
          p-4 
          border text-gray-700 hover:text-indigo-600 hover:border-indigo-500
          rounded-2xl 
          mb-4
        `}
        onMouseEnter={() => setMenuFocus(true)}
        onMouseLeave={() => setMenuFocus(false)}
        onClick={buttonHandle}
      >
        <MdLogout size={25} className="" />
        {/* // <span
      //   className="absolute -top-2 -right-2 bg-red-600 h-6 w-6 p-2 flex justify-center items-center text-white rounded-full">3</span> */}
        {menuFocus ? (
          <div className="absolute left-20 p-2 shadow-sm rounded flex flex-wrap border backdrop-blur-sm z-10">
            <p className="text-xs font-semibold text-slate-700">Logout</p>
            <p className="text-xs font-light text-nowrap text-slate-500">
              Logout dari akun mu!
            </p>
          </div>
        ) : (
          ""
        )}
      </button>
    </nav>
  );
}

export default Menu;