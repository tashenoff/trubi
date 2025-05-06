import React from 'react';

interface InfoTextProps {
  text: string;
  className?: string;
}

const InfoText: React.FC<InfoTextProps> = ({ 
  text,
  className = ''
}) => {
  return (
    <div className={`bg-blue-50 py-2 px-4 text-sm ${className}`}>
      <p className="text-center">{text}</p>
    </div>
  );
};

export default InfoText; 