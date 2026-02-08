import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UIStoreState, BackgroundCategory } from "../types";

export const useUIStore = create<UIStoreState>()(
  persist(
    (set) => ({
      darkMode: false,
      activeFilter: null,
      searchQuery: "",
      showExportModal: false,
      showCollectionsModal: false,

      /**
       * Toggle dark mode
       */
      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.darkMode;
          // Aplicar clase a documento
          if (newDarkMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { darkMode: newDarkMode };
        });
      },

      /**
       * Establecer filtro activo (por categoría)
       */
      setFilter: (filter: BackgroundCategory | null) => {
        set({ activeFilter: filter });
      },

      /**
       * Establecer búsqueda
       */
      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      /**
       * Mostrar/ocultar modal de export
       */
      setShowExportModal: (show: boolean) => {
        set({ showExportModal: show });
      },

      /**
       * Mostrar/ocultar modal de colecciones
       */
      setShowCollectionsModal: (show: boolean) => {
        set({ showCollectionsModal: show });
      },
    }),
    {
      name: "background-clash-ui",
      partialize: (state) => ({
        darkMode: state.darkMode,
      }),
    }
  )
);

/**
 * Selector: Obtener modo actual
 */
export const useDarkMode = () => {
  return useUIStore((state) => state.darkMode);
};

/**
 * Selector: Obtener filtro activo
 */
export const useActiveFilter = () => {
  return useUIStore((state) => state.activeFilter);
};

/**
 * Selector: Obtener búsqueda
 */
export const useSearchQuery = () => {
  return useUIStore((state) => state.searchQuery);
};

/**
 * Selector: Obtener estado de export modal
 */
export const useShowExportModal = () => {
  return useUIStore((state) => state.showExportModal);
};

/**
 * Selector: Obtener estado de collections modal
 */
export const useShowCollectionsModal = () => {
  return useUIStore((state) => state.showCollectionsModal);
};

/**
 * Inicializar UI en mount (aplicar dark mode si estaba activo)
 */
export const initializeUIStore = () => {
  const darkMode = useUIStore((state) => state.darkMode);
  if (darkMode) {
    document.documentElement.classList.add("dark");
  }
};
