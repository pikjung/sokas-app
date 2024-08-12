'use client'

import { useEffect, useState } from "react";
import Container from "../components/Container";
import Card from "../components/Card";
import MultipleInput from "../components/inputs/MultipleInput";
import HeaderPage from "../components/HeaderPage";

import { getKeranjang, updateKeranjang, updateDiscount, deleteKeranjang, checkOutKeranjang } from "../handler/keranjangHandler";

import { useNotification } from "@/app/context/NotificationContext";
import useSalesAuth from "@/app/hooks/salesUseAuth";
import useFetchData from "@/app/admin/hooks/useFetchData";

interface Store {
  id: string;
  name: string
}

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
  Store: Store;
  productId: string;
  qty: number;
  created_at: string;
  updated_at: string | null;
  Product: Product;
}

const Home = () => {

  const { setAlert, setToast, showNotification } = useNotification();
  const { authenticate } = useSalesAuth();
  const [keranjang, setKeranjang] = useState<Item[]>([]);
  const [groupedKeranjang, setGroupedKeranjang] = useState<Record<string, {
    storeId: string;
    storeName: string;
    brands: Record<string, {
      brandId: string;
      brandName: string;
      color: string;
      items: Item[];
      salesNote: string;
    }>
  }>>({});

  const handleSalesNoteChange = (storeId: string, brandId: string, value: string) => {
    setGroupedKeranjang(prevState => {
      const updatedState = { ...prevState };
      updatedState[storeId].brands[brandId].salesNote = value;
      return updatedState;
    });
  };

  const handleDelete = (id: string) => {
    const updateKeranjang = keranjang.filter(item => item.id !== id);
    setKeranjang(updateKeranjang);
    deleteKeranjang(id);
  };

  const handleQuantityChange = (id: string, qty: number) => {
    updateKeranjang(id, qty);
  };

  const handleDiscountChange = (id: string, discount: string) => {
    updateDiscount(id, discount);
  };

  const checkOut = async () => {
    if (keranjang.length === 0) {
      setAlert({
        status: "Success",
        message: "Keranjang anda kosong"
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      return false;
    }
    const checkOutCart: any = await checkOutKeranjang(groupedKeranjang);
    if (checkOutCart) {
      if (checkOutCart.status === "success") {
        setKeranjang([]);

        setAlert({
          status: "Success",
          message: "Produk berhasil di checkout"
        });
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
    } else {
      setAlert({
        status: "Success",
        message: "Ada error yang tidak diketahui"
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      return false;
    }
  };

  useEffect(() => {
    authenticate();
    getKeranjang(setKeranjang);
  }, [authenticate]);

  useEffect(() => {
    const initialGroupedKeranjang = keranjang.reduce((acc, item) => {
      const storeId = item.storeId;
      const storeName = item.Store.name;
      const brandId = item.Product.Brand.id;

      if (!acc[storeId]) {
        acc[storeId] = {
          storeId: storeId,
          storeName: storeName,
          brands: {}
        };
      }

      if (!acc[storeId].brands[brandId]) {
        acc[storeId].brands[brandId] = {
          brandId: brandId,
          brandName: item.Product.Brand.name,
          color: item.Product.Brand.color,
          items: [],
          salesNote: '' // Menambahkan properti salesNote
        };
      }

      acc[storeId].brands[brandId].items.push(item);
      return acc;
    }, {} as Record<string, {
      storeId: string;
      storeName: string;
      brands: Record<string, {
        brandId: string;
        brandName: string;
        color: string;
        items: Item[];
        salesNote: string; // Menambahkan tipe salesNote
      }>
    }>);

    setGroupedKeranjang(initialGroupedKeranjang);
  }, [keranjang]);

  return (
    <Container flex={false} wrap={false}>
      <HeaderPage title="Keranjang">
        Lihat kembali produk anda sebelum check out
      </HeaderPage>

      <div className="flex flex-wrap lg:w-4/6 gap-4">
        <Card header="Daftar keranjang">
          {Object.keys(groupedKeranjang).map(storeId => (
            <div key={storeId}>
              <h1 className="font-bold text-lg mb-4">{groupedKeranjang[storeId].storeName}</h1>
              {Object.keys(groupedKeranjang[storeId].brands).map(brandId => (
                <div key={brandId}>
                  <h2 className={`text-${groupedKeranjang[storeId].brands[brandId].color} font-bold mb-2 border-b-2`}>
                    {groupedKeranjang[storeId].brands[brandId].brandName}
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {groupedKeranjang[storeId].brands[brandId].items.map(item => (
                      <MultipleInput
                        key={item.id}
                        handleDelete={handleDelete}
                        produk={item}
                        handleQuantityChange={handleQuantityChange}
                        handleDiscountChange={handleDiscountChange}
                      />
                    ))}
                  </div>
                  <div className="mt-2 mb-4">
                    <label htmlFor="">Sales Note</label>
                    <textarea name="" id="" className="w-full border"
                      value={groupedKeranjang[storeId].brands[brandId].salesNote}
                      onChange={(e) => handleSalesNoteChange(storeId, brandId, e.target.value)}
                    ></textarea>
                  </div>
                </div>
              ))}
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