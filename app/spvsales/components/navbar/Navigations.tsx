import { CiHome, CiReceipt, CiShop, CiShoppingBasket, CiUser } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";

export const navigations = [
  {
    name: 'Home',
    icon: CiHome,
    url: '/spvsales/'
  },
  {
    name: 'Order',
    icon: CiShop,
    url: '/spvsales/order'
  },
  {
    name: 'Transaksi',
    icon: CiReceipt,
    url: '/spvsales/transaksi'
  },
  {
    name: 'Keranjang',
    icon: CiShoppingBasket,
    url: '/spvsales/keranjang'
  },
  {
    name: 'KULES',
    icon: FaMapMarkerAlt,
    url: '/spvsales/kules'
  },
]