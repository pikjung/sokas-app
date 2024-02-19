'use client'

import { useState } from "react";
import Container from "../components/Container";
import DropdownInput from "../components/inputs/DropdownInput";
import Input from "../components/inputs/Input";
import Select from "../components/inputs/Select";
import { products } from "../components/products";
import MultipleInput from "../components/inputs/MultipleInput";

const data = [
  {
    value: "philips",
    name: "Philips",
  },
  {
    value: "panasonic",
    name: "Panasonic",
  },
  {
    value: "schneider",
    name: "Schneider",
  },
  {
    value: "supreme",
    name: "Supreme",
  },
]

const Home = () => {

  const [brandProducts, setBrandProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [produk, setProduk] = useState([]);

  function handleBrandChanges(value: any) {
    const filteredBrandProducts = products.filter(product =>
      product.brand.toLowerCase().includes(value.toLowerCase)
    )
    setBrandProducts(filteredBrandProducts)
  }

  function handleProductChange(searchParams: string) {
    const filteredProducts = products.filter(product =>
      product.produk.toString().toLowerCase().includes(searchParams.toLowerCase())
    )
    setOptions(filteredProducts)
  }

  function handleChangeProduct(selectParam: string) {
    setProduk([...produk, selectParam])
  }

  return (
    <Container flex={false} wrap={false}>
      <div className="text-2xl mb-2">Form Sales Order KAS</div>
      <div className="mb-8 text-slate-400 font-light text-sm">Isi form sesuai dengan produk yang akan anda beli</div>

      <div className="w-full border rounded-lg p-5">
        <h2 className="font-bold mb-4">Buat Order</h2>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <Select id="brand" label="Pilih Brand" handleChange={handleBrandChanges} >
            {data.map((item) => (
              <option key={item.value} value={item.value}>{item.name}</option>
            ))}
          </Select>
          <DropdownInput id="product" label="Pilih Produk" handleChangeProduct={handleChangeProduct} handleChange={handleProductChange} placeholder="TL-D 36W" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {produk.map((item) => (
              <MultipleInput key={item} produk={item}/>
            ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;