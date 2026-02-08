import { useState } from 'react'
import { useDarkMode, useUIStore } from '../../stores'
import { useVariation } from '../../hooks/useVariation'
import { useCurrentCSS } from '../../stores'
import { PreviewToolbar } from './PreviewToolbar'
import { ControlPanel } from '../controls/ControlPanel'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { Background } from '../../types'

interface PreviewAreaProps {
  background: Background | null
}

export const PreviewArea = ({ background }: PreviewAreaProps) => {
  const darkMode = useDarkMode()
  const currentCSS = useCurrentCSS()
  const { generateVariant, randomize } = useVariation()
  const { setShowExportModal } = useUIStore()
  const [copied, setCopied] = useState(false)
  const [showControls, setShowControls] = useState(true)

  if (!background) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${
        darkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <p className={`text-lg font-medium mb-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Select a background to preview
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Choose from the library on the left
          </p>
        </div>
      </div>
    )
  }

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(currentCSS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Main Preview */}
      <div
        className="flex-1 transition-all duration-500"
        style={{
          background: currentCSS
            .replace('background: ', '')
            .replace(';', ''),
        }}
      />

      {/* Toolbar + Controls Container */}
      <div
        className={`border-t transition-colors duration-300 overflow-hidden ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}
        style={{
          maxHeight: showControls ? '500px' : '350px',
          overflow: 'auto',
        }}
      >
        {/* Toolbar */}
        <PreviewToolbar
          background={background}
          onCopyCSS={handleCopyCSS}
          onExport={() => setShowExportModal(true)}
          onGenerateVariant={generateVariant}
          onRandomize={randomize}
          copied={copied}
        />

        {/* Controls Toggle */}
        <div className={`px-6 py-2 border-t cursor-pointer transition-colors duration-200 ${
          darkMode
            ? 'border-gray-700 hover:bg-gray-700'
            : 'border-gray-200 hover:bg-gray-50'
        }`} onClick={() => setShowControls(!showControls)}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">Advanced Controls</span>
            {showControls ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>

        {/* Control Panel */}
        {showControls && (
          <div className="px-6 py-4 border-t" style={{
            borderColor: darkMode ? '#374151' : '#e5e7eb'
          }}>
            <ControlPanel />
          </div>
        )}
      </div>
    </div>
  )
}
