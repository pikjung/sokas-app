import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "../utils/getToken";


export const fetchData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/brand`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return {
      success: true,
      data: response.data.data
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return {
        success: false,
        data: error.response.data
      }
    } else {
      console.error('Error', error)
    }
  }
}

export const buttonHandler = (setFormData: any, setHeader: any, setFormMethod: any) => {
  setFormData({
    name: "",
    color: "",
    value: ""
  })
  setFormMethod("create")
  const formModal = <HTMLElement>document.getElementById("formModal");
  setHeader("Tambah Akun");;
  formModal.showModal();
}

export const formHandler = async (
  e: any,
  formMethod: any,
  formData: any,
  id: string
) => {
  e.preventDefault();
  if (formMethod === "create") {
    try {
      const data = {
        name: formData.name,
        color: formData.color,
        value: formData.value
      }
      const url = `${apiUrl}/admin/brand`
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      const formModal = <HTMLElement>document.getElementById("formModal")
      formModal.close()
      return {
        success: true,
        data: response.data
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

  if (formMethod === "update") {
    try {
      const data = {
        name: formData.name,
        color: formData.color,
        value: formData.value
      }
      const url = `${apiUrl}/admin/brand/${id}`
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      const formModal = <HTMLElement>document.getElementById("formModal")
      formModal.close()
      return {
        success: true,
        data: response.data
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
}

export const editHandler = (
  item: any,
  setFormData: any,
  setId: any,
  setFormMethod: any,
  setHeader: any
) => {
  setFormData({
    name: item.name,
    color: item.color,
    value: item.value
  })
  setId(item.id)
  setFormMethod("update")
  const formModal = <HTMLElement>document.getElementById("formModal");
  setHeader("Edit Akun");
  formModal.showModal();
}

export const deleteHandler = (item: any, setFormData: any, setId: any) => {
  setFormData({
    id: item.id,
    name: item.name,
  })
  setId(item.id)
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.showModal();
}

export const deleteArea = async (id: string) => {
  try {
    const url = `${apiUrl}/admin/brand/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const formModal = <HTMLElement>document.getElementById("deleteModal");
    formModal.close();

    fetchData();
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Jika itu error 401, ambil pesan error dari respons
      // console.error('Error:', error);
      return {
        success: false,
        data: error.response.data
      }
    } else {
      // Tangani kesalahan lainnya
      console.error('Error:', error);
    }
  }
};