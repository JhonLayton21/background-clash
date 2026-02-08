/**
 * Background Clash v2 - Type Definitions
 * Single source of truth for all types
 */

// ============================================================================
// COLOR TYPES
// ============================================================================

export interface HSLColor {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface RGBColor {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface ColorStop {
  value: string; // hex color
  hex: string;
  rgb: RGBColor;
  hsl: HSLColor;
  label: string;
  position: number; // 0-100, position in gradient
}

// ============================================================================
// GRADIENT TYPES
// ============================================================================

export type GradientType = "linear-gradient" | "radial-gradient" | "conic-gradient";

export type BackgroundCategory =
  | "soft"
  | "dark"
  | "neon"
  | "pastel"
  | "nature";

// ============================================================================
// CONTROLS & VARIATIONS
// ============================================================================

export interface Controls {
  angle: number; // 0-360
  intensity: number; // 0-100, how vibrant the gradient is
  saturation: number; // 0-100, color purity
  luminosity: number; // 0-100, brightness
  opacity: number; // 0-100, transparency (0-1 in CSS)
}

export interface ControlsMetadata {
  lastModified?: Date;
  modifiedBy?: "user" | "variant" | "randomize";
}

export interface Variation {
  seed: string; // "${backgroundId}_${type}_${timestamp}_${randomSeed}"
  controls: Controls;
  css: string; // raw CSS to copy-paste
  appliedAt: Date;
}

// ============================================================================
// BACKGROUND CORE
// ============================================================================

export interface CSSSupport {
  linear: boolean;
  radial: boolean;
  conic: boolean;
  minBrowserVersion: string;
}

export interface BackgroundMetadata {
  createdAt: Date;
  updatedAt: Date;
  author: string;
  version: string;
  cssSupport: CSSSupport;
  usageCount: number;
  rating: number; // 0-5
}

export interface Background {
  // Identity
  id: string; // "bg-soft-01"
  name: string; // "Soft Gradient"
  description?: string;
  category: BackgroundCategory;
  tags?: string[];

  // Gradient Definition
  gradientType: GradientType;
  colors: ColorStop[];

  // Base Style (defaults)
  baseStyle: Controls;

  // Current State
  currentVariant: Variation;

  // CSS (cached)
  css: {
    raw: string; // "background: linear-gradient(135deg, #f5d0fe, #bae6fd);"
    formatted?: string;
    generatedAt: Date;
  };

  // Metadata
  metadata: BackgroundMetadata;
}

// ============================================================================
// EXPORT TYPES
// ============================================================================

export type ExportFormat = "css" | "cssVariable" | "tailwindClass" | "inlineStyle" | "scssVariable";

export interface ExportOption {
  label: string;
  code: string;
  format: ExportFormat;
}

export interface ExportData {
  css: ExportOption;
  cssVariable: ExportOption;
  tailwindClass: ExportOption;
  inlineStyle: ExportOption;
  scssVariable: ExportOption;
}

// ============================================================================
// SHARE & URL
// ============================================================================

export interface ShareData {
  shortUrl: string;
  fullUrl: string;
  params: URLParams;
}

export interface URLParams {
  backgroundId: string;
  seed?: string;
  angle?: number;
  intensity?: number;
  saturation?: number;
  luminosity?: number;
  opacity?: number;
}

// ============================================================================
// USER DATA (localStorage)
// ============================================================================

export interface UserBackgroundData {
  isFavorite: boolean;
  inCollections: string[];
  notes?: string;
  lastUsed?: Date;
  appliedTimes: number;
}

export interface Collection {
  id: string;
  name: string;
  backgroundIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// STORE STATE
// ============================================================================

export interface BackgroundStoreState {
  // All backgrounds library
  backgrounds: Map<string, Background>;
  selectedBackgroundId: string | null;

  // Actions
  selectBackground: (id: string) => void;
  loadBackgrounds: (backgrounds: Background[]) => void;
}

export interface VariantStoreState {
  currentVariant: Variation | null;
  previousVariants: Variation[];

  // Actions
  setVariant: (variant: Variation) => void;
  generateVariant: (backgroundId: string) => void;
  randomize: (backgroundId: string) => void;
  reproductionFromSeed: (backgroundId: string, seed: string) => void;
}

export interface ControlsStoreState {
  controls: Controls;
  defaultControls: Controls;

  // Actions
  updateControl: <K extends keyof Controls>(key: K, value: Controls[K]) => void;
  resetControls: () => void;
  setControls: (controls: Partial<Controls>) => void;
}

export interface FavoritesStoreState {
  favorites: string[]; // background IDs
  collections: Map<string, Collection>;
  userNotes: Map<string, string>;

  // Actions
  toggleFavorite: (backgroundId: string) => void;
  addToCollection: (collectionId: string, backgroundId: string) => void;
  removeFromCollection: (collectionId: string, backgroundId: string) => void;
  createCollection: (name: string) => void;
  deleteCollection: (collectionId: string) => void;
  setNote: (backgroundId: string, note: string) => void;
}

export interface UIStoreState {
  darkMode: boolean;
  activeFilter: BackgroundCategory | null;
  searchQuery: string;
  showExportModal: boolean;
  showCollectionsModal: boolean;

  // Actions
  toggleDarkMode: () => void;
  setFilter: (filter: BackgroundCategory | null) => void;
  setSearchQuery: (query: string) => void;
  setShowExportModal: (show: boolean) => void;
  setShowCollectionsModal: (show: boolean) => void;
}

// ============================================================================
// LOCAL STORAGE SCHEMA
// ============================================================================

export interface LocalStorageSchema {
  darkMode: boolean;
  lastBackground?: {
    id: string;
    variation: Variation;
  };
  favorites: string[];
  collections: Record<string, string[]>;
  userNotes: Record<string, string>;
}
