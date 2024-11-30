import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dashboard } from '@/types/dashboards';
import { getBoard } from '@/lib/boardService';

interface dashboardState {
  dashboard: Dashboard | null;
  setDashboard: (dashboard: number | null) => void;
}

const useDashboardStore = create(
  persist<dashboardState>(
    (set, get) => ({
      dashboard: null,

      setDashboard: async (dashboardId) => {
        if (dashboardId === null) {
          set({
            dashboard: null,
          });
          return;
        }

        if (get().dashboard?.id === dashboardId) return;

        const response = await getBoard(dashboardId.toString());
        set({
          dashboard: { ...response },
        });
      },
    }),
    {
      name: 'dashboardStorage',
    }
  )
);

export default useDashboardStore;
