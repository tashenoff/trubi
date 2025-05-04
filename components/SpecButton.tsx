import React from 'react';

interface SpecButtonProps {
  onClick: () => void;
}

const SpecButton: React.FC<SpecButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 w-full inline-flex items-center bg-green-500 text-white rounded-md text-base font-medium hover:bg-green-600 transition-colors duration-300"
    >
      <span className="flex-1 px-6 py-3">Размеры и цены</span>
      <div className="border-l border-white/20 h-full px-4 py-3">
        <svg 
          className="h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </button>
  );
};

export default SpecButton; 