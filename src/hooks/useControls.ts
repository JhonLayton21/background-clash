import { useCallback } from "react";
import { useControlsStore, useBackgroundStore, useVariantStore } from "../stores";
import type { Controls } from "../types";
import { generateCSS } from "../utils/cssGenerator";

/**
 * Hook: Gestionar controles y propagar cambios a CSS
 * Responsabilidad: Actualizar controles y regenerar CSS en tiempo real
 */
export const useControlsHandler = () => {
  const { controls, updateControl, resetControls } = useControlsStore();
  const { selectedBackgroundId, backgrounds } = useBackgroundStore();
  const { setVariant } = useVariantStore();

  /**
   * Actualizar un control y regenerar CSS
   */
  const handleControlChange = useCallback(
    <K extends keyof Controls>(key: K, value: Controls[K]) => {
      updateControl(key, value);

      // Regenerar CSS con nuevos controles
      if (selectedBackgroundId) {
        const background = backgrounds.get(selectedBackgroundId);
        if (background) {
          const newControls = {
            ...controls,
            [key]: value,
          };

          const css = generateCSS(background.colors, newControls);

          // Actualizar variante con los nuevos controles
          setVariant({
            seed: `${selectedBackgroundId}_custom_${Date.now()}`,
            controls: newControls,
            css,
            appliedAt: new Date(),
          });
        }
      }
    },
    [controls, selectedBackgroundId, backgrounds, updateControl, setVariant]
  );

  /**
   * Reset a controles por defecto
   */
  const handleResetControls = useCallback(() => {
    resetControls();

    // Regenerar CSS con defaults
    if (selectedBackgroundId) {
      const background = backgrounds.get(selectedBackgroundId);
      if (background) {
        const css = generateCSS(background.colors, background.baseStyle);

        setVariant({
          seed: `${selectedBackgroundId}_default_0`,
          controls: background.baseStyle,
          css,
          appliedAt: new Date(),
        });
      }
    }
  }, [selectedBackgroundId, backgrounds, resetControls, setVariant]);

  return {
    controls,
    handleControlChange,
    handleResetControls,
  };
};

/**
 * Hook: Obtener y actualizar control específico
 */
export const useControl = <K extends keyof Controls>(key: K) => {
  const { controls, updateControl } = useControlsStore();

  return {
    value: controls[key],
    setValue: (value: Controls[K]) => updateControl(key, value),
  };
};
