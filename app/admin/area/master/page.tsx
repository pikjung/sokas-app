'use client'

// components
import Container from "../../components/Container"
import Navbar from "../../components/Navbar"
import Content from "../../components/Content"
import Table from "../../components/Table"
import Toast from "../../components/Toast"
import Action from "../../components/Action"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import TextInput from "../../components/input/TextInput"
import SelectInput from "../../components/input/SelectInput"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { verifyToken } from '../../handler/authHandler'
import { getToken } from '../../utils/getToken'

import {
  fetchData,
  buttonHandler,
  formHandler,
  userFetchData,
  deleteHandler,
  editHandler,
  deleteMasterArea,
} from '../../handler/masterAreaHandler'
import { IoCreateOutline, IoMapSharp } from "react-icons/io5"
import { FaRegEdit } from "react-icons/fa"
import { GoTrash } from "react-icons/go"
import { LiaPaperPlane } from "react-icons/lia"

interface FormData {
  name: string,
  spvId: string,
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    spvId: "",
  });
  const [id, setId] = useState("");
  const [header, setHeader] = useState("Tambah Area");
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })
  const [formMethod, setFormMethod] = useState("create");
  const [data, setData] = useState()
  const [userData, setuserData] = useState([])

  const tableHeader = ['Area', 'PIC']

  const router = useRouter()

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

  //ambil data area
  const getMasterAreaData = async () => {
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
  }

  //ambil data role
  const getUserData = async () => {
    const data: any = await userFetchData();
    if (data.success) {
      setuserData(data.data)
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
      getMasterAreaData()
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
    const dataform: any = await deleteMasterArea(id)
    if (dataform.success === true) {
      setAlert({
        status: "success",
        message: dataform.data.message
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getMasterAreaData()
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
    getMasterAreaData()
    getUserData()
  }, [])
  return (
    <Container>
      <Navbar />
      <Content header="Master Area" desc="Kelola Master Area Sales!" action={button}>
        {toast && (
          <Toast status={alert.status} message={alert.message} />
        )}

        <Table action={true} header={tableHeader}>
          {data &&
            data.map((item: any) => (
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
          buttonHandler={() => deleteData()}
        ></Button>
      </Modal>
    </Container>
  )
}
