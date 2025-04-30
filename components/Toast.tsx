import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      
      // Запускаем таймер только когда toast становится видимым
      const timer = setTimeout(() => {
        setIsShowing(false);
        // Даем время для анимации исчезновения перед закрытием
        setTimeout(() => {
          onClose();
        }, 300);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <div 
        className={`bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center transition-all duration-300 ease-in-out ${
          isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <svg 
          className="w-6 h-6 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7"
          />
        </svg>
        {message}
      </div>
    </div>
  );
};

export default Toast; 