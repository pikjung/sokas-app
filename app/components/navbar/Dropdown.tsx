import { SlArrowDown } from 'react-icons/sl'

interface DropdownProps {
  menuName: string,
  showDropdown: boolean,
  handleClick: () => void
}

const Dropdown: React.FC<DropdownProps> = ({ menuName, showDropdown, handleClick }) => {
  return (
    <>
      <a href="#" className="inline-flex items-center gap-1 text-lg font-semibold text-gray-600">
        {menuName}

        <SlArrowDown className="ml-2" style={{ stroke: "black", strokeWidth: 70 }} size={10} onClick={handleClick} />

      </a>
    </>
  );
}

export default Dropdown;