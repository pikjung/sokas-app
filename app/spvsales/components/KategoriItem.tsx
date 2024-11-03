import { IconType } from "react-icons";
import IconCategory from "./IconCategory";

interface KategoriItemProps {
  nama: string;
  icon: IconType;
  index: number;
}

const KategoriItem: React.FC<KategoriItemProps> = ({
  nama,
  icon,
  index
}) => {
  return (
    <div
      key={nama}
      id={`slide${index}`}
      className="
                  border 
                  shadow-sm 
                  h-auto 
                  p-2
                  rounded-lg
                  flex
                  flex-wrap
                "
    >
      <IconCategory icon={icon} />
      <p className="ml-2">{nama}</p>
    </div>
  );
}

export default KategoriItem;