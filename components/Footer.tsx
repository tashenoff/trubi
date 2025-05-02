import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useContacts } from './useContacts';
import contactsData from '../data/products.json';
import Image from 'next/image';


const Footer = () => {
  const { phone, email, address } = useContacts();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Логотип"
                width={120}
                height={32}
              />
            
            </div>
            <div className="space-y-4">
              <p className="text-gray-300">Gas Metal Service — Ваш надежный поставщик труб и металлопроката. Качество, надежность и профессионализм — наш приоритет.</p>
            </div>
          </div>
          <div >
            <h3 className="text-xl font-bold mb-6">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-white" />
                <div>
                  <a href={`tel:${phone}`} className="text-gray-300 hover:text-white transition-colors">
                    {phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-white" />
                <div>
                  <a href={`mailto:${email}`} className="text-gray-300 hover:text-white transition-colors">
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-white" />
                <div>
                  <p className="text-gray-300">{address}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <h3 className="text-xl font-bold mb-6">Навигация</h3>
            <nav className="space-y-2">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Главная</a>
              <a href="/products" className="text-gray-300 hover:text-white transition-colors">Продукция</a>
              <a href="/services" className="text-gray-300 hover:text-white transition-colors">Услуги</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">О компании</a>
              <a href="/contacts" className="text-gray-300 hover:text-white transition-colors">Контакты</a>
            </nav>
          </div> */}
          {/* <div>
            <h3 className="text-xl font-bold mb-6">Быстрые ссылки</h3>
            <nav className="space-y-2">
              <a href="/delivery" className="text-gray-300 hover:text-white transition-colors">Доставка</a>
              <a href="/payment" className="text-gray-300 hover:text-white transition-colors">Оплата</a>
              <a href="/guarantees" className="text-gray-300 hover:text-white transition-colors">Гарантии</a>
              <a href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              <a href="/blog" className="text-gray-300 hover:text-white transition-colors">Блог</a>
            </nav>
          </div> */}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex lg:flex-row flex-col lg:justify-between items-center">
            <p className="text-gray-400"> 2025 Gas Metal Service. Все права защищены.</p>
            {/* <div className="flex space-x-4">
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Пользовательское соглашение</a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Политика конфиденциальности</a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;