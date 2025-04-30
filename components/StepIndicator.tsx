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
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 
                  ${currentStep >= step.number 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-gray-300 bg-white text-gray-500'}`}
              >
                {step.number}
              </div>
              <span className={`mt-2 text-xs ${currentStep >= step.number ? 'text-primary' : 'text-gray-500'}`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`w-24 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator; 