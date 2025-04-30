import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Подтверждение заказа' },
    { number: 2, title: 'Данные получателя' }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex items-center">
        {/* Линия */}
        <div className="absolute top-3 left-0 right-0 h-[1px] bg-[#1E375A]" />
        
        {/* Шаги */}
        <div className="relative z-10 flex justify-between w-full">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`
                flex flex-col items-center
                ${step.number === 1 ? 'text-left' : 'text-right'}
              `}
            >
              <div 
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-sm bg-white
                  ${currentStep >= step.number 
                    ? 'bg-[#1E375A] text-white' 
                    : 'text-[#1E375A] border border-[#1E375A]'
                  }
                `}
              >
                {step.number}
              </div>
              <span 
                className={`
                  mt-2 text-sm whitespace-normal text-center w-24 sm:w-32
                  ${currentStep >= step.number ? 'text-[#1E375A]' : 'text-gray-400'}
                `}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator; 