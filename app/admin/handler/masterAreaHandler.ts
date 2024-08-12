export const buttonHandler = (setFormData: any, setHeader: any, setFormMethod: any) => {
  setFormData({
    name: "",
    spvId: 1,
  })
  setFormMethod("create")
  setHeader("Tambah Akun");;
  const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null
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
    spvId: item.spv_id
  })
  setId(item.id)
  setFormMethod("update")
  setHeader("Edit Akun");
  const formModal = <HTMLElement>document.getElementById("formModal") as HTMLDialogElement | null
  if (formModal) {
    formModal.showModal();
  }
}

export const deleteHandler = (item: any, setId: any) => {
  const deleteModal = document.getElementById("deleteModal") as HTMLDialogElement | null;
  setId(item.id)
  if (deleteModal) {
    deleteModal.showModal();
  }
}

export const deleteMasterArea = async (deleteData: any, fetchMasterData: any) => {
  await deleteData();
  const deleteModal = document.getElementById("deleteModal") as HTMLDialogElement | null;
  if (deleteModal) {
    deleteModal.close();
  }
  fetchMasterData()
};

export const handlePostData = async (
  e: any,
  formMethod: string,
  postData: any,
  putData: any,
  formData: any,
  fetchMasterData: any
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
  fetchMasterData()
} 