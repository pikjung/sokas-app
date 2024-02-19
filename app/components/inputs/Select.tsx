import { ReactNode } from "react";

interface SelectProps {
  label: string;
  id: string;
  handleChange: (value: string) => void;
  children: React.ReactNode;

}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  handleChange,
  children,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="" className="font-semibold mb-2">{label}</label>
      <select id={id} className="w-full border-b p-2" name="" onChange={(e) => handleChange(e.target.value)}>
        {children}
      </select>
    </div>
  );
}

export default Select;