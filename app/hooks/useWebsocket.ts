import { useEffect } from 'react';
import { useNotification } from '@/app/context/NotificationContext';
import axios from 'axios';
import apiUrl from '../config';


const useWebSocket = (userId: string) => {
  const { showNotification } = useNotification();

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000?userId=${userId}`);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      if (Notification.permission === "granted") {
        console.log('notifikasi aktif')
        new Notification("Orderan", {
          body: event.data
        });
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, [userId, showNotification]);
};

export const sendMessageToUser = (userId: string, message: string) => {
  try {
    axios.post(`${apiUrl}/send-notifications`, {
      userId: userId,
      notification: message
    })
  } catch (error) {
    console.log(error);
  }
}

export default useWebSocket;
