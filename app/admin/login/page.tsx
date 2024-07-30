"use client";

import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { getToken, setToken, deleteToken } from "../utils/getToken";
import { verifyToken } from "../handler/authHandler";
import apiUrl from "@/app/config";
import axios from "axios";

import Toast from "../components/Toast";
import TextInput from "../components/input/TextInput";

export default function Home() {
  const router = useRouter()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })

  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append("username", username)
    formData.append("password", password)

    await axios.post(`${apiUrl}/admin/login`, formData,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      }
    )
      .then((res) => {
        setToken(res.data.data.token)
        setAlert({
          status: 'success',
          message: `${res.data.message}`
        })
        setToast(true)
        setTimeout(() => {
          setToast(false)
          if (res.data.data.role === 'admin') {
            router.push('/admin')
          } else if (res.data.data.role === 'sales') {
            router.push('/sales')
          } else if (res.data.data.role === 'ssAdmin') {
            router.push('/ssAdmin')
          } else {
            deleteToken()
            router.push('/admin/login')
          }
        }, 2000);
      }).catch((error) => {
        if (error.response.status === 401) {
          setAlert({
            status: 'error',
            message: error.response.data.message
          })
          setToast(true)
          setTimeout(() => {
            setToast(false)
          }, 2000);
        }
      });
  };

  useEffect(() => {
    const authenticate = async () => {
      if (!getToken()) {
        return null
      }

      const authorization = await verifyToken(getToken());

      if (authorization.success === false) {
        setAlert({
          status: "warning",
          message: "You are not authorized"
        })
        setToast(true)
        setTimeout(() => {
          setToast(false)
        }, 2000);
        router.push('/admin/login');
      } else {
        router.push('/admin');
      }

    };

    authenticate();
  }, [router]);

  return (


    <div className="flex flex-col bg-indigo-500 p-4 lg:flex-row justify-center items-center min-h-screen">
      {toast && (
        <Toast status={alert.status} message={alert.message} />
      )}
      <div className="w-full lg:w-1/2 hidden lg:block bg-gradient-to-r from-indigo-600 to-indigo-400 h-64 lg:h-screen">
        {/* <Image
      src="/images/login/login-admin.jpg"
      width={1000}
      height={1000}
      alt="Login"
      className="object-cover w-full h-full"
    /> */}
      </div>
      <div className="w-full lg:w-1/2 border bg-white rounded shadow flex h-auto lg:h-screen px-4 lg:px-16 py-8 lg:py-0">
        <div className="w-full my-auto">
          <h2 className="text-2xl text-slate-500 font-semibold">Login</h2>
          <p className="font-light text-slate-500 mb-4">
            Halo, selamat datang kembali!
          </p>
          <form onSubmit={formHandler}>
            <TextInput label="Username" icon={FaRegUser}>
              <input
                name="username"
                type="text"
                className="grow w-full"
                placeholder="Username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </TextInput>
            <TextInput label="Password" icon={RiLockPasswordFill}>
              <input
                name="password"
                type="password"
                className="grow w-full"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </TextInput>
            {isError && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="rounded-xl w-full mt-6 flex justify-center items-center bg-indigo-600 p-2 text-white hover:bg-indigo-700"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>


  );
}
