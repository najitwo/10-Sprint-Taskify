import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export default useAuthStore;
