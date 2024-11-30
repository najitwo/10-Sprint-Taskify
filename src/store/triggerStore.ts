import { create } from 'zustand';

interface TriggerStore {
  trigger: {
    dashboard: boolean;
    card: boolean;
  };
  updateTrigger: {
    dashboard: () => void;
    card: () => void;
  };
}

const useTriggerStore = create<TriggerStore>((set) => ({
  trigger: {
    dashboard: false,
    card: false,
  },
  updateTrigger: {
    dashboard: () =>
      set((state) => ({
        trigger: { ...state.trigger, dashboard: !state.trigger.dashboard },
      })),
    card: () =>
      set((state) => ({
        trigger: { ...state.trigger, card: !state.trigger.card },
      })),
  },
}));

export default useTriggerStore;
