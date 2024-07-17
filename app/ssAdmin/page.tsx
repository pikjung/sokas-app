'use client'

import Content from "./components/Content"
import Navbar from "./components/Navbar"
import { useState } from "react"
import Container from "./components/Container"

import moment from "moment";

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { verifyToken } from './handler/authHandler'
import { getTransaksiBySS, getSpesificTransaksi, confirmTransaksi, cancelTransaksi } from "./handler/ssHandler"
import { getToken } from './utils/getToken'
import Toast from "./components/Toast"

import Card from "../components/Card"
import { FaCheck, FaTrash } from "react-icons/fa"

import Modal from "./components/Modal"
import { LiaPaperPlane } from "react-icons/lia"

const formatDate = (isoString: string): string => {
  return moment(isoString).format('DD-MM-YYYY');
};

interface detailTransaction {
  created_at: Date,
  discount: number,
  id: string,
  productId: string,
  qty: number,
  transactionId: string,
  updated_at: Date,
}

export default function Home() {

  const router = useRouter();
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })
  const [transaksi, setTransaksi] = useState([])
  const [detailTransaction, setDetailTransaction] = useState<detailTransaction[]>([]);
  const [id, setId] = useState("");
  const [product, setProduct] = useState([])
  const [noted, setNoted] = useState("");

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

      getTransaksiBySS(setTransaksi)

    };

    authenticate();
  }, [router]);

  const handleDetailTransaction = async (id: string, brandId: string) => {
    setNoted("")
    setProduct([])
    setDetailTransaction([])
    setId("")
    setId(id)
    await getSpesificTransaksi(setDetailTransaction, setProduct, id, brandId);
  }

  const handleQtyChange = (id: string, newQty: any) => {
    setDetailTransaction(
      detailTransaction.map((produk: any) =>
        produk.id === id ? { ...produk, qty: newQty } : produk
      ));
  };

  const cancelOrder = async (id: string) => {
    const response = await cancelTransaksi(id);
    if (response.status === "success") {
      setAlert({
        status: "success",
        message: "Pesanan di cancel"
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getTransaksiBySS(setTransaksi)
    }
  }

  const confirmOrder = async (id: string) => {
    const response = await confirmTransaksi(id, detailTransaction, noted)
    if (response.status === "success") {
      setAlert({
        status: "success",
        message: "Pesanan di confirm"
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getTransaksiBySS(setTransaksi)
    }
  }

  const handleNotedChange = (value: string) => {
    setNoted(value)
  }

  // const handleDelete = (id: string) => {
  //   setDetailTransaction(detailTransaction.filter((item: any) => item.id !== id));
  // }

  return (
    <Container>
      {toast && (
        <Toast status={alert.status} message={alert.message} />
      )}
      <Navbar />
      <Content header="Pesanan" desc="Lihat dan proses pesanan baru!">
        <Card header="Transaksi belum di proses">
          <ul className="divide-y divide-slate-200">
            {transaksi.map((item: any) => (
              <li className="flex py-4 first:pt-0 last:pb-0" key={item.id}>
                <p className={`text-${item.Brand.color} w-24`}>{item.Brand.name}</p>
                <p className="flex-1 flex items-center justify-center font-bold">{item.Store.name}</p>
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-medium text-slate-900">{item.order_no}</p>
                  <p className="text-sm text-slate-500 truncate">Order date: {formatDate(item.created_at)}</p>
                </div>
                <span className={`flex-none rounded-lg py-1 px-2 items-center justify-center text-sm ${item.processed_at === null ? "text-red-700" : "text-green-700"}`}>
                  {item.processed_at === null ? "Not Confirm" : "Confirm"}
                </span>
                <div className="flex-1 justify-center items-center">
                  <button onClick={e => handleDetailTransaction(item.id, item.brandId)} className="flex float-end gap-2 rounded-lg py-1 px-2 bg-green-600 hover:bg-green-700 text-white text-lg shadow-lg">
                    <FaCheck />
                    Confirm Order
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Modal header="Confirm pesanan" idName="formModal">
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
                  onChange={(e) => handleQtyChange(produk.id, e.target.value)}
                />
              </div>
              {/* <div className="mx-auto"><button onClick={() => handleDelete(produk.id)} className=" hover:text-rose-600 p-2 text-rose-500 rounded-md"><FaTrash /></button></div> */}
            </div>
          ))}
          <textarea
            className="w-full p-2 border border-slate-400 rounded"
            placeholder="input note disini"
            name=""
            id=""
            onChange={(e) => handleNotedChange(e.target.value)}
          >
            {noted}
          </textarea>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="rounded-xl flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700"
              onClick={(e) => cancelOrder(id)}
            >
              Cancel Order
            </button>
            <button
              type="submit"
              className="rounded-xl flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700"
              onClick={(e) => confirmOrder(id)}
            >
              Confirm
              <LiaPaperPlane size={20} />
            </button>
          </div>
        </Modal>
        <div className="mt-8"></div>
      </Content>
    </Container>
  )
}
