import type { ColorStop, Controls } from "../types";

/**
 * CSS Generator - Generar CSS a partir de colores y controles
 */

/**
 * Convertir HSL a RGB
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s = s / 100;
  l = l / 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return [parseInt(f(0), 16), parseInt(f(8), 16), parseInt(f(4), 16)];
}

/**
 * Convertir RGB a HSL
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Aplicar controles a color (saturación, luminosidad, opacidad)
 */
function applyControlsToColor(
  color: string,
  saturation: number,
  luminosity: number,
  opacity: number
): string {
  // Parsear hex color
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Convertir RGB a HSL
  const [h, s, l] = rgbToHsl(r, g, b);

  // Aplicar saturación
  const newS = (s * saturation) / 100;

  // Aplicar luminosidad (más luminosity = más claro)
  const luminosityFactor = luminosity / 100;
  const newL = l + (100 - l) * (luminosityFactor - 1) * 0.5;

  // Convertir back to RGB
  const [newR, newG, newB] = hslToRgb(h, newS, newL);

  // Aplicar opacidad
  const alpha = opacity / 100;

  // Retornar como rgba
  return `rgba(${newR}, ${newG}, ${newB}, ${alpha})`;
}

/**
 * Generar CSS gradient a partir de colores y controles
 */
export function generateCSS(colors: ColorStop[], controls: Controls): string {
  if (!colors || colors.length < 2) {
    return "background: #f0f0f0;";
  }

  // Aplicar controles a colores
  const adjustedColors = colors.map((color) => {
    const adjustedColor = applyControlsToColor(
      color.value,
      controls.saturation,
      controls.luminosity,
      controls.opacity
    );
    return `${adjustedColor} ${color.position}%`;
  });

  // Generar CSS gradient
  const colorString = adjustedColors.join(", ");
  return `background: linear-gradient(${controls.angle}deg, ${colorString});`;
}

/**
 * Generar múltiples formatos de CSS
 */
export function generateCSSVariants(colors: ColorStop[], controls: Controls): Record<string, string> {
  const baseCSS = generateCSS(colors, controls);

  return {
    raw: baseCSS,
    formatted: formatCSS(baseCSS),
  };
}

/**
 * Formatear CSS para mejor legibilidad
 */
function formatCSS(css: string): string {
  // simple formatting
  return css.replace(", ", ",\n  ");
}

/**
 * Parsear CSS gradient y extraer valores
 */
export function parseGradientCSS(css: string): {
  angle?: number;
  colors: Array<{ color: string; position: string }>;
} {
  // Implementación simplificada
  const angleMatch = css.match(/(\d+)deg/);
  const angle = angleMatch ? parseInt(angleMatch[1], 10) : 0;

  const colorMatches = css.matchAll(/rgba?\([^)]+\)\s+([\d.]+%)?/g);
  const colors = Array.from(colorMatches).map((match) => ({
    color: match[0],
    position: match[1] || "0%",
  }));

  return { angle, colors };
}
