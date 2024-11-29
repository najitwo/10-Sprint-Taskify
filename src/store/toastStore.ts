import { create } from 'zustand';

export interface ToastState {
  id: number;
  message: string;
  type: string;
  isFading?: boolean;
  duration: number;
  remainingTime: number;
  isPaused?: boolean;
  timeoutId?: NodeJS.Timeout | null;
  lastUpdateTime?: number;
}

interface ToastsState {
  toasts: ToastState[];
  addToast: (message: string, type?: string, duration?: number) => void;
  removeToast: (id: number) => void;
  pauseToast: (id: number) => void;
  resumeToast: (id: number) => void;
}

const useToastStore = create<ToastsState>((set) => ({
  toasts: [],
  addToast: (message: string, type = 'info', duration = 2000) => {
    const id = Date.now();

    const startToastTimer = (remainingTime: number) => {
      const timeoutId = setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.map((toast) =>
            toast.id === id ? { ...toast, isFading: true } : toast
          ),
        }));

        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
          }));
        }, 300);
      }, remainingTime);

      return timeoutId;
    };

    const timeoutId = startToastTimer(duration);

    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id,
          message,
          type,
          isFading: false,
          duration,
          remainingTime: duration,
          isPaused: false,
          timeoutId,
        },
      ],
    }));
  },
  removeToast: (id: number) => {
    set((state) => {
      const toast = state.toasts.find((toast) => toast.id === id);
      if (toast?.timeoutId) clearTimeout(toast.timeoutId);
      return {
        toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, isFading: true } : toast
        ),
      };
    });

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 300);
  },
  pauseToast: (id: number) => {
    set((state) => ({
      toasts: state.toasts.map((toast) => {
        if (toast.id === id && !toast.isPaused) {
          if (toast.timeoutId) clearTimeout(toast.timeoutId);
          const now = Date.now();
          return {
            ...toast,
            isPaused: true,
            remainingTime:
              toast.remainingTime - (now - (toast.lastUpdateTime || now)),
            lastUpdateTime: now,
            timeoutId: null,
          };
        }
        return toast;
      }),
    }));
  },
  resumeToast: (id: number) => {
    set((state) => {
      const toast = state.toasts.find((t) => t.id === id);
      if (!toast || !toast.isPaused) return state;

      const timeoutId = setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.map((t) =>
            t.id === id ? { ...t, isFading: true } : t
          ),
        }));

        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
          }));
        }, 300);
      }, toast.remainingTime);

      return {
        toasts: state.toasts.map((toast) =>
          toast.id === id
            ? {
                ...toast,
                isPaused: false,
                lastUpdateTime: Date.now(),
                timeoutId,
              }
            : toast
        ),
      };
    });
  },
}));

export default useToastStore;
