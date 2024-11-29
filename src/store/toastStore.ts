import { create } from 'zustand';

export interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
  remainingTime: number;
  showButton: boolean;
  theme: 'dark' | 'light';
  isFading?: boolean;
  timeoutId?: NodeJS.Timeout | null;
  lastUpdateTime?: number;
}

interface ToastsState {
  toasts: ToastState[];
  addToast: (
    message: string,
    type: ToastState['type'],
    duration: number,
    showButton: boolean,
    theme: 'dark' | 'light'
  ) => void;
  removeToast: (id: number) => void;
  pauseToast: (id: number) => void;
  resumeToast: (id: number) => void;
}

const useToastStore = create<ToastsState>((set) => ({
  toasts: [],
  addToast: (
    message: string,
    type: ToastState['type'],
    duration = 2000,
    showButton = true,
    theme = 'dark'
  ) => {
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
          timeoutId,
          lastUpdateTime: id,
          showButton,
          theme,
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
        if (toast.id === id && toast.timeoutId) {
          clearTimeout(toast.timeoutId);
          const now = Date.now();
          return {
            ...toast,
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
      const toast = state.toasts.find((toast) => toast.id === id);
      if (!toast) return state;

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
      }, toast.remainingTime);

      return {
        toasts: state.toasts.map((toast) =>
          toast.id === id
            ? {
                ...toast,
                lastUpdateTime: Date.now(),
                timeoutId,
              }
            : toast
        ),
      };
    });
  },
}));

interface CreateToastProps {
  message: string;
  duration?: number;
  showButton?: boolean;
  theme?: 'dark' | 'light';
}

const createToast =
  (type: ToastState['type']) =>
  ({
    message,
    duration = 2000,
    showButton = true,
    theme = 'dark',
  }: CreateToastProps) =>
    useToastStore
      .getState()
      .addToast(message, type, duration, showButton, theme);

export const toast = {
  success: createToast('success'),
  error: createToast('error'),
  warning: createToast('warning'),
  info: createToast('info'),
};

export default useToastStore;
