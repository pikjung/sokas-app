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
import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";

export default function Home() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });
  const [formMethod, setFormMethod] = useState("create");
  const [data, setData] = useState(null);
  const [header, setHeader] = useState("Tambah Role");
  const [id, setId] = useState("");
  const tableHeader = ["Nama"];

  useEffect(() => {
    fetchData(setData);
  }, []);

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
      <Navbar />
      <Content header="Role" desc="Kelola Role disini!" action={button}>
        <Table
          action={true}
          header={tableHeader}
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
        <form onSubmit={(e) => formHandler(e, formMethod, formData, id, setData)}>
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
          buttonHandler={() => deleteRole(id, setData)}
        ></Button>
      </Modal>
    </Container >
  );
}
