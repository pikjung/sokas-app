import { CiHome, CiReceipt, CiShop, CiShoppingBasket, CiUser } from "react-icons/ci";

export const navigations = [
  {
    name: 'Home',
    icon: CiHome,
    url: '/sales/'
  },
  {
    name: 'Order',
    icon: CiShop,
    url: '/sales/order'
  },
  {
    name: 'Transaksi',
    icon: CiReceipt,
    url: '/sales/transaksi'
  },
  {
    name: 'Keranjang',
    icon: CiShoppingBasket,
    url: '/sales/keranjang'
  },
  {
    name: 'Akun',
    icon: CiUser,
    url: '/sales/akun'
  },
]