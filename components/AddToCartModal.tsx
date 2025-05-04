import React from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Trash2 } from 'lucide-react';
import AnimatedModal from './AnimatedModal';
import { useCart } from '../context/CartContext';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { items, calculateTotal, removeFromCart } = useCart();
  
  const handleContinueShopping = () => {
    onClose();
  };

  const handleGoToCart = () => {
    router.push('/cart');
    onClose();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col max-h-[80vh]">
        <div className="p-4 text-center border-b">
          <motion.div
            className="flex justify-center mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle className="h-10 w-10 text-green-500" />
          </motion.div>
          
          <motion.h3
            className="text-lg font-medium text-gray-900"
            variants={itemVariants}
          >
            Товар добавлен в корзину
          </motion.h3>
        </div>

        <motion.div 
          className="flex-1 overflow-y-auto p-4 max-h-[40vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-2">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0"
                  variants={itemVariants}
                  custom={index}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <span className="text-gray-700 truncate flex-1 mr-3">{item.name}</span>
                  <motion.button
                    onClick={() => removeFromCart(item.name)}
                    className="text-gray-400 hover:text-red-500 active:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1.5 -m-1.5 shrink-0"
                    whileTap={{ scale: 0.95 }}
                    tabIndex={-1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="border-t p-4 bg-white">
          <motion.div
            className="flex justify-between font-medium mb-4"
            variants={itemVariants}
          >
            <span>Итого:</span>
            <span>{calculateTotal().toLocaleString()} ₸</span>
          </motion.div>

          <div className="space-y-2">
            <motion.button
              type="button"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              onClick={handleGoToCart}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Перейти в корзину
            </motion.button>
            <motion.button
              type="button"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              onClick={handleContinueShopping}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Продолжить покупки
            </motion.button>
          </div>
        </div>
      </div>
    </AnimatedModal>
  );
};

export default AddToCartModal; 