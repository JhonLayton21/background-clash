import { useState } from "react";
import type { Background, BackgroundControls } from "../types/background";
import { ControlsPanel } from "./ControlsPanel";
import { ExportPanel } from "./ExportPanel";
import { SaveBackgroundModal } from "./SaveBackgroundModal";
import { SavedBackgroundsList } from "./SavedBackgroundsList";
import { SharePanel } from "./SharePanel";
import { DevModePanel } from "./DevModePanel";
import { Button } from "./ui/button";
import { Save, ChevronDown } from "lucide-react";

interface PreviewAreaProps {
  background: Background | null;
  controls: BackgroundControls;
  angle: number;
  seed: string;
  onControlsChange: (controls: BackgroundControls) => void;
  onAngleChange: (angle: number) => void;
  onGenerateVariant: () => void;
  onRandomize: () => void;
  showSaveModal: boolean;
  onSaveModalToggle: (open: boolean) => void;
  onLoadSavedBackground: (background: Background) => void;
  devMode: boolean;
  onDevModeToggle: (open: boolean) => void;
}

export function PreviewArea({
  background,
  controls,
  angle,
  seed,
  onControlsChange,
  onAngleChange,
  onGenerateVariant,
  onRandomize,
  showSaveModal,
  onSaveModalToggle,
  onLoadSavedBackground,
  devMode,
  onDevModeToggle,
}: PreviewAreaProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  // Construir el estilo de preview
  let backgroundStyle: string | undefined;

  if (background) {
    const colorStops = background.colors
      .map((c) => `${c.color} ${c.stop}%`)
      .join(", ");

    if (background.type === "linear") {
      backgroundStyle = `linear-gradient(${angle}deg, ${colorStops})`;
    } else if (background.type === "repeating-linear") {
      backgroundStyle = `repeating-linear-gradient(${angle}deg, ${colorStops})`;
    } else if (background.type === "radial") {
      const shape = background.radialShape || "circle";
      backgroundStyle = `radial-gradient(${shape}, ${colorStops})`;
    } else if (background.type === "repeating-radial") {
      const shape = background.radialShape || "circle";
      backgroundStyle = `repeating-radial-gradient(${shape}, ${colorStops})`;
    } else if (background.type === "conic") {
      backgroundStyle = `conic-gradient(from ${angle}deg, ${colorStops})`;
    }
  }

  const previewStyle = background
    ? {
        background: backgroundStyle,
        filter: `saturate(${controls.saturation * 100}%) brightness(${
          controls.luminosity * 100
        }%)`,
        opacity: controls.opacity,
      }
    : undefined;

  return (
    <div className="h-full w-full flex flex-col bg-white border-l border-gray-200 min-h-0">
      {/* Área de preview */}
      <div
        className="flex-1 flex items-center justify-center transition-all duration-300 relative"
        style={previewStyle}
      />

      {background && (
        <>
          {/* 🔽 BARRA MINIMIZAR */}
          <div
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-full h-12 bg-white border-t border-b border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <div
              className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMinimized ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDown className="h-7 w-7 text-purple-500" />
            </div>
          </div>

          {/* CONTENEDOR COLAPSABLE — animación fluida */}
          <div
            className={`
              grid transition-[grid-template-rows] duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isMinimized ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}
            `}
          >
            <div
              className={`
                overflow-hidden min-h-0 flex flex-col
                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${isMinimized ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}
              `}
            >
              {/* Contenido con scroll */}
              <div className="flex-1 overflow-y-auto">
                {/* Barra acciones */}
                <div className="border-b border-gray-200 p-4 bg-white flex items-center justify-between">
                  <Button
                    onClick={() => onSaveModalToggle(true)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all active:scale-95"
                  >
                    <Save className="h-4 w-4" />
                    Guardar
                  </Button>

                  <SavedBackgroundsList
                    onSelectBackground={onLoadSavedBackground}
                  />
                </div>

                <ControlsPanel
                  controls={controls}
                  angle={angle}
                  seed={seed}
                  onControlsChange={onControlsChange}
                  onAngleChange={onAngleChange}
                  onGenerateVariant={onGenerateVariant}
                  onRandomize={onRandomize}
                />

                <ExportPanel
                  background={background}
                  controls={controls}
                  angle={angle}
                />

                <SharePanel
                  background={background}
                  controls={controls}
                  angle={angle}
                />

                <DevModePanel
                  background={background}
                  controls={controls}
                  angle={angle}
                  isOpen={devMode}
                  onToggle={onDevModeToggle}
                />
              </div>
            </div>
          </div>

          {/* Modal guardar */}
          {showSaveModal && (
            <SaveBackgroundModal
              background={background}
              onClose={() => onSaveModalToggle(false)}
              onSave={() => onSaveModalToggle(false)}
            />
          )}
        </>
      )}
    </div>
  );
}