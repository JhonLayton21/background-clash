import { useAllBackgrounds, useSelectedBackground } from '../../stores'
import { useDarkMode } from '../../stores'
import { BackgroundCard } from '../library/BackgroundCard'

export const Sidebar = () => {
  const backgrounds = useAllBackgrounds()
  const selectedBackground = useSelectedBackground()
  const darkMode = useDarkMode()

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className={`px-4 py-4 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h2 className={`text-sm font-semibold uppercase tracking-wide ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Library
        </h2>
      </div>

      {/* Backgrounds Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-2">
          {backgrounds.map((background) => (
            <BackgroundCard
              key={background.id}
              background={background}
              isSelected={selectedBackground?.id === background.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
