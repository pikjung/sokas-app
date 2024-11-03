'use client'

import Container from "../../components/Container";
import Card from "../../components/Card";
import HeaderPage from "../../components/HeaderPage";
import { useState, useEffect } from "react";
import { historyKules, showModal } from "../../handler/kulesHandler";
import Modal from "@/app/admin/components/Modal";
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });


interface Item {
  id: string;
  sales_id: string;
  storeId: string | null;
  approval: string;
  date_kules: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string | null;
  note: string;
  isnoo: boolean;
  Store: {
    id: string;
    name: string;
  } | null;
  Sales: {
    id: string;
    name: string;
  };
}

interface Kules {
  [date: string]: Item[];
}

const Home = () => {
  const [kules, setKules] = useState<Kules>({});
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    name: ""
  });

  const showLocation = (lat: string, long: string, name: any) => {
    setLocation({
      lat: parseFloat(lat),
      lng: parseFloat(long),
      name: name
    });
    showModal("lokasiKules");
  };

  useEffect(() => {
    const fetchData = async () => {
      await historyKules(setKules);
    };

    fetchData();
  }, []);

  return (
    <Container flex={false} wrap={false}>
      <HeaderPage title="History kunjungan sales">
        Lihat history kunjungan sales
      </HeaderPage>
      <Card header="Kunjungan sales">
        {kules && typeof kules === 'object' && Object.keys(kules).map((date) => (
          <div key={date} className="mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">{date}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(kules[date]) ? (
                kules[date].map((item: Item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      showLocation(
                        item.latitude,
                        item.longitude,
                        item.storeId ? item.Store?.name : item.note
                      )
                    }
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex items-center mb-2">
                      <span className="font-semibold">{!item.isnoo && item.Store?.name}</span>
                    </div>
                    <b>Note</b>
                    <p className="text-gray-600">{item.note}</p>
                    <b>Koordinat</b>
                    <p className="text-gray-600">lat: {item.latitude}, long: {item.longitude}</p>
                  </div>
                ))
              ) : (
                <p>No data available for this date.</p>
              )}
            </div>
          </div>
        ))}
      </Card>
      <Modal header="Lokasi kules" idName="lokasiKules">
        <p className="font-semibold mb-4">{location.name}</p>
        <Map latitude={location.lat} longitude={location.lng} />
      </Modal>
    </Container>
  );
};

export default Home;
