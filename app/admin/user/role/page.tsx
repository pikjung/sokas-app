"use client";

import Action from "../../components/Action";
import Container from "../../components/Container";
import Content from "../../components/Content";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { IoCreateOutline } from "react-icons/io5";
import Modal from "../../components/Modal";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";
import TextInput from "../../components/input/TextInput";
import { LiaPaperPlane, LiaUserTagSolid } from "react-icons/lia";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { nanoid } from "nanoid";
import apiUrl from "../../../config"
import { FaRegEdit } from "react-icons/fa";

interface FormData {
  name: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: ""
  });

  const [formSubmit, setFormSubmit] = useState({

  })

  const [data, setData] = useState(null)

  const [header, setHeader] = useState("Tambah Akun");

  const buttonHandler = () => {
    setFormData({
      name: ""
    });
    const formModal = document.getElementById("formModal");
    setHeader("Tambah Akun");
    formModal.showModal();
    console.log(nanoid());
  };

  const formHandler = () => { };

  const editHandler = () => {
    setFormData({
      name: "test"
    });
    const formModal = document.getElementById("formModal");
    setHeader("Edit Akun");
    formModal.showModal();
  };

  const deleteHandler = () => {
    const deleteModal = document.getElementById("deleteModal");
    deleteModal.showModal();
  };

  const tableHeader = ['Nama']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/roles`);
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const resposeData = await response.json();
        setData(resposeData)
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const button = (
    <Action>
      <Button
        name="Tambah Role"
        buttonHandler={buttonHandler}
        icon={IoCreateOutline}
        type="primary"
      />
    </Action>
  );

  return (
    <Container>
      <Navbar />
      <Content header="Role" desc="Kelola Role disini!" action={button}>
        <Table
          action={true}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          header={tableHeader}
        >
          {data && data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <div className="flex gap-2">
                  <button className="border-0" onClick={() => editHandler()}>
                    <FaRegEdit size={20} />
                  </button>
                  <button className="border-0" onClick={() => deleteHandler()}>
                    <GoTrash size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Content>
      <Modal header={header} idName="formModal">
        <form>
          <TextInput
            label="Role Name"
            icon={MdLockOutline}
            placeholder="admin"
            value={formData.name}
          />
          <button
            type="submit"
            className="rounded-xl float-right mt-6 gap-2 px-4 my-auto flex bg-indigo-600 p-2 text-white hover:bg-indigo-700"
            onClick={formHandler}
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
        ></Button>
      </Modal>
    </Container>
  );
}
