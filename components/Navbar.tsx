import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white font-bold text-xl">ТрубПром</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Главная
              </a>
              <a href="#products" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Продукция
              </a>
              <a href="#advantages" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Преимущества
              </a>
              <a href="#contact" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 