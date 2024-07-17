'use client'
import { useState } from "react";

import Header from "./Header";
import Logo from "./Logo";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SideMenu from "./SideMenu";
import BadgeBanner from "./BadgeBanner";
import { CiHome, CiReceipt, CiShop } from "react-icons/ci";

const menu = [
  {
    menuName: 'Home',
    url: '/sales/',
    icon: CiHome
  },
  {
    menuName: 'Order',
    url: '/sales/order',
    icon: CiShop
  },
  {
    menuName: 'Transaksi',
    url: '/sales/transaksi',
    icon: CiReceipt
  }
]

const Navbar = () => {
  return (
    <div className="bg-white border-b mb-6 sticky top-0">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 ">
        <Header>
          <Logo />
          <BadgeBanner />
          <Menu>
            {menu.map((item) => (
              <MenuItem key={item.menuName} menuName={item.menuName} url={item.url} icon={item.icon} />
            ))}
          </Menu>
          <SideMenu />
        </Header>
      </div>
    </div>
  );
}

export default Navbar;