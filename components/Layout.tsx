import React from 'react';
import YandexMetrika from './YandexMetrika';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from './Toast';
import { useToast } from '../context/ToastContext';
import FloatingCallButton from './FloatingCallButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { message, isVisible, hideToast } = useToast();

  return (
    <>
      <YandexMetrika />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        <Footer />
        <FloatingCallButton />
        <Toast
          message={message}
          isVisible={isVisible}
          onClose={hideToast}
        />
      </div>
    </>
  );
};

export default Layout; 