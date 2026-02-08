import type { Background, BackgroundControls } from "../types/background";

/**
 * Aplica controles de variación a un background y retorna el CSS actualizado
 * FASE 2: Angle, Saturation, Luminosity, Opacity
 * 
 * Nota: Saturation y Luminosity se aplican via CSS filters en el preview
 */
export function generateControlledCSS(
  background: Background,
  _controls: BackgroundControls,
  angle?: number
): string {
  const baseCSS = background.css;
  
  // Si no hay cambios en angle, retornar el CSS original
  if (!angle || angle === background.angle) {
    return baseCSS;
  }

  // Reemplazar angle en CSS linear-gradient
  if (background.type === "linear") {
    const pattern = /linear-gradient\(([^,]+),/;
    const newAngle = `linear-gradient(${angle}deg,`;
    return baseCSS.replace(pattern, newAngle);
  }

  return baseCSS;
}
