import type { Background, BackgroundControls } from "../types/background";

/**
 * Genera variaciones de un background basadas en seed
 * FASE 3: Variaciones reproducibles basadas en colores, ángulo, intensidad
 */
export function generateVariation(
  background: Background,
  seed: string,
  type: "variant" | "random"
): {
  controls: BackgroundControls;
  angle: number;
  seed: string;
} {
  // Generar número pseudo-aleatorio reproducible desde el seed
  const seedValue = hashSeed(seed);
  
  // Generar variaciones
  const angleVariation = type === "random"
    ? Math.floor((seedValue % 360) * 1000) / 1000
    : background.angle ? adjustAngle(background.angle, seedValue) : 135;

  const intensityVariation = type === "random"
    ? 0.5 + ((seedValue * 0.7) % 1.5)
    : background.controls.intensity + (((seedValue % 100) / 100) * 0.4 - 0.2);

  const saturationVariation = type === "random"
    ? 0.5 + ((seedValue * 0.9) % 1.5)
    : background.controls.saturation + (((seedValue % 100) / 100) * 0.4 - 0.2);

  const luminosityVariation = type === "random"
    ? 0.5 + ((seedValue * 0.6) % 1.0)
    : background.controls.luminosity + (((seedValue % 100) / 100) * 0.3 - 0.15);

  const opacityVariation = type === "random"
    ? 0.7 + ((seedValue * 0.3) % 0.3)
    : background.controls.opacity;

  return {
    controls: {
      intensity: clamp(intensityVariation, 0.5, 2.0),
      saturation: clamp(saturationVariation, 0.5, 2.0),
      luminosity: clamp(luminosityVariation, 0.5, 1.5),
      opacity: clamp(opacityVariation, 0, 1),
    },
    angle: Math.floor(angleVariation) % 360,
    seed,
  };
}

/**
 * Genera un seed aleatorio único
 */
export function generateRandomSeed(): string {
  return `user-variant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Genera un seed para "Generate variant" basado en el actual
 */
export function generateNextVariantSeed(currentSeed: string): string {
  const timestamp = Date.now();
  return `${currentSeed.split("-").slice(0, -1).join("-")}-${timestamp}`;
}

/**
 * Hash simple y reproducible desde un string
 */
function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Ajusta el ángulo de forma controlada
 */
function adjustAngle(baseAngle: number, seed: number): number {
  const offset = (seed % 180) - 90;
  return (baseAngle + offset + 360) % 360;
}

/**
 * Limita un valor entre min y max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
