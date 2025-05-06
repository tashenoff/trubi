import React from 'react';
import YandexMetrika from './YandexMetrika';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <YandexMetrika />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout; 