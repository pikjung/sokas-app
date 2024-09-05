import { useEffect } from 'react';
import { useNotification } from '@/app/context/NotificationContext';
import axios from 'axios';
import apiUrl from '../config';

const useWebSocket = (userId: string) => {
  const { showNotification } = useNotification();

  useEffect(() => {
    let socket: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const handleOpen = () => {
      console.log('WebSocket connection opened');
    };

    const handleMessage = (event: MessageEvent) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        return;
      }

      // Check if this notification was already shown recently (e.g., within the last 5 seconds)
      const lastNotification = localStorage.getItem('lastNotification');
      const now = new Date().getTime();

      if (lastNotification && now - parseInt(lastNotification) < 5000) {
        console.log('Notification suppressed to avoid duplication');
        return;
      }

      if (Notification.permission === "granted") {
        showNotification({
          status: data.status,
          message: data.message
        });

        new Notification(data.title, {
          body: `${data.title}: ${data.message}`
        });

        // Update last notification time
        localStorage.setItem('lastNotification', now.toString());
      } else {
        console.log('Notification permission not granted');
      }
    };

    const handleClose = () => {
      console.log('WebSocket connection closed, attempting to reconnect in 5 seconds...');
      reconnectTimeout = setTimeout(connectWebSocket, 5000);
    };

    const handleError = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    const connectWebSocket = () => {
      socket = new WebSocket(`ws://localhost:8000?userId=${userId}`);

      socket.onopen = handleOpen;
      socket.onmessage = handleMessage;
      socket.onclose = handleClose;
      socket.onerror = handleError;
    };

    connectWebSocket();

    return () => {
      clearTimeout(reconnectTimeout);
      socket.close();
    };
  }, [userId, showNotification]);
};

export const sendMessageToUser = (
  userId: string,
  status: string,
  title: string,
  message: string
) => {
  try {
    axios.post(`${apiUrl}/send-notifications`, {
      userId,
      status,
      title,
      message
    });
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

export default useWebSocket;
