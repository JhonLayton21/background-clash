import type { Background } from "../types/background";

interface BackgroundCardProps {
    background: Background;
    onClick: () => void;
    isSelected?: boolean;
    isFavorite?: boolean;
    onToggleFavorite: (id: string) => void;
}

export function BackgroundCard({ background, onClick, isSelected, isFavorite, onToggleFavorite }: BackgroundCardProps) {
    return (
        <div
            className={`
                group flex flex-col gap-2 rounded-xl p-2 transition-all duration-200 text-left w-full border relative outline-none bg-white
                ${isSelected
                    ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                }
            `}
        >
            <button
                onClick={onClick}
                className="flex flex-col gap-2 cursor-pointer w-full text-left outline-none"
            >
                <div
                    className={`
                        aspect-video w-full rounded-lg shadow-sm transition-all duration-300
                        ${isSelected ? "ring-2 ring-blue-500/30 shadow-lg scale-[1.02]" : "ring-1 ring-black/5 group-hover:shadow-lg group-hover:scale-[1.01]"}
                    `}
                    style={background.previewStyle}
                />
                <div className="flex items-center justify-between px-1">
                    <span className={`text-xs font-medium transition-colors ${isSelected ? "text-blue-700" : "text-gray-700 group-hover:text-gray-900"}`}>
                        {background.name}
                    </span>
                    {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    )}
                </div>
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(background.id);
                }}
                className={`
                    flex items-center justify-center p-1.5 rounded-lg transition-all duration-200 text-sm font-medium
                    ${isFavorite 
                        ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100" 
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }
                `}
                title={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}
            >
                <span className="text-lg">{isFavorite ? "⭐" : "☆"}</span>
            </button>
        </div>
    );
}
