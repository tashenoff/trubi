import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Check } from 'lucide-react';
import AddToCartModal from './AddToCartModal';
import InfoText from './MarqueeText';

interface Specification {
  name?: string;
  diameter?: string;
  weight: number;
  price?: number;
  pricePerMeter?: number;
  pricePerton?: number;
}

interface SelectedItem {
  name: string;
  quantity: number;
}

interface SpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  title: string;
  gost: string;
  specifications: Specification[];
  type: 'bends' | 'pipes' | 'coldDeformed';
}

const SpecModal: React.FC<SpecModalProps> = ({ isOpen, onClose, onAddToCart, title, gost, specifications, type }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(false);
      timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    } else {
      setIsAnimating(false);
      timer = setTimeout(() => {
        setIsVisible(false);
        setSelectedItems([]);
      }, 300);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  const handleItemToggle = (itemName: string) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(item => item.name === itemName);
      if (isSelected) {
        return prev.filter(item => item.name !== itemName);
      } else {
        return [...prev, { name: itemName, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (itemName: string, quantity: number) => {
    if (quantity < 1) return;
    
    setSelectedItems(prev => {
      return prev.map(item => {
        if (item.name === itemName) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const calculateTotal = () => {
    return specifications
      .filter(spec => {
        const itemName = spec.name || spec.diameter || '';
        return selectedItems.some(item => item.name === itemName);
      })
      .reduce((total, spec) => {
        const itemName = spec.name || spec.diameter || '';
        const selectedItem = selectedItems.find(item => item.name === itemName);
        const price = type === 'bends' ? spec.price : spec.pricePerMeter;
        return total + (price || 0) * (selectedItem?.quantity || 0);
      }, 0);
  };

  const handleAddToCart = () => {
    const cartItems = selectedItems.map(item => {
      const spec = specifications.find(s => (s.name || s.diameter) === item.name);
      if (!spec) return null;
      
      return {
        name: item.name,
        quantity: item.quantity,
        price: type === 'bends' ? spec.price || 0 : spec.pricePerMeter || 0,
        weight: spec.weight,
        type
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);

    addToCart(cartItems);
    onAddToCart();
  };

  if (!isVisible) return null;

  const renderTableHeaders = () => {
    switch (type) {
      case 'bends':
        return (
          <tr>
            <th scope="col" className="w-10 pl-4 pr-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="sr-only">Выбрать</span>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Наименование
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Вес, кг
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Цена, ₸
            </th>
          </tr>
        );
      case 'pipes':
      case 'coldDeformed':
        return (
          <tr>
            <th scope="col" className="w-10 pl-4 pr-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="sr-only">Выбрать</span>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Диаметр
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Вес 1 п.м.
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Цена за 1 п.м.
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Цена за 1 тн.
            </th>
          </tr>
        );
    }
  };

  const renderTableRow = (spec: Specification) => {
    const itemName = spec.name || spec.diameter || '';
    const selectedItem = selectedItems.find(item => item.name === itemName);
    const isSelected = Boolean(selectedItem);
    const isActive = type === 'bends' ? spec.price !== 0 : spec.pricePerMeter !== 0;
    
    switch (type) {
      case 'bends':
        return (
          <tr key={spec.name} className={`border-b hover:bg-gray-50 transition-colors ${!isActive ? 'opacity-50' : ''}`}>
            <td className="w-10 pl-4 pr-2 py-2">
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => isActive && handleItemToggle(itemName)}
                  disabled={!isActive}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </div>
            </td>
            <td className="px-4 py-2">{spec.name}</td>
            <td className="px-4 py-2 text-right">{spec.weight}</td>
            <td className="px-4 py-2 text-right">{spec.price?.toLocaleString()} ₸</td>
          </tr>
        );
      case 'pipes':
      case 'coldDeformed':
        return (
          <tr key={spec.diameter} className={`border-b hover:bg-gray-50 transition-colors ${!isActive ? 'opacity-50' : ''}`}>
            <td className="w-10 pl-4 pr-2 py-2">
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => isActive && handleItemToggle(itemName)}
                  disabled={!isActive}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </div>
            </td>
            <td className="px-4 py-2">{spec.diameter}</td>
            <td className="px-4 py-2 text-right">{spec.weight}</td>
            <td className="px-4 py-2 text-right">{spec.pricePerMeter?.toLocaleString()} ₸</td>
            <td className="px-4 py-2 text-right">{spec.pricePerton?.toLocaleString()} ₸</td>
          </tr>
        );
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        <div
          className={`bg-white w-full max-w-6xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden transform flex flex-col mx-auto ${
            isAnimating ? 'translate-y-0' : 'translate-y-4'
          } transition-transform duration-300`}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600">{gost}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Закрыть</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-white sticky top-0">
                  {renderTableHeaders()}
                </thead>
                <tbody>
                  {specifications.map(renderTableRow)}
                </tbody>
              </table>
            </div>
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
                    <span className="text-sm text-gray-600 w-full sm:w-auto">
                      Выбрано позиций: {selectedItems.length}
                    </span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={selectedItems.length === 0}
                    className={`w-full sm:w-auto inline-flex justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white 
                      ${selectedItems.length > 0 
                        ? 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' 
                        : 'bg-gray-400 cursor-not-allowed'}`}
                  >
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddToCartModal
        isOpen={isAddToCartModalOpen}
        onClose={() => setIsAddToCartModalOpen(false)}
      />
    </>
  );
};

export default SpecModal; 