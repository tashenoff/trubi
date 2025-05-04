import { useRef, useEffect } from 'react';

export function useKeyboardFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Сохраняем предыдущий активный элемент
    const previousActiveElement = document.activeElement;

    // Устанавливаем фокус на модальное окно
    element.focus();

    // Создаем список фокусируемых элементов
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Если нажаты Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement?.focus();
          }
        } else {
          // Если нажат только Tab
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement?.focus();
          }
        }
      }

      // Закрытие по Escape обрабатывается в самом модальном окне
    }

    element.addEventListener('keydown', handleKeyDown);

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      // Возвращаем фокус на предыдущий элемент при закрытии
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, []);

  return { ref };
} 