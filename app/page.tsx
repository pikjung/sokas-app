'use client'

import Navbar from "./components/navbar/Navbar"
import BottomNavigation from "./components/navbar/BottomNavigation"
import Container from "./components/Container"
import Card from "./components/Card"
import { TbLamp } from "react-icons/tb"

export default function Home() {
  return (
    <>
      <Navbar />
      <Container flex={false} wrap={false}>
        <div className="text-2xl mb-2">Halo, <span className="font-bold">Toko Permai</span></div>
        <div className="mb-8 text-slate-400 font-light text-sm">Anda memiliki <span className="text-slate-900 font-bold"> 4 Order diproses</span>, dan <span className="text-teal-500">19 Order selesai</span>!</div>

        <h2 className="font-semibold mb-4">Ringkasan Order Anda</h2>
        <div className="">
          <div className="flex flex-auto gap-6">
            <div className="w-full pl-2 border rounded-lg p-4">
              <div className="text-4xl text-blue-500">PHILIPS</div>
              <div className="flex flex-nowrap gap-1 mt-2 mb-2"><p className="text-sm font-bold">Order anda bulan ini</p><span className="bg-green-200 font-bold text-green-700 rounded-md px-2 text-sm">+30</span></div>
              <div className="text-sm flex flex-nowrap text-slate-400">Total keseluruhan <span className="font-bold mx-1 text-slate-900">400</span> Order</div>
            </div>
            <div className="w-full pl-2 border rounded-lg p-4">
              <div className="text-4xl text-blue-700">PANASONIC</div>
              <div className="flex flex-nowrap gap-1 mt-2 mb-2"><p className="text-sm font-bold">Order anda bulan ini</p><span className="bg-green-200 font-bold text-green-700 rounded-md px-2 text-sm">+30</span></div>
              <div className="text-sm flex flex-nowrap text-slate-400">Total keseluruhan <span className="font-bold mx-1 text-slate-900">400</span> Order</div>
            </div>
            <div className="w-full pl-2 border rounded-lg p-4">
              <div className="text-4xl text-green-500">SCHNEIDER</div>
              <div className="flex flex-nowrap gap-1 mt-2 mb-2"><p className="text-sm font-bold">Order anda bulan ini</p><span className="bg-green-200 font-bold text-green-700 rounded-md px-2 text-sm">+30</span></div>
              <div className="text-sm flex flex-nowrap text-slate-400">Total keseluruhan <span className="font-bold mx-1 text-slate-900">400</span> Order</div>
            </div>
            <div className="w-full pl-2 border rounded-lg p-4">
              <div className="text-4xl text-red-500">SUPREME</div>
              <div className="flex flex-nowrap gap-1 mt-2 mb-2"><p className="text-sm font-bold">Order anda bulan ini</p><span className="bg-green-200 font-bold text-green-700 rounded-md px-2 text-sm">+30</span></div>
              <div className="text-sm flex flex-nowrap text-slate-400">Total keseluruhan <span className="font-bold mx-1 text-slate-900">400</span> Order</div>
            </div>
          </div>
        </div>

        <div className="mt-8 gap-2">
          <div className="w-full flex gap-6">
            <div className="w-full border rounded-lg p-6 h-60 overflow-auto">
              <div className="flex flex-nowrap">
                <h2 className="flex-1 font-semibold mb-6">Transaksi Terbaru</h2>
                <p className="flex-none"><a href="" className="text-sm font-bold text-indigo-500">Lihat detail</a></p>
              </div>
              <ul className="divide-y divide-slate-200">
                <li className="flex py-4 first:pt-0 last:pb-0">
                  <p className="text-blue-500 flex-1">PHILIPS</p>
                  <div className="ml-3 overflow-hidden flex-1">
                    <p className="text-sm font-medium text-slate-900">KAS-PHILIPS-SO-00000001</p>
                    <p className="text-sm text-slate-500 truncate">Order date: 18-02-2024</p>
                  </div>
                  <span className="flex-none rounded-lg py-2 px-4 text-sm bg-green-200 text-green-700">
                    Success
                  </span>
                </li>
                <li className="flex py-4 first:pt-0 last:pb-0">
                  <p className="text-blue-700 flex-1">PANASONIC</p>
                  <div className="ml-3 overflow-hidden flex-1">
                    <p className="text-sm font-medium text-slate-900">KAS-PAN-SO-00000001</p>
                    <p className="text-sm text-slate-500 truncate">Order date: 18-02-2024</p>
                  </div>
                  <span className="flex-none rounded-lg py-2 px-4 text-sm bg-green-200 text-green-700">
                    Success
                  </span>
                </li>
                <li className="flex py-4 first:pt-0 last:pb-0">
                  <p className="text-green-500 flex-1">SCHNEIDER</p>
                  <div className="ml-3 overflow-hidden flex-1">
                    <p className="text-sm font-medium text-slate-900">KAS-SCH-SO-00000001</p>
                    <p className="text-sm text-slate-500 truncate">Order date: 18-02-2024</p>
                  </div>
                  <span className="flex-none rounded-lg py-2 px-4 text-sm bg-green-200 text-green-700">
                    Success
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-full border rounded-lg p-6 h-60 overflow-auto">
              <div className="flex flex-nowrap">
                <h2 className="flex-1 font-semibold mb-6">Berita KAS</h2>
                <p className="flex-none"><a href="" className="text-sm font-bold text-indigo-500">Lihat detail</a></p>
              </div>
              <ul className="divide-y divide-slate-200">
                <li className="flex py-4 first:pt-0 last:pb-0">
                  <div className="ml-3 overflow-hidden flex-1">
                    <div className="flex flex-nowrap mb-2">
                      <p className="flex-1 text-sm font-medium text-slate-900">Update Diskon terbaru Philips</p>
                      <p className="flex-none text-xs font-medium text-slate-500">1 day Ago</p>
                    </div>
                    <p className="text-sm text-slate-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo illum cum vel quidem porro commodi libero sequi dolor consectetur distinctio?</p>
                  </div>
                </li>
                <li className="flex py-4 first:pt-0 last:pb-0">
                  <div className="ml-3 overflow-hidden flex-1">
                    <div className="flex flex-nowrap mb-2">
                      <p className="flex-1 text-sm font-medium text-slate-900">Update Diskon terbaru Philips</p>
                      <p className="flex-none text-xs font-medium text-slate-500">1 day Ago</p>
                    </div>
                    <p className="text-sm text-slate-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo illum cum vel quidem porro commodi libero sequi dolor consectetur distinctio?</p>
                  </div>
                </li>
                <li className="flex py-4 first:pt-0 last:pb-0">
                  <div className="ml-3 overflow-hidden flex-1">
                    <div className="flex flex-nowrap mb-2">
                      <p className="flex-1 text-sm font-medium text-slate-900">Update Diskon terbaru Philips</p>
                      <p className="flex-none text-xs font-medium text-slate-500">1 day Ago</p>
                    </div>
                    <p className="text-sm text-slate-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo illum cum vel quidem porro commodi libero sequi dolor consectetur distinctio?</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <div className="mb-8">

      </div>

      <BottomNavigation />
    </>
  )
}
