'use client'

import { useState } from "react";

interface HeaderPageProps {
  title: string;
  children: React.ReactNode;
  filter?: boolean;
  handleFilter?: ([]) => void;
}


const HeaderPage: React.FC<HeaderPageProps> = ({
  title,
  children,
  filter,
  handleFilter
}) => {

  const [tanggal, setTanggal] = useState([new Date().toISOString().split('T')[0], new Date().toISOString().split('T')[0]])

  const changeDate = (index: number, value: string) => {
    if (index === 0 || index === 1) {
      const tanggalArr = [...tanggal]
      tanggalArr[index] = value
      setTanggal(tanggalArr)
    }
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mb-4">
      <div>
        <div className="text-2xl mb-2">{title}</div>
        <div className="mb-8 text-slate-400 font-light text-sm">
          {children}
        </div>
      </div>
      {filter ?
        <div className="">
          <div className="float-right flex flex-wrap lg:flex-nowrap gap-4">
            <input
              type="date"
              className="p-2 border border-slate-400"
              value={tanggal[0]}
              onChange={(e) => changeDate(0, e.target.value)}
            />
            <input
              type="date"
              className="p-2 border border-slate-400"
              value={tanggal[1]}
              onChange={(e) => changeDate(1, e.target.value)}
              min={tanggal[0]}
            />
            <button className="rounded-sm bg-indigo-500 p-2 text-white hover:bg-indigo-600" onClick={() => handleFilter(tanggal)}>Terapkan Filter</button>
          </div>
        </div>
        : ''
      }
    </div>
  );
}

export default HeaderPage;