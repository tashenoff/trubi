import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';

const FloatingCart = () => {
  const { totalItems } = useCart();
  const router = useRouter();
  const isCartPage = router.pathname === '/cart';
  const [clientTotalItems, setClientTotalItems] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [runningNumber, setRunningNumber] = useState(0);
  const [previousTotalItems, setPreviousTotalItems] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      setClientTotalItems(totalItems);
      setPreviousTotalItems(totalItems);
      return;
    }

    if (totalItems > 0) {
      setIsAnimating(true);
      setRunningNumber(previousTotalItems);
      
      const interval = setInterval(() => {
        setRunningNumber(prev => {
          if (prev >= totalItems) {
            clearInterval(interval);
            setIsAnimating(false);
            setPreviousTotalItems(totalItems);
            setClientTotalItems(totalItems);
            return totalItems;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
    setClientTotalItems(totalItems);
  }, [totalItems]);

  if (isCartPage) return null;

  return (
    <Link 
      href="/cart" 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
    >
      <div className="relative inline-flex items-center p-3 bg-primary rounded-full shadow-lg hover:shadow-xl transform hover:scale-110" style={{ zIndex: 9999 }}>
        <svg
          className="h-7 w-7 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2.5 py-1.5 text-sm font-bold leading-none text-white bg-red-600 rounded-full">
          {isAnimating ? runningNumber : clientTotalItems}
        </span>
      </div>
    </Link>
  );
};

export default FloatingCart;
