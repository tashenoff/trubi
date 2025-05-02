import React from 'react';
import contactsData from '../data/products.json';

const Contacts = () => {
  const { phone, email, address } = contactsData.contacts;

  // Убираем все нецифровые символы из номера телефона
  const formattedPhone = phone.replace(/\D/g, ''); // Убираем все символы, кроме цифр

  // Ссылка на WhatsApp с номером телефона
  const whatsappUrl = `https://wa.me/${formattedPhone}`;

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

          {/* Контейнер с кнопкой WhatsApp */}
          <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="w-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Обратная связь</h3>
              {/* Кнопка для перехода в WhatsApp */}
              <button
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Написать в WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
