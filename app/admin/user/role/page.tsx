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
import apiUrl from "../../../config";
import { FaRegEdit } from "react-icons/fa";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [formSubmit, setFormSubmit] = useState("create");
  const [data, setData] = useState(null);
  const [header, setHeader] = useState("Tambah Role");

  const handleChange = (event: any) => {
    setFormData({
      name: event.target.value,
    });
  };

  const buttonHandler = () => {
    setFormData({
      name: "",
    });
    setFormSubmit("create");
    const formModal = document.getElementById("formModal");
    setHeader("Tambah Role");
    formModal.showModal();
  };

  const formHandler = async (event: any) => {
    event.preventDefault();
    if (formSubmit === "create") {
      try {
        const response = await fetch(`${apiUrl}/admin/roles`, {
          method: "POST",
          body: JSON.stringify({
            name: formData.name,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
      }
    } else {
    }
  };

  const editHandler = () => {
    setFormData({
      name: "test",
    });
    setFormSubmit("update");
    const formModal = document.getElementById("formModal");
    setHeader("Edit Role");
    formModal.showModal();
  };

  const deleteHandler = () => {
    const deleteModal = document.getElementById("deleteModal");
    deleteModal.showModal();
  };

  const tableHeader = ["Nama"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/roles`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const resposeData = await response.json();
        setData(resposeData);
      } catch (err) {
        console.log(err);
      }
    };

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
          {data &&
            data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="border-0" onClick={() => editHandler()}>
                      <FaRegEdit size={20} />
                    </button>
                    <button
                      className="border-0"
                      onClick={() => deleteHandler()}
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
        <form onSubmit={formHandler}>
          <TextInput label="Role Name" icon={MdLockOutline}>
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="Admin"
              value={formData.name}
              onChange={handleChange}
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
        ></Button>
      </Modal>
    </Container>
  );
}
