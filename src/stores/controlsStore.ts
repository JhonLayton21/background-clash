import { create } from "zustand";
import type { Controls, ControlsStoreState } from "../types";

const DEFAULT_CONTROLS: Controls = {
  angle: 135,
  intensity: 100,
  saturation: 100,
  luminosity: 100,
  opacity: 100,
};

export const useControlsStore = create<ControlsStoreState>((set) => ({
  controls: DEFAULT_CONTROLS,
  defaultControls: DEFAULT_CONTROLS,

  /**
   * Actualizar un control Individual
   */
  updateControl: <K extends keyof Controls>(key: K, value: Controls[K]) => {
    set((state) => ({
      controls: {
        ...state.controls,
        [key]: value,
      },
    }));
  },

  /**
   * Resetear controles a defaults
   */
  resetControls: () => {
    set({ controls: DEFAULT_CONTROLS });
  },

  /**
   * Establecer múltiples controles a la vez
   */
  setControls: (controls: Partial<Controls>) => {
    set((state) => ({
      controls: {
        ...state.controls,
        ...controls,
      },
    }));
  },
}));

/**
 * Selector: Obtener todos los controles
 */
export const useControls = () => {
  return useControlsStore((state) => state.controls);
};

/**
 * Selector: Obtener valor específico de control
 */
export const useControlValue = <K extends keyof Controls>(key: K) => {
  return useControlsStore((state) => state.controls[key]);
};

/**
 * Selector: Obtener ación de actualización
 */
export const useUpdateControl = () => {
  return useControlsStore((state) => state.updateControl);
};

/**
 * Selector: Obtener acción de reset
 */
export const useResetControls = () => {
  return useControlsStore((state) => state.resetControls);
};
