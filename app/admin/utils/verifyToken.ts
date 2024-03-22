import { getToken } from "./getToken";
import apiUrl from "@/app/config";

export const verifyToken = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${apiUrl}/admin/verify-token`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.ok ? true : false;
  } catch (error) {
    return error;
  }
};
