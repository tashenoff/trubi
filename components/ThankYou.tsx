import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ThankYouProps {
  onClose: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Спасибо за ваш заказ!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Мы получили вашу заявку и свяжемся с вами в ближайшее время для подтверждения заказа.
        </p>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Закрыть
        </button>
      </div>
    </motion.div>
  );
};

export default ThankYou; 