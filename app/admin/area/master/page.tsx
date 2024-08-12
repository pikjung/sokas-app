'use client'

// components
import Container from "../../components/Container"
import Navbar from "../../components/Navbar"
import Content from "../../components/Content"
import Table from "../../components/Table"
import Action from "../../components/Action"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import TextInput from "../../components/input/TextInput"
import SelectInput from "../../components/input/SelectInput"

import { useEffect, useState } from 'react'

import {
  buttonHandler,
  deleteHandler,
  editHandler,
  deleteMasterArea,
  handlePostData
} from '../../handler/masterAreaHandler'
import { IoCreateOutline, IoMapSharp } from "react-icons/io5"
import { FaRegEdit } from "react-icons/fa"
import { GoTrash } from "react-icons/go"
import { LiaPaperPlane } from "react-icons/lia"
import { useNotification } from "@/app/context/NotificationContext"
import { useFormContext } from "../../hooks/FormContext"
import useAdminAuth from "@/app/hooks/adminUseAuth"
import useFetchData from "../../hooks/useFetchData"
import usePostData from "../../hooks/usePostData"

export default function MasterArea() {
  const [id, setId] = useState("");
  const [header, setHeader] = useState("Tambah Area");
  const [formMethod, setFormMethod] = useState("create");
  const tableHeader = ['Area', 'PIC']


  const { authenticate } = useAdminAuth()
  const { showNotification } = useNotification()
  const { formData, setFormData } = useFormContext()
  const { data: masterData, fetchData: fetchMasterData } = useFetchData('/admin/masterarea', authenticate, showNotification)
  const { data: userData, fetchData: fetchUserData } = useFetchData('/admin/users', authenticate, showNotification)
  const { postData } = usePostData("/admin/masterarea", authenticate, showNotification)
  const { putData } = usePostData(`/admin/masterarea/${id}`, authenticate, showNotification)
  const { deleteData } = usePostData(`/admin/masterarea/${id}`, authenticate, showNotification)

  //handle formData
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const button = (
    <Action>
      <Button
        name="Tambah Master Area"
        buttonHandler={() => buttonHandler(setFormData, setHeader, setFormMethod)}
        icon={IoCreateOutline}
        type="primary"
      />
    </Action>
  );

  useEffect(() => {
    authenticate()
    fetchMasterData()
    fetchUserData()
  }, [authenticate, fetchMasterData, fetchUserData]);
  return (
    <Container>
      <Navbar />
      <Content header="Master Area" desc="Kelola Master Area Sales!" action={button}>
        <Table action={true} header={tableHeader} itemsPerPage={10}>
          {masterData &&
            masterData.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.spv?.name}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="border-0" onClick={() => editHandler(item, setFormData, setId, setFormMethod, setHeader)}>
                      <FaRegEdit size={20} />
                    </button>
                    <button
                      className="border-0"
                      onClick={() => deleteHandler(item, setId)}
                    >
                      <GoTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </Table>
      </Content>
      <Modal header={header} idName="formModal">
        <form onSubmit={(e) => handlePostData(e, formMethod, postData, putData, formData, fetchMasterData)}>
          <TextInput label="Master Area Name" icon={IoMapSharp}>
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="TR"
              value={formData.name}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <SelectInput label="SPV" name="spvId" data={userData} handleChange={handleChange} value={formData.spvId} />
          <button
            type="submit"
            className="rounded-xl float-right mt-6 gap-2 px-4 my-auto flex bg-indigo-600 p-2 text-white hover:bg-indigo-700"
          >
            Submit
            <LiaPaperPlane className="my-auto" size={20} />
          </button>
        </form>
      </Modal>
      <Modal header="Hapus Data" idName="deleteModal">
        <p className="mb-4">Data yang dipilih akan terhapus</p>
        <Button
          customClass="float-right"
          type="danger"
          name="Hapus"
          icon={GoTrash}
          buttonHandler={() => deleteMasterArea(deleteData, fetchMasterData)}
        ></Button>
      </Modal>
    </Container>
  )
}
