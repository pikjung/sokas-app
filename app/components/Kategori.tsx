import { IconType } from "react-icons";
import KategoriItem from "./KategoriItem";

interface KategoriProps {
  categories: {
    nama: string;
    icon: IconType
  }[]
}

const Kategori: React.FC<KategoriProps> = ({ categories }) => {
  return (
    <div className="mb-4">
      <div
        className="flex flex-nowrap mb-4"
      >
        <span className="text-md font-semibold text-slate-400"> philips</span>
        <a href="" className=" text-blue-600 place-self-start text-sm ml-2 hover:text-blue-700">Semua philips</a>
      </div>
      <div
        className="
              flex 
              flex-wrap
              gap-2
              overflow-x-hidden
              snap-x
              mt-2
            "
      >
        {categories.map((category, index) => (
          <KategoriItem key={index} nama={category.nama} icon={category.icon} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Kategori;