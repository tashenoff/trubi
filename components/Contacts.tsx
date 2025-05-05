import React from 'react';
import contactsData from '../data/products.json';

const Contacts = () => {
  const { phone, phone2, email, address } = contactsData.contacts;

  // Убираем все нецифровые символы из номеров телефона
  const formattedPhone = phone.replace(/\D/g, '');
  const formattedPhone2 = phone2.replace(/\D/g, '');

  // Ссылки на WhatsApp с номерами телефонов
  const whatsappUrl = `https://wa.me/${formattedPhone}`;
  const whatsappUrl2 = `https://wa.me/${formattedPhone2}`;

  return (
    <div id="contact" className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Контакты
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Свяжитесь с нами для получения дополнительной информации
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Изображение */}
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
              alt="Industrial pipes"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Контейнер с контактами и кнопками WhatsApp */}
          <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="w-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Обратная связь</h3>
              
              {/* Контактная информация */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href={`tel:${phone}`} className="text-gray-600 hover:text-gray-900">{phone}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href={`tel:${phone2}`} className="text-gray-600 hover:text-gray-900">{phone2}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href={`mailto:${email}`} className="text-gray-600 hover:text-gray-900">{email}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{address}</span>
                </div>
              </div>

              {/* Кнопки WhatsApp */}
              <div className="space-y-3">
                <button
                  onClick={() => window.open(whatsappUrl, '_blank')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Написать в WhatsApp ({phone})
                </button>
                <button
                  onClick={() => window.open(whatsappUrl2, '_blank')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Написать в WhatsApp ({phone2})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
