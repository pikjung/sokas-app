'use client'

interface DropdownInput_tokoProps {
  label: string;
  id: string;
  handleChange: (value: string) => void;
  handleChangeToko: (value: string, name: string) => void;
  placeholder: string;
  options: any[];
  showDropdown: boolean;
  handleShowDropdown: () => void;
  handleHideDropdown: () => void;
}

const DropdownInput_toko: React.FC<DropdownInput_tokoProps> = ({
  label,
  id,
  handleChange,
  handleChangeToko,
  placeholder,
  options,
  showDropdown,
  handleShowDropdown,
  handleHideDropdown
}) => {


  return (
    <>
      <div className="mb-4 z-50">
        <label htmlFor="" className="font-semibold mb-2">{label}</label>
        <input
          className="w-full border-b p-2"
          type="text"
          id={id}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleShowDropdown}
          onBlur={handleHideDropdown}
        />

        <div className={`relative ${showDropdown ? 'visible' : 'invisible'}`}>
          <div className="mx-auto max-h-48 p-4 w-full absolute max-w-screen-sm overflow-auto rounded-lg border bg-white shadow-sm lg:block">
            <div className="divide-y divide-slate-200">
              {options.map((option) => (
                <p onClick={() => handleChangeToko && handleChangeToko(option.id, option.name)} className="cursor-pointer" key={option.id}>{option.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default DropdownInput_toko;