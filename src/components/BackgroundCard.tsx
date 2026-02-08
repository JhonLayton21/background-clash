import type { Background } from "../types/background";

interface BackgroundCardProps {
    background: Background;
    onClick: () => void;
    isSelected?: boolean;
}

export function BackgroundCard({ background, onClick, isSelected }: BackgroundCardProps) {
    return (
        <button
            className={`
                group flex flex-col gap-2 rounded-xl p-2 transition-all duration-200 cursor-pointer text-left w-full border relative outline-none
                ${isSelected
                    ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-md"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-95"
                }
                focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            `}
            type="button"
            onClick={onClick}
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
    );
}
