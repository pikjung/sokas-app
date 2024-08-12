import { useState, useCallback } from 'react';
import axios from 'axios';
import { getToken } from '../utils/getToken';
import apiUrl from '@/app/config'

const useFetchData = (endpoint: string, authenticate: () => void, showNotification: (arg: { status: string, message: string }) => void) => {
  const [data, setData] = useState<any>(null);

  const fetchData = useCallback(async () => {

    try {
      const response = await axios.get(`${apiUrl}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setData(response.data.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showNotification({
          status: "error",
          message: error.response.data.error
        });
        authenticate();
      } else {
        console.error('Error:', error);
      }
    } finally {
    }
  }, [endpoint, authenticate, showNotification]);

  return { data, fetchData };
};

export default useFetchData;
