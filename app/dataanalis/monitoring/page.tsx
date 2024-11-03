'use client'
import { useEffect, useState } from "react";
import Container from "../components/Container";
import { useRouter } from 'next/navigation'
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Table from "../components/Table";
import Button from "../components/Button";
import { FaCalculator, FaTrash, FaUpload } from "react-icons/fa";
import Action from "../components/Action";
import Modal from "../components/Modal";
import {
  modalDelete,
  modalHandler,
  uploadMonitoring,
  getMonitoring,
  deleteFileMonitoring,
  closeDeleteModal,
  closeModal,
  calculateMonitoring,
  showCalculateModal,
  getAddress,
  inputAllBp,
  closeCalculateModal,
  saveMonitoring
} from "../handler/monitoringHandler";
import { LiaPaperPlane } from "react-icons/lia";
import { useNotification } from "@/app/context/NotificationContext";
import useDataAnalisAuth from "@/app/hooks/dataanalisAuth";
import moment from "moment";
import { GoTrash } from "react-icons/go";
import { IoSave } from "react-icons/io5";
import { LuFileInput } from "react-icons/lu";

const formatDate = (isoString: string): string => {
  return moment(isoString).format('DD-MM-YYYY');
};

interface FileData {
  id: string;
  filename: string;
  filepath: string;
  created_at: string;
}

interface Address {
  id: string,
  name: string
}

interface NoBp {
  id: number;
  kodeBp: string;
  businessPartner: string;
  area?: string;
}

