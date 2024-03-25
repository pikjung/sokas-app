"use client";

import { useState, useEffect } from "react";
import TextInput from "../components/input/TextInput";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { authHandler, verifyToken } from "../handler/authHandler";
import { useRouter } from "next/navigation";
import { getToken, setToken, deleteToken } from "../utils/getToken";

export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken(); // Ganti dengan cara yang sesuai untuk mendapatkan token
    if (token) {
      verifyToken(token)
        .then((isValid) => {
          setAuthenticated(isValid);
        })
        .catch((error) => {
          console.error('Error:', error);
          setAuthenticated(false);
        });
    } else {
      setAuthenticated(false);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authHandler(username, password);
      if (response.status === "success") {
        router.push("/admin");
        setToken(response.data);
      } else {
        alert("Username dan password salah");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
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
    </div>
  );
}
