import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Подтверждение' },
    { number: 2, title: 'Данные получателя' }
  ];

  return (
    <div className="flex items-center mb-8 text-sm">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center">
            <div className={`
              w-6 h-6 rounded-full flex items-center justify-center
              ${currentStep >= step.number 
                ? 'bg-primary text-white' 
                : 'bg-white text-gray-400 border border-gray-300'}
              text-xs font-medium
            `}>
              {step.number}
            </div>
            <span className={`
              ml-2
              ${currentStep >= step.number ? 'text-primary' : 'text-gray-400'}
            `}>
              {step.title}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <ChevronRight 
              size={16}
              className="mx-2 text-gray-300"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator; 