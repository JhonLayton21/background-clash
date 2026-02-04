import type { Background } from "../data/backgrounds";
import { CopyButton } from "./CopyButton";

interface PreviewAreaProps {
    background: Background | null;
}

export function PreviewArea({ background }: PreviewAreaProps) {
    return (
        <div
            className="h-full w-full bg-white flex items-center justify-center border-l border-gray-200 transition-all duration-500 relative"
            style={background ? background.previewStyle : undefined}
        >
            <div className={`text-gray-400 text-sm font-medium ${background ? 'text-white drop-shadow-md' : ''}`}>
                {background ? "Preview area" : "Área de Preview (Placeholder)"}
            </div>

            {background && (
                <div className="absolute bottom-8 transition-opacity duration-300">
                    <CopyButton text={background.css} />
                </div>
            )}
        </div>
    );
}
