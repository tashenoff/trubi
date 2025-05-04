import React from 'react';

interface PriceBadgeProps {
  price: number;
  type: 'bends' | 'pipes' | 'coldDeformed';
  className?: string;
}

const PriceBadge: React.FC<PriceBadgeProps> = ({ price, type, className = '' }) => {
  return (
    <div className={`bg-green-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm bg-opacity-90 ${className}`}>
      от {price.toLocaleString()} ₸
      <span className="text-xs ml-1">
        {type === 'bends' ? '/шт' : '/м'}
      </span>
    </div>
  );
};

export default PriceBadge; 