// pages/_app.tsx

import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { verifyToken } from '../handler/authHandler';
import { getToken } from '../utils/getToken';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Efek samping untuk memeriksa status autentikasi pengguna di setiap perubahan halaman
  useEffect(() => {
    const authenticate = async () => {
      try {
        // Lakukan autentikasi pengguna
        await verifyToken(getToken());
      } catch (error) {
        // Jika autentikasi gagal, arahkan pengguna ke halaman login
        router.push('/login');
      }
    };

    authenticate();
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;