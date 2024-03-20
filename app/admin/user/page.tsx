"use client";

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
import { buttonHandler, handleChange, formHandler } from "../handler/userHandler"

//icons
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { LiaPaperPlane, LiaUserTagSolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { GoTrash } from "react-icons/go";

interface FormData {
  fullName: string,
  email: string,
  userName: string,
  password: string,
  role: number,
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    role: 1,
  });
  const [header, setHeader] = useState("Tambah Akun");
  const [id, setId] = useState("")
  const tableHeader = ['Nama', 'Email', 'Username', 'Role']

  const button = (
    <Action>
      <Button
        name="Tambah Akun"
        buttonHandler={() => buttonHandler(setFormData, setHeader)}
        icon={IoCreateOutline}
        type="primary"
      />
    </Action>
  );

  return (
    <Container>
      <Navbar />
      <Content header="Account" desc="Kelola akun disini!" action={button}>
        <Table
          action={true}
          header={tableHeader}
        ></Table>
      </Content>
      <Modal header={header} idName="formModal">
        <form>
          <TextInput
            label="Full Name"
            icon={LiaUserTagSolid}
          >
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="Admin"
              value={formData.name}
              onChange={(event) => }
            />
          </TextInput>
          <TextInput
            label="Email"
            icon={MdOutlineAlternateEmail}
          >
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="Admin"
              value={formData.name}
              onChange={(event) => handleChange(event, setFormData)}
            />
          </TextInput>
          <TextInput
            label="Username"
            icon={FaRegUser}

          >
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="Admin"
              value={formData.name}
              onChange={(event) => handleChange(event, setFormData)}
            />
          </TextInput>
          <TextInput
            label="Password"
            icon={RiLockPasswordLine}
          >
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="Admin"
              value={formData.name}
              onChange={(event) => handleChange(event, setFormData)}
            />
          </TextInput>
          <SelectInput label="Role" />
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
