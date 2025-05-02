import React from 'react';

const Hero = () => {
  return (
    <div id="home" className="relative h-[700px] overflow-hidden bg-gray-900 text-white">
      {/* Видео-фон */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/GMS-video.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-10" />

      {/* Контент поверх видео */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
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
