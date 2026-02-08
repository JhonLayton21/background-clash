import { useEffect } from "react";
import { useBackgroundStore, useSelectedBackground } from "../stores";
import { backgrounds as initialBackgrounds } from "../data/backgrounds";

/**
 * Hook: Cargar y gestionar backgrounds
 * Responsabilidad: Inicializar librería al montar
 */
export const useBackground = () => {
  const selectedBackground = useSelectedBackground();
  const { selectBackground, loadBackgrounds } = useBackgroundStore();

  // Cargar backgrounds al montar
  useEffect(() => {
    loadBackgrounds(initialBackgrounds);
  }, [loadBackgrounds]);

  return {
    selectedBackground,
    selectBackground,
  };
};

/**
 * Hook: Obtener background por ID (para componentes específicos)
 */
export const useBackgroundData = (id: string | null) => {
  const { backgrounds } = useBackgroundStore();

  if (!id) return null;
  return backgrounds.get(id) || null;
};
