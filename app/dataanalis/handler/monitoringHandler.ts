import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "../utils/getToken";


export const modalHandler = () => {
  const formModal = <HTMLElement>document.getElementById("modalRDI") as HTMLDialogElement | null;
  if (formModal) {
    formModal.showModal();
  }
}

export const closeModal = () => {
  const formModal = <HTMLElement>document.getElementById("modalRDI") as HTMLDialogElement | null;
  if (formModal) {
    formModal.close();
  }
}

export const modalDelete = () => {
  const formModal = <HTMLElement>document.getElementById("modalDelete") as HTMLDialogElement | null;
  if (formModal) {
    formModal.showModal();
  }
}

export const closeDeleteModal = () => {
  const formModal = <HTMLElement>document.getElementById("modalDelete") as HTMLDialogElement | null;
  if (formModal) {
    formModal.close();
  }
}

export const showCalculateModal = () => {
  const formModal = <HTMLElement>document.getElementById("calculateModal") as HTMLDialogElement | null;
  if (formModal) {
    formModal.show();
  }
}

export const closeCalculateModal = () => {
  const formModal = <HTMLElement>document.getElementById("calculateModal") as HTMLDialogElement | null;
  if (formModal) {
    formModal.close();
  }
}

export const saveMonitoring = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/dataanalis/monitoring/save/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}


export const getMonitoring = async (setFileData: any) => {
  try {
    const response = await axios.get(`${apiUrl}/dataanalis/monitoring`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    setFileData(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.log(error)
    }
  }
}

export const inputAllBp = async (formData: any) => {
  try {
    const response = await axios.post(`${apiUrl}/dataanalis/monitoring/inputAllBp`, { formData: formData }, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const getAddress = async (setAddress: any) => {
  try {
    const response = await axios.get(`${apiUrl}/dataanalis/monitoring/address`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    setAddress(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const deleteFileMonitoring = async (id: any) => {
  try {
    const response = await axios.delete(`${apiUrl}/dataanalis/monitoring/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const uploadMonitoring = async (file: any, name: string): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    const url = `${apiUrl}/dataanalis/monitoring/upload`;
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        // headers: { "Content-Type": "multipart/form-data" },
      },
    });
    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const calculateMonitoring = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/dataanalis/monitoring/calculate/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const reporting = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/dataanalis/monitoring/reporting/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    return {
      success: true,
      data: response.data
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}