import { IconType } from "react-icons";

interface TextInputProps {
  label: string;
  icon: IconType;
  placeholder: string;
  password?: boolean;
  value?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  icon: Icon,
  placeholder,
  password,
  value,
}) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-lg font-semibold text-slate-600">
          {label}
        </span>
      </div>
      <label className="input input-bordered flex items-center gap-2">
        <Icon />
        {password ? (
          <input type="password" className="grow" placeholder={placeholder} />
        ) : (
          <input
            type="text"
            className="grow"
            placeholder={placeholder}
            value={value}
          />
        )}
      </label>
    </label>
  );
};

export default TextInput;
