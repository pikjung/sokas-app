'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  status: string;
  message: string;
}

interface NotificationContextProps {
  alert: Notification | null;
  toast: boolean;
  setAlert: (alert: Notification | null) => void;
  setToast: (toast: boolean) => void;
  showNotification: (alert: Notification, duration?: number) => void; // Fungsi tambahan
}

const NotificationContext = createContext<NotificationContextProps>({
  alert: null,
  toast: false,
  setAlert: () => { },
  setToast: () => { },
  showNotification: () => { },
});

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Notification | null>(null);
  const [toast, setToast] = useState<boolean>(false);

  const showNotification = (alert: Notification, duration: number = 2000) => {
    setAlert(alert);
    setToast(true);
    setTimeout(() => {
      setAlert(null);
      setToast(false);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ alert, toast, setAlert, setToast, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
