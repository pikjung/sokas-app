'use client'
import Card from "../components/Card";
import Container from "../components/Container";
import HeaderPage from "../components/HeaderPage";
import moment from "moment";
import { useEffect, useState } from "react";
import useSpvAuth from "@/app/hooks/spvUseAuth";
import { getFilteredMap, getMapData, parseMarkerData, showMap, totalKules, getCurrentMonthStartAndEndDate } from "../handler/kulesHandler"
import MultiMarkerMap from "@/app/sales/components/MultiMarkerMap";
import Modal from "@/app/admin/components/Modal";
import Table from "@/app/ssAdmin/components/Table";
import { RiMapPin2Fill } from "react-icons/ri";
import BarChart from "../components/BarChart";

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/app/sales/components/Map'), { ssr: false });

const formatDate = (isoString: string): string => {
  return moment(isoString).format('DD-MM-YYYY');
};

interface MultiMarker {
  sales: string;
  latitude: number,
  longitude: number,
  date_kules: string,
  store: Store[]
}

interface MapData {
  name: string,
  Area: Area[],
  spv: Spv[],
}

interface Area {
  id: string,
  name: string,
  sales: Sales[]
}

interface Sales {
  id: string,
  name: string,
  kules: Kules[]
}

interface Kules {
  id: string,
  latitude: string,
  longitude: string,
  date_kules: string,
  note: string,
  store: Store[]
}

interface Store {
  id: string,
  name: string
}

interface Spv {
  id: string,
  name: string
}

const Home = () => {

  const [mapData, setMapData] = useState<MapData>()
  const { authenticate, userData } = useSpvAuth()
  const [map, setMap] = useState({
    latitude: 0,
    longitude: 0,
    name: ""
  })

  let data;
  let chartData;


  async function handleFilter(value: any) {
    const getMap: any = await getFilteredMap(value)
    console.log(getMap)
    setMapData(getMap)
  }

  if (mapData) {
    data = parseMarkerData(mapData)
    chartData = totalKules(mapData)
  }

  // console.log(chartData)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getMapData(setMapData)
    }
    authenticate();
  }, [authenticate])

  return (
    <Container flex={false} wrap={false}>
      <HeaderPage title={`Report Kunjungan Sales ${mapData && mapData.name}`} filter={true} handleFilter={handleFilter}>
        Lihat kunjungan sales area anda
      </HeaderPage>

      <div className="mb-4">
        {chartData && (
          <BarChart data={chartData}>

          </BarChart>
        )}
      </div>

      <Card header="Kunjungan sales">
        <Table
          header={['Sales', 'Toko', 'Tanggal', 'Maps']}
          action={false}
        >
          {data && data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.sales}</td>
              <td>{item.store.name}</td>
              <td>{formatDate(item.date_kules)}</td>
              <td>
                <button className="rounded-lg bg-indigo-500 p-2 text-white hover:bg-indigo-600 flex gap-2" onClick={() => showMap(item.latitude, item.longitude, item.store.name, setMap)}><RiMapPin2Fill />maps</button>
              </td>
              {/* <td>
                <button className="border-0" onClick={() => getFilteredMap(setMapData, item.sales)}>Lihat Maps</button>
              </td> */}
            </tr>
          ))}
        </Table>
      </Card>
      {/* <Modal header="Map all Kunjungan Sales" idName="modalAllKules">
        {data && (
          <MultiMarkerMap markers={data}>
          </MultiMarkerMap>
        )}
      </Modal> */}
      <Modal header={`Map Kunjungan Sales: ${map.name}`} idName="modalKules">
        <Map latitude={map.latitude} longitude={map.longitude} >
        </Map>
      </Modal>
    </Container>
  );
}

export default Home;