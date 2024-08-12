"use client";

import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { verifyToken } from '../handler/authHandler'
import { getToken } from '../utils/getToken'
import Toast from "../components/Toast"

//components
import Action from "../components/Action";
import Container from "../components/Container";
import Content from "../components/Content";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Modal from "../components/Modal";
import TextInput from "../components/input/TextInput";
import SelectInput from "../components/input/SelectInput";
import Table from "../components/Table";

//handler
import {
  buttonHandler,
  formHandler,
  rolefetchData,
  deleteHandler,
  editHandler,
  fetchData,
  deleteUser
} from "../handler/userHandler";

//icons
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegEdit, FaRegUser } from "react-icons/fa";
import { LiaPaperPlane, LiaUserTagSolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { GoTrash } from "react-icons/go";
import Link from 'next/link';
import { CiUser } from 'react-icons/ci';

interface FormData {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
}


export default function User() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });
  const [roleData, setRoleData] = useState([])
  const [formMethod, setFormMethod] = useState("create");
  const [data, setData] = useState([])
  const [header, setHeader] = useState("Tambah Akun");
  const [id, setId] = useState("");
  const tableHeader = ["Nama", "Email", "Username", "Role"];

  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })

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

  //Ambil data user
  const getUserData = useCallback(async () => {
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
  const getRoleData = useCallback(async () => {
    const data: any = await rolefetchData();
    if (data.success) {
      setRoleData(data.data)
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
      getUserData()
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
    const dataform: any = await deleteUser(id)
    if (dataform.success === true) {
      setAlert({
        status: "success",
        message: dataform.data.message
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getUserData()
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
    authenticate();
    getUserData();
    getRoleData();
  }, [authenticate, getUserData, getRoleData]);

  const button = (
    <Action>
      <Link
        className='rounded-xl gap-2 my-auto flex px-4 p-2 text-white bg-indigo-600 hover:bg-indigo-700'
        href={'/admin/user/role'}
      >
        <CiUser size={25} />
        Tambah Role
      </Link>
      <Button
        name="Tambah Akun"
        buttonHandler={() => buttonHandler(setFormData, setHeader, setFormMethod)}
        icon={IoCreateOutline}
        type="primary"
      />
    </Action>
  );

  return (
    <Container>
      <Navbar />
      <Content header="Account" desc="Kelola akun disini!" action={button}>
        {toast && (
          <Toast status={alert.status} message={alert.message} />
        )}
        <Table action={true} header={tableHeader} itemsPerPage={10}>
          {data &&
            data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.Role?.name}</td>
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
          <TextInput label="Full Name" icon={LiaUserTagSolid}>
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="jhon dhoe"
              value={formData.name}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="Email" icon={MdOutlineAlternateEmail}>
            <input
              name="email"
              type="email"
              className="grow"
              placeholder="jhondoe@gmail.com"
              value={formData.email}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="Username" icon={FaRegUser}>
            <input
              name="username"
              type="text"
              className="grow"
              placeholder="Admin"
              value={formData.username}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="Password" icon={RiLockPasswordLine}>
            <input
              name="password"
              type="password"
              className="grow"
              placeholder="Admin"
              value={formData.password}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <SelectInput label="Role" name="role" data={roleData} handleChange={handleChange} value={formData.role} />
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
  );
}
