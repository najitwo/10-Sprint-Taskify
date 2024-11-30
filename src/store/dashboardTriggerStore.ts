import { create } from 'zustand';

interface DashboardTriggerStore {
  trigger: boolean;
  updateTrigger: () => void;
}

const useDashboardTriggerStore = create<DashboardTriggerStore>((set) => ({
  trigger: false,
  updateTrigger: () => set((state) => ({ trigger: !state.trigger })),
}));

export default useDashboardTriggerStore;
