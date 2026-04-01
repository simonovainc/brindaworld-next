import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ColorBlindMode =
  | 'normal'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'achromatopsia';

interface AccessibilityStore {
  colorBlindMode: ColorBlindMode;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  dyslexiaFont: boolean;
  fontSizeMultiplier: number;

  setColorBlindMode: (mode: ColorBlindMode) => void;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleDyslexiaFont: () => void;
  setFontSizeMultiplier: (multiplier: number) => void;
  reset: () => void;
}

const defaultState = {
  colorBlindMode: 'normal' as ColorBlindMode,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  dyslexiaFont: false,
  fontSizeMultiplier: 1,
};

export const useAccessibility = create<AccessibilityStore>()(
  persist(
    (set) => ({
      ...defaultState,

      setColorBlindMode: (mode: ColorBlindMode) =>
        set({ colorBlindMode: mode }),

      toggleHighContrast: () =>
        set((state) => ({ highContrast: !state.highContrast })),

      toggleLargeText: () =>
        set((state) => ({ largeText: !state.largeText })),

      toggleReducedMotion: () =>
        set((state) => ({ reducedMotion: !state.reducedMotion })),

      toggleDyslexiaFont: () =>
        set((state) => ({ dyslexiaFont: !state.dyslexiaFont })),

      setFontSizeMultiplier: (multiplier: number) =>
        set({ fontSizeMultiplier: multiplier }),

      reset: () => set(defaultState),
    }),
    {
      name: 'accessibility-store',
      skipHydration: false,
    }
  )
);
