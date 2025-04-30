import React, { useEffect, useState } from 'react';

interface Specification {
  name?: string;
  diameter?: string;
  weight: number;
  price?: number;
  pricePerMeter?: number;
  pricePerton?: number;
}

interface SpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  gost: string;
  specifications: Specification[];
  type: 'bends' | 'pipes' | 'coldDeformed';
}

const SpecModal: React.FC<SpecModalProps> = ({ isOpen, onClose, title, gost, specifications, type }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isOpen) {
      // При открытии сначала показываем окно и фон в начальной позиции
      setIsVisible(true);
      setIsAnimating(false);
      // Затем запускаем анимацию
      timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    } else {
      // При закрытии запускаем анимацию исчезновения
      setIsAnimating(false);
      // После завершения анимации скрываем окно
      timer = setTimeout(() => {
        setIsVisible(false);
        setSelectedItems([]); // Сброс выбранных элементов при закрытии
      }, 300);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  const handleItemToggle = (itemName: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemName)) {
        return prev.filter(item => item !== itemName);
      } else {
        return [...prev, itemName];
      }
    });
  };

  const handleOrder = () => {
    const text = `Здравствуйте! Меня интересует:\n${selectedItems.join('\n')}`;
    const encodedText = encodeURIComponent(text);
    const phoneNumber = '79000000000'; // Замените на реальный номер телефона
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
    onClose();
  };

  if (!isVisible) return null;

  const renderTableHeaders = () => {
    switch (type) {
      case 'bends':
        return (
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">Выбрать</th>
            <th className="px-4 py-2 text-left">Наименование</th>
            <th className="px-4 py-2 text-right">Вес, кг</th>
            <th className="px-4 py-2 text-right">Цена, ₽</th>
          </tr>
        );
      case 'pipes':
      case 'coldDeformed':
        return (
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">Выбрать</th>
            <th className="px-4 py-2 text-left">Диаметр</th>
            <th className="px-4 py-2 text-right">Вес 1 п.м.</th>
            <th className="px-4 py-2 text-right">Цена за 1 п.м.</th>
            <th className="px-4 py-2 text-right">Цена за 1 тн.</th>
          </tr>
        );
    }
  };

  const renderTableRow = (spec: Specification) => {
    const itemName = spec.name || spec.diameter || '';
    
    switch (type) {
      case 'bends':
        return (
          <tr key={spec.name} className="border-b hover:bg-gray-50 transition-colors">
            <td className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectedItems.includes(itemName)}
                onChange={() => handleItemToggle(itemName)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
            </td>
            <td className="px-4 py-2">{spec.name}</td>
            <td className="px-4 py-2 text-right">{spec.weight}</td>
            <td className="px-4 py-2 text-right">{spec.price?.toLocaleString()}</td>
          </tr>
        );
      case 'pipes':
      case 'coldDeformed':
        return (
          <tr key={spec.diameter} className="border-b hover:bg-gray-50 transition-colors">
            <td className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectedItems.includes(itemName)}
                onChange={() => handleItemToggle(itemName)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
            </td>
            <td className="px-4 py-2">{spec.diameter}</td>
            <td className="px-4 py-2 text-right">{spec.weight}</td>
            <td className="px-4 py-2 text-right">{spec.pricePerMeter?.toLocaleString()}</td>
            <td className="px-4 py-2 text-right">{spec.pricePerton?.toLocaleString()}</td>
          </tr>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        {/* Фон с плавным появлением */}
        <div 
          className={`fixed inset-0 bg-gray-500 transition-all duration-300 ease-out ${
            isAnimating ? 'opacity-75' : 'opacity-0'
          }`} 
          onClick={onClose}
        ></div>
        
        {/* Модальное окно */}
        <div 
          className={`relative bg-white rounded-lg max-w-4xl w-full mx-auto flex flex-col max-h-[90vh] transform transition-all duration-300 ease-out ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
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
            <p className="mt-2 text-sm text-gray-500">{gost}</p>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-4">
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
          
          <div className="px-6 py-4 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Выбрано позиций: {selectedItems.length}
              </span>
              <button
                onClick={handleOrder}
                disabled={selectedItems.length === 0}
                className={`inline-flex justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white 
                  ${selectedItems.length > 0 
                    ? 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary' 
                    : 'bg-gray-400 cursor-not-allowed'}`}
              >
                Заказать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecModal; 