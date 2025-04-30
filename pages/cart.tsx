import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import StepIndicator from '../components/StepIndicator';

interface CheckoutFormData {
  name: string;
  company: string;
  phone: string;
  city: string;
  address: string;
}

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrder = (formData: CheckoutFormData) => {
    const itemsList = items
      .map(item => `${item.name} - ${item.quantity} шт. x ${item.price.toLocaleString()} ₸`)
      .join('\n');

    const total = calculateTotal();
    const text = `Здравствуйте!\n\nИнформация о заказчике:\nИмя: ${formData.name}\nКомпания: ${formData.company}\nТелефон: ${formData.phone}\nГород: ${formData.city}\nАдрес: ${formData.address}\n\nЗаказ:\n${itemsList}\n\nОбщая сумма: ${total.toLocaleString()} ₸`;
    const encodedText = encodeURIComponent(text);
    const phoneNumber = '79000000000'; // Замените на реальный номер телефона
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Layout>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-2xl font-bold mb-8 text-center">Корзина</h1>
            
            {!mounted ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Загрузка...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Ваша корзина пуста</p>
              </div>
            ) : (
              <>
                <StepIndicator currentStep={isCheckoutStep ? 2 : 1} />
                
                {isCheckoutStep ? (
                  <div className="max-w-2xl mx-auto">
                    <CheckoutForm 
                      onSubmit={handleOrder}
                      onBack={() => setIsCheckoutStep(false)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Наименование
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Цена
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Кол-во
                            </th>
                            <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Сумма
                            </th>
                            <th className="px-3 sm:px-6 py-3 w-16"></th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {items.map((item) => (
                            <tr key={item.name}>
                              <td className="px-3 sm:px-6 py-4 whitespace-normal text-sm text-gray-900">
                                {item.name}
                              </td>
                              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                {item.price.toLocaleString()} ₸
                              </td>
                              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.name, parseInt(e.target.value) || 1)}
                                  className="w-16 sm:w-20 px-2 py-1 border rounded focus:ring-primary focus:border-primary"
                                />
                              </td>
                              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                {(item.price * item.quantity).toLocaleString()} ₸
                              </td>
                              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => removeFromCart(item.name)}
                                  className="text-red-600 hover:text-red-900 p-2"
                                  aria-label="Удалить"
                                >
                                  <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-5 w-5" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                  >
                                    <path 
                                      fillRule="evenodd" 
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                      clipRule="evenodd" 
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td colSpan={3} className="px-3 sm:px-6 py-4 text-right text-sm font-medium text-gray-900">
                              Итого:
                            </td>
                            <td className="px-3 sm:px-6 py-4 text-right text-sm font-medium text-gray-900">
                              {calculateTotal().toLocaleString()} ₸
                            </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={clearCart}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Очистить корзину
                      </button>
                      <button
                        onClick={() => setIsCheckoutStep(true)}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Продолжить
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </Layout>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage; 