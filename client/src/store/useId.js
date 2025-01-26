import { create } from 'zustand'

export const useId = create((set) => ({
  passId: 0,
  setPassedId: (id) => set(() => ({ passId: id })),
}))