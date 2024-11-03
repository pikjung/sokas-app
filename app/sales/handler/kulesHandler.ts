import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "@/app/utils/getToken";

const token = getToken()

export const getToko = async (setTokos: any, setTokosFilter: any) => {
  try {
    const response = await axios.get(`${apiUrl}/sales/order/toko`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setTokos(response.data.data)
    setTokosFilter(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const addKules = async (data: any) => {
  try {
    const response = await axios.post(`${apiUrl}/sales/kules`, data, {
      headers: {
        Authorization: `Bearer ${token}`
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

export const historyKules = async (setKules: any) => {
  try {
    const response = await axios.get(`${apiUrl}/sales/kules/history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setKules(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const showModal = (idName: string) => {
  const formModal = <HTMLElement>document.getElementById(idName) as HTMLDialogElement | null;
  if (formModal) {
    formModal.showModal();
  }
}
