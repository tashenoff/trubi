import React from 'react';

const CTA = () => {
  return (
    <div className="relative overflow-hidden bg-[#0B1829]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#0B1829]"></div>
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between lg:space-x-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              <span className="block mb-2">Готовы начать сотрудничество?</span>
              <span className="block text-2xl sm:text-3xl font-medium text-gray-300 mt-4">
                Свяжитесь с нами прямо сейчас.
              </span>
            </h2>
          </div>
          <div className="mt-8 lg:mt-0 flex lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow-lg">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-lg font-medium rounded-md text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                <span>Связаться</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-3" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA; 