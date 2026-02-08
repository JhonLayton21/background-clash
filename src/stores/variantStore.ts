import { create } from "zustand";
import type { Variation, VariantStoreState, Controls } from "../types";

export const useVariantStore = create<VariantStoreState>((set) => ({
  currentVariant: null,
  previousVariants: [],

  /**
   * Establecer variante actual
   */
  setVariant: (variant: Variation) => {
    set((state) => ({
      previousVariants: state.currentVariant
        ? [state.currentVariant, ...state.previousVariants].slice(0, 10) // Mantener últimas 10
        : [],
      currentVariant: variant,
    }));
  },

  /**
   * Generar nueva variante a partir de un background
   * (placeholder - lógica en hook useVariation)
   */
  generateVariant: (backgroundId: string) => {
    // Esta función será llamada desde useVariation hook
    // que contiene la lógica de generación
    console.log(`[VariantStore] generateVariant called for ${backgroundId}`);
  },

  /**
   * Randomizar completamente
   * (placeholder - lógica en hook useVariation)
   */
  randomize: (backgroundId: string) => {
    console.log(`[VariantStore] randomize called for ${backgroundId}`);
  },

  /**
   * Reproducir desde seed
   * (placeholder - lógica en hook useVariation)
   */
  reproductionFromSeed: (backgroundId: string, seed: string) => {
    console.log(
      `[VariantStore] reproductionFromSeed called for ${backgroundId} with seed ${seed}`
    );
  },
}));

/**
 * Selector: Obtener variante actual
 */
export const useCurrentVariant = () => {
  return useVariantStore((state) => state.currentVariant);
};

/**
 * Selector: Obtener controles de variante actual
 */
export const useCurrentControls = (): Controls => {
  const variant = useVariantStore((state) => state.currentVariant);
  if (!variant) {
    return {
      angle: 0,
      intensity: 100,
      saturation: 100,
      luminosity: 100,
      opacity: 100,
    };
  }
  return variant.controls;
};

/**
 * Selector: Obtener seed actual
 */
export const useCurrentSeed = () => {
  return useVariantStore((state) => state.currentVariant?.seed || null);
};

/**
 * Selector: Obtener CSS actual
 */
export const useCurrentCSS = () => {
  return useVariantStore((state) => state.currentVariant?.css || "");
};

/**
 * Selector: Obtener historial de variantes
 */
export const useVariantHistory = () => {
  return useVariantStore((state) => state.previousVariants);
};
