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
        setToken(res.data.data)
        setAlert({
          status: 'success',
          message: res.data.message
        })
        setToast(true)
        setTimeout(() => {
          setToast(false)
        }, 2000);
        router.push('/admin')
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


    <div className="flex justify-center items-center" >
      {toast && (
        <Toast status={alert.status} message={alert.message} />
      )}
      <div className="flex w-full">
        <div className="w-1/2 bg-gradient-to-r from-indigo-600 to-indigo-400">
          {/* <Image
            src="/images/login/login-admin.jpg"
            width={1000}
            height={1000}
            alt="Login"
            className="object-cover w-full h-full"
          /> */}
        </div>
        <div className="w-1/2 flex h-screen px-16">
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
                  className="grow"
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
                  className="grow"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </TextInput>
              {isError && <p className="text-red-500 text-sm">{error}</p>}
              <div className="float-right underline mt-4 mb-4 text-slate-500">
                Forgot Password?
              </div>
              <button
                type="submit"
                className="rounded-xl w-full mt-6 my-auto flex justify-center items-center bg-indigo-600 p-2 text-white hover:bg-indigo-700"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div >
  );
}
