import apiUrl from "@/app/config"
import formSubmit from "../utils/formSubmit"
import { setToken } from "../utils/getToken"

export const authHandler = async (username: string, password: string) => {
  try {
    const data = JSON.stringify({
      username: username,
      password: password,
    })
    const response = await formSubmit(`${apiUrl}/admin/login`, "POST", data)
    setToken(response.data);
    return response;
  } catch (error) {
    return error
  }
}