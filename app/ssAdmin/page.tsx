'use client'

import { useState, useEffect } from "react"
import moment from "moment";
import Content from "./components/Content"
import Navbar from "./components/Navbar"
import Container from "./components/Container"
import Modal from "./components/Modal"
import Card from "../components/Card"

import {
  getTransaksiBySS,
  getSpesificTransaksi,
  confirmTransaksi,
  cancelTransaksi,
  getConnectedUsers,
  pendingTransaksi,
  pendingModal,
  getAllSSusers
} from "./handler/ssHandler"
import useSSAdminAuth from "@/app/hooks/ssAdminUseAuth"
import useWebSocket, { sendMessageToUser } from "../hooks/useWebsocket";
import { useNotification } from "../context/NotificationContext";

import { FaCheck } from "react-icons/fa"
import { LiaPaperPlane } from "react-icons/lia"
import UserList from "./components/UserList";

const formatDate = (isoString: string): string => {
  return moment(isoString).format('DD-MM-YYYY');
};

interface detailTransaction {
  created_at: Date,
  discount: string,
  id: string,
  productId: string,
  qty: number,
  transactionId: string,
  updated_at: Date,
}


export default function Home() {
  const { authenticate, userData } = useSSAdminAuth()

  // useWebSocket(userData?.user_id)

  const { setAlert, setToast } = useNotification()
  const [transaksi, setTransaksi] = useState([])
  const [detailTransaction, setDetailTransaction] = useState<detailTransaction[]>([]);
  const [id, setId] = useState("");
  const [ssUsers, setSSUsers] = useState([])
  const [product, setProduct] = useState([])
  const [noted, setNoted] = useState("");
  const [salesNote, setSalesNote] = useState("");
  const [salesId, setSalesId] = useState("");
  const [pendingNote, setPendingNote] = useState("");
  // const [users, setUsers] = useState([])
  const [userId, setUserId] = useState<string | undefined>(undefined);

  console.log(userData?.user_id)

  useEffect(() => {
    // getConnectedUsers(setUsers)
    getTransaksiBySS(userData?.user_id, setTransaksi)
    getAllSSusers(setSSUsers)
    setUserId(userData?.user_id)
  }, [userData?.user_id, authenticate]);

  // console.log(users)
  const handleDetailTransaction = async (id: string, brandId: string, salesId: string) => {
    setNoted("")
    setProduct([])
    setDetailTransaction([])
    setId("")
    setSalesId(salesId)
    setId(id)
    await getSpesificTransaksi(setDetailTransaction, setProduct, setSalesNote, id, brandId);
  }

  const handleQtyChange = (id: string, newQty: any) => {
    setDetailTransaction(
      detailTransaction.map((produk: any) =>
        produk.id === id ? { ...produk, qty: newQty } : produk
      ));
  };

  const handleDiscountChange = (id: string, newDisc: any) => {
    setDetailTransaction(
      detailTransaction.map((produk: any) =>
        produk.id === id ? { ...produk, discount: newDisc } : produk
      ));
  };

  const cancelOrder = async (id: string) => {
    // sendMessageToUser(salesId, "success", "Orderan", "Pesanan di cancel")
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
      getTransaksiBySS(userId, setTransaksi)
    }
  }

  const pendingOrder = async (id: string, pendingNote: string) => {
    const response = await pendingTransaksi(id, pendingNote);
    if (response.status === "success") {
      setAlert({
        status: "success",
        message: "Pesanan di pending"
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getTransaksiBySS(userId, setTransaksi)
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
      getTransaksiBySS(userId, setTransaksi)
    }
  }

  const changeTransaksi = (id: string) => {
    setUserId(id)
    getTransaksiBySS(id, setTransaksi)
  }


  // const handleDelete = (id: string) => {
  //   setDetailTransaction(detailTransaction.filter((item: any) => item.id !== id));
  // }

  return (
    <Container>
      <Navbar />
      <Content header="Pesanan" desc="Lihat dan proses pesanan baru!">
        {/* <Card header="Sales Online">
          <UserList users={users} />
        </Card> */}
        <div className="my-4"></div>
        <Card header="Transaksi belum di proses">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={e => changeTransaksi(userData.user_id)}
              key={userData.user_id}
              className="border border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200"
            >
              {userData.name}
            </button>
            {ssUsers.map((item: any) => (
              <button
                onClick={e => changeTransaksi(item.id)}
                key={item.id}
                className="border border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

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
                  <button onClick={e => handleDetailTransaction(item.id, item.brandId, item.created_by)} className="flex float-end gap-2 rounded-lg py-1 px-2 bg-green-600 hover:bg-green-700 text-white text-lg shadow-lg">
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
                    onChange={(e) => handleQtyChange(produk.id, e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor={`discount-${produk.id}`} className="text-gray-600">
                    Diskon:
                  </label>
                  <input
                    type="text"
                    id={`discount-${produk.id}`}
                    className="w-20 lg:w-24 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={produk.discount}
                    onChange={(e) => handleDiscountChange(produk.id, e.target.value)}
                  />%
                </div>
              </div>
              {/* <div className="mx-auto"><button onClick={() => handleDelete(produk.id)} className=" hover:text-rose-600 p-2 text-rose-500 rounded-md"><FaTrash /></button></div> */}
            </div>
          ))}
          <label htmlFor="">Sales Note: </label>
          <textarea
            className="w-full p-2 border bg-slate-100 border-slate-400 rounded"
            name=""
            id=""
            readOnly
            value={salesNote}
          >
          </textarea>
          <label htmlFor="">SS Note: </label>
          <textarea
            className="w-full p-2 border border-slate-400 rounded"
            placeholder="input note disini"
            name=""
            id=""
            onChange={(e) => setNoted(e.target.value)}
          >
            {noted}
          </textarea>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="rounded-xl flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white hover:bg-yellow-700"
              onClick={(e) => {
                setId(id)
                pendingModal()
              }}
            >
              Pending
            </button><button
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
        <Modal header="Confirm Pending" idName="pendingModal">
          <label htmlFor="">Pending Note: </label>
          <textarea
            className="w-full p-2 border bg-slate-100 border-slate-400 rounded"
            name=""
            id=""
            onChange={(e) => setPendingNote(e.target.value)}
          >
            {pendingNote}
          </textarea>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="rounded-xl flex items-center gap-2 px-4 py-2 bg-teal-600 text-white hover:bg-teal-700"
              onClick={(e) => pendingOrder(id, pendingNote)}
            >
              Confirm Pending
              <LiaPaperPlane size={20} />
            </button>
          </div>
        </Modal>
        <div className="mt-8"></div>
      </Content>
    </Container>
  )
}
