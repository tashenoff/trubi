import React from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

const getMaxWidthClass = (maxWidth?: string) => {
  switch (maxWidth) {
    case 'sm': return 'max-w-sm';
    case 'md': return 'max-w-md';
    case 'lg': return 'max-w-lg';
    case 'xl': return 'max-w-xl';
    case '2xl': return 'max-w-2xl';
    case '4xl': return 'max-w-4xl';
    default: return 'max-w-4xl';
  }
};

const AnimatedModal: React.FC<AnimatedModalProps> = ({ isOpen, onClose, children, title, maxWidth }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <Dialog.Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
              className={`relative w-full ${getMaxWidthClass(maxWidth)} bg-white rounded-lg shadow-xl`}
            >
              {title && (
                <div className="px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-1"
                    >
                      <span className="sr-only">Закрыть</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              )}
              {children}
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal; 