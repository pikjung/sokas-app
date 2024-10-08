'use client'

import Content from "../components/Content"
import Navbar from "../components/Navbar"
import { useState } from "react"
import Container from "../components/Container"

import moment from "moment";

import { useEffect } from 'react'
import { getHistoryBySS, getSpesificTransaksi } from "../handler/historyHandler"
import useSSAdminAuth from "@/app/hooks/ssAdminUseAuth"

import Card from "../../components/Card"
import { FaEye } from "react-icons/fa"

import Modal from "../components/Modal"

const formatDate = (isoString: string): string => {
  return moment(isoString).format('DD-MM-YYYY');
};

export default function Home() {

  const { authenticate, userData } = useSSAdminAuth()

  // useWebSocket(userData?.user_id)

  const [transaksi, setTransaksi] = useState([])
  const [detailTransaction, setDetailTransaction] = useState([]);

  useEffect(() => {

    authenticate();
    getHistoryBySS(setTransaksi)
  }, [authenticate]);

  const handleDetailTransaction = async (id: string) => {
    setDetailTransaction([])
    await getSpesificTransaksi(setDetailTransaction, id);
  }

  const checkConfirm = (processed: string, cancel: string) => {
    if (processed !== null) {
      if (cancel == "N") {
        return true
      } else if (cancel == "Y") {
        return false
      }
    }
  }


  return (
    <Container>
      <Navbar />
      <Content header="History Pesanan" desc="Lihat riwayat pesanan!">
        <Card header="Transaksi sudah di proses">
          <ul className="divide-y divide-slate-200">
            {transaksi.map((item: any) => (
              <li className="flex-wrap py-4 first:pt-0 last:pb-0" key={item.id}>
                <div className="flex">
                  <p className={`text-${item.Brand.color} w-24`}>{item.Brand.name}</p>
                  <p className="flex-1 flex items-center justify-center font-bold">{item.Store.name}</p>
                  <div className="overflow-hidden flex-1">
                    <p className="text-sm font-medium text-slate-900">{item.order_no}</p>
                    <p className="text-sm text-slate-500 truncate">Order date: {formatDate(item.created_at)}</p>
                  </div>
                  <span className={`flex-none rounded-lg py-1 px-2 items-center justify-center text-sm ${checkConfirm(item.processed_at, item.isCancel) ? "text-green-700" : "text-red-700"}`}>
                    {checkConfirm(item.processed_at, item.isCancel) ? "Confirm" : "Cancel"}
                  </span>
                  <div className="flex-1 justify-center items-center">
                    <button onClick={e => handleDetailTransaction(item.id)} className="flex float-end gap-2 rounded-lg py-1 px-2 bg-teal-600 hover:bg-teal-700 text-white text-lg shadow-lg">
                      <FaEye />
                      Detail
                    </button>
                  </div>
                </div>
                <div className="flex flex-nowrap mt-2">
                  <div className="flex-1">Sales Note: <p className="font-semibold text-slate-600">{item.salesNote}</p></div>
                  <div className="flex-1">
                    SS Note: <p className="font-semibold text-slate-600">{item.noted}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Modal header="Detail pesanan" idName="formModal">
          {detailTransaction.map((produk: any) => (
            <div
              className="flex flex-col lg:flex-row gap-4 items-center p-3 bg-white rounded-lg shadow-sm mb-4"
              key={produk.id}
            >
              <div className="flex-1 w-96 lg:w-auto">
                {produk.name ? produk.name : produk.Product.name}
              </div>
              <div className="flex-wrap">
                <div className="flex items-center gap-2 mb-2">
                  <label htmlFor={`qty-${produk.id}`} className="text-gray-600">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`qty-${produk.id}`}
                    className="w-20 lg:w-24 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={produk.qty}
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`discount-${produk.id}`} className="text-gray-600">
                    Discount:
                  </label>
                  <input
                    type="text"
                    id={`discount-${produk.id}`}
                    className="w-20 lg:w-24 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={produk.discount}
                    readOnly
                  />
                </div>
              </div>
              {/* <div className="mx-auto"><button onClick={() => handleDelete(produk.id)} className=" hover:text-rose-600 p-2 text-rose-500 rounded-md"><FaTrash /></button></div> */}
            </div>
          ))}
        </Modal>
        <div className="mt-8"></div>
      </Content>
    </Container>
  )
}
