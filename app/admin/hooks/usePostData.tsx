import { useCallback } from 'react';
import axios from 'axios';
import { getToken } from '../utils/getToken';
import apiUrl from '@/app/config';

const usePostData = (endpoint: string, authenticate: () => void, showNotification: (arg: { status: string, message: string }) => void) => {
  const postData = useCallback(async (data: any) => {
    try {
      const response = await axios.post(`${apiUrl}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      showNotification({
        status: "success",
        message: response.data.status
      });
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
    }
  }, [endpoint, authenticate, showNotification]);

  const putData = useCallback(async (data: any) => {
    try {
      const response = await axios.put(`${apiUrl}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      showNotification({
        status: "success",
        message: response.data.status
      });
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
    }
  }, [endpoint, authenticate, showNotification])

  const deleteData = useCallback(async () => {
    try {
      const response = await axios.delete(`${apiUrl}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      showNotification({
        status: "success",
        message: response.data.status
      });
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
    }
  }, [endpoint, authenticate, showNotification])

  return { postData, putData, deleteData };
};

export default usePostData;
