import { backgrounds } from "../data/backgrounds";
import type { Background } from "../types/background";
import { BackgroundCard } from "./BackgroundCard";

interface BackgroundGridProps {
    onSelect: (background: Background) => void;
    selectedBackground: Background | null;
}

export function BackgroundGrid({ onSelect, selectedBackground }: BackgroundGridProps) {
    return (
        <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto transition-colors duration-300">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {backgrounds.map((bg) => (
                    <BackgroundCard
                        key={bg.id}
                        background={bg}
                        onClick={() => onSelect(bg)}
                        isSelected={selectedBackground?.id === bg.id}
                    />
                ))}
            </div>
        </div>
    );
}
