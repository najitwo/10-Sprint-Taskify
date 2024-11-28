import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dashboard } from '@/types/dashboards';
import { getBoard, getColumns } from '@/lib/boardService';
import { Columns } from '@/types/dashboardView';

interface dashboardState {
  dashboard: Dashboard | null;
  columns: Columns[];
  setDashboard: (dashboardId: number) => void;
  setColumns: (dashboardId: number) => void;

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
      columns: [],
      setColumns: async (dashboardId) => {
        const response = await getColumns(dashboardId.toString());
        set({
          columns: response, //체크
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
