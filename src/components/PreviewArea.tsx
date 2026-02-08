import type { Background, BackgroundControls } from "../types/background";
import { ControlsPanel } from "./ControlsPanel";
import { ExportPanel } from "./ExportPanel";
import { SaveBackgroundModal } from "./SaveBackgroundModal";
import { SavedBackgroundsList } from "./SavedBackgroundsList";

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
}: PreviewAreaProps) {
    // Construir el estilo de preview usando el background real seleccionado
    let backgroundStyle: string | undefined;
    
    if (background) {
        const colorStops = background.colors.map(c => `${c.color} ${c.stop}%`).join(", ");
        
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

    const previewStyle = background ? {
        background: backgroundStyle,
        filter: `saturate(${controls.saturation * 100}%) brightness(${controls.luminosity * 100}%)`,
        opacity: controls.opacity,
    } : undefined;

    return (
        <div className="h-full w-full flex flex-col bg-white border-l border-gray-200">
            {/* Área de preview */}
            <div
                className="flex-1 flex items-center justify-center transition-all duration-300 relative"
                style={previewStyle}
            >
            </div>

            {/* Panel de controles */}
            {background && (
                <>
                    {/* Barra de acciones - Guardar y Fondos guardados */}
                    <div className="border-b border-gray-200 p-4 bg-white flex items-center justify-between">
                        <button
                            onClick={() => onSaveModalToggle(true)}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all active:scale-95"
                        >
                            <span>💾</span>
                            <span>Guardar</span>
                        </button>
                        <SavedBackgroundsList onSelectBackground={onLoadSavedBackground} />
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
                    
                    {/* Panel de export */}
                    <ExportPanel
                        background={background}
                        controls={controls}
                        angle={angle}
                    />

                    {/* Modal para guardar fondo */}
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
