import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  weight: number;
  type: 'bends' | 'pipes' | 'coldDeformed';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (items: CartItem[]) => void;
  removeFromCart: (itemName: string) => void;
  updateQuantity: (itemName: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  calculateTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'trubprom_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
    setTotalItems(items.reduce((total, item) => total + item.quantity, 0));
  }, [items]);

  const addToCart = (newItems: CartItem[]) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      
      newItems.forEach(newItem => {
        const existingItemIndex = updatedItems.findIndex(item => item.name === newItem.name);
        
        if (existingItemIndex !== -1) {
          // Update quantity if item exists
          updatedItems[existingItemIndex].quantity += newItem.quantity;
        } else {
          // Add new item if it doesn't exist
          updatedItems.push(newItem);
        }
      });
      
      return updatedItems;
    });
  };

  const removeFromCart = (itemName: string) => {
    setItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };

  const updateQuantity = (itemName: string, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.name === itemName ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        calculateTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 