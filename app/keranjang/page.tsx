'use client'

import { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import Card from "../components/Card";
import MultipleInput from "../components/inputs/MultipleInput";
import HeaderPage from "../components/HeaderPage";
import Toast from "../admin/components/Toast";

import { getKeranjang, updateKeranjang, deleteKeranjang, checkOutKeranjang } from "../handler/keranjangHandler";

import { getToken } from "../utils/getToken";
import { useRouter } from "next/navigation";
import { verifyToken } from "../handler/authHandler";

interface Brand {
  id: string;
  name: string;
  color: string;
  value: string;
  created_at: string;
  updated_at: string | null;
}

interface Product {
  id: string;
  name: string;
  value: string;
  brandId: string;
  created_at: string;
  updated_at: string | null;
  Brand: Brand;
}

interface Item {
  id: string;
  storeId: string;
  productId: string;
  qty: number;
  created_at: string;
  updated_at: string | null;
  Product: Product;
}

const Home = () => {

  const router = useRouter()

  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })
  const [keranjang, setKeranjang] = useState<Item[]>([]);

  const authenticate = useCallback(async () => {
    if (!getToken()) {
      router.push('/login');
      return null
    }
    const authorization = await verifyToken(getToken());

    if (authorization.success === false) {
      setAlert({
        status: "warning",
        message: "You are not authorized"
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      router.push('/login');
    }
  }, [router])

  const groupedKeranjang = keranjang.reduce((acc, item) => {
    const brandId = item.Product.Brand.id;
    if (!acc[brandId]) {
      acc[brandId] = {
        brandId: item.Product.Brand.id,
        brandName: item.Product.Brand.name,
        color: item.Product.Brand.color,
        items: []
      };
    }
    acc[brandId].items.push(item);
    return acc;
  }, {} as Record<string, { brandId: string, brandName: string, color: string, items: Item[] }>);

  const handleDelete = (id: string) => {
    deleteKeranjang(id)
    window.location.reload()
  }

  const handleQuantityChange = (id: string, qty: number) => {
    updateKeranjang(id, qty)
  }

  const checkOut = async () => {
    const checkOutCart: any = await checkOutKeranjang(groupedKeranjang)
    if (checkOutCart.status === "success") {
      setKeranjang([])

      setAlert({
        status: "Success",
        message: "Produk berhasil di checkout"
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
    }
  }

  useEffect(() => {
    getKeranjang(setKeranjang)
    authenticate();
  }, [authenticate]);

  return (
    <Container flex={false} wrap={false}>
      {toast && (
        <Toast status={alert.status} message={alert.message} />
      )}
      <HeaderPage title="Keranjang">
        Lihat kembali produk anda sebelum check out
      </HeaderPage>

      <div className="flex flex-wrap lg:w-4/6 gap-4">
        <Card header="Daftar keranjang">
          {Object.keys(groupedKeranjang).map(brandId => (
            <div key={brandId}>
              <h2 className={`text-${groupedKeranjang[brandId].color} font-bold mb-2 border-b-2`}>{groupedKeranjang[brandId].brandName}</h2>
              <div className="grid grid-cols-1 gap-4">
                {groupedKeranjang[brandId].items.map(item => (
                  <MultipleInput key={item.id} handleDelete={handleDelete} produk={item} handleQuantityChange={handleQuantityChange} />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-5 border-t p-4">
            <button
              className="
                float-right 
                rounded-sm 
                bg-indigo-500 
                p-2 
                text-white 
                hover:bg-indigo-600
                "
              onClick={checkOut}
            >Check Out</button>
          </div>
        </Card>
      </div>

      <div className="mt-4"></div>
    </Container>
  );
}

export default Home;