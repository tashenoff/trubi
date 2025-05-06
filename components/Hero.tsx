import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Определяем мобильное устройство
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Проверяем при монтировании
    checkMobile();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkMobile);

    // Очищаем слушатель
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div id="home" className="relative h-[700px] overflow-hidden bg-gray-900 text-white">
      {/* Видео для десктопа */}
      {!isMobile ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/GMS-video.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Изображение для мобильных */
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>
      )}

      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-10" />

      {/* Контент поверх видео/изображения */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Продажа бесшовных труб и отводов
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Высококачественные бесшовные трубы и отводы для промышленного применения
          </p>
          <div className="mt-10">
            <a
              href="#products"
              className="group inline-flex items-center bg-green-500 text-white rounded-md text-base font-medium hover:bg-green-600 transition-colors duration-300"
            >
              <span className="px-6 py-3">Посмотреть цены</span>
              <div className="border-l border-white/20 h-full px-4 py-3">
                <svg 
                  className="w-5 h-5 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
