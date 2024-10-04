'use client';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/admin/utils/getToken';
import { verifyToken } from '@/app/spv/handler/authHandler';
import { useNotification } from '@/app/context/NotificationContext';

interface UserData {
  user_id: string;
  name: string;
  role: string;
}

const useSalesAuth = () => {  // Nama hook diperbaiki
  const router = useRouter();
  const { showNotification } = useNotification();
  const [userData, setUserData] = useState<UserData | null>(null);

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

        const { user_id, name, role } = res.data.data;
        setUserData({ user_id: user_id, name: name, role: role });
      })

  }, [router, showNotification, setUserData]);

  return { authenticate, showNotification, userData };
};

export default useSalesAuth; // Nama hook diperbaiki
