'use client'

import { ReactNode, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface MultipleInputProps {
    produk: any;
    handleDelete: (value: string) => void;
    handleQuantityChange: (id: string, quantity: number) => void;
}

const MultipleInput: React.FC<MultipleInputProps> = ({
    produk,
    handleDelete,
    handleQuantityChange
}) => {

    const qty_produk = produk.qty ? produk.qty : 1
    const [number, setNumber] = useState(qty_produk);

    function minButton() {
        number > 1 ? setNumber(number - 1) : setNumber(number)
        number > 1 ? handleQuantityChange(produk.id, number - 1) : handleQuantityChange(produk.id, number)
    }

    function plusButton() {
        setNumber(number + 1)
        handleQuantityChange(produk.id, number + 1)
    }

    return (
        <div className="flex gap-1 content-between items-center text-sm">
            <div className="truncate w-96 lg:w-full">{produk.name ? produk.name : produk.Product.name}</div>
            <div className="join join-horizontal border">
                <button className="join-item w-10 p-2 text-indigo-500 font-bold" onClick={minButton}>-</button>
                <input
                    type="number"
                    className="
                        w-full
                        join-item
                        text-center
                        "
                    value={number}
                />
                <button className="join-item w-10 p-2 grow-0 text-indigo-500 font-bold" onClick={plusButton}>+</button>
            </div>
            <div className="mx-auto lg:w-24"><button onClick={() => handleDelete(produk.id)} className=" hover:text-rose-600 p-2 text-rose-500 rounded-md"><FaTrash /></button></div>
        </div>
    )
}

export default MultipleInput;