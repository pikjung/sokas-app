import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "../utils/getToken";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/admin/roles`, {
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

export const handleChange = (event: any, setFormData: any) => {
  setFormData({
    id: "",
    name: event.target.value,
  });
};

export const buttonHandler = (
  setFormData: any,
  setFormMethod: any,
  setHeader: any
) => {
  setFormData({
    id: "",
    name: "",
  });
  setFormMethod("create");
  setHeader("Tambah Role");
  const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null;
  if (formModal) {
    formModal.showModal();
  }
};

export const formHandler = async (
  event: any,
  formMethod: string,
  formData: any,
  id: string,
) => {
  event.preventDefault();
  if (formMethod === "create") {
    try {
      const data = {
        name: formData.name,
      };
      const url = `${apiUrl}/admin/roles`;
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        }
      });
      const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null;
      if (formModal) {
        formModal.close();
      }
      return {
        success: true,
        data: response.data
      };
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
  } else if (formMethod === "update") {
    try {
      const data = {
        name: formData.name,
      };
      const url = `${apiUrl}/admin/roles/${id}`;
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null;
      if (formModal) {
        formModal.close();
      }
      fetchData();
      return {
        success: true,
        data: response.data
      };
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
};

export const deleteRole = async (id: string) => {
  try {
    const url = `${apiUrl}/admin/roles/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const formModal = <HTMLElement>document.getElementById("deleteModal") as HTMLDialogElement | null;
    if (formModal) {
      formModal.close();
    }

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

export const editHandler = (
  item: any,
  setFormData: any,
  setId: any,
  setFormMethod: any,
  setHeader: any
) => {
  setFormData({
    id: item.id,
    name: item.name,
  });
  setId(item.id);
  setFormMethod("update");
  const formModal = document.getElementById("formModal") as HTMLDialogElement | null;
  setHeader("Edit Role");
  if (formModal) {
    formModal.showModal();
  }
};

export const deleteHandler = (item: any, setFormData: any, setId: any) => {
  setFormData({
    id: item.id,
    name: item.name,
  });
  setId(item.id);
  const deleteModal = document.getElementById("deleteModal") as HTMLDialogElement | null;
  if (deleteModal) {
    deleteModal.showModal();
  }
};
