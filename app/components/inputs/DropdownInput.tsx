'use client'

import { ReactNode, useState } from "react";

interface DropdownInputProps {
  label: string;
  id: string;
  handleChange: (value: string) => void;
  placeholder: string;
  options?: [];
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  id,
  handleChange,
  placeholder,
  options
}) => {

  const [showDropdown, setShowDropdown] = useState(false);

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
          onFocus={() => setShowDropdown(!showDropdown)}
          onBlur={() => setShowDropdown(!showDropdown)}
        />
        <div className={`relative ${showDropdown ? 'visible' : 'invisible'}`}>
          <div className="mx-auto z-20 p-4 w-full absolute hidden max-w-screen-sm overflow-hidden rounded-lg border bg-white shadow-sm lg:block">
            {options}
          </div>
        </div>
      </div>
    </>
  );
}

export default DropdownInput;