import { create } from 'zustand';
import { ReactNode } from 'react';

interface ModalState {
  modals: ReactNode[];
  isModalVisible: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  closeAllModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modals: [],
  isModalVisible: false,
  openModal: (content) =>
    set((state) => ({
      modals: [...state.modals, content],
      isModalVisible: true,
    })),
  closeModal: () => {
    set({ isModalVisible: false });
    setTimeout(() => {
      set((state) => ({
        modals: state.modals.slice(0, -1),
      }));
    }, 300);
  },
  closeAllModal: () =>
    set(() => ({
      modals: [],
      isModalVisible: false,
    })),
}));

export default useModalStore;
