import apiUrl from "../config"
import axios from "axios"
import { getToken } from "../utils/getToken"

export const getBrand = async (setBrand: any, setProduct: any) => {
  try {
    const response = await axios.get(`${apiUrl}/order/brand`, {
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
    const response = await axios.get(`${apiUrl}/order/product/${brandId}`, {
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

export const addProductToCart = async (cart: any) => {
  try {
    const response = await axios.post(`${apiUrl}/order/cart`, cart, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
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