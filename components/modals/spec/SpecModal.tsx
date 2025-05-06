import React from 'react';
import { X } from 'lucide-react';
import { SpecModalProps } from './types';
import { useModalAnimation } from './hooks/useModalAnimation';
import { useSpecifications } from './hooks/useSpecifications';
import { SpecTable } from './components/SpecTable';
import { CURRENCY } from './config';
import InfoText from '../../InfoText';
import { cn } from '../../../utils/cn';

export const SpecModal = React.memo(({ 
  isOpen, 
  onClose, 
  onAddToCart, 
  title, 
  gost, 
  specifications, 
  type 
}: SpecModalProps) => {
  const { isVisible, isAnimating, handleClose } = useModalAnimation({ isOpen, onClose });
  const { 
    selectedItems,
    activeSpecifications,
    total,
    handleItemToggle,
    handleAddToCart,
  } = useSpecifications({ specifications, type });

  if (!isVisible) return null;

  const handleSubmit = () => {
    const cartItems = handleAddToCart();
    onAddToCart();
  };

  return (
    <div 
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        isAnimating ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-300'
      )}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={handleClose}
        aria-hidden="true"
      />
      
      <div 
        className={cn(
          'bg-white w-full max-w-6xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden',
          'transform flex flex-col mx-auto',
          isAnimating ? 'translate-y-0' : 'translate-y-4',
          'transition-transform duration-300'
        )}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
              <p className="text-sm text-gray-600">{gost}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Закрыть"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <SpecTable
            type={type}
            specifications={activeSpecifications}
            selectedItems={selectedItems}
            onItemToggle={handleItemToggle}
          />
        </div>

        <div className="mt-auto">
          <InfoText 
            text="⚠️ Цены могут варьироваться. Окончательная стоимость определяется после подписания договора." 
            className="border-t border-gray-200 text-gray-600"
          />

          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                  <span className="text-sm font-medium text-gray-900">
                    Общая цена: {total.toLocaleString(CURRENCY.locale)} {CURRENCY.symbol}
                  </span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={selectedItems.length === 0}
                  className={cn(
                    'w-full sm:w-auto inline-flex justify-center px-6 py-2 border border-transparent',
                    'text-sm font-medium rounded-md text-white',
                    selectedItems.length > 0 
                      ? 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' 
                      : 'bg-gray-400 cursor-not-allowed'
                  )}
                >
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SpecModal.displayName = 'SpecModal';

export default SpecModal; 