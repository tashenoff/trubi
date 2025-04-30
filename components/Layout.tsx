import React from 'react';
import { CartProvider } from '../context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    </CartProvider>
  );
};

export default Layout; 