import { useCallback } from "react";
import { useVariantStore, useBackgroundStore } from "../stores";
import type { Variation, Controls } from "../types";
import { generateCSS } from "../utils/cssGenerator";
import { SeededRandom } from "../utils/seedGenerator";

/**
 * Hook: Generar y gestionar variantes
 * Responsabilidad: Lógica de variant generation, randomize, seed reproduction
 */
export const useVariation = () => {
  const { setVariant } = useVariantStore();
  const { selectedBackgroundId, backgrounds } = useBackgroundStore();

  /**
   * Generar controles con correlación (Generate Variant)
   */
  const generateCorrelatedControls = useCallback(
    (baseControls: Controls, prng: SeededRandom): Controls => {
      // Generar delta de intensidad
      const deltaIntensity = prng.range(-25, 25);
      const newIntensity = Math.max(30, Math.min(100, baseControls.intensity + deltaIntensity));

      // Correlacionar saturation con intensity
      const intensityChange = newIntensity - baseControls.intensity;
      const saturationDelta =
        intensityChange > 0
          ? prng.range(10, 30)
          : prng.range(-15, 0);
      const newSaturation = Math.max(20, Math.min(100, baseControls.saturation + saturationDelta));

      // Correlacionar luminosity
      const luminosityDelta =
        intensityChange > 0
          ? prng.range(-5, 5)
          : prng.range(5, 15);
      const newLuminosity = Math.max(25, Math.min(95, baseControls.luminosity + luminosityDelta));

      // Ángulo siempre cambia
      const newAngle = (baseControls.angle + prng.range(15, 45)) % 360;

      return {
        angle: newAngle,
        intensity: newIntensity,
        saturation: newSaturation,
        luminosity: newLuminosity,
        opacity: baseControls.opacity, // No cambiar opacity
      };
    },
    []
  );

  /**
   * Generar controles aleatorios (Randomize)
   */
  const generateRandomControls = useCallback((prng: SeededRandom): Controls => {
    return {
      angle: prng.range(0, 360),
      intensity: prng.range(30, 100),
      saturation: prng.range(20, 100),
      luminosity: prng.range(25, 95),
      opacity: prng.range(80, 100),
    };
  }, []);

  /**
   * Generar nueva variante (Generate Variant button)
   */
  const generateVariant = useCallback(() => {
    if (!selectedBackgroundId) return;

    const background = backgrounds.get(selectedBackgroundId);
    if (!background) return;

    // Generar seed
    const timestamp = Date.now();
    const randomSeed = Math.floor(Math.random() * 256);
    const seed = `${selectedBackgroundId}_variant_${timestamp}_${randomSeed}`;

    // Inicializar PRNG
    const prng = new SeededRandom(randomSeed);

    // Generar controles correlacionados
    const newControls = generateCorrelatedControls(background.currentVariant.controls, prng);

    // Generar CSS
    const css = generateCSS(background.colors, newControls);

    // Crear variante
    const variation: Variation = {
      seed,
      controls: newControls,
      css,
      appliedAt: new Date(),
    };

    setVariant(variation);
  }, [selectedBackgroundId, backgrounds, generateCorrelatedControls, setVariant]);

  /**
   * Randomizer (Randomize button)
   */
  const randomize = useCallback(() => {
    if (!selectedBackgroundId) return;

    const background = backgrounds.get(selectedBackgroundId);
    if (!background) return;

    // Generar seed
    const timestamp = Date.now();
    const randomSeed = Math.floor(Math.random() * 256);
    const seed = `${selectedBackgroundId}_random_${timestamp}_${randomSeed}`;

    // Inicializar PRNG
    const prng = new SeededRandom(randomSeed);

    // Generar controles aleatorios
    const newControls = generateRandomControls(prng);

    // Generar CSS
    const css = generateCSS(background.colors, newControls);

    // Crear variante
    const variation: Variation = {
      seed,
      controls: newControls,
      css,
      appliedAt: new Date(),
    };

    setVariant(variation);
  }, [selectedBackgroundId, backgrounds, generateRandomControls, setVariant]);

  /**
   * Reproducir desde seed
   */
  const reproduceFromSeed = useCallback(
    (seed: string) => {
      if (!selectedBackgroundId) return;

      const background = backgrounds.get(selectedBackgroundId);
      if (!background) return;

      // Parsear seed
      const parts = seed.split("_");
      if (parts.length < 2) return;

      const type = parts[1]; // "variant", "random", o "default"
      if (type === "default") {
        // Retornar a estado base
        const baseVariation: Variation = {
          seed: "default_0",
          controls: background.baseStyle,
          css: background.css.raw,
          appliedAt: new Date(),
        };
        setVariant(baseVariation);
        return;
      }

      const randomSeed = parseInt(parts[parts.length - 1], 10);
      const prng = new SeededRandom(randomSeed);

      let newControls: Controls;
      if (type === "variant") {
        newControls = generateCorrelatedControls(background.currentVariant.controls, prng);
      } else {
        newControls = generateRandomControls(prng);
      }

      // Generar CSS
      const css = generateCSS(background.colors, newControls);

      // Crear variante
      const variation: Variation = {
        seed,
        controls: newControls,
        css,
        appliedAt: new Date(),
      };

      setVariant(variation);
    },
    [selectedBackgroundId, backgrounds, generateCorrelatedControls, generateRandomControls, setVariant]
  );

  return {
    generateVariant,
    randomize,
    reproduceFromSeed,
  };
};
