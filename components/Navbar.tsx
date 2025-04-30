import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import contactsData from '../data/products.json';

const Navbar = () => {
  const { phone } = contactsData.contacts;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSectionClick = async (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (router.pathname !== '/') {
      await router.push('/');
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-primary"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a 
                href="/"
                onClick={(e) => handleSectionClick(e, 'home')}
                className="text-white font-bold text-xl transition-transform hover:scale-105"
              >
                ТрубПром
              </a>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a 
                  href="/"
                  onClick={(e) => handleSectionClick(e, 'home')}
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Главная
                </a>
                <a 
                  href="#products"
                  onClick={(e) => handleSectionClick(e, 'products')}
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Продукция
                </a>
                <a 
                  href="#advantages"
                  onClick={(e) => handleSectionClick(e, 'advantages')}
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Преимущества
                </a>
                <a 
                  href="#contact"
                  onClick={(e) => handleSectionClick(e, 'contact')}
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Контакты
                </a>
                <div className="text-white font-medium flex items-center group">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm hover:text-gray-300 transition-colors duration-200">{phone}</span>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
              >
                <span className="sr-only">Открыть меню</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`
            md:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
            <a
              href="/"
              onClick={(e) => handleSectionClick(e, 'home')}
              className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Главная
            </a>
            <a
              href="#products"
              onClick={(e) => handleSectionClick(e, 'products')}
              className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Продукция
            </a>
            <a
              href="#advantages"
              onClick={(e) => handleSectionClick(e, 'advantages')}
              className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Преимущества
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              Контакты
            </a>
            <div className="text-white font-medium flex items-center px-3 py-2 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 transition-transform group-hover:rotate-12"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <a href={`tel:${phone}`} className="text-sm hover:text-gray-300 transition-colors duration-200">
                {phone}
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer для фиксированного navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar; 