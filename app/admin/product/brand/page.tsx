'use client'

import Container from "../../components/Container"
import Navbar from "../../components/Navbar"
import Content from "../../components/Content"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { verifyToken } from '../../handler/authHandler'
import { getToken } from '../../utils/getToken'
import Toast from "../../components/Toast"
import Action from "../../components/Action"
import Button from "../../components/Button"
import { IoCreateOutline } from "react-icons/io5"
import Modal from "../../components/Modal"
import TextInput from "../../components/input/TextInput"
import { LiaPaperPlane } from "react-icons/lia"
import { GoTrash } from "react-icons/go"
import { FaList, FaRegEdit, FaWpforms } from "react-icons/fa"
import Table from "../../components/Table"

import {
  editHandler,
  formHandler,
  buttonHandler,
  deleteArea,
  fetchData,
  deleteHandler
} from '../../handler/brandHandler'

interface FormData {
  name: string,
  color: string,
  value: string
}

export default function Home() {
  const router = useRouter();
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })

  const [formData, setFormData] = useState<FormData>({
    name: "",
    color: "",
    value: "",
  })

  const [formMethod, setFormMethod] = useState("create")
  const [id, setId] = useState("")
  const [header, setHeader] = useState("Tambah Brand")
  const [data, setData] = useState([])
  const tableHeader = ['Name', 'Color', 'Value']

  //protect
  const authenticate = async () => {
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
  }

  const getBrandData = async () => {
    const brandData: any = await fetchData();
    if (brandData.success) {
      setData(brandData.data);
    }

    if (!brandData.success) {
      setAlert({ status: 'error', message: brandData.data.error })
      setToast(true);
      setTimeout(() => {
        setToast(false)
      }, 2000);
      authenticate()
    }
  }

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
      getBrandData()
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
      getBrandData()
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


  useEffect(() => {
    authenticate()
    getBrandData()
  }, [])


  const button = (
    <Action>
      <Button
        name="Tambah Brand"
        buttonHandler={() => buttonHandler(setFormData, setHeader, setFormMethod)}
        icon={IoCreateOutline}
        type="primary"
      />
    </Action>
  )

  useEffect(() => {
    const authenticate = async () => {
      const authorization = await verifyToken(getToken());
      if (!getToken()) {
        router.push('/admin/login');
        return null
      }
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

    };

    authenticate();
  }, [router]);
  return (
    <Container>
      <Navbar />
      <Content header="Brand" desc="Kelola Brand disini!" action={button}>
        {toast && (
          <Toast status={alert.status} message={alert.message} />
        )}
        <Table action={true} header={tableHeader}>
          {data &&
            data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.color}</td>
                <td>{item.value}</td>
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
          <TextInput label="Nama Brand" icon={FaList}>
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="Philips"
              value={formData.name}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>

          <TextInput label="Color" icon={FaWpforms}>
            <input
              name="color"
              type="text"
              className="grow"
              placeholder="blue-500"
              value={formData.color}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>

          <TextInput label="Value" icon={FaWpforms}>
            <input
              name="value"
              type="text"
              className="grow"
              placeholder="PAN"
              value={formData.value}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
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
