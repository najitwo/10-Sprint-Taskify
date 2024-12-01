import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  message: string;
  messageType: string;
  openModal: (message: string, messageType: string) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  message: '',
  messageType: '',
  openModal: (message, messageType) =>
    set({ isOpen: true, message, messageType }),
  closeModal: () => set({ isOpen: false, message: '', messageType: '' }),
}));

export default useModalStore;
