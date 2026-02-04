import { backgrounds, type Background } from "../data/backgrounds";
import { BackgroundCard } from "./BackgroundCard";

interface BackgroundGridProps {
    onSelect: (background: Background) => void;
}

export function BackgroundGrid({ onSelect }: BackgroundGridProps) {
    return (
        <div className="h-full w-full bg-gray-50 p-6 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {backgrounds.map((bg) => (
                    <BackgroundCard
                        key={bg.id}
                        background={bg}
                        onClick={() => onSelect(bg)}
                    />
                ))}
            </div>
        </div>
    );
}
