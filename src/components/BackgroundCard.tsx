import type { Background } from "../types/background";
import { Star } from "lucide-react";

interface BackgroundCardProps {
  background: Background;
  onClick: () => void;
  isSelected?: boolean;
  isFavorite?: boolean;
  onToggleFavorite: (id: string) => void;
}

export function BackgroundCard({
  background,
  onClick,
  isSelected,
  isFavorite,
  onToggleFavorite,
}: BackgroundCardProps) {
  return (
    <div
      className={`
        group flex flex-col gap-2 rounded-xl p-2 transition-all duration-200 text-left w-full border relative outline-none bg-white overflow-hidden
        ${
          isSelected
            ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-md"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
        }
      `}
    >
      {/* ⭐ Ribbon favorito en esquina */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(background.id);
        }}
        className="absolute top-0 right-0 z-10 w-16 h-16 overflow-hidden"
        title={isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}
      >
        <div
          className={`
            absolute top-0 right-0 w-24 h-6
            rotate-45 translate-x-6 translate-y-2
            flex items-center justify-center
            shadow-sm transition-all
            ${
              isFavorite
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-zinc-200 text-zinc-600 hover:bg-zinc-300"
            }
          `}
        >
          <Star
            className="w-4 h-4"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </div>
      </button>

      {/* Contenido principal */}
      <button
        onClick={onClick}
        className="flex flex-col gap-2 cursor-pointer w-full text-left outline-none"
      >
        <div
          className={`
            aspect-video w-full rounded-lg shadow-sm transition-all duration-300
            ${
              isSelected
                ? "ring-2 ring-blue-500/30 shadow-lg scale-[1.02]"
                : "ring-1 ring-black/5 group-hover:shadow-lg group-hover:scale-[1.01]"
            }
          `}
          style={background.previewStyle}
        />

        <div className="flex items-center justify-between px-1">
          <span
            className={`text-xs font-medium transition-colors ${
              isSelected
                ? "text-blue-700"
                : "text-gray-700 group-hover:text-gray-900"
            }`}
          >
            {background.name}
          </span>

          {isSelected && (
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          )}
        </div>
      </button>
    </div>
  );
}