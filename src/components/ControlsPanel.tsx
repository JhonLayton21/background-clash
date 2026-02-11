import type { BackgroundControls } from "../types/background";
import { CONTROL_RANGES, DEFAULT_CONTROLS } from "../types/background";
import { Button } from "./ui/button";

interface ControlsPanelProps {
  controls: BackgroundControls;
  angle: number;
  seed: string;
  onControlsChange: (controls: BackgroundControls) => void;
  onAngleChange: (angle: number) => void;
  onGenerateVariant: () => void;
  onRandomize: () => void;
}

export function ControlsPanel({
  controls,
  angle,
  seed,
  onControlsChange,
  onAngleChange,
  onGenerateVariant,
  onRandomize,
}: ControlsPanelProps) {
  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onAngleChange(value);
  };

  const handleControl = (key: keyof BackgroundControls, value: number) => {
    onControlsChange({
      ...controls,
      [key]: value,
    });
  };

  const handleReset = () => {
    onControlsChange(DEFAULT_CONTROLS);
    onAngleChange(135);
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      {/* Botones de variación (FASE 3) */}
      <div className="flex gap-2 mb-3">
        <Button
          onClick={onGenerateVariant}
          className="flex-1 text-xs px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white transition-colors font-medium"
          title="Genera una variación controlada del background"
        >
          Generate
        </Button>
        <Button
          onClick={onRandomize}
          className="flex-1 text-xs px-3 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white transition-colors font-medium"
          title="Genera una variación completamente aleatoria"
        >
          Randomize
        </Button>
      </div>

      {/* Título de controles */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Controles</h3>
        <Button
          onClick={handleReset}
          className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
          title="Restaurar valores por defecto"
        >
          Reset
        </Button>
      </div>

      {/* Seed info (FASE 3) */}
      <div className="mb-3 p-2 bg-gray-50 rounded border border-gray-200">
        <p className="text-xs text-gray-600">
          <span className="font-medium">Seed:</span> <span className="font-mono text-gray-700 break-all">{seed.substring(0, 24)}...</span>
        </p>
      </div>

      <div className="space-y-3">
        {/* Angle */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">
            Ángulo: <span className="text-blue-600">{angle}°</span>
          </label>
          <input
            type="range"
            min="0"
            max="360"
            step="15"
            value={angle}
            onChange={handleAngleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Intensity */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">
            Intensidad: <span className="text-blue-600">{controls.intensity.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min={CONTROL_RANGES.intensity.min}
            max={CONTROL_RANGES.intensity.max}
            step="0.1"
            value={controls.intensity}
            onChange={(e) =>
              handleControl("intensity", parseFloat(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Saturation */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">
            Saturación: <span className="text-blue-600">{controls.saturation.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min={CONTROL_RANGES.saturation.min}
            max={CONTROL_RANGES.saturation.max}
            step="0.1"
            value={controls.saturation}
            onChange={(e) =>
              handleControl("saturation", parseFloat(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Luminosity */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">
            Luminosidad: <span className="text-blue-600">{controls.luminosity.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min={CONTROL_RANGES.luminosity.min}
            max={CONTROL_RANGES.luminosity.max}
            step="0.1"
            value={controls.luminosity}
            onChange={(e) =>
              handleControl("luminosity", parseFloat(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Opacity */}
        <div>
          <label className="text-xs font-medium text-gray-700 block mb-1">
            Opacidad: <span className="text-blue-600">{(controls.opacity * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range"
            min={CONTROL_RANGES.opacity.min}
            max={CONTROL_RANGES.opacity.max}
            step="0.05"
            value={controls.opacity}
            onChange={(e) =>
              handleControl("opacity", parseFloat(e.target.value))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
