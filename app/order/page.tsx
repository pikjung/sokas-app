'use client'

import { useState } from "react";
import Container from "../components/Container";
import DropdownInput from "../components/inputs/DropdownInput";
import Input from "../components/inputs/Input";
import Select from "../components/inputs/Select";
import { products } from "../components/products";

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
  const [options, setOptions] = useState([])

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

  return (
    <Container flex={false} wrap={false}>
      <div className="text-2xl mb-2">Form Sales Order KAS</div>
      <div className="mb-8 text-slate-400 font-light text-sm">Isi form sesuai dengan produk yang akan anda beli</div>

      <div className="w-full border rounded-lg p-4">
        <h2 className="font-bold mb-4">Buat Order</h2>
        <div className="grid grid-cols-2 gap-4">
          <Select id="brand" label="Pilih Brand" handleChange={handleBrandChanges} >
            {data.map((item) => (
              <option key={item.value} value={item.value}>{item.name}</option>
            ))}
          </Select>
          <DropdownInput id="product" options={options} label="Pilih Produk" handleChange={handleProductChange} placeholder="TL-D 36W" />
        </div>
      </div>
    </Container>
  );
}

export default Home;