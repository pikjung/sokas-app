'use client'

import dynamic from 'next/dynamic';
import { useNotification } from "@/app/context/NotificationContext";
import useSalesAuth from "@/app/hooks/salesUseAuth";
import { useEffect, useState } from "react";

import {
  getToko,
  addKules
} from "../handler/kulesHandler"
import Container from "../components/Container";
import HeaderPage from "../components/HeaderPage";
import Card from "../components/Card";
import DropdownInput_toko from "../components/inputs/DropdownInput_toko";

// Import komponen Map secara dinamis dengan SSR dinonaktifkan
const Map = dynamic(() => import('../components/Map'), { ssr: false });

interface Toko {
  id: string,
  name: string
}

interface Kules {
  latitude: number,
  longitude: number,
  note: string,
  isnoo: boolean
}

const Home = () => {

  const { setAlert, setToast } = useNotification()
  const { authenticate, userData } = useSalesAuth()

  //data
  const [kules, setKules] = useState<Kules>({
    latitude: 0,
    longitude: 0,
    note: "",
    isnoo: false,
  })
  const [tokos, setTokos] = useState<Toko[]>([]);
  const [showDropdownToko, setShowDropdownToko] = useState(false);
  const [storeId, setStoreId] = useState("");
  const [selected_toko, setSelectedToko] = useState('')
  const [tokosFilter, setTokosFilter] = useState<Toko[]>([]);
  const [formStatus, setFormStatus] = useState({
    tokoStatus: false,
    locationStatus: false,
    noteStatus: false
  })

  function handleChangeToko(id: string, name: string) {
    setSelectedToko(name)
    setStoreId(id)
  }

  function handleTokoChange(selectParam: string) {
    if (!selectParam) {
      setTokosFilter(tokos);
      return;
    }

    const sToko = tokos.filter(t => t.name.toLowerCase().includes(selectParam.toLowerCase()));
    setTokosFilter(sToko.length > 0 ? sToko : tokos);
  }


  function handleShowDropdownToko() {
    setShowDropdownToko(true);
  }

  function handleHideDropdownToko() {
    setTimeout(() => {
      setShowDropdownToko(false);
    }, 200);
  }

  const submitKules = async () => {
    const data = {
      storeId: storeId,
      latitude: kules.latitude,
      longitude: kules.longitude,
      note: kules.note,
      isnoo: kules.isnoo
    }

    if (!kules.isnoo) {
      if (storeId === "") {
        setFormStatus({
          tokoStatus: true,
          locationStatus: formStatus.locationStatus,
          noteStatus: formStatus.noteStatus
        })
        setTimeout(() => {
          setFormStatus({
            tokoStatus: false,
            locationStatus: formStatus.locationStatus,
            noteStatus: formStatus.noteStatus
          })
        }, 2000);
        return false
      };
    }

    if (kules.latitude === 0 || kules.longitude === 0) {
      setFormStatus({
        tokoStatus: formStatus.tokoStatus,
        locationStatus: true,
        noteStatus: formStatus.noteStatus
      })
      setTimeout(() => {
        setFormStatus({
          tokoStatus: formStatus.tokoStatus,
          locationStatus: false,
          noteStatus: formStatus.noteStatus
        })
      }, 2000);
      return false
    }

    if (kules.note === "") {
      setFormStatus({
        tokoStatus: formStatus.tokoStatus,
        locationStatus: formStatus.locationStatus,
        noteStatus: true
      })
      setTimeout(() => {
        setFormStatus({
          tokoStatus: formStatus.tokoStatus,
          locationStatus: formStatus.locationStatus,
          noteStatus: false
        })
      }, 2000);
      return false
    }

    const add: any = await addKules(data);
    if (add) {
      if (add.status === "success") {
        setAlert({
          status: "Success",
          message: add.data.message
        })
        setToast(true)
        setTimeout(() => {
          setToast(false)
        }, 2000);
      }
    } else {
      setFormStatus({
        tokoStatus: formStatus.tokoStatus,
        locationStatus: true,
        noteStatus: formStatus.noteStatus
      })
      setTimeout(() => {
        setFormStatus({
          tokoStatus: formStatus.tokoStatus,
          locationStatus: false,
          noteStatus: formStatus.noteStatus
        })
      }, 2000);
    }
  }

  const handleNoteChange = (value: string, latitude: number, longitude: number, isnoo: boolean) => {
    setKules({
      latitude: latitude,
      longitude: longitude,
      note: value,
      isnoo: isnoo
    })
  }

  const handleNooChange = (e: any) => {
    setKules({
      latitude: kules.latitude,
      longitude: kules.longitude,
      note: kules.note,
      isnoo: e.target.checked
    })
  }

  useEffect(() => {
    getToko(setTokos, setTokosFilter)
    authenticate();
    function getLocation() {
      if (typeof window !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position: GeolocationPosition) {
      setKules({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        note: "",
        isnoo: false
      });
    }

    getLocation();
  }, [authenticate])

  return (
    <Container flex={false} wrap={false}>
      <HeaderPage title="Form Kunjungan Sales">
        Submit Form Kunjungan Sales
      </HeaderPage>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-4">
        <Card header="Isi Form kunjungan sales" link="/sales/kules/history" link_name="History">
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <Map latitude={kules.latitude} longitude={kules.longitude}></Map>
            </div>
            <div className="flex flex-nowrap">
              <div>
                <label htmlFor="latitude" className="font-semibold">Latitude</label>
                <input type="text" className={`w-full border-b p-2 ${formStatus.locationStatus ? 'border-red-600 text-red-600 animate-shake' : 'border-gray-300 text-gray-900'}`} name="latitude" value={kules.latitude} readOnly />
              </div>
              <div>
                <label htmlFor="longitude" className="font-semibold">Longitude</label>
                <input type="text" className={`w-full border-b p-2 ${formStatus.locationStatus ? 'border-red-600 text-red-600 animate-shake' : 'border-gray-300 text-gray-900'}`} name="longitude" value={kules.longitude} readOnly />
              </div>
            </div>
            <div>
              <input type="checkbox" className="mr-2" checked={kules.isnoo} onChange={e => handleNooChange(e)} />
              <label htmlFor="">NOO</label>
            </div>
            {kules.isnoo == false && (
              <>
                <input className={`w-full border-b p-2 transition-colors duration-300 ease-in-out ${formStatus.tokoStatus ? 'border-red-600 text-red-600 animate-shake' : 'border-gray-300 text-gray-900'}`} id="tokos" placeholder="toko" value={selected_toko} disabled />
                <DropdownInput_toko
                  id="toko"
                  showDropdown={showDropdownToko}
                  handleShowDropdown={handleShowDropdownToko}
                  options={tokosFilter}
                  label="Pilih Toko"
                  handleChangeToko={handleChangeToko}
                  handleChange={handleTokoChange}
                  handleHideDropdown={handleHideDropdownToko}
                  placeholder="Pilih Toko"
                />
              </>
            )}
            <div>
              <label htmlFor="note" className="font-semibold">Note</label>
              <input type="text" placeholder="isi note disini" onChange={(e) => handleNoteChange(e.target.value, kules.latitude, kules.longitude, kules.isnoo)} className={`w-full border-b mb-4 p-2 ${formStatus.noteStatus ? 'border-red-600 text-red-600 animate-shake' : 'border-gray-300 text-gray-900'}`} name="note" value={kules.note} />
            </div>
          </div>
          <button onClick={e => submitKules()} className="mb-4 font-semibold w-full z-50 bg-indigo-500 hover:bg-indigo-600 text-white p-4 shadow-lg">
            Submit Kunjungan sales
          </button>
        </Card>
      </div>
    </Container>
  );
}

export default Home;