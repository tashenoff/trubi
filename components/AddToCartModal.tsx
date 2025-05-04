import React from 'react';
import { useRouter } from 'next/router';
import Modal from './Modal';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { items, calculateTotal } = useCart();
  
  const handleContinueShopping = () => {
    onClose();
  };

  const handleGoToCart = () => {
    router.push('/cart');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Товар добавлен в корзину
        </h3>
        
        <div className="mb-6">
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span className="text-gray-500">{item.name}</span>
                <span className="text-gray-900">{item.quantity} шт.</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Итого:</span>
                <span>{calculateTotal().toLocaleString()} ₸</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            type="button"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={handleGoToCart}
          >
            Перейти в корзину
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={handleContinueShopping}
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddToCartModal; 