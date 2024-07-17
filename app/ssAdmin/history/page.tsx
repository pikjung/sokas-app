'use client'

import Content from "../components/Content"
import Navbar from "../components/Navbar"
import { useState } from "react"
import Container from "../components/Container"

import moment from "moment";

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { verifyToken } from '../handler/authHandler'
import { getHistoryBySS, getSpesificTransaksi } from "../handler/historyHandler"
import { getToken } from '../utils/getToken'
import Toast from "../components/Toast"

import Card from "../../components/Card"
import { FaCheck, FaEye, FaTrash } from "react-icons/fa"

import Modal from "../components/Modal"
import { LiaPaperPlane } from "react-icons/lia"

const formatDate = (isoString: string): string => {
  return moment(isoString).format('DD-MM-YYYY');
};

export default function Home() {

  const router = useRouter();
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })
  const [transaksi, setTransaksi] = useState([])
  const [detailTransaction, setDetailTransaction] = useState([]);

  useEffect(() => {
    const authenticate = async () => {
      if (!getToken()) {
        router.push('/admin/login');
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

      getHistoryBySS(setTransaksi)

    };

    authenticate();
  }, [router]);

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
      {toast && (
        <Toast status={alert.status} message={alert.message} />
      )}
      <Navbar />
      <Content header="History Pesanan" desc="Lihat riwayat pesanan!">
        <Card header="Transaksi sudah di proses">
          <ul className="divide-y divide-slate-200">
            {transaksi.map((item: any) => (
              <li className="flex py-4 first:pt-0 last:pb-0" key={item.id}>
                <p className={`text-${item.Brand.color} w-24`}>{item.Brand.name}</p>
                <p className="flex-1 flex items-center justify-center font-bold">{item.Store.name}</p>
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-medium text-slate-900">{item.order_no}</p>
                  <p className="text-sm text-slate-500 truncate">Order date: {formatDate(item.created_at)}</p>
                </div>
                <span className={`flex-none rounded-lg py-1 px-2 items-center justify-center text-sm ${checkConfirm(item.processed_at, item.isCancel) ? "text-green-700" : "text-red-700"}`}>
                  {checkConfirm(item.processed_at, item.isCancel) ? "Confirm" : "Cancel"}
                </span>
                <p>{item.noted}</p>
                <div className="flex-1 justify-center items-center">
                  <button onClick={e => handleDetailTransaction(item.id)} className="flex float-end gap-2 rounded-lg py-1 px-2 bg-teal-600 hover:bg-teal-700 text-white text-lg shadow-lg">
                    <FaEye />
                    Detail
                  </button>
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
              <div className="flex items-center gap-2">
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
              {/* <div className="mx-auto"><button onClick={() => handleDelete(produk.id)} className=" hover:text-rose-600 p-2 text-rose-500 rounded-md"><FaTrash /></button></div> */}
            </div>
          ))}
        </Modal>
        <div className="mt-8"></div>
      </Content>
    </Container>
  )
}
