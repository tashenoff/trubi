import React from 'react';
import Link from 'next/link';
import contactsData from '../data/products.json';
import CartIcon from './CartIcon';

const Navbar = () => {
  const { phone } = contactsData.contacts;

  return (
    <nav className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold text-xl">ТрубПром</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Главная
              </Link>
              <Link href="/#products" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Продукция
              </Link>
              <Link href="/#advantages" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Преимущества
              </Link>
              <Link href="/#contact" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Контакты
              </Link>
              <div className="text-white font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm">{phone}</span>
              </div>
              <CartIcon />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 