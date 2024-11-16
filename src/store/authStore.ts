import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}

function setAccessTokenFn(set: any, token: string) {
  set({ accessToken: token });
}

function removeAccessTokenFn(set: any) {
  set({ accessToken: null });
}

function createAuthStore(set: any) {
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

export default useAuthStore;
