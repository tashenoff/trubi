import React, { useState } from 'react';
import Image from 'next/image';
import SpecButton from './SpecButton';
import SpecModal from './SpecModal';
import AddToCartModal from './AddToCartModal';

interface Specification {
  name?: string;
  diameter?: string;
  weight: number;
  price?: number;
  pricePerMeter?: number;
  pricePerton?: number;
}

interface ProductItemProps {
  name: string;
  description: string;
  features: string[];
  image: string;
  gost: string;
  specifications: Specification[];
  type: 'bends' | 'pipes' | 'coldDeformed';
}

const ProductItem: React.FC<ProductItemProps> = ({
  name,
  description,
  features,
  image,
  gost,
  specifications,
  type
}) => {
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);

  const handleAddToCart = () => {
    setIsSpecModalOpen(false);
    setTimeout(() => {
      setIsAddToCartModalOpen(true);
    }, 300);
  };

  return (
    <>
      <div className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="px-6 py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {name}
          </h3>
          <p className="text-gray-600 mb-6">
            {description}
          </p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <SpecButton onClick={() => setIsSpecModalOpen(true)} />
        </div>
      </div>

      <SpecModal
        isOpen={isSpecModalOpen}
        onClose={() => setIsSpecModalOpen(false)}
        onAddToCart={handleAddToCart}
        title={name}
        gost={gost}
        specifications={specifications}
        type={type}
      />

      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={() => setIsAddToCartModalOpen(false)}
      />
    </>
  );
};

export default ProductItem; 