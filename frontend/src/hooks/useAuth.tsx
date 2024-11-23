import { create } from 'zustand'

interface User {
  _id: string
  email: string
  privateKey: string
  publicAddress: string
}

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('auroraAuth')
    set({ user: null })
  },
}))