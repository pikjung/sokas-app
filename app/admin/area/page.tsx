'use client'

// components
import Container from "../components/Container"
import Navbar from "../components/Navbar"
import Content from "../components/Content"
import Table from "../components/Table"
import Action from "../components/Action"
import Button from "../components/Button"
import Modal from "../components/Modal"
import TextInput from "../components/input/TextInput"
import SelectInput from "../components/input/SelectInput"

import { useEffect, useState } from 'react'
import Link from "next/link"

import {
  buttonHandler,
  deleteHandler,
  editHandler,
  handlePostData,
  deleteArea
} from '../handler/areaHandler'
import { IoCreateOutline, IoMapSharp } from "react-icons/io5"
import { FaRegEdit } from "react-icons/fa"
import { GoTrash } from "react-icons/go"
import { LiaPaperPlane } from "react-icons/lia"
import { useNotification } from "@/app/context/NotificationContext"
import useAdminAuth from "@/app/hooks/adminUseAuth"
import { useFormContext } from "../hooks/FormContext"
import usePostData from "../hooks/usePostData"
import useFetchData from "../hooks/useFetchData"


export default function Area() {
  const [id, setId] = useState("");
  const { formData, setFormData } = useFormContext()
  const { showNotification } = useNotification()
  const { authenticate } = useAdminAuth();
  const { data: masterData, fetchData: fetchMasterData } = useFetchData('/admin/masterarea', authenticate, showNotification)
  const { data: data, fetchData: fetchData } = useFetchData('/admin/area', authenticate, showNotification)
  const { data: userData, fetchData: fetchUserData } = useFetchData('/admin/users', authenticate, showNotification)
  const { postData } = usePostData("/admin/area", authenticate, showNotification)
  const { putData } = usePostData(`/admin/area/${id}`, authenticate, showNotification)
  const { deleteData } = usePostData(`/admin/area/${id}`, authenticate, showNotification)
  const [header, setHeader] = useState("Tambah Area");
  const [formMethod, setFormMethod] = useState("create");

  const tableHeader = ['Area', 'Master Area', 'Sales', 'SS']


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
      <Link
        className='rounded-xl gap-2 my-auto flex px-4 p-2 text-white bg-indigo-600 hover:bg-indigo-700'
        href={'/admin/area/master'}
      >
        <IoMapSharp size={25} />
        Tambah Master Area
      </Link>
      <Button
        name="Tambah Area"
        buttonHandler={() => buttonHandler(setFormData, setHeader, setFormMethod)}
        icon={IoCreateOutline}
        type="primary"
      />
    </Action>
  );

  useEffect(() => {
    authenticate()
    fetchData()
    fetchMasterData()
    fetchUserData()
  }, [authenticate, fetchData, fetchUserData, fetchMasterData]);
  return (
    <Container>
      <Navbar />
      <Content header="Area" desc="Kelola Area Sales!" action={button}>

        <Table action={true} header={tableHeader} itemsPerPage={10}>
          {data &&
            data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.MasterArea?.name}</td>
                <td>{item.sales?.name}</td>
                <td>{item.sales_support?.name}</td>
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
        <form onSubmit={(e) => handlePostData(e, formData, postData, putData, formMethod, fetchData)}>
          <TextInput label="Nama Area" icon={IoMapSharp}>
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="T01"
              value={formData.name}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <SelectInput label="Sales" name="sales_id" data={userData} handleChange={handleChange} value={formData.sales_id} required={true} />
          <SelectInput label="SS" name="sales_support_id" data={userData} handleChange={handleChange} value={formData.sales_support_id} required={true} />
          <SelectInput label="MasterArea" name="masterAreaId" data={masterData} handleChange={handleChange} value={formData.masterAreaId} required={true} />
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
          buttonHandler={() => deleteArea(id, deleteData, fetchData)}
        ></Button>
      </Modal>
    </Container>
  )
}
