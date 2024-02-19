'use client'

import { ReactNode, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface MultipleInputProps {
    produk: string;
}

const MultipleInput: React.FC<MultipleInputProps> = ({
    produk
}) => {

    const [number, setNumber] = useState(0);

    function minButton() {
        number > 0 ? setNumber(number-1) : setNumber(number)
    }

    function plusButton() {
        setNumber(number+1)
    }

    return (
        <div className="flex gap-1 content-between items-center text-sm">
            <div className="truncate w-96 lg:w-full">{produk}</div>
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
            <div className="mx-auto lg:w-24"><button className=" hover:text-rose-600 p-2 text-rose-500 rounded-md"><FaTrash /></button></div>
        </div>
    )
}

export default MultipleInput;