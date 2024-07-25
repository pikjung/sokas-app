'use client'

import { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import DropdownInput from "../components/inputs/DropdownInput";
import Card from "../components/Card";
import Select from "../components/inputs/Select";
import MultipleInput from "../components/inputs/MultipleInput";
import HeaderPage from "../components/HeaderPage";
import Toast from "../../admin/components/Toast";

import { addProductToCart, getBrand, getProduct, getToko } from "../handler/orderHandler";

import { getToken } from "../../admin/utils/getToken";
import { useRouter } from "next/navigation";
import { verifyToken } from "../handler/authHandler";

interface Product {
  id: string,
  name: string,
  value: string
}

interface Cart {
  id: string,
  name: string,
  value: string,
  quantity: number,
  discount: number
}

interface Brand {
  id: string,
  name: string,
}

interface Toko {
  id: string,
  name: string,
}


const Home = () => {

  const router = useRouter()

  const [product, setProduct] = useState<Product[]>([]);
  const [searchProduct, setSearchProduct] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);
  const [tokos, setTokos] = useState<Toko[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState(false)
  const [storeId, setStoreId] = useState("");
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })
  const [formStatus, setFormStatus] = useState({
    tokoStatus: false,
    cartStatus: false,
  })

  function handleBrandChanges(e: string) {
    setProduct([])
    getProduct(setProduct, e)
  }

  function handleStoreChanges(e: string) {
    setStoreId(e)
  }


  useEffect(() => {
    getBrand(setBrand, setProduct);
    getToko().then(data => {
      setTokos(data)
    })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleProductChange(searchParams: string) {
    const searchWords = searchParams.toLowerCase().split(' ');

    // Filter produk berdasarkan setiap kata dalam array searchWords
    const filteredProducts = product.filter(item =>
      searchWords.every(word => item.name.toString().toLowerCase().includes(word))
    );

    // Set hasil filter ke state product
    setSearchProduct(filteredProducts);
  }

  async function addCart() {
    if (storeId === "") {
      setFormStatus({
        tokoStatus: true,
        cartStatus: formStatus.cartStatus
      })
      setTimeout(() => {
        setFormStatus({
          tokoStatus: false,
          cartStatus: formStatus.cartStatus
        })
      }, 2000);
      return false
    };
    const add: any = await addProductToCart(cart, storeId);
    if (add) {
      if (add.status === "success") {
        setCart([]);
        setAlert({
          status: "Success",
          message: "Produk sudah di tambah ke troli"
        })
        setToast(true)
        setTimeout(() => {
          setToast(false)
        }, 2000);
      }
    } else {
      setFormStatus({
        tokoStatus: formStatus.tokoStatus,
        cartStatus: true
      })
      setTimeout(() => {
        setFormStatus({
          tokoStatus: formStatus.tokoStatus,
          cartStatus: false
        })
      }, 2000);
    }
  }

  function handleChangeProduct(selectParam: string) {
    const sproduct = product.filter(p => p.value.includes(selectParam))
    if (cart.filter(item => item.value === selectParam).length === 0) {
      const qproduct = { ...sproduct[0], quantity: 1, discount: 0 }
      setCart([...cart, qproduct])
    }
    setShowDropdown(!showDropdown)
  }

  function handleShowDropdown() {
    setShowDropdown(true);
  }

  function handleHideDropdown() {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  }

  function handleDelete(value: string) {
    setCart(cart.filter(item => item.id !== value))
  }

  const authenticate = useCallback(async () => {
    if (!getToken()) {
      router.push('/admin/login');
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

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: quantity } : item));
  };

  const handleDiscountChange = (id: string, discount: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, discount: discount } : item));
  };

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <Container flex={false} wrap={false}>
      {toast && (
        <Toast status={alert.status} message={alert.message} />
      )}
      <HeaderPage title="Form Sales Order KAS">
        Isi form sesuai dengan produk yang akan anda beli
      </HeaderPage>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4">
        <Card header="Buat Order">
          <div className="grid grid-cols-1 gap-4">
            <Select id="toko" label="Pilih Toko" status={formStatus.tokoStatus} handleChange={handleStoreChanges} >
              <option value="">-- Pilih Toko --</option>
              {tokos.map((toko) => (
                <option key={toko.id} value={toko.id}>{toko.name}</option>
              ))}
            </Select>
            <Select id="brand" label="Pilih Brand" handleChange={handleBrandChanges} >
              {brand.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Select>
            <DropdownInput
              id="product"
              showDropdown={showDropdown}
              handleShowDropdown={handleShowDropdown}
              options={searchProduct}
              label="Pilih Produk"
              handleChangeProduct={handleChangeProduct}
              handleChange={handleProductChange}
              handleHideDropdown={handleHideDropdown}
              placeholder="TL-D 36W"
            />
            <div className={`grid grid-cols-1 gap-4 w-full p-4 ${formStatus.cartStatus ? 'border border-red-600 text-red-600 animate-shake' : 'border-gray-300 text-gray-900'}`}>
              {formStatus.cartStatus ? 'Mohon input item' : ''}
              {cart.map((item) => (
                <MultipleInput
                  key={item.id}
                  handleDelete={handleDelete}
                  produk={item}
                  handleQuantityChange={handleQuantityChange}
                  handleDiscountChange={handleDiscountChange}
                />
              ))}
            </div>

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
                onClick={addCart}
              >Tambah ke troli</button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4"></div>
    </Container>
  );
}

export default Home;