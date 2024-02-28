import { CiHome, CiReceipt, CiShop, CiShoppingBasket, CiUser } from "react-icons/ci";

export const navigations = [
  {
    name: 'Home',
    icon: CiHome,
    url: '/'
  },
  {
    name: 'Order',
    icon: CiShop,
    url: '/order'
  },
  {
    name: 'Transaksi',
    icon: CiReceipt,
    url: '/transaksi'
  },
  {
    name: 'Keranjang',
    icon: CiShoppingBasket,
    url: '/keranjang'
  },
  {
    name: 'Akun',
    icon: CiUser,
    url: '/akun'
  },
]