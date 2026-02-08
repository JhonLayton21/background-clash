import { useFavoritesStore, useisFavorite, useCollectionsForBackground } from "../stores";

/**
 * Hook: Gestionar favoritos y colecciones
 * Responsabilidad: Toggle favorite, agregar a colección, crear notas
 */
export const useFavoritesHandler = (backgroundId: string) => {
  const {
    toggleFavorite,
    addToCollection,
    removeFromCollection,
    createCollection,
    deleteCollection,
    setNote,
  } = useFavoritesStore();

  const isFavorite = useisFavorite(backgroundId);
  const collections = useCollectionsForBackground(backgroundId);

  const handleToggleFavorite = () => {
    toggleFavorite(backgroundId);
  };

  const handleAddToCollection = (collectionId: string) => {
    addToCollection(collectionId, backgroundId);
  };

  const handleRemoveFromCollection = (collectionId: string) => {
    removeFromCollection(collectionId, backgroundId);
  };

  const handleCreateCollection = (name: string) => {
    createCollection(name);
  };

  const handleDeleteCollection = (collectionId: string) => {
    deleteCollection(collectionId);
  };

  const handleSetNote = (note: string) => {
    setNote(backgroundId, note);
  };

  return {
    isFavorite,
    collections,
    handleToggleFavorite,
    handleAddToCollection,
    handleRemoveFromCollection,
    handleCreateCollection,
    handleDeleteCollection,
    handleSetNote,
  };
};
