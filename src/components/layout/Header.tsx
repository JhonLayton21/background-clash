import { Moon, Sun } from 'lucide-react'
import { useUIStore } from '../../stores'

export const Header = () => {
  const { darkMode, toggleDarkMode } = useUIStore()

  return (
    <header className={`border-b transition-colors duration-300 ${
      darkMode
        ? 'border-gray-700 bg-gray-800'
        : 'border-gray-200 bg-white'
    }`}>
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Background Clash
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore. Customize. Copy.
          </p>
        </div>

        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            darkMode
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}
