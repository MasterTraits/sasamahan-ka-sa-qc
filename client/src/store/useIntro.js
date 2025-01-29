import { create } from 'zustand'

export const useIntroStore = create((set) => ({
  carousel: true,
  openCarousel: () => set({ carousel: true }),
  closeCarousel: () => set({ carousel: false }),
}))