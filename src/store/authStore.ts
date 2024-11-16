import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}

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
