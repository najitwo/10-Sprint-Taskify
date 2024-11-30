import { create } from 'zustand';
import { Card } from '@/types/dashboardView';

interface CardState {
  card: Card | null;
  setCard: (newCard: Card) => void;
}

const useCardStore = create<CardState>((set) => ({
  card: null,
  setCard: (newCard: Card) => set({ card: newCard }),
}));

export default useCardStore;
