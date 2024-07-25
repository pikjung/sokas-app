'use client'

import { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import DropdownInput from "../components/inputs/DropdownInput";
import Card from "../components/Card";
import Select from "../components/inputs/Select";
import MultipleInput from "../components/inputs/MultipleInput";
import HeaderPage from "../components/HeaderPage";
import Toast from "../admin/components/Toast";

import { addProductToCart, getBrand, getProduct } from "../handler/orderHandler";

import { getToken } from "../utils/getToken";
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
  quantity: number
}

interface Brand {
  id: string,
  name: string,
}

const Home = () => {

  const router = useRouter()

  const [product, setProduct] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })
  const [formStatus, setFormStatus] = useState({
    cartStatus: false,
  })


  function handleBrandChanges(e: string) {
    setProduct([])
    getProduct(setProduct, e)
  }

  useEffect(() => {
    getBrand(setBrand, setProduct);
  }, []);

  function handleProductChange(searchParams: string) {
    const filteredProducts = product.filter(item =>
      item.name.toString().toLowerCase().includes(searchParams.toLowerCase())
    )
    setProduct(filteredProducts)
  }

  async function addCart() {
    const add: any = await addProductToCart(cart)
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
        cartStatus: true
      })
      setTimeout(() => {
        setFormStatus({
          cartStatus: false
        })
      }, 2000);
    }
  }

  function handleChangeProduct(selectParam: string) {
    const sproduct = product.filter(p => p.value.includes(selectParam))
    if (cart.filter(item => item.value === selectParam).length === 0) {
      const qproduct = { ...sproduct[0], quantity: 1 }
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

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: quantity } : item));
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
            <Select id="brand" label="Pilih Brand" handleChange={handleBrandChanges} >
              {brand.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Select>
            <DropdownInput
              id="product"
              showDropdown={showDropdown}
              handleShowDropdown={handleShowDropdown}
              handleHideDropdown={handleHideDropdown}
              options={product}
              label="Pilih Produk"
              handleChangeProduct={handleChangeProduct}
              handleChange={handleProductChange}
              placeholder="TL-D 36W"
            />
            <div className={`grid grid-cols-1 gap-4 w-full p-4 ${formStatus.cartStatus ? 'border border-red-600 text-red-600 animate-shake' : 'border-gray-300 text-gray-900'}`}>
              {formStatus.cartStatus ? 'Mohon input item' : ''}
              {cart.map((item) => (
                <MultipleInput key={item.id} handleDelete={handleDelete} produk={item} handleQuantityChange={handleQuantityChange} />
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