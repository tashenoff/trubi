import React from 'react';

interface CheckoutFormData {
  name: string;
  company: string;
  phone: string;
  city: string;
  address: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = React.useState<CheckoutFormData>({
    name: '',
    company: '',
    phone: '',
    city: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Данные получателя</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Имя *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base"
              placeholder="Введите ваше имя"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Название компании
            </label>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base"
              placeholder="Название вашей компании"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефона *
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base"
              placeholder="+7 (XXX) XXX-XX-XX"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Город *
            </label>
            <input
              type="text"
              name="city"
              id="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base"
              placeholder="Введите город"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Адрес *
            </label>
            <textarea
              name="address"
              id="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows={4}
              className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base"
              placeholder="Введите адрес доставки"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-1/2 inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Вернуться к заказу
          </button>
          <button
            type="submit"
            className="w-full sm:w-1/2 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Отправить заказ
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm; 