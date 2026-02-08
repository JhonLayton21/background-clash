import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  FavoritesStoreState,
  Collection,
} from "../types";

export const useFavoritesStore = create<FavoritesStoreState>()(
  persist(
    (set) => ({
      favorites: [],
      collections: new Map(),
      userNotes: new Map(),

      /**
       * Agregar/eliminar favorito
       */
      toggleFavorite: (backgroundId: string) => {
        set((state) => ({
          favorites: state.favorites.includes(backgroundId)
            ? state.favorites.filter((id) => id !== backgroundId)
            : [...state.favorites, backgroundId],
        }));
      },

      /**
       * Agregar background a colección
       */
      addToCollection: (collectionId: string, backgroundId: string) => {
        set((state) => {
          const collection = state.collections.get(collectionId);
          if (!collection) return state;

          const newCollection = {
            ...collection,
            backgroundIds: Array.from(new Set([...collection.backgroundIds, backgroundId])),
            updatedAt: new Date(),
          };

          const newCollections = new Map(state.collections);
          newCollections.set(collectionId, newCollection);
          return { collections: newCollections };
        });
      },

      /**
       * Eliminar background de colección
       */
      removeFromCollection: (collectionId: string, backgroundId: string) => {
        set((state) => {
          const collection = state.collections.get(collectionId);
          if (!collection) return state;

          const newCollection = {
            ...collection,
            backgroundIds: collection.backgroundIds.filter(
              (id) => id !== backgroundId
            ),
            updatedAt: new Date(),
          };

          const newCollections = new Map(state.collections);
          newCollections.set(collectionId, newCollection);
          return { collections: newCollections };
        });
      },

      /**
       * Crear nueva colección
       */
      createCollection: (name: string) => {
        set((state) => {
          const id = `collection-${Date.now()}-${Math.random()}`;
          const collection: Collection = {
            id,
            name,
            backgroundIds: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          const newCollections = new Map(state.collections);
          newCollections.set(id, collection);
          return { collections: newCollections };
        });
      },

      /**
       * Eliminar colección
       */
      deleteCollection: (collectionId: string) => {
        set((state) => {
          const newCollections = new Map(state.collections);
          newCollections.delete(collectionId);
          return { collections: newCollections };
        });
      },

      /**
       * Agregar notas a un background
       */
      setNote: (backgroundId: string, note: string) => {
        set((state) => {
          const newNotes = new Map(state.userNotes);
          if (note.trim()) {
            newNotes.set(backgroundId, note);
          } else {
            newNotes.delete(backgroundId);
          }
          return { userNotes: newNotes };
        });
      },
    }),
    {
      name: "background-clash-favorites",
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          const parsed = JSON.parse(item);
          // Convertir Maps de vuelta
          return {
            state: {
              ...parsed.state,
              collections: new Map(parsed.state.collections || []),
              userNotes: new Map(parsed.state.userNotes || []),
            },
            version: parsed.version,
          };
        },
        setItem: (name: string, value: any) => {
          const toSerialize = {
            ...value,
            state: {
              ...value.state,
              collections: Array.from(value.state.collections.entries()),
              userNotes: Array.from(value.state.userNotes.entries()),
            },
          };
          localStorage.setItem(name, JSON.stringify(toSerialize));
        },
        removeItem: (name: string) => localStorage.removeItem(name),
      },
    }
  )
);

/**
 * Selector: Verificar si background es favorito
 */
export const useisFavorite = (backgroundId: string) => {
  return useFavoritesStore((state) =>
    state.favorites.includes(backgroundId)
  );
};

/**
 * Selector: Obtener todas las colecciones
 */
export const useCollections = () => {
  return useFavoritesStore((state) =>
    Array.from(state.collections.values())
  );
};

/**
 * Selector: Obtener colecciones que contienen un background
 */
export const useCollectionsForBackground = (backgroundId: string) => {
  return useFavoritesStore((state) =>
    Array.from(state.collections.values()).filter((col) =>
      col.backgroundIds.includes(backgroundId)
    )
  );
};

/**
 * Selector: Obtener nota de un background
 */
export const useBackgroundNote = (backgroundId: string) => {
  return useFavoritesStore((state) => state.userNotes.get(backgroundId) || "");
};
