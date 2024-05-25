import apiUrl from "@/app/config";
import axios from "axios";
import { deleteToken, setToken } from "../admin/utils/getToken";


export const authHandler = async (kode: string, password: string) => {
  const data = JSON.stringify({
    kode: kode,
    password: password,
  });
  const response = await axios.post(`${apiUrl}/login`, data)
    .then((res) => {
      setToken(res.data)
    }).catch((error) => {

    });
  return response;
};

export const verifyToken = async (token: any) => {
  try {
    const response = await axios.get(`${apiUrl}/verify-token`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    deleteToken()
    return {
      success: false,
      error: error.response.data
    };
  }
};
