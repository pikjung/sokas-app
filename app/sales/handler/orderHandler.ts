import apiUrl from "../../config"
import axios from "axios"
import { getToken } from "../../utils/getToken"

export const getBrand = async (setBrand: any, setProduct: any) => {
  try {
    const response = await axios.get(`${apiUrl}/sales/order/brand`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    setBrand(response.data.data)
    getProduct(setProduct, response.data.data[0].id)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const getProduct = async (setProduct: any, brandId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/sales/order/product/${brandId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    setProduct(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const addProductToCart = async (cart: any, storeId: string) => {
  try {
    const data = {
      cartData: cart,
      storeId: storeId
    }
    const response = await axios.post(`${apiUrl}/sales/order/cart`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
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

export const getToko = async () => {
  try {
    const response = await axios.get(`${apiUrl}/sales/order/toko`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return response.data.data
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}