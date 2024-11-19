import { useEffect, useRef, ReactNode } from 'react';

interface FocusTrapProps {
  children: ReactNode;
}

export default function FocusTrap({ children }: FocusTrapProps) {
  const startRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const focusableElements = startRef.current?.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', trapFocus);

    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', trapFocus);
    };
  }, []);

  return <div ref={startRef}>{children}</div>;
}
