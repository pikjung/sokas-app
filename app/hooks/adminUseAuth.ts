'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/admin/utils/getToken';
import { verifyToken } from '@/app/admin/handler/authHandler';
import { useNotification } from '@/app/context/NotificationContext';

const useAdminAuth = () => {  // Nama hook diperbaiki
  const router = useRouter();
  const { showNotification } = useNotification();

  const authenticate = useCallback(async () => {

    const token = getToken()
    if (!token) {
      router.push('/admin/login');
      return null
    }

    await verifyToken(token)
      .then(res => {
        if (res.success === false) {
          showNotification({
            status: "warning",
            message: "You are not authorized"
          })
          router.push('/admin/login');
        }
      })

  }, [router, showNotification]);

  return { authenticate, showNotification };
};

export default useAdminAuth; // Nama hook diperbaiki
