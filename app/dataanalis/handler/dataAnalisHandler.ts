import apiUrl from "@/app/config";
import axios from "axios";
import { getToken } from "../utils/getToken";

export const getMonitoring = async (setMonitoring: any) => {
  try {
    const response = await axios.get(`${apiUrl}/monitoring`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    setMonitoring(response.data.data);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log(error)
    } else {
      console.error('Error', error)
    }
  }
}

