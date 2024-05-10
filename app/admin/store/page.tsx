"use client";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Content from "../components/Content";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyToken } from "../handler/authHandler";
import { getToken } from "../utils/getToken";
import Toast from "../components/Toast";
import Link from "next/link";
import Action from "../components/Action";
import { CiCalendarDate, CiSearch } from "react-icons/ci";
import Button from "../components/Button";
import { IoCreateOutline } from "react-icons/io5";
import { FaFileImport, FaList, FaMapMarked, FaRegEdit } from "react-icons/fa";

import {
  buttonHandler,
  buttonImportHandler,
  deleteHandler,
  deleteStore,
  editHandler,
  fetchData,
  fetchSideData,
  formHandler,
  uploadStore,
} from "../handler/storeHandler";
import Table from "../components/Table";
import { GoTrash } from "react-icons/go";
import Modal from "../components/Modal";
import TextInput from "../components/input/TextInput";
import { RiBox3Line } from "react-icons/ri";
import SelectInput from "../components/input/SelectInput";
import { LiaPaperPlane } from "react-icons/lia";
import { TbMapSearch, TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";
import { BiBarcode } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";

interface FormData {
  name: string;
  lat: string;
  long: string;
  kode: string;
  password: string;
  top: string;
  addressId: string;
  full_address: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    lat: "",
    long: "",
    kode: "",
    password: "",
    top: "",
    addressId: "",
    full_address: "",
  });
  const [id, setId] = useState("");
  const [header, setHeader] = useState("Tambah Brand");
  const [toast, setToast] = useState(false);
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });
  const [formMethod, setFormMethod] = useState("create");
  const [data, setData] = useState();
  const [addressData, setAddressData] = useState([]);

  const tableHeader = ["Name", "Value", "Brand"];

  const router = useRouter();

  const authenticate = async () => {
    if (!getToken()) {
      router.push("/admin/login");
      return null;
    }
    const authorization = await verifyToken(getToken());

    if (authorization.success === false) {
      setAlert({
        status: "warning",
        message: "You are not authorized",
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      router.push("/admin/login");
    }
  };

  //ambil data area
  const getProductData = async () => {
    const data: any = await fetchData();
    if (data.success) {
      setData(data.data);
    }

    if (!data.success) {
      setAlert({
        status: "error",
        message: data.data.error,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      authenticate();
    }
  };

  //ambil data role
  const getSideData = async () => {
    const data: any = await fetchSideData();
    if (data.success) {
      setAddressData(data.data);
    }

    if (!data.success) {
      setAlert({
        status: "error",
        message: data.data.error,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      authenticate();
    }
  };

  //create dan update data user
  const postData = async (e: any) => {
    const dataform: any = await formHandler(e, formMethod, formData, id);
    if (dataform.success === true) {
      setAlert({
        status: "success",
        message: dataform.data.message,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      getProductData();
    }

    if (dataform.success === false) {
      setAlert({
        status: "error",
        message: dataform.data.error,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      authenticate();
    }
  };

  //Hapus data
  const deleteData = async () => {
    const dataform: any = await deleteStore(id);
    if (dataform.success === true) {
      setAlert({
        status: "success",
        message: dataform.data.message,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      getProductData();
    }

    if (!dataform.success) {
      setAlert({
        status: "error",
        message: dataform.data.error,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      authenticate();
    }
  };

  //handle formData
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle change file import
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImportSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (selectedFile) {
      setLoading(true);
      try {
        const fileUpload: any = await uploadStore(selectedFile);
        if (fileUpload.success === true) {
          setAlert({
            status: "success",
            message: fileUpload.data.message,
          });
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          getProductData();
        }
      } catch (error: any) {
        setAlert({
          status: "error",
          message: error.message,
        });
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        authenticate();
      } finally {
        setLoading(false);
      }
    }
    // console.log(selectedFile)
  };

  useEffect(() => {
    authenticate();
    getProductData();
    getSideData();
  }, []);

  const button = (
    <Action>
      <Link
        className="rounded-xl gap-2 my-auto flex px-4 p-2 text-white bg-indigo-600 hover:bg-indigo-700"
        href={"/admin/store/address"}
      >
        <FaMapMarked size={25} />
        Tambah Alamat
      </Link>
      <Button
        name="Tambah Store"
        buttonHandler={() =>
          buttonHandler(setFormData, setHeader, setFormMethod)
        }
        icon={IoCreateOutline}
        type="primary"
      />
      <Button
        name="Import Store"
        buttonHandler={() => buttonImportHandler()}
        icon={FaFileImport}
        type="primary"
      />
    </Action>
  );

  useEffect(() => {
    const authenticate = async () => {
      const authorization = await verifyToken(getToken());
      if (!getToken()) {
        router.push("/admin/login");
        return null;
      }
      if (authorization.success === false) {
        setAlert({
          status: "warning",
          message: "You are not authorized",
        });
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        router.push("/admin/login");
      }
    };

    authenticate();
  }, [router]);
  return (
    <Container>
      <Navbar />
      <Content
        header="Store"
        desc="Kelola Toko Customer disini!"
        action={button}
      >
        {toast && <Toast status={alert.status} message={alert.message} />}
        {loading && (
          <div className="toast toast-top toast-center z-[100]">
            <div className={`alert alert-secondary`}>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </div>
        )}
        <Table action={true} header={tableHeader}>
          {data &&
            data.map((item: any) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.value}</td>
                <td>{item.Brand?.name}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="border-0"
                      onClick={() =>
                        editHandler(
                          item,
                          setFormData,
                          setId,
                          setFormMethod,
                          setHeader
                        )
                      }
                    >
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
          <TextInput label="Nama Store" icon={RiBox3Line}>
            <input
              name="name"
              type="text"
              className="grow"
              placeholder="Cahaya Kemilau"
              value={formData.name}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="lat" icon={TbWorldLatitude}>
            <input
              name="lat"
              type="text"
              className="grow"
              placeholder="097213123"
              value={formData.lat}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="long" icon={TbWorldLongitude}>
            <input
              name="long"
              type="text"
              className="grow"
              placeholder="-097213123"
              value={formData.long}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="kode" icon={BiBarcode}>
            <input
              name="kode"
              type="text"
              className="grow"
              placeholder="01150"
              value={formData.kode}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="password" icon={CgPassword}>
            <input
              name="password"
              type="password"
              className="grow"
              placeholder="****"
              value={formData.password}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="top" icon={CiCalendarDate}>
            <input
              name="top"
              type="number"
              className="grow"
              placeholder="30"
              value={formData.top}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <TextInput label="full_address" icon={TbMapSearch}>
            <input
              name="full_address"
              type="text"
              className="grow"
              placeholder="097213123"
              value={formData.full_address}
              onChange={(event) => handleChange(event)}
            />
          </TextInput>
          <SelectInput
            label="Address"
            name="addressId"
            data={addressData}
            handleChange={handleChange}
            value={formData.addressId}
            required={true}
          />
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
      <Modal header="Import Data" idName="importModal">
        <p className="mb-4">Import Modal dari xlsx</p>
        <form onSubmit={(e) => handleImportSubmit(e)}>
          <input type="file" name="file" onChange={handleFileChange} />
          <button
            type="submit"
            className="rounded-xl float-right mt-6 gap-2 px-4 my-auto flex bg-indigo-600 p-2 text-white hover:bg-indigo-700"
          >
            <FaFileImport className="my-auto" size={20} />
            Import
          </button>
        </form>
      </Modal>
    </Container>
  );
}
