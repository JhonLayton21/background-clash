import type { Background } from "../data/backgrounds";

interface PreviewAreaProps {
    background: Background | null;
}

export function PreviewArea({ background }: PreviewAreaProps) {
    return (
        <div
            className="h-full w-full bg-white flex items-center justify-center border-l border-gray-200 transition-all duration-500 relative"
            style={{
                background: background
                    ? background.currentVariant.css
                        .replace('background: ', '')
                        .replace(';', '')
                    : 'white',
            }}
        >
            <div className={`text-gray-400 text-sm font-medium ${background ? 'text-white drop-shadow-md' : ''}`}>
                {background ? "Preview area" : "Área de Preview (Placeholder)"}
            </div>
        </div>
    );
}
