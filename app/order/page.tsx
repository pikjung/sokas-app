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

  const [brandProducts, setBrandProducts] = useState('');
  const [options, setOptions] = useState([]);
  const [produk, setProduk] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  function handleBrandChanges(value: any) {
    setOptions([])
    setBrandProducts(value)
  }

  function handleProductChange(searchParams: string) {
    const filteredProducts = products.filter(product =>
      product.produk.toString().toLowerCase().includes(searchParams.toLowerCase()) &&
      product.brand.toLowerCase().includes(brandProducts.toLowerCase())
    )
    setOptions(filteredProducts)
  }

  function handleChangeProduct(selectParam: string) {
    const product = products.filter(p => p.kode.includes(selectParam))
    setProduk([...produk, product[0]])
    setShowDropdown(!showDropdown)
  }

  function handleShowDropdown() {
    setShowDropdown(!showDropdown)
  }

  return (
    <Container flex={false} wrap={false}>
      <div className="text-2xl mb-2">Form Sales Order KAS</div>
      <div className="mb-8 text-slate-400 font-light text-sm">Isi form sesuai dengan produk yang akan anda beli</div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4">
        <div className="w-full border rounded-lg p-5">
          <h2 className="font-bold mb-4">Buat Order</h2>
          <div className="grid grid-cols-1 gap-4">
            <Select id="brand" label="Pilih Brand" handleChange={handleBrandChanges} >
              {data.map((item) => (
                <option key={item.value} value={item.value}>{item.name}</option>
              ))}
            </Select>
            <DropdownInput
              id="product"
              showDropdown={showDropdown}
              handleShowDropdown={handleShowDropdown}
              options={options}
              label="Pilih Produk"
              handleChangeProduct={handleChangeProduct}
              handleChange={handleProductChange}
              placeholder="TL-D 36W"
            />
            {produk.map((item) => (
              <MultipleInput key={item.kode} produk={item.produk} />
            ))}

            <div className="mt-5 border-t p-4">
              <button className="float-right rounded-sm bg-indigo-500 p-2 text-white hover:bg-indigo-600">Tambah ke troli</button>
            </div>
          </div>
        </div>

        <div className="w-full border rounded-lg p-5">
          <h2 className="font-bold mb-4">Order paket bundling</h2>

        </div>
      </div>

      <div className="mt-4"></div>
    </Container>
  );
}

export default Home;