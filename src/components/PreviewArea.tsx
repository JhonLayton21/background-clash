import type { Background, BackgroundControls } from "../types/background";
import { ControlsPanel } from "./ControlsPanel";
import { ExportPanel } from "./ExportPanel";

interface PreviewAreaProps {
    background: Background | null;
    controls: BackgroundControls;
    angle: number;
    seed: string;
    onControlsChange: (controls: BackgroundControls) => void;
    onAngleChange: (angle: number) => void;
    onGenerateVariant: () => void;
    onRandomize: () => void;
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
                </>
            )}
        </div>
    );
}
