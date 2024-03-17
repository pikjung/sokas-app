"use client";

import Action from "../components/Action";
import Container from "../components/Container";
import Content from "../components/Content";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { IoCreateOutline } from "react-icons/io5";
import Modal from "../components/Modal";
import { MdOutlineAlternateEmail } from "react-icons/md";
import TextInput from "../components/input/TextInput";
import SelectInput from "../components/input/SelectInput";
import { FaRegUser } from "react-icons/fa";
import { LiaPaperPlane, LiaUserTagSolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import Table from "../components/Table";
import { useState } from "react";
import { GoTrash } from "react-icons/go";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    role: "",
  });

  const [header, setHeader] = useState("Tambah Akun");

  const buttonHandler = () => {
    setFormData({
      fullName: "",
      email: "",
      userName: "",
      password: "",
      role: "",
    });
    const formModal = document.getElementById("formModal");
    setHeader("Tambah Akun");
    formModal.showModal();
  };

  const formHandler = () => {};

  const button = (
    <Action>
      <Button
        name="Tambah Akun"
        buttonHandler={buttonHandler}
        icon={IoCreateOutline}
        type="primary"
      />
    </Action>
  );

  const editHandler = () => {
    setFormData({
      fullName: "Fikri",
      email: "fikri@gmail.com",
      userName: "Fikri123",
      password: "",
      role: "",
    });
    const formModal = document.getElementById("formModal");
    setHeader("Edit Akun");
    formModal.showModal();
  };
  const deleteHandler = () => {
    const deleteModal = document.getElementById("deleteModal");
    deleteModal.showModal();
  };

  return (
    <Container>
      <Navbar />
      <Content header="Account" desc="Kelola akun disini!" action={button}>
        <Table
          action={true}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </Content>
      <Modal header={header} idName="formModal" submit={true}>
        <form action="">
          <TextInput
            label="Full Name"
            icon={LiaUserTagSolid}
            placeholder="Jhon Doe"
            value={formData.fullName}
          />
          <TextInput
            label="Email"
            icon={MdOutlineAlternateEmail}
            placeholder="blabla@gmail.com"
            value={formData.email}
          />
          <TextInput
            label="Username"
            icon={FaRegUser}
            placeholder="jhondoe"
            value={formData.userName}
          />
          <TextInput
            label="Password"
            password={true}
            icon={RiLockPasswordLine}
            placeholder="password"
          />
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
