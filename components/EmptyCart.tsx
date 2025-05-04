import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <ShoppingCart className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Ваша корзина пуста
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Похоже, вы еще не добавили товары в корзину. 
        Перейдите в каталог, чтобы выбрать необходимую продукцию.
      </p>
      <Link 
        href="/#products" 
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Перейти к каталогу
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 ml-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </Link>
    </div>
  );
};

export default EmptyCart; 