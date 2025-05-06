import { useMemo, useCallback, useState } from 'react';
import { Specification, SelectedItem, SpecificationType, CartItem } from '../types';
import { useCart } from '../../../../context/CartContext';

interface UseSpecificationsProps {
  specifications: Specification[];
  type: SpecificationType;
}

interface UseSpecificationsReturn {
  selectedItems: SelectedItem[];
  activeSpecifications: Specification[];
  specificationsMap: Record<string, Specification>;
  total: number;
  handleItemToggle: (itemName: string) => void;
  handleQuantityChange: (itemName: string, quantity: number) => void;
  handleAddToCart: () => CartItem[];
}

export const useSpecifications = ({ specifications, type }: UseSpecificationsProps): UseSpecificationsReturn => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { addToCart } = useCart();

  const specificationsMap = useMemo(() => {
    return specifications.reduce((acc, spec) => {
      const key = spec.name || spec.diameter || '';
      acc[key] = spec;
      return acc;
    }, {} as Record<string, Specification>);
  }, [specifications]);

  const activeSpecifications = useMemo(() => {
    return specifications.filter(spec => 
      type === 'bends' ? spec.price !== 0 : spec.pricePerMeter !== 0
    );
  }, [specifications, type]);

  const handleItemToggle = useCallback((itemName: string) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(item => item.name === itemName);
      if (isSelected) {
        return prev.filter(item => item.name !== itemName);
      } else {
        return [...prev, { name: itemName, quantity: 1 }];
      }
    });
  }, []);

  const handleQuantityChange = useCallback((itemName: string, quantity: number) => {
    if (quantity < 1) return;
    
    setSelectedItems(prev => {
      return prev.map(item => {
        if (item.name === itemName) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  }, []);

  const total = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      const spec = specificationsMap[item.name];
      if (!spec) return sum;
      const price = type === 'bends' ? spec.price : spec.pricePerMeter;
      return sum + (price || 0) * (item.quantity || 0);
    }, 0);
  }, [selectedItems, specificationsMap, type]);

  const handleAddToCart = useCallback((): CartItem[] => {
    return selectedItems
      .map(item => {
        const spec = specificationsMap[item.name];
        if (!spec) return null;
        
        return {
          name: item.name,
          quantity: item.quantity,
          price: type === 'bends' ? spec.price || 0 : spec.pricePerMeter || 0,
          weight: spec.weight,
          type
        };
      })
      .filter((item): item is CartItem => item !== null);
  }, [selectedItems, specificationsMap, type]);

  return {
    selectedItems,
    activeSpecifications,
    specificationsMap,
    total,
    handleItemToggle,
    handleQuantityChange,
    handleAddToCart,
  };
}; 