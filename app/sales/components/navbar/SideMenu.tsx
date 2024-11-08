import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { SlBasketLoaded, SlBell, SlUser } from "react-icons/sl";
import { deleteToken } from "@/app/utils/getToken";
import { useRouter } from "next/navigation";
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
        <Link href="/sales/keranjang" className="inline-flex rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:text-indigo-500 outline-none md:text-base"><SlBasketLoaded className="text-center" size={20} /> </Link>
        <Link href="#" className="inline-flex rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:text-indigo-500 outline-none md:text-base"><SlBell className="text-center" size={20} /></Link>
        <Link href="#" className="inline-flex rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:text-indigo-500 outline-none md:text-base"><SlUser className="text-center" size={20} /></Link>
      </div>
      <div className="-ml-8 lg:hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start border-l">
        <button onClick={() => logoutHandle()} className="inline-flex rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-900 hover:text-indigo-500 outline-none md:text-base"><MdLogout className="text-center" size={20} /></button>
      </div>
    </>
  );
}

export default SideMenu;