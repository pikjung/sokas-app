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