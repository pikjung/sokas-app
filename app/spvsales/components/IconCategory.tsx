import { IconType } from "react-icons";

interface IconCategoryProps {
  icon: IconType
}

const IconCategory: React.FC<IconCategoryProps> = ({ icon: Icon }) => {
  return (
    <Icon size={25} />
  );
}

export default IconCategory;