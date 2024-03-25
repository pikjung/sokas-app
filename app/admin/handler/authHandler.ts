import apiUrl from "@/app/config";
import formSubmit from "../utils/formSubmit";

export const authHandler = (username: string, password: string) => {
  const data = JSON.stringify({
    username: username,
    password: password,
  });
  const response = formSubmit(`${apiUrl}/admin/login`, "POST", data);
  return response;
};

export const verifyToken = (token: string): Promise<boolean> => {
  try {
    const response = fetch(`${apiUrl}/admin/verifiy-token`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
