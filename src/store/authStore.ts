import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (user: User | null) => void;
}

<<<<<<< HEAD
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));
=======
type SetState = <T>(fn: (state: T) => T) => void;

function setAccessTokenFn(set: SetState, token: string) {
  set(function (state: AuthState) {
    return { ...state, accessToken: token };
  });
}

function removeAccessTokenFn(set: SetState) {
  set(function (state: AuthState) {
    return { ...state, accessToken: null };
  });
}

function createAuthStore(set: SetState) {
  return {
    accessToken: null,
    setAccessToken: function (token: string) {
      setAccessTokenFn(set, token);
    },
    removeAccessToken: function () {
      removeAccessTokenFn(set);
    },
  };
}

const useAuthStore = create<AuthState>(createAuthStore);
>>>>>>> 4371164 (:bug: refactor: refactor update types in zustand store)

export default useAuthStore;
