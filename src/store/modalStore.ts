import { create } from 'zustand';
import { ReactNode } from 'react';

interface ModalState {
  modals: ReactNode[];
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modals: [],
  openModal: (content) =>
    set((state) => ({
      modals: [...state.modals, content],
    })),
  closeModal: () =>
    set((state) => ({
      modals: state.modals.slice(0, -1),
    })),
}));

export default useModalStore;
