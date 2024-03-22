import apiUrl from "@/app/config";
import formSubmit from "../utils/formSubmit";

export const fetchData = async (setData: any) => {
  try {
    const response = await fetch(`${apiUrl}/admin/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const resposeData = await response.json();
    setData(resposeData);
  } catch (err) {
    console.log(err);
  }
};

export const rolefetchData = async (setRoleData: any) => {
  try {
    const response = await fetch(`${apiUrl}/admin/roles`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const resposeData = await response.json();
    setRoleData(resposeData);
  } catch (err) {
    console.log(err);
  }
};

export const buttonHandler = (setFormData: any, setHeader: any) => {
  setFormData({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    role: 1,
  });
  const formModal = <HTMLElement>document.getElementById("formModal");
  setHeader("Tambah Akun");
  formModal.showModal();
};

export const formHandler = () => { };

export const handleChange = (event: any, setFormData: any) => {
  setFormData({
    id: "",
    name: event.target.value,
  });
};

export const editHandler = (setFormData: any, setHeader: any) => {
  setFormData({
    fullName: "Fikri",
    email: "fikri@gmail.com",
    userName: "Fikri123",
    password: "",
    role: 1,
  });
  const formModal = <HTMLElement>document.getElementById("formModal");
  setHeader("Edit Akun");
  formModal.showModal();
};

export const deleteHandler = () => {
  const formModal = <HTMLElement>document.getElementById("formModal");
  deleteModal.showModal();
};
