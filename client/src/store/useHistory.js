import { create } from 'zustand'

export const useHistory = create((set) => ({
  menu: false,
  openMenu: ()=> set({menu: true}),
  closeMenu: ()=> set({menu: false})
}));