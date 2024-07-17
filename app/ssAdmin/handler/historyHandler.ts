import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "../utils/getToken";

export const getHistoryBySS = async (setTransaksi: any) => {
  try {
    const response = await axios.get(`${apiUrl}/ssAdmin/history`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    setTransaksi(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Jika itu error 401, ambil pesan error dari respons
      return {
        success: false,
        data: error.response.data
      }
    } else {
      // Tangani kesalahan lainnya
      console.error('Error:', error);
    }
  }
}

export const getSpesificTransaksi = async (
  setDetailTransaction: any,
  id: string,
) => {
  try {
    const response = await axios.get(`${apiUrl}/ssAdmin/history/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    setDetailTransaction(response.data.data)
    const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null;
    if (formModal) {
      formModal.showModal();
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Jika itu error 401, ambil pesan error dari respons
      return {
        success: false,
        data: error.response.data
      }
    } else {
      // Tangani kesalahan lainnya
      console.error('Error:', error);
    }
  }
}