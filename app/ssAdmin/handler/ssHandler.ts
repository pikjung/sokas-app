import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "../utils/getToken";
import Head from "next/head";

export const getTransaksiBySS = async (setTransaksi: any) => {
  try {
    const response = await axios.get(`${apiUrl}/ssAdmin/transaksi`, {
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
  setProduct: any,
  id: string,
  brandId: string
) => {
  try {
    const response = await axios.get(`${apiUrl}/ssAdmin/transaksi/${id}/${brandId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    setDetailTransaction(response.data.data.detail)
    setProduct(response.data.data.product)
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

export const cancelTransaksi = async (id: string) => {
  try {
    const response = await axios.post(`${apiUrl}/ssAdmin/transaksi/cancel`, {
      id: id
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
    )
    const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null;
    if (formModal) {
      formModal.close();
    }
    return response.data
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

export const confirmTransaksi = async (id: string, data: any, noted: string) => {
  try {
    const response = await axios.post(`${apiUrl}/ssAdmin/transaksi/confirm`, {
      id: id,
      data: data,
      noted: noted
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
    )
    const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null;
    if (formModal) {
      formModal.close();
    }
    return response.data
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

export const transaksiConfirm = async (formConfirm: any) => {
  try {
    const response = await axios.post(`${apiUrl}/ssAdmin/transaksi`, formConfirm, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data.data
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