import { useState, useEffect } from 'react';
import { ANIMATION } from '../config';

interface UseModalAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UseModalAnimationReturn {
  isVisible: boolean;
  isAnimating: boolean;
  handleClose: () => void;
}

export const useModalAnimation = ({ isOpen, onClose }: UseModalAnimationProps): UseModalAnimationReturn => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(false);
      timer = setTimeout(() => {
        setIsAnimating(true);
      }, ANIMATION.initialDelay);
    } else {
      setIsAnimating(false);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, ANIMATION.duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, ANIMATION.duration);
  };

  return {
    isVisible,
    isAnimating,
    handleClose,
  };
}; 