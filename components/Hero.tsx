import React from 'react';

const Hero = () => {
  return (
    <div id="home" className="relative bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Производство труб и отводов
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Высококачественные бесшовные трубы и отводы для промышленного применения
          </p>
          <div className="mt-10">
            <a
              href="#products"
              className="inline-block bg-primary text-white px-8 py-3 border border-transparent rounded-md text-base font-medium hover:bg-secondary"
            >
              Наша продукция
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 