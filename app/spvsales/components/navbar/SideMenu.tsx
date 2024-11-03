import Link from "next/link";
import { FaMapMarkedAlt } from "react-icons/fa";
import { SlBasketLoaded, SlBell, SlUser } from "react-icons/sl";
import { deleteToken } from "@/app/utils/getToken";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import { useNotification } from "@/app/context/NotificationContext";

const SideMenu = () => {
  const router = useRouter()
  const { setAlert, setToast } = useNotification()
  const logoutHandle = () => {
    setAlert({
      status: "success",
      message: "Berhasil logout"
    })
    setToast(true)
    setTimeout(() => {
      setToast(false)
      deleteToken();
      router.push("/admin/login")
    }, 2000);
  }

  return (
    <>
      <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start border-l">
        <Link href="/spvsales/keranjang" className="inline-flex rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:text-indigo-500 outline-none md:text-base"><SlBasketLoaded className="text-center" size={20} /> </Link>
        <Link href="/spvsales/kules" className="inline-flex rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:text-indigo-500 outline-none md:text-base"><FaMapMarkedAlt className="text-center" size={20} /></Link>
        <button onClick={() => logoutHandle()} className="inline-flex rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:text-indigo-500 outline-none md:text-base"><MdLogout className="text-center" size={20} /></button>
      </div>
    </>
  );
}

export default SideMenu;