import React from 'react';
import productsData from '../data/products.json';
import ProductItem from './ProductItem';

const getProductType = (index: number): 'bends' | 'pipes' | 'coldDeformed' => {
  switch (index) {
    case 0:
      return 'bends';
    case 1:
      return 'pipes';
    case 2:
      return 'coldDeformed';
    default:
      return 'pipes';
  }
};

const Products = () => {
  return (
    <div id="products" className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Наша продукция
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Качественные трубы и отводы для вашего производства
          </p>
        </div>
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {productsData.products.map((product, index) => (
            <ProductItem
              key={product.id}
              name={product.name}
              description={product.description}
              features={product.features}
              image={product.image}
              gost={product.gost}
              specifications={product.specifications}
              type={getProductType(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products; 