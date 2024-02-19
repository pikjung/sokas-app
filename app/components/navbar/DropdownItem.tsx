

const DropdownItem = ({ brand }) => {
  return (
    <a href="#" className="group flex gap-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-${brand.color}-500 text-white shadow-lg transition duration-100 group-hover:bg-indigo-600 group-active:bg-indigo-700 md:h-12 md:w-12`}>
        {brand.icon}
      </div>

      <div>
        <div className="mb-1 font-semibold">{brand.name}</div>
        <p className="text-sm text-gray-500">{brand.description}</p>
      </div>
    </a>
  );
}

export default DropdownItem;