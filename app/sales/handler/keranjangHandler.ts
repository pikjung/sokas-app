import apiUrl from "../../config";
import axios from "axios";
import { getToken } from "../../admin/utils/getToken";

export const getKeranjang = async (setKeranjang: any) => {
  try {
    const response = await axios.get(`${apiUrl}/sales/cart`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    setKeranjang(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const updateKeranjang = async (cartId: string, qty: number) => {
  try {
    const response = await axios.put(`${apiUrl}/sales/cart`, { cartId: cartId, qty: qty }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const updateDiscount = async (cartId: string, discount: string) => {
  try {
    const response = await axios.put(`${apiUrl}/sales/cart/discount`, { cartId: cartId, discount: discount }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const deleteKeranjang = async (cartId: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/sales/cart/${cartId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const checkOutKeranjang = async (groupedKeranjang: any) => {
  try {
    const response = await axios.post(`${apiUrl}/sales/cart`, groupedKeranjang, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}