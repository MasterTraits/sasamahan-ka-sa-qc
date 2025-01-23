import { create } from 'zustand'

export const useTextStore = create((set) => ({
  text: "",
  setText: (newText) => set({ text: newText })
}))