import { create } from 'zustand'

export const useHistory = create((set) => ({
  menu: false,
  openMenu: () => set({ menu: true }),
  closeMenu: () => set({ menu: false }),

  history: [],
  addHistory: (title, messages) => set((state) => ({
    history: [...state.history, { title, messages }]
  })),
  clearHistory: () => set({ history: [] }),

}));
