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
  setSalesNote: any,
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
    setSalesNote("")
    setSalesNote(response.data.data.transaction.salesNote)
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

export const getConnectedUsers = async (setUsers: any) => {
  try {
    const response = await axios.get(`${apiUrl}/connected-users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    setUsers(response.data.data)
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

export const pendingTransaksi = async (id: string, pendingNote: string) => {
  try {
    const response = await axios.post(`${apiUrl}/ssAdmin/transaksi/pending`, {
      id: id,
      pendingNote: pendingNote
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    const pendingModal = <HTMLElement>document.getElementById("pendingModal") as HTMLDialogElement | null;
    if (pendingModal) {
      pendingModal.close();
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

export const pendingModal = async () => {
  const pendingModal = <HTMLElement>document.getElementById("pendingModal") as HTMLDialogElement | null;
  const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null;
  if (pendingModal && formModal) {
    formModal.close();
    pendingModal.showModal();
  }
}

export const getTransaksiPendingSS = async (setTransaksi: any) => {
  try {
    const response = await axios.get(`${apiUrl}/ssAdmin/transaksi/pending`, {
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