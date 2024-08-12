'use client'

import Container from "../components/Container"
import Navbar from "../components/Navbar"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { verifyToken } from '../handler/authHandler'
import { getToken } from '../utils/getToken'
import Toast from "../components/Toast"

export default function Settings() {
  const router = useRouter();
  const [toast, setToast] = useState(false)
  const [alert, setAlert] = useState({
    status: "",
    message: ""
  })

  useEffect(() => {
    const authenticate = async () => {
      if (!getToken()) {
        router.push('/admin/login');
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
      }

    };

    authenticate();
  }, [router]);
  return (
    <Container>
      {toast && (
        <Toast status={alert.status} message={alert.message} />
      )}
      <Navbar />
    </Container>
  )
}
