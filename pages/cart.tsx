import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Layout from '../components/Layout';
import CheckoutForm from '../components/CheckoutForm';
import StepIndicator from '../components/StepIndicator';
import { useToast } from '../context/ToastContext';
import ThankYou from '../components/ThankYou';
import EmptyCart from '../components/EmptyCart';
import Breadcrumbs from '../components/Breadcrumbs';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface CheckoutFormData {
  name: string;
  company: string;
  phone: string;
  city: string;
  address: string;
}

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const newValues = items.reduce((acc, item) => {
      acc[item.name] = item.quantity.toString();
      return acc;
    }, {} as { [key: string]: string });
    setInputValues(newValues);
  }, [items]);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrder = async (formData: CheckoutFormData) => {
    const itemsList = items
      .map(item => `${item.name} - ${item.quantity} шт. x ${item.price.toLocaleString()} ₸`)
      .join('\n');

    const total = calculateTotal();
    const message = `🆕 Новый заказ!\n\n` +
      `👤 Клиент: ${formData.name}\n` +
      `🏢 Компания: ${formData.company}\n` +
      `📱 Телефон: ${formData.phone}\n` +
      `🏙️ Город: ${formData.city}\n` +
      `📍 Адрес: ${formData.address}\n\n` +
      `📦 Заказ:\n${itemsList}\n\n` +
      `💰 Общая сумма: ${total.toLocaleString()} ₸\n\n` +
      `🕒 Дата: ${new Date().toLocaleString('ru-RU')}`;

    try {
      const response = await fetch('/api/sendOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message
        }),
      });

      if (response.ok) {
        clearCart();
        showToast('Заказ успешно отправлен!');
        setShowThankYou(true);
      } else {
        throw new Error('Failed to send order');
      }
    } catch (error) {
      console.error('Error sending order:', error);
      showToast('Ошибка при отправке заказа. Пожалуйста, попробуйте позже.');
    }
  };

  const breadcrumbItems = [
    { label: 'Продукция', href: '/#products' },
    { label: 'Корзина' }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        {!mounted ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Загрузка...</p>
          </div>
        ) : showThankYou ? (
          <ThankYou onClose={() => setShowThankYou(false)} />
        ) : items.length === 0 ? (
          <EmptyCart />
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
                <div className="bg-white shadow-lg rounded-lg">
                  {/* Мобильная версия */}
                  <div className="md:hidden">
                    {items.map((item) => (
                      <div key={item.name} className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-4">
                            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="text-gray-400 hover:text-red-500 active:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1.5 -m-1.5"
                            aria-label="Удалить"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {item.price.toLocaleString()} ₸ × 
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={inputValues[item.name] || ''}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                setInputValues(prev => ({
                                  ...prev,
                                  [item.name]: value
                                }));
                                if (value) {
                                  updateQuantity(item.name, parseInt(value));
                                }
                              }}
                              onBlur={(e) => {
                                const value = e.target.value;
                                if (!value) {
                                  updateQuantity(item.name, 1);
                                  setInputValues(prev => ({
                                    ...prev,
                                    [item.name]: '1'
                                  }));
                                }
                              }}
                              className="w-16 mx-2 px-2 py-1 border rounded focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {(item.price * item.quantity).toLocaleString()} ₸
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">Итого:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {calculateTotal().toLocaleString()} ₸
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Десктопная версия */}
                  <div className="hidden md:block overflow-x-auto">
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
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={inputValues[item.name] || ''}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[^0-9]/g, '');
                                  setInputValues(prev => ({
                                    ...prev,
                                    [item.name]: value
                                  }));
                                  if (value) {
                                    updateQuantity(item.name, parseInt(value));
                                  }
                                }}
                                onBlur={(e) => {
                                  const value = e.target.value;
                                  if (!value) {
                                    updateQuantity(item.name, 1);
                                    setInputValues(prev => ({
                                      ...prev,
                                      [item.name]: '1'
                                    }));
                                  }
                                }}
                                className="w-16 mx-2 px-2 py-1 border rounded focus:ring-primary focus:border-primary"
                              />
                            </td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                              {(item.price * item.quantity).toLocaleString()} ₸
                            </td>
                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <motion.button
                                onClick={() => removeFromCart(item.name)}
                                className="text-gray-400 hover:text-red-500 active:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1.5 -m-1.5"
                                whileTap={{ scale: 0.95 }}
                                aria-label="Удалить"
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
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
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
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
  );
};

export default CartPage; 