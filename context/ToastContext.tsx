import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

interface ToastContextType {
  showToast: (message: string) => void;
  message: string;
  isVisible: boolean;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = (newMessage: string) => {
    setMessage(newMessage);
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, message, isVisible, hideToast }}>
      {children}
      <Toast 
        message={message}
        isVisible={isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 