'use client'

import { IoFilter } from "react-icons/io5"
import Content from "./components/Content"
import Navbar from "./components/Navbar"
import { useState } from "react"
import Container from "./components/Container"
import Action from "./components/Action"
import Button from "./components/Button"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useDataAnalisAuth from "../hooks/dataanalisAuth"
import { getMonitoring, reporting } from "./handler/monitoringHandler"
import { useNotification } from "../context/NotificationContext"

interface Monitoring {
  id: string,
  name: string,
  filename: string,
  filepath: string,
  created_at: string
}

export default function Home() {

  const { authenticate, userData } = useDataAnalisAuth()
  const { alert, toast, setAlert, setToast } = useNotification();
  const [dashboard, setDashboard] = useState([])
  const [monitoring, setMonitoring] = useState<Monitoring[]>([])
  const [monitoringId, setMonitoringID] = useState("")
  const [formStatus, setFormStatus] = useState({
    monitoringStatus: false,
    bpStatus: false,
  })
  const [monitoringTr, setMonitoringTr] = useState([])
  const [monitoringMulti, setMonitoringMulti] = useState([])

  useEffect(() => {
    getMonitoring(setMonitoring)
    authenticate();
  }, [authenticate]);

  const handleFilter = async () => {
    if (monitoringId == "") {
      setFormStatus({
        monitoringStatus: true,
        bpStatus: formStatus.bpStatus,
      })
      setTimeout(() => {
        setFormStatus({
          monitoringStatus: false,
          bpStatus: formStatus.bpStatus
        })
      }, 2000);
      return false
    }

    const calculate: any = await reporting(monitoringId);
    // console.log(calculate[0].nobp);
    if (calculate) {
      console.log(calculate)
    }
  }

  const handleMonitoringChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonitoringId = event.target.value;
    setMonitoringID(selectedMonitoringId);
  };

  const filter = (
    <Action>
      <select
        className={`p-2 border  rounded-xl w-1/4 ${formStatus.monitoringStatus ? "border-red-600 animate-bounce" : "border-slate-400"}`}
        value={monitoringId}
        onChange={handleMonitoringChange}>
        <option value="">
          -- pilih --
        </option>
        {monitoring && monitoring.map((item: any) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}

      </select>
      <Button buttonHandler={handleFilter} name="Terapkan" icon={IoFilter} />
    </Action>
  )

  return (
    <Container>
      <Navbar />
      <Content header="Dashboard" action={filter} desc="Lihat performa toko disini!">
        {formStatus.bpStatus && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <svg aria-hidden="true" className="w-5 h-5 mr-3 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
            <span className="font-medium mr-1">Peringatan!</span> Ada BP tidak terdaftar di sistem.
          </div>
        )}
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
    </Container>
  )
}
