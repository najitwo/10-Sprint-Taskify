import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dashboard } from '@/types/dashboards';
import { getBoard, getColumns } from '@/lib/boardService';
import { ColumnFormValue } from '@/types/dashboardView';

interface dashboardState {
  dashboard: Dashboard | null;
  columns: ColumnFormValue[];
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
