'use client'

import { ReactNode, useState } from "react";

interface DropdownInputProps {
  label: string;
  id: string;
  handleChange: (value: string) => void;
  handleChangeProduct: (value: string) => void;
  placeholder: string;
  options?: [] | string;
  showDropdown: boolean;
  handleShowDropdown: () => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  id,
  handleChange,
  handleChangeProduct,
  placeholder,
  options,
  showDropdown,
  handleShowDropdown
}) => {


  return (
    <>
      <div className="mb-4">
        <label htmlFor="" className="font-semibold mb-2">{label}</label>
        <input
          className="w-full border-b p-2"
          type="text"
          id={id}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleShowDropdown}
        />

        {/* <div className="lg:max-w-2xl max-w-sm">
          <select className=" overflow-hidden w-full truncate" name="" id="" onChange={(e) => handleChangeProduct(e.target.value)}>
            <option className="w-24 truncate" value='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, aspernatur.'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, aspernatur.</option>
            <option className="w-24 truncate" value="barang 2">Barang 2</option>
            <option className="w-24 truncate" value="barang 3">Barang 3</option>
            <option className="w-24 truncate" value="barang 4">Barang 4</option>
          </select>
        </div> */}

        <div className={`relative ${showDropdown ? 'visible' : 'invisible'}`}>
          <div className="mx-auto max-h-48 p-4 w-full absolute max-w-screen-sm overflow-auto rounded-lg border bg-white shadow-sm lg:block">
            <div className="divide-y divide-slate-200">
              {options.map((option) => (
                <p onClick={() => handleChangeProduct(option.kode)} className="cursor-pointer" key={option.kode}>{option.produk}</p>
              ))}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default DropdownInput;