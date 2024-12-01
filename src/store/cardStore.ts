import { create } from 'zustand';
import { Card } from '@/types/dashboardView';

interface CardState {
  cards: Card[];
  addCard: (newCard: Card) => void;
  modifyCard: (id: number, updatedCard: Partial<Card>) => void;
  removeCard: (id: number) => void;
  clearCards: () => void;
}

const useCardStore = create<CardState>((set) => ({
  cards: [],
  addCard: (newCard: Card) =>
    set((state) => {
      const exists = state.cards.some((card) => card.id === newCard.id);
      if (exists) return state;
      return {
        cards: [...state.cards, newCard],
      };
    }),
  modifyCard: (id, updatedCard) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, ...updatedCard } : card
      ),
    })),
  removeCard: (id) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
    })),
  clearCards: () =>
    set(() => ({
      cards: [],
    })),
}));

export default useCardStore;
