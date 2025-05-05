import React from 'react';
import { CartProvider } from '../context/CartContext';
import YandexMetrika from './YandexMetrika';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <YandexMetrika />
      {children}
    </CartProvider>
  );
};

export default Layout; 