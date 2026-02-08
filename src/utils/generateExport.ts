import type { Background, BackgroundControls } from "../types/background";
import { generateControlledCSS } from "./applyControls";

/**
 * Exportar como CSS variable
 * Ej: "--bg-name: linear-gradient(...);"
 */
export function generateCSSVariable(
  background: Background,
  controls: BackgroundControls,
  angle: number
): string {
  const css = generateControlledCSS(background, controls, angle);
  const varName = `--bg-${background.id.replace(/-/g, "-")}`;
  return `${varName}: ${css};`;
}

/**
 * Exportar como Tailwind config snippet
 * Para agregar en tailwind.config.js
 */
export function generateTailwindConfig(
  background: Background,
  controls: BackgroundControls,
  angle: number
): string {
  const css = generateControlledCSS(background, controls, angle);
  const configName = background.id.replace(/-/g, "-");
  
  return `backgroundImage: {
  '${configName}': '${css}',
}`;
}

/**
 * Exportar como inline style
 * Ej: style="background: linear-gradient(...);"
 */
export function generateInlineStyle(
  background: Background,
  controls: BackgroundControls,
  angle: number
): string {
  const css = generateControlledCSS(background, controls, angle);
  return `style="background: ${css};"`;
}

/**
 * Obtener información de compatibilidad de navegadores
 */
export function getBrowserSupport(_background: Background): string[] {
  const baseSupport = ["Chrome", "Firefox", "Safari", "Edge"];
  
  // Todos los gradientes son soportados en navegadores modernos
  return baseSupport;
}

/**
 * Formato de compatibilidad legible
 */
export function getCompatibilityLabel(background: Background): string {
  const support = getBrowserSupport(background);
  return support.length === 4 ? "Todos los navegadores modernos" : support.join(", ");
}
