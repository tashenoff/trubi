import React from 'react';
import { CartProvider } from '../context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};

export default Layout; 