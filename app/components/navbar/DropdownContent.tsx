import DropdownItem from "./DropdownItem";
import { TbBulbFilled } from "react-icons/tb";
import { FaPlug } from "react-icons/fa";

const brand = [
  {
    name: "Order Barang Philips",
    description: "Berbagai macam macam lampu",
    icon: <TbBulbFilled />,
    color: 'indigo'
  },
  {
    name: "Order Barang Panasonic",
    description: "Berbagai macam macam Steker",
    icon: <FaPlug />,
    color: 'indigo'
  }
]

const DropdownContent = () => {
  return (
    <div className="mx-auto -mt-4 hidden w-full max-w-screen-sm overflow-hidden rounded-lg border bg-white shadow-sm lg:block">
      <div className="m-6 mb-10 grid grid-cols-2 gap-8">
        {brand.map((item) => (
          <DropdownItem key={item.name} brand={item} />
        ))}
      </div>

      {/* <!-- link - start --> */}
      <a href="#" className="block bg-gray-50 p-4 transition duration-100 hover:bg-gray-100 active:bg-gray-200">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="font-semibold leading-none">Enterprise solutions</span>
          <span className="mt-0.5 rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold leading-none text-indigo-800">New</span>
        </div>

        <p className="text-sm text-gray-500">This is a section of some simple filler text.</p>
      </a>
      {/* <!-- link - end --> */}
    </div>
  );
}

export default DropdownContent;