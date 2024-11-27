import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dashboard } from '@/types/dashboards';
import { getBoard } from '@/lib/boardService';

interface dashboardState {
  dashboard: Dashboard | null;
  setDashboard: (dashboardId: number) => void;
  color: string;
  setColor: (newColor: string) => void;
}

const useDashboardStore = create(
  persist<dashboardState>(
    (set, get) => ({
      dashboard: null,
      setDashboard: async (dashboardId) => {
        if (get().dashboard?.id === dashboardId) return;

        // TODO error handling
        const response = await getBoard(dashboardId.toString());
        set({
          dashboard: { ...response },
        });
      },
      color: 'var(--violet)',
      setColor: (newColor) => set({ color: newColor }),
    }),
    {
      name: 'dashboardStorage',
    }
  )
);

export default useDashboardStore;
