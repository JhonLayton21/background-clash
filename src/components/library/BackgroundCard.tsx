import { useBackgroundStore } from '../../stores'
import { useDarkMode, useisFavorite } from '../../stores'
import { useFavoritesHandler } from '../../hooks/useFavorites'
import { Heart } from 'lucide-react'
import type { Background } from '../../types'

interface BackgroundCardProps {
  background: Background
  isSelected: boolean
}

export const BackgroundCard = ({ background, isSelected }: BackgroundCardProps) => {
  const { selectBackground } = useBackgroundStore()
  const darkMode = useDarkMode()
  const { handleToggleFavorite } = useFavoritesHandler(background.id)
  const isFavorite = useisFavorite(background.id)

  return (
    <div
      onClick={() => selectBackground(background.id)}
      className={`group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 h-28 ${
        isSelected
          ? darkMode
            ? 'ring-2 ring-purple-400 shadow-lg'
            : 'ring-2 ring-purple-500 shadow-lg'
          : 'hover:shadow-md'
      } ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
    >
      {/* Preview */}
      <div
        className="w-full h-full"
        style={{
          background: background.currentVariant.css
            .replace('background: ', '')
            .replace(';', ''),
        }}
      />

      {/* Overlay - visible on hover/selected */}
      <div
        className={`absolute inset-0 flex items-end justify-between p-2 transition-opacity duration-200 ${
          isSelected || true ? 'opacity-100' : 'group-hover:opacity-100 opacity-0'
        } bg-gradient-to-t from-black/60 to-transparent`}
      >
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-medium truncate">
            {background.name}
          </p>
          <p className={`text-xs size-max ${
            background.category === 'dark'
              ? 'text-gray-300'
              : 'text-gray-200'
          }`}>
            {background.category}
          </p>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleToggleFavorite()
          }}
          className="ml-2 p-1 rounded transition-colors duration-200 bg-white/20 hover:bg-white/40"
        >
          <Heart
            size={14}
            className={isFavorite ? 'fill-red-400 text-red-400' : 'text-white'}
          />
        </button>
      </div>
    </div>
  )
}