const Home = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setAlert, setToast } = useNotification()
  const { authenticate, userData } = useDataAnalisAuth()
  const [fileData, setFileData] = useState<FileData[]>([])
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [bpStatus, setBpStatus] = useState(false)
  const [address, setAddress] = useState<Address[]>([])
  const [noBp, setNoBp] = useState<NoBp[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    if (name) {
      setName(name)
    }
  }

  const handleUploadButton = () => {
    modalHandler()
  }

  const modalDeleteButton = (id: string) => {
    setId(id)
    modalDelete()
  }

  const calculateButton = async (id: string) => {
    const calculate: any = await calculateMonitoring(id);
    // console.log(calculate[0].nobp);
    if (calculate.data.status === "calculated") {
      if (calculate.data.data[0].nobp.length > 0) {
        setBpStatus(true)
        getAddress(setAddress)
        setNoBp(calculate.data.data[0].nobp)
        showCalculateModal()
      } else {
        setId(id)
        setBpStatus(false)
        showCalculateModal()
      }
    }

    if (calculate.data.status === "saved") {
      setAlert({
        status: "error",
        message: "Data sudah di save, tidak ada process lagi",
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
  }

  const handleSaveJson = async (id: string) => {
    try {
      const save: any = await saveMonitoring(id);
      if (save.success === true) {
        setAlert({
          status: "success",
          message: save.data.message,
        });
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        closeCalculateModal()
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
      closeCalculateModal()
    }
  }

  const handleDeleteFile = async (id: string) => {
    try {
      const deleteMonitoring: any = await deleteFileMonitoring(id);
      if (deleteMonitoring.success === true) {
        setAlert({
          status: "success",
          message: deleteMonitoring.data.message,
        });
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        closeDeleteModal()
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
    }
  }

  const uploadData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile && name) {
      try {
        const fileUpload: any = await uploadMonitoring(selectedFile, name);
        if (fileUpload.success === true) {
          setAlert({
            status: "success",
            message: fileUpload.data.message,
          });
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
          closeModal()
          // console.log(fileUpload)
        }
        // console.log(fileUpload)
      } catch (error: any) {
        setAlert({
          status: "error",
          message: error.message,
        });
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }
    }
  }

  const handleBpChange = (id: string, field: string, value: string) => {
    setNoBp(prevData =>
      prevData.map((item: any) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const handleBPSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const addAllBp: any = await inputAllBp(noBp);
      if (addAllBp.success === true) {
        setAlert({
          status: "success",
          message: addAllBp.data.message,
        });
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
        closeCalculateModal()
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
    }
  }

  useEffect(() => {
    getMonitoring(setFileData)
    authenticate()
  }, [authenticate])

  const filter = (
    <Action>
      <Button
        buttonHandler={handleUploadButton}
        name="Upload"
        icon={FaUpload}
      />
    </Action>
  )

  return (
    <Container>
      <Navbar />
      <Content header="Monitoring sales" action={filter} desc="monitoring sales disini">
        <Table
          action={true}
          header={['Name', 'Excel', 'json', 'tanggal']}
          itemsPerPage={10}
        >
          {fileData && fileData.map((file: any) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.filename}</td>
              <td>{file.jsonfile}</td>
              <td>{formatDate(file.Created_at)}</td>
              <td className="flex gap-2">
                <button
                  className="rounded-lg bg-teal-500 p-2 text-white hover:bg-teal-600 flex gap-2"
                  onClick={() => calculateButton(file.id)}
                >
                  <FaCalculator />
                </button>
                <button
                  className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 flex gap-2 "
                  onClick={() => modalDeleteButton(file.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </Content>
      <Modal header="Upload report detail invoice" idName="modalRDI">
        <form onSubmit={(e) => uploadData(e)}>
          <div className="flex flex-wrap gap-2">
            <label htmlFor="">
              Name
            </label>
            <input type="text" required onChange={handleNameChange} className="w-full border border-slate-400 rounded" />
            <label htmlFor="" className="">
              Excel (xls, xlsx)
            </label>
            <input type="file" className="w-full border border-slate-400 rounded" onChange={handleFileChange} />
          </div>
          <button
            type="submit"
            className="rounded-xl float-right mt-6 gap-2 px-4 my-auto flex bg-indigo-600 p-2 text-white hover:bg-indigo-700"
          >
            Submit
            <LiaPaperPlane className="my-auto" size={20} />
          </button>
        </form>
      </Modal>
      <Modal header="Hapus Data" idName="modalDelete">
        <p className="mb-4">Data yang dipilih akan terhapus</p>
        <Button
          customClass="float-right"
          type="danger"
          name="Hapus"
          icon={GoTrash}
          buttonHandler={() => handleDeleteFile(id)}
        ></Button>
      </Modal>
      <Modal header="Calculate Monitoring" idName="calculateModal">
        {bpStatus && (
          <>
            <div className="flex items-center mb-4 p-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg" role="alert">
              <svg aria-hidden="true" className="w-5 h-5 mr-3 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" />
              </svg>
              <span className="font-medium mr-1">Peringatan!</span>Mohon input Bp Berikut.
            </div>
            <div className="flex flex-wrap">
              <form onSubmit={handleBPSubmit}>
                {noBp && noBp.map((item: any) => (
                  <div className="flex flex-nowrap gap-2" key={item.id}>
                    <div className="flex-wrap">
                      <label htmlFor="">Kode Toko</label>
                      <input
                        type="text"
                        className="w-full border border-slate-400 rounded"
                        value={item.kodeBp}
                        onChange={(e) => handleBpChange(item.id, 'KodeBp', e.target.value)}
                      />
                    </div>
                    <div className="flex-wrap">
                      <label htmlFor="">Nama Toko</label>
                      <input
                        type="text"
                        className="w-full border border-slate-400 rounded"
                        value={item.businessPartner}
                        onChange={(e) => handleBpChange(item.id, 'businessPartner', e.target.value)}
                      />
                    </div>
                    <div className="flex-wrap">
                      <label htmlFor="">Area</label>
                      <select
                        className="w-full border border-slate-400 rounded"
                        required
                        onChange={(e) => handleBpChange(item.id, 'area', e.target.value)}
                      >
                        <option value="">
                          -- Pilih --
                        </option>
                        {address && address.map(adrs => (
                          <option key={adrs.id} value={adrs.id}>
                            {adrs.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="rounded-xl float-right mt-6 gap-2 px-4 my-auto flex items-center bg-teal-600 p-2 text-white hover:bg-teal-700"
                >
                  <LuFileInput />
                  Input All
                </button>
              </form>
            </div>
          </>
        )}

        {!bpStatus && (
          <button
            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl gap-2 my-auto flex px-4 p-2 text-white float-right"
            onClick={() => handleSaveJson(id)}
          >
            <IoSave />
            Save
          </button>
        )
        }
      </Modal>
    </Container>
  );
}

export default Home;