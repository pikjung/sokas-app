import { IconType } from "react-icons";

interface ButtonProps {
  name: string;
  buttonHandler?: () => void;
  icon: IconType;
  type?: string;
  customClass?: string;
}

const colorType = [
  {
    type: "primary",
    css: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    type: "success",
    css: "bg-green-600 hover:bg-green-700",
  },
  {
    type: "info",
    css: "bg-teal-600 hover:bg-teal-700",
  },
  {
    type: "danger",
    css: "bg-red-600 hover:bg-red-700",
  },
  {
    type: "warning",
    css: "bg-yellow-600 hover:bg-yellow-700",
  },
];

const Button: React.FC<ButtonProps> = ({
  name,
  buttonHandler,
  icon: Icon,
  type,
  customClass,
}) => {
  const color = colorType.find((color) => color.type === (type || "primary"));

  return (
    <button
      className={` ${
        customClass ? customClass : ""
      } rounded-xl gap-2 my-auto flex px-4 p-2 text-white ${
        color ? color.css : ""
      }`}
      onClick={buttonHandler}
    >
      <Icon className="my-auto" size={20} />
      {name}
    </button>
  );
};

export default Button;
