import { ReactNode } from "react";

interface SelectProps {
  label: string;
  id: string;
  handleChange: (value: string) => void;
  children: React.ReactNode;
  status?: boolean | false;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  handleChange,
  children,
  status
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="" className="font-semibold mb-2">{label}</label>
      <select
        id={id}
        className={`w-full border-b p-2 transition-colors duration-300 ease-in-out ${status ? 'border-red-600 text-red-600 animate-shake' : 'border-gray-300 text-gray-900'}`}
        name=""
        onChange={(e) => handleChange(e.target.value)}>
        {children}
      </select>
    </div >
  );
}

export default Select;