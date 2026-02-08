import type { SavedBackground } from "../types/background";

const STORAGE_KEY = "background-clash-saved";

/**
 * Obtener todos los fondos guardados desde localStorage
 */
export function getSavedBackgrounds(): SavedBackground[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error al cargar fondos guardados:", error);
    return [];
  }
}

/**
 * Guardar un nuevo fondo personalizado
 */
export function saveBackground(background: SavedBackground): void {
  try {
    const saved = getSavedBackgrounds();
    const exists = saved.findIndex((bg) => bg.id === background.id);
    
    if (exists >= 0) {
      saved[exists] = background;
    } else {
      saved.push(background);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch (error) {
    console.error("Error al guardar fondo:", error);
  }
}

/**
 * Eliminar un fondo guardado
 */
export function deleteBackground(id: string): void {
  try {
    const saved = getSavedBackgrounds();
    const filtered = saved.filter((bg) => bg.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error al eliminar fondo:", error);
  }
}

/**
 * Generar ID único para un fondo personalizado
 */
export function generateSavedBackgroundId(baseName: string): string {
  const timestamp = Date.now();
  const sanitized = baseName.toLowerCase().replace(/\s+/g, "-");
  return `saved-${sanitized}-${timestamp}`;
}
