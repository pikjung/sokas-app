import { IconType } from "react-icons";

interface SelectInputProps {
  label: string;
  data: [];
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  data,
  value,
  handleChange,
  name,
  required = false
}) => {

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-lg font-semibold text-slate-600">
          {label}
        </span>
      </div>
      <select name={name} value={value} className="select select-bordered" onChange={(e) => handleChange(e)} required={required}>
        <option value="">--Pilih--</option>
        {data &&
          data.map((item: any) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))
        }
      </select>
    </label>
  );
};

export default SelectInput;
