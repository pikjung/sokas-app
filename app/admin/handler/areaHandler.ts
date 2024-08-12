import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "../utils/getToken";

export const buttonHandler = (setFormData: any, setHeader: any, setFormMethod: any) => {
  setFormData({
    name: "",
    masterAreaId: "",
    sales_id: "",
    sales_support_id: "",
  })
  setFormMethod("create")
  const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null
  setHeader("Tambah Akun");;
  if (formModal) {
    formModal.showModal();
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
    masterAreaId: item.masterAreaId,
    sales_id: item.sales_id,
    sales_support_id: item.sales_support_id
  })
  setId(item.id)
  setFormMethod("update")
  const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null
  setHeader("Edit Akun");
  if (formModal) {
    formModal.showModal();
  }
}

export const deleteHandler = (item: any, setId: any) => {
  setId(item.id)
  const deleteModal = document.getElementById("deleteModal") as HTMLDialogElement | null;
  if (deleteModal) {
    deleteModal.showModal();
  }
}

export const deleteArea = async (id: string, deleteData: any, fetchData: any) => {
  await deleteData(id);
  const deleteModal = document.getElementById("deleteModal") as HTMLDialogElement | null;
  if (deleteModal) {
    deleteModal.close();
  }
  fetchData()
};

export const handlePostData = async (
  e: any,
  formData: any,
  postData: any,
  putData: any,
  formMethod: string,
  fetchData: any
) => {
  e.preventDefault();
  if (formMethod === 'create') {
    await postData(formData)
  }
  if (formMethod === 'update') {
    await putData(formData)
  }
  const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null
  if (formModal) {
    formModal.close()
  }
  fetchData()
}