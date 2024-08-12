import apiUrl from "../../config";
import axios from "axios";
import { getToken } from "../../utils/getToken";

export const getTransaksi = async (setTransaksi: any) => {
  try {
    const response = await axios.get(`${apiUrl}/sales/transaksi`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    setTransaksi(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const getFilteredTransaksi = async (setTransaksi: any, value: any) => {
  try {
    const response = await axios.get(`${apiUrl}/sales/transaksi?startDate=${value[0]}&endDate=${value[1]}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    setTransaksi(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}