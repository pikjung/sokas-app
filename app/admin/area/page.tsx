'use client'

// components
import Container from "../components/Container"
import Navbar from "../components/Navbar"
import Content from "../components/Content"
import Table from "../components/Table"
import Toast from "../components/Toast"
import Action from "../components/Action"
import Button from "../components/Button"
import Modal from "../components/Modal"
import TextInput from "../components/input/TextInput"
import SelectInput from "../components/input/SelectInput"

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { verifyToken } from '../handler/authHandler'
import { getToken } from '../utils/getToken'
import Link from "next/link"

import {
  fetchData,
  buttonHandler,
  formHandler,
  fetchSideData,
  deleteHandler,
  editHandler,
  deleteArea
} from '../handler/areaHandler'
import { IoCreateOutline, IoMapSharp } from "react-icons/io5"
import { FaRegEdit } from "react-icons/fa"
import { GoTrash } from "react-icons/go"
import { LiaPaperPlane } from "react-icons/lia"

interface FormData {
  name: string,
  masterAreaId: string,
  sales_id: string,
  sales_support_id: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    masterAreaId: "",
    sales_id: "",
    sales_support_id: ""
  });
  const [id, setId] = useState("");
  const [header, setHeader] = useState("Tambah Area");
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })
  const [formMethod, setFormMethod] = useState("create");
  const [data, setData] = useState([])
  const [masterAreaData, setMasterAreaData] = useState([])
  const [userData, setUserData] = useState([])

  const tableHeader = ['Area', 'Master Area', 'Sales', 'SS']

  const router = useRouter()

  const authenticate = useCallback(async () => {
    if (!getToken()) {
      router.push('/admin/login');
      return null
    }
    const authorization = await verifyToken(getToken());

    if (authorization.success === false) {
      setAlert({
        status: "warning",
        message: "You are not authorized"
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      router.push('/admin/login');
    }
  }, [router])

  //ambil data area
  const getAreaData = useCallback(async () => {
    const data: any = await fetchData();
    if (data.success) {
      setData(data.data)
    }

    if (!data.success) {
      setAlert({
        status: "error",
        message: data.data.error
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      authenticate()
    }
  }, [authenticate])

  //ambil data role
  const getSideData = useCallback(async () => {
    const data: any = await fetchSideData();
    if (data.success) {
      setMasterAreaData(data.masterAreaData)
      setUserData(data.userData)
    }

    if (!data.success) {
      setAlert({
        status: "error",
        message: data.data.error
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      authenticate()
    }
  }, [authenticate])

  //create dan update data user
  const postData = async (e: any) => {
    const dataform: any = await formHandler(e, formMethod, formData, id);
    if (dataform.success === true) {
      setAlert({
        status: "success",
        message: dataform.data.message
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getAreaData()
    }

    if (dataform.success === false) {
      setAlert({
        status: "error",
        message: dataform.data.error
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      authenticate()
    }
  }

  //Hapus data
  const deleteData = async () => {
    const dataform: any = await deleteArea(id)
    if (dataform.success === true) {
      setAlert({
        status: "success",
        message: dataform.data.message
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getAreaData()
    }

    if (!dataform.success) {
      setAlert({
        status: "error",
        message: dataform.data.error
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      authenticate()
    }
  }

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
    getAreaData()
    getSideData()
  }, [authenticate, getAreaData, getSideData]);
  return (
    <Container>
      <Navbar />
      <Content header="Area" desc="Kelola Area Sales!" action={button}>
        {toast && (
          <Toast status={alert.status} message={alert.message} />
        )}

        <Table action={true} header={tableHeader}>
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
                      onClick={() => deleteHandler(item, setFormData, setId)}
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
        <form onSubmit={(e) => postData(e)}>
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
          <SelectInput label="MasterArea" name="masterAreaId" data={masterAreaData} handleChange={handleChange} value={formData.masterAreaId} required={true} />
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
          buttonHandler={() => deleteData()}
        ></Button>
      </Modal>
    </Container>
  )
}
