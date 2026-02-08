/**
 * Store Exports - Centralized access to all Zustand stores
 */

export {
  useBackgroundStore,
  useSelectedBackground,
  useAllBackgrounds,
  useBackgroundById,
} from "./backgroundStore";

export {
  useVariantStore,
  useCurrentVariant,
  useCurrentControls,
  useCurrentSeed,
  useCurrentCSS,
  useVariantHistory,
} from "./variantStore";

export {
  useControlsStore,
  useControls,
  useControlValue,
  useUpdateControl,
  useResetControls,
} from "./controlsStore";

export {
  useFavoritesStore,
  useisFavorite,
  useCollections,
  useCollectionsForBackground,
  useBackgroundNote,
} from "./favoritesStore";

export {
  useUIStore,
  useDarkMode,
  useActiveFilter,
  useSearchQuery,
  useShowExportModal,
  useShowCollectionsModal,
  initializeUIStore,
} from "./uiStore";
