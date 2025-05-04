import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import AddToCartModal from './AddToCartModal';

interface ProductCardProps {
  name: string;
  price: number;
  image?: string;
  weight: number;
  type: 'bends' | 'pipes' | 'coldDeformed';
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, weight, type }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart([{
      name,
      price,
      quantity: 1,
      weight,
      type
    }]);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {image && (
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              {price.toLocaleString()} ₸
            </span>
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              В корзину
            </button>
          </div>
        </div>
      </div>

      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard; 