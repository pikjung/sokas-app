import formSubmit from "../utils/formSubmit";
import apiUrl from "@/app/config";

export const fetchData = async (setData: any) => {
  try {
    const response = await fetch(`${apiUrl}/admin/roles`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const resposeData = await response.json();
    setData(resposeData.data);
  } catch (err) {
    console.log(err);
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

  const formModal = <HTMLElement>document.getElementById("formModal");
  formModal.showModal();
};

export const formHandler = async (
  event: any,
  formMethod: string,
  formData: any,
  id: string,
  setData: any
) => {
  event.preventDefault();
  if (formMethod === "create") {
    try {
      const data = JSON.stringify({
        name: formData.name,
      });
      const url = `${apiUrl}/admin/roles`;
      const response = await formSubmit(url, "POST", data);
      const formModal = <HTMLElement>document.getElementById("formModal");
      formModal.close();
      fetchData(setData);
      return response;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  } else if (formMethod === "update") {
    try {
      const data = JSON.stringify({
        name: formData.name,
      });
      const url = `${apiUrl}/admin/roles/${id}`;
      const response = await formSubmit(url, "PUT", data);
      const formModal = <HTMLElement>document.getElementById("formModal");
      formModal.close();
      fetchData(setData);
      return response;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  }
};

export const deleteRole = async (id: string, setData: any) => {
  try {
    const url = `${apiUrl}/admin/roles/${id}`;
    const data = JSON.stringify({});
    const response = await formSubmit(url, "DELETE", data);
    const formModal = <HTMLElement>document.getElementById("deleteModal");
    formModal.close();

    fetchData(setData);
    return response;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
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
  const formModal = document.getElementById("formModal");
  setHeader("Edit Role");
  formModal.showModal();
};

export const deleteHandler = (item: any, setFormData: any, setId: any) => {
  setFormData({
    id: item.id,
    name: item.name,
  });
  setId(item.id);
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.showModal();
};
