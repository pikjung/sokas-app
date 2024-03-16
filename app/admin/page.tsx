'use client'

import { IoFilter } from "react-icons/io5"
import Content from "./components/Content"
import Navbar from "./components/Navbar"
import { useState } from "react"
import { FaArrowUp } from "react-icons/fa"

export default function Home() {

  const [tanggal, setTanggal] = useState([new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]])

  const changeDate = (index: number, value: string) => {
    if (index === 0 || index === 1) {
      const tanggalArr = [...tanggal]
      tanggalArr[index] = value
      setTanggal(tanggalArr)
    }
  }

  function handleFilter() {

  }

  const filter = (
    <div className="left-0 flex justify-end gap-2">
      <input
        type="date"
        className="p-2 border border-slate-400 rounded-xl"
        value={tanggal[0]}
        onChange={(e) => changeDate(0, e.target.value)}
      />
      <input
        type="date"
        className="p-2 border border-slate-400 rounded-xl"
        value={tanggal[1]}
        onChange={(e) => changeDate(1, e.target.value)}
        min={tanggal[0]}
      />
      <button
        className="rounded-xl gap-2 my-auto flex bg-indigo-600 p-2 text-white hover:bg-indigo-700"
        onClick={handleFilter}
      >
        <IoFilter size={20} />
        Terapkan
      </button>
    </div>
  )

  return (
    <main className="flex w-full h-full shadow-lg rounded-3xl">
      <Navbar />
      <Content header="Dashboard" action={filter} desc="Lihat performa aplikasimu disini!">
        <div className="mt-8 border border-slate-300 rounded-xl w-3/6 bg-white p-4 flex-col">
          <div className="flex flex-row">
            <div>
              <h4 className="text-slate-600 text-lg font-medium">Total order </h4>
              <p className="text-sm text-slate-400">1 Maret 2024 - 15 Maret 2024</p>
              <div className="mt-6 grid grid-rows-2">
                <p className="text-4xl text-slate-600 font-medium">320</p>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Naik 15%
                </span>
              </div>
            </div>
            <div>
              stat
            </div>
          </div>
          <div className="flex flex-row">

          </div>
        </div>
      </Content>
    </main>
  )
}
