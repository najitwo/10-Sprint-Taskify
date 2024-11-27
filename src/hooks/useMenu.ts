import { useState } from 'react';

export function useMenu() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return { isMenuVisible, toggleMenu, closeMenu };
}
