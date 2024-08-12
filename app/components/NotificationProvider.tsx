"use client"
import React from 'react';
import { useNotification } from '../context/NotificationContext';
import Toast from '../admin/components/Toast';

const NotificationProvider: React.FC = () => {
  const { alert, toast } = useNotification();

  return (
    <>
      {toast && alert?.message && (
        <Toast status={alert.status} message={alert.message} />
      )}
    </>
  );
};

export default NotificationProvider;
