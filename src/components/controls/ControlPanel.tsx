import { useDarkMode } from '../../stores'
import { useControlsHandler } from '../../hooks'
import type { Controls } from '../../types'

export const ControlPanel = () => {
  const darkMode = useDarkMode()
  const { controls, handleControlChange, handleResetControls } = useControlsHandler()

  const controlDefinitions: Array<{
    key: keyof Controls
    label: string
    min: number
    max: number
    step: number
    unit: string
  }> = [
    { key: 'angle', label: 'Angle', min: 0, max: 360, step: 1, unit: '°' },
    { key: 'intensity', label: 'Intensity', min: 30, max: 100, step: 1, unit: '%' },
    { key: 'saturation', label: 'Saturation', min: 20, max: 100, step: 1, unit: '%' },
    { key: 'luminosity', label: 'Luminosity', min: 25, max: 95, step: 1, unit: '%' },
    { key: 'opacity', label: 'Opacity', min: 80, max: 100, step: 1, unit: '%' },
  ]

  return (
    <div
      className={`p-4 rounded-lg border space-y-4 ${
        darkMode
          ? 'border-gray-700 bg-gray-800'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Customize</h3>
        <button
          onClick={handleResetControls}
          className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
            darkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          }`}
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {controlDefinitions.map(({ key, label, min, max, step, unit }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">{label}</label>
              <span className={`text-sm font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {controls[key]}{unit}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={controls[key]}
              onChange={(e) => handleControlChange(key, Number(e.target.value))}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                darkMode ? 'accent-purple-500' : 'accent-purple-500'
              }`}
              style={{
                background: darkMode
                  ? `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${
                      ((controls[key] - min) / (max - min)) * 100
                    }%, rgb(55, 65, 81) ${
                      ((controls[key] - min) / (max - min)) * 100
                    }%, rgb(55, 65, 81) 100%)`
                  : `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${
                      ((controls[key] - min) / (max - min)) * 100
                    }%, rgb(229, 231, 235) ${
                      ((controls[key] - min) / (max - min)) * 100
                    }%, rgb(229, 231, 235) 100%)`,
              }}
            />
          </div>
        ))}
      </div>

      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>💡 Tip: Adjust controls to customize the gradient in real-time.</p>
      </div>
    </div>
  )
}
