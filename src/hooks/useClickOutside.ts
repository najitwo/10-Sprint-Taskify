import { useEffect } from 'react';

type ClickOutsideCallback = () => void;

function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: ClickOutsideCallback
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
