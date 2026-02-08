import type { CSSProperties } from 'react';

/**
 * Color stop en un gradiente
 * FASE 2: Usado en controles de variación
 */
export interface ColorStop {
  color: string;  // Hex, RGB, HSL
  stop: number;   // 0-100 (porcentaje)
}

/**
 * Controles de variación del background
 * FASE 2: Angle, Intensidad, Saturación, Luminosidad, Opacidad
 */
export interface BackgroundControls {
  intensity: number;     // 0.5 - 2.0 (controla saturación del gradiente)
  saturation: number;    // 0.5 - 2.0 (saturación de colores)
  luminosity: number;    // 0.5 - 1.5 (brillo/luminancia)
  opacity: number;       // 0 - 1 (opacidad global)
}

/**
 * Variantes de export del background
 * FASE 5: CSS variable, Tailwind, Inline style
 */
export interface ExportVariants {
  cssVariable: string;   // ej: "--bg-name: linear-gradient(...);"
  tailwindConfig: string; // snippet para tailwind.config.js
  inlineStyle: string;   // ej: "background: linear-gradient(...);"
}

/**
 * Información de export
 * FASE 5: Múltiples formatos y compatibilidad
 */
export interface ExportInfo {
  variants: ExportVariants;
  browserSupport: string[]; // ['all'] o navegadores específicos
}

/**
 * Información de share
 * FASE 7: URLs reproducibles
 */
export interface ShareInfo {
  url: string;        // URL con parámetros para reproducir
  isShareable: boolean;
}

/**
 * Metadata del background
 * FASE 6: Para persistencia en localStorage
 */
export interface BackgroundMetadata {
  createdAt: string;    // ISO 8601
  updatedAt: string;    // ISO 8601
  version: number;      // Para controlar cambios
  isEdited: boolean;    // true si el usuario lo ha modificado
  baseId?: string;      // ID del original si fue clonado
}

/**
 * Modelo principal de Background
 * Soporta todas las fases del roadmap (Fase 2 - Fase 7)
 */
export interface Background {
  // IDENTIFICACIÓN
  id: string;           // ID único (ej: "bg-solar-flare")
  name: string;         // Nombre del background
  description?: string; // Descripción opcional

  // TIPO y ESTRUCTURA (FASE 2)
  type: 'linear' | 'radial' | 'conic' | 'repeating-linear' | 'repeating-radial';
  colors: ColorStop[];  // Array de colores con posiciones
  angle?: number;       // 0-360° (FASE 2: Para linear y conic)
  radialShape?: 'circle' | 'ellipse'; // (Para radial)

  // CONTROLES DE VARIACIÓN (FASE 2)
  controls: BackgroundControls;

  // ORGANIZACIÓN (FASE 4)
  category: 'soft' | 'dark' | 'neon' | 'pastel' | 'nature';
  isFavorite: boolean;  // Toggle de favorito ⭐

  // REPRODUCIBILIDAD (FASE 3)
  seed: string;         // Hash reproducible para variaciones

  // CSS GENERADO (FASE 1 & 5)
  css: string;          // String CSS listo para copiar
  previewStyle: CSSProperties; // Objeto para preview en React

  // EXPORT (FASE 5)
  export: ExportInfo;

  // SHARE (FASE 7)
  share: ShareInfo;

  // METADATA
  metadata: BackgroundMetadata;
}

/**
 * Extensión de Background para persistencia local
 * FASE 6: Campos adicionales para localStorage
 */
export interface SavedBackground extends Background {
  savedAt: string;        // ISO 8601
  userNotes?: string;    // Notas personales del usuario
  usageCount?: number;   // Cuántas veces se usó
}

/**
 * Valores por defecto para controles
 */
export const DEFAULT_CONTROLS: BackgroundControls = {
  intensity: 1.0,
  saturation: 1.0,
  luminosity: 1.0,
  opacity: 1.0,
};

/**
 * Rango seguro de valores para controles
 */
export const CONTROL_RANGES = {
  intensity: { min: 0.5, max: 2.0 },
  saturation: { min: 0.5, max: 2.0 },
  luminosity: { min: 0.5, max: 1.5 },
  opacity: { min: 0, max: 1 },
  angle: { min: 0, max: 360 },
} as const;

/**
 * Categorías disponibles (FASE 4)
 */
export const BACKGROUND_CATEGORIES = ['soft', 'dark', 'neon', 'pastel', 'nature'] as const;
export type BackgroundCategory = typeof BACKGROUND_CATEGORIES[number];

/**
 * Tipos de gradiente (FASE 2)
 */
export const GRADIENT_TYPES = ['linear', 'radial', 'conic', 'repeating-linear', 'repeating-radial'] as const;
export type GradientType = typeof GRADIENT_TYPES[number];
