import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ThankYouProps {
  onClose: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-green-100 rounded-full p-6 mb-6"
      >
        <Check className="h-12 w-12 text-green-500" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-gray-900 mb-2"
      >
        Спасибо за заказ!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-500 text-center mb-8 max-w-md"
      >
        Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onClose}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Вернуться на главную
      </motion.button>
    </div>
  );
};

export default ThankYou; 