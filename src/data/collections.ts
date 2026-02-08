/**
 * Colecciones predefinidas de backgrounds
 * Estos son sets temáticos de backgrounds para flujos rápidos
 */

export interface Collection {
  id: string;
  name: string;
  description: string;
  backgroundIds: string[];
}

export const PREDEFINED_COLLECTIONS: Collection[] = [
  {
    id: "collection-soft-ui",
    name: "Soft UI",
    description: "Gradientes suaves para interfaces modernas",
    backgroundIds: ["soft-coral", "soft-lavender", "soft-mint", "soft-peach"],
  },
  {
    id: "collection-dark-mode",
    name: "Dark Mode",
    description: "Fondos oscuros elegantes",
    backgroundIds: ["dark-navy", "dark-charcoal", "dark-midnight"],
  },
  {
    id: "collection-vibrant",
    name: "Vibrant",
    description: "Colores saturados y energéticos",
    backgroundIds: ["neon-electric", "pastel-pink", "pastel-blue", "pastel-mint"],
  },
  {
    id: "collection-natural",
    name: "Natural",
    description: "Inspirados en la naturaleza",
    backgroundIds: ["nature-forest"],
  },
];

/**
 * Obtener todas las colecciones
 */
export function getCollections(): Collection[] {
  return PREDEFINED_COLLECTIONS;
}

/**
 * Obtener una colección por ID
 */
export function getCollectionById(id: string): Collection | undefined {
  return PREDEFINED_COLLECTIONS.find((c) => c.id === id);
}
