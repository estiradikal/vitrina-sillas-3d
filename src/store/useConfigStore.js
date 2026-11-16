import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useConfigStore = create(
  persist(
    (set) => ({
      colorTela: '#a0a0a0',
      materialPatas: 'Metal',
      setColorTela: (color) => set({ colorTela: color }),
      setMaterialPatas: (material) => set({ materialPatas: material }),
    }),
    {
      name: 'config-silla-storage',
    }
  )
);