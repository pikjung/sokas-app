'use client'

import { useEffect, useState } from "react";
import moment from "moment";

import { getTransaksi, getFilteredTransaksi } from "../handler/transaksiHandler";

import Container from "../components/Container"
import HeaderPage from "../components/HeaderPage"
import Card from "../components/Card"
import useSalesAuth from "@/app/hooks/salesUseAuth";
import useWebSocket from "@/app/hooks/useWebsocket";

const formatDate = (isoString: string): string => {
  return moment(isoString).format('DD-MM-YYYY');
};

const Home = () => {
  const [transaksi, setTransaksi] = useState([])
  const { authenticate, userData } = useSalesAuth()

  // if (userData?.user_id) {
  //   useWebSocket(userData.user_id);
  // }

  async function handleFilter(value: any) {
    getFilteredTransaksi(setTransaksi, value)
  }


  useEffect(() => {
    getTransaksi(setTransaksi)
    authenticate();
  }, [authenticate])

  function pending_section(pending_notes: string) {
    return (
      <div className="flex-1 my-2">
        Note: {pending_notes}
      </div>
    )
  }

  return (
    <Container flex={false} wrap={false} >
      <HeaderPage title="Transaksi" filter={true} handleFilter={handleFilter}>
        Keseluruhan transaksi anda
      </HeaderPage>

      <div className="flex flex-col-reverse lg:w-full w-full">
        <Card header="Transaksi Selesai">
          <ul className="divide-y divide-slate-200">
            {transaksi.map((item: any) => (
              <li className="flex flex-col md:flex-row py-4 first:pt-0 last:pb-0" key={item.id}>
                <p className={`text-${item.Brand.color} w-full md:w-24 mb-2 md:mb-0`}>{item.Brand.name}</p>
                <p className="flex-1 flex items-center justify-center font-bold mb-2 md:mb-0">{item.Store.name}</p>
                <div className="overflow-hidden flex-1 mb-2 md:mb-0">
                  <p className="text-sm font-medium text-slate-900">{item.order_no}</p>
                  <p className="text-sm text-slate-500 truncate">Order date: {formatDate(item.created_at)}</p>
                </div>
                {item.isPending === "Y" ? pending_section(item.pending_note) : ""}
                <span
                  className={`flex-none rounded-lg py-2 px-4 text-sm 
                  ${item.isPending === "Y" ? "bg-yellow-200 text-yellow-700" :
                      item.processed_at === null ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"
                    }`
                  }
                >
                  {item.isPending === "Y" ? "Pending" :
                    item.processed_at === null ? "Not Confirm" : "Confirm"
                  }
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