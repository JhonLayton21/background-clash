import type { Background, BackgroundControls } from "../types/background";

/**
 * Interfaz para el estado que se comparte vía URL
 */
export interface ShareState {
  bgId?: string;
  angle?: number;
  intensity?: number;
  saturation?: number;
  luminosity?: number;
  opacity?: number;
}

/**
 * Generar URL con parámetros del background actual
 */
export function generateShareUrl(
  background: Background,
  controls: BackgroundControls,
  angle: number
): string {
  const baseUrl = window.location.origin + window.location.pathname;
  
  const params = new URLSearchParams({
    bgId: background.id,
    angle: String(angle),
    intensity: String(controls.intensity),
    saturation: String(controls.saturation),
    luminosity: String(controls.luminosity),
    opacity: String(controls.opacity),
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Parsear parámetros de URL
 */
export function parseShareUrl(): ShareState {
  const params = new URLSearchParams(window.location.search);
  
  return {
    bgId: params.get("bgId") ?? undefined,
    angle: params.get("angle") ? Number(params.get("angle")) : undefined,
    intensity: params.get("intensity") ? Number(params.get("intensity")) : undefined,
    saturation: params.get("saturation") ? Number(params.get("saturation")) : undefined,
    luminosity: params.get("luminosity") ? Number(params.get("luminosity")) : undefined,
    opacity: params.get("opacity") ? Number(params.get("opacity")) : undefined,
  };
}

/**
 * Copiar URL al portapapeles
 */
export async function copyShareUrlToClipboard(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error("Error al copiar URL:", error);
    return false;
  }
}
