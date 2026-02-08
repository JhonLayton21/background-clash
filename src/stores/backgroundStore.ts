import { create } from "zustand";
import type { Background, BackgroundStoreState } from "../types";

export const useBackgroundStore = create<BackgroundStoreState>((set) => ({
  backgrounds: new Map(),
  selectedBackgroundId: null,

  /**
   * Seleccionar un background por ID
   */
  selectBackground: (id: string) => {
    set({ selectedBackgroundId: id });
  },

  /**
   * Cargar array de backgrounds a la librería
   */
  loadBackgrounds: (backgrounds: Background[]) => {
    const backgroundMap = new Map(backgrounds.map((bg) => [bg.id, bg]));
    set({ backgrounds: backgroundMap });
    // Seleccionar el primero si está vacío
    if (backgrounds.length > 0) {
      set({ selectedBackgroundId: backgrounds[0].id });
    }
  },
}));

/**
 * Selector: Obtener background actualmente seleccionado
 */
export const useSelectedBackground = () => {
  const { backgrounds, selectedBackgroundId } = useBackgroundStore();
  if (!selectedBackgroundId) return null;
  return backgrounds.get(selectedBackgroundId) || null;
};

/**
 * Selector: Obtener todos los backgrounds como array
 */
export const useAllBackgrounds = () => {
  const backgrounds = useBackgroundStore((state) => state.backgrounds);
  return Array.from(backgrounds.values());
};

/**
 * Selector: Obtener background por ID
 */
export const useBackgroundById = (id: string) => {
  const backgrounds = useBackgroundStore((state) => state.backgrounds);
  return backgrounds.get(id) || null;
};
