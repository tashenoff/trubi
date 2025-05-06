import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import contactsData from '../data/products.json';

const FloatingCallButton = () => {
  const { phone } = contactsData.contacts;
  const [isVisible, setIsVisible] = useState(false);

  // Показываем кнопку только после прокрутки
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={`tel:${phone}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 cursor-pointer"
          aria-label="Позвонить"
        >
          <Phone className="h-6 w-6" />
          <span className="sr-only">Позвонить</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCallButton; 