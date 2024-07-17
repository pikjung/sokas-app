import apiUrl from "@/app/config";
import axios from "axios";
import { deleteToken, setToken } from "../../admin/utils/getToken";


export const authHandler = async (username: string, password: string) => {
  const data = JSON.stringify({
    username: username,
    password: password,
  });
  const response = await axios.post(`${apiUrl}/admin/login`, data)
    .then((res) => {
      setToken(res.data)
    }).catch((error) => {

    });
  return response;
};

export const verifyToken = async (token: any) => {
  try {
    const response = await axios.get(`${apiUrl}/admin/verify-token`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.data.data.role !== 'sales') {
      deleteToken()
      throw new Error("Invalid Role")
    }
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
