import { create } from 'zustand';

interface OrbitSpeedState {
  baseSpeed: number;
  setBaseSpeed: (val: number) => void;
}

export const useOrbitSpeedStore = create<OrbitSpeedState>(set => ({
  baseSpeed: 0.8,
  setBaseSpeed: (val: number) => set({ baseSpeed: val }),
}));