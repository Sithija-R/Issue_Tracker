import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type User = {
    id: string;
    name: string;
    email: string;
}

type AuthStore ={
    user:User | null;
    isAuthenticated: boolean;
    token: string | null;
    setUser: (user: User) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
    
}

export const useAuthStore = create<AuthStore>()(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: (user: User, token: string) =>
          set({ user, token, isAuthenticated: true }),
        logout: () =>
          set({ user: null, token: null, isAuthenticated: false }),
        setUser: (user: User) => set({ user }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  );