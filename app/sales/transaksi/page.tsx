'use client'

import { useCallback, useEffect, useState } from "react";
import { getToken } from "../../admin/utils/getToken";
import { useRouter } from "next/navigation";
import { verifyToken } from "../handler/authHandler";
import moment from "moment";

import { getTransaksi, getFilteredTransaksi } from "../handler/transaksiHandler";

import Container from "../components/Container"
import HeaderPage from "../components/HeaderPage"
import Card from "../components/Card"

const formatDate = (isoString: string): string => {
  return moment(isoString).format('DD-MM-YYYY');
};

const Home = () => {

  const router = useRouter()
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })
  const [transaksi, setTransaksi] = useState([])

  async function handleFilter(value: any) {
    getFilteredTransaksi(setTransaksi, value)
  }

  const authenticate = useCallback(async () => {
    if (!getToken()) {
      router.push('/login');
      return null
    }
    const authorization = await verifyToken(getToken());

    if (authorization.success === false) {
      setAlert({
        status: "warning",
        message: "You are not authorized"
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      router.push('/admin/login');
    }
  }, [router])

  useEffect(() => {
    getTransaksi(setTransaksi)
    authenticate();
  }, [authenticate])

  return (
    <Container flex={false} wrap={false} >
      <HeaderPage title="Transaksi" filter={true} handleFilter={handleFilter}>
        Keseluruhan transaksi anda
      </HeaderPage>

      <div className="flex flex-col-reverse lg:w-3/4">
        <Card header="Transaksi Selesai">
          <ul className="divide-y divide-slate-200">
            {transaksi.map((item: any) => (
              <li className="flex py-4 first:pt-0 last:pb-0" key={item.id}>
                <p className={`text-${item.Brand.color} w-24`}>{item.Brand.name}</p>
                <p className="flex-1 flex items-center justify-center font-bold">{item.Store.name}</p>
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-medium text-slate-900">{item.order_no}</p>
                  <p className="text-sm text-slate-500 truncate">Order date: {formatDate(item.created_at)}</p>
                </div>
                <span className={`flex-none rounded-lg py-2 px-4 text-sm ${item.processed_at === null ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"}`}>
                  {item.processed_at === null ? "Not Confirm" : "Confirm"}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Container >
  )
}

export default Home