import { Copy, RefreshCw, Download, Dices } from 'lucide-react'
import { useDarkMode } from '../../stores'
import type { Background } from '../../types'

interface PreviewToolbarProps {
  background: Background
  onCopyCSS: () => void
  onExport: () => void
  onGenerateVariant: () => void
  onRandomize: () => void
  copied: boolean
}

export const PreviewToolbar = ({
  background,
  onCopyCSS,
  onExport,
  onGenerateVariant,
  onRandomize,
  copied,
}: PreviewToolbarProps) => {
  const darkMode = useDarkMode()

  return (
    <div
      className={`border-t transition-colors duration-300 ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="px-6 py-4 space-y-4">
        {/* Background Info */}
        <div>
          <h2 className="text-lg font-semibold">{background.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                background.category === 'dark'
                  ? darkMode
                    ? 'bg-purple-900 text-purple-200'
                    : 'bg-purple-100 text-purple-700'
                  : darkMode
                    ? 'bg-blue-900 text-blue-200'
                    : 'bg-blue-100 text-blue-700'
              }`}
            >
              {background.category}
            </span>
            <span
              className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Rating: ⭐ {background.metadata.rating}
            </span>
          </div>
        </div>

        {/* CSS Display */}
        <div
          className={`p-3 rounded-lg font-mono text-xs overflow-x-auto ${
            darkMode
              ? 'bg-gray-700 text-gray-100'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {background.currentVariant.css}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onCopyCSS}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              copied
                ? darkMode
                  ? 'bg-green-900 text-green-200'
                  : 'bg-green-100 text-green-700'
                : darkMode
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            <Copy size={16} />
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>

          <button
            onClick={onExport}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Download size={16} />
            Export
          </button>

          <button
            onClick={onGenerateVariant}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              darkMode
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            <RefreshCw size={16} />
            Variant
          </button>

          <button
            onClick={onRandomize}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              darkMode
                ? 'bg-pink-600 hover:bg-pink-700 text-white'
                : 'bg-pink-500 hover:bg-pink-600 text-white'
            }`}
          >
            <Dices size={16} />
            Randomize
          </button>
        </div>

        {/* CSS Metrics */}
        <div
          className={`grid grid-cols-4 gap-2 text-center text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <div>
            <div className="font-semibold">{background.metadata.usageCount}</div>
            <div>Used</div>
          </div>
          <div>
            <div className="font-semibold">CSS</div>
            <div>Copy-Ready</div>
          </div>
          <div>
            <div className="font-semibold">v{background.metadata.version}</div>
            <div>Version</div>
          </div>
          <div>
            <div className="font-semibold">{background.colors.length}</div>
            <div>Colors</div>
          </div>
        </div>
      </div>
    </div>
  )
}
