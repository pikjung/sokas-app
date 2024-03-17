import { IconType } from "react-icons";

interface SelectInputProps {
  label: string;
  data?: [];
}

const SelectInput: React.FC<SelectInputProps> = ({ label }) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-lg font-semibold text-slate-600">
          {label}
        </span>
      </div>
      <select className="select select-bordered">
        <option>Star Wars</option>
        <option>Harry Potter</option>
        <option>Lord of the Rings</option>
        <option>Planet of the Apes</option>
        <option>Star Trek</option>
      </select>
    </label>
  );
};

export default SelectInput;
