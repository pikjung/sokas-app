"use client";

// url config
import apiUrl from "../../../config";

// component
import Action from "../../components/Action";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import TextInput from "../../components/input/TextInput";

// handler
import { handleChange, buttonHandler, fetchData, editHandler, deleteHandler, deleteRole, formHandler } from "../../handler/roleHandler";

// icon
import { IoCreateOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { LiaPaperPlane } from "react-icons/lia";
import { useCallback, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { verifyToken } from "../../handler/authHandler";
import { getToken } from "../../utils/getToken";
import Toast from "../../components/Toast";

export default function Home() {
  const router = useRouter()

  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })

  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });
  const [formMethod, setFormMethod] = useState("create");
  const [data, setData] = useState([]);
  const [header, setHeader] = useState("Tambah Role");
  const [id, setId] = useState("");
  const tableHeader = ["Nama"];

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

  }, [router]);

  //Ambil data
  const getData = useCallback(async () => {
    const dataFetch: any = await fetchData();
    if (dataFetch.success) {
      setData(dataFetch.data)
    }

    if (!dataFetch.success) {
      setAlert({
        status: "error",
        message: dataFetch.data.error
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      authenticate()
    }
  }, [authenticate])

  //input dan update data
  const postData = async (e: any) => {
    const dataform: any = await formHandler(e, formMethod, formData, id)
    // console.log(dataform)
    if (dataform.success === true) {
      setAlert({
        status: "success",
        message: dataform.data.message
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getData()
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
    const dataform: any = await deleteRole(id)
    if (dataform.success === true) {
      setAlert({
        status: "success",
        message: dataform.data.message
      })
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
      getData()
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

  useEffect(() => {
    authenticate();
    getData()
  }, [authenticate, getData]);

  const button = (
    <Action>
      <Button
        name="Tambah Role"
        buttonHandler={() => buttonHandler(setFormData, setFormMethod, setHeader)}
        icon={IoCreateOutline}
        type="primary"
      />
    </Action>
  );

  return (
    <Container>
      {toast && (
        <Toast status={alert.status} message={alert.message} />
      )}
      <Navbar />
      <Content header="Role" desc="Kelola Role disini!" action={button}>
        <Table
          action={true}
          header={tableHeader}
          itemsPerPage={10}
        >
          {data &&
            data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
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
      </Content >
      <Modal header={header} idName="formModal">
        <form onSubmit={(e) => postData(e)}>
          <TextInput label="Role Name" icon={MdLockOutline}>
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="Admin"
              value={formData.name}
              onChange={(event) => handleChange(event, setFormData)}
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
    </Container >
  );
}
