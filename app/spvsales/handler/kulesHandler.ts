import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "@/app/utils/getToken";

const token = getToken()

interface MarkerData {
  sales: string;
  latitude: number;
  longitude: number;
  date_kules: string;
  store: {
    id: string;
    name: string;
  };
}

interface TotalKules {
  area: string;
  total: number;
}

export const getMapData = async (setMapData: any) => {
  try {
    const response = await axios.get(`${apiUrl}/spvsales/kules`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setMapData(response.data.data)
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const getFilteredMap = async (value: any) => {
  try {
    const response = await axios.get(`${apiUrl}/spvsales/kules?startDate=${value[0]}&endDate=${value[1]}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.data
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

export const parseMarkerData = (data: any) => {
  let markers: MarkerData[] = [];

  // Iterasi melalui setiap area di dalam "Area" untuk mencari data "Kules"
  data.Area.forEach((area: any) => {
    if (area.sales && area.sales.Kules.length > 0) {
      // Iterasi melalui setiap "Kules" yang ada di dalam sales
      const kulesData = area.sales.Kules.map((kules: any) => ({
        id: kules.id,
        sales: area.sales.name,
        latitude: parseFloat(kules.latitude), // Ubah string ke number
        longitude: parseFloat(kules.longitude), // Ubah string ke number
        date_kules: kules.date_kules,
        note: kules.note,
        store: {
          id: kules.storeId ? kules.Store.id : undefined,
          name: kules.storeId ? kules.Store.name : kules.note,
        },
      }));

      // Gabungkan data Kules ke dalam array markers
      markers = [...markers, ...kulesData];
    }
  });

  return markers;
};

export const totalKules = (data: any) => {
  let totalKules: TotalKules[] = [];
  data.Area.forEach((area: any) => {
    const kulesData = {
      area: area.name,
      total: area.sales.Kules.length,
    }
    totalKules = [...totalKules, kulesData]
  })

  const sortedChartData = totalKules.sort((a, b) => {
    if (a.area < b.area) return -1;  // a sebelum b
    if (a.area > b.area) return 1;   // a setelah b
    return 0;                         // a dan b sama
  })

  return sortedChartData
}

export const showMap = (latitude: string, longitude: string, name: string, setMap: any) => {
  const formModal = <HTMLElement>document.getElementById("modalKules") as HTMLDialogElement | null;
  if (formModal) {
    setMap({
      latitude: latitude,
      longitude: longitude,
      name: name,
    })
    formModal.showModal();
  }
}

export const showAllMap = (latitude: string, longitude: string, name: string, setMap: any) => {
  const formModal = <HTMLElement>document.getElementById("modalAllKules") as HTMLDialogElement | null;
  if (formModal) {
    formModal.showModal();
  }
}

export function getCurrentMonthStartAndEndDate(): [string, string] {
  const today = new Date();

  // Mendapatkan tahun dan bulan saat ini
  const year = today.getFullYear();
  const month = today.getMonth();

  // Menyiapkan startDate sebagai hari pertama bulan saat ini
  const startDate = new Date(year, month, 1);

  // Menyiapkan endDate sebagai hari terakhir bulan saat ini
  const endDate = new Date(year, month + 1, 0);

  // Format tanggal menjadi "YYYY-MM-DD"
  const formatDate = (date: Date): string =>
    date.toISOString().split("T")[0];

  return [formatDate(startDate), formatDate(endDate)];
}