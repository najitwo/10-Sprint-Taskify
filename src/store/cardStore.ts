import { create } from 'zustand';
import { Cards } from '@/types/dashboardView';

interface CardState {
  card: Cards | null;
  setCard: (newCard: Cards) => void;
}

const useCardStore = create<CardState>((set) => ({
  card: null,
  setCard: (newCard: Cards) => set({ card: newCard }),
}));

export default useCardStore;
