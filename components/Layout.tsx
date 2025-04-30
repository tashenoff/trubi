import React from 'react';
import { CartProvider } from '../context/CartContext';
import FloatingCart from './FloatingCart';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
};

export default Layout;