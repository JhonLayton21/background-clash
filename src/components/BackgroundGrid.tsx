import { backgrounds } from "../data/backgrounds";
import type { Background, BackgroundCategory } from "../types/background";
import { BACKGROUND_CATEGORIES } from "../types/background";
import { BackgroundCard } from "./BackgroundCard";

interface BackgroundGridProps {
    onSelect: (background: Background) => void;
    selectedBackground: Background | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: BackgroundCategory | null;
    onCategoryChange: (category: BackgroundCategory | null) => void;
    favorites: Set<string>;
    onToggleFavorite: (id: string) => void;
}

export function BackgroundGrid({ 
    onSelect, 
    selectedBackground,
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    favorites,
    onToggleFavorite
}: BackgroundGridProps) {
    // Filtrar backgrounds por categoría y búsqueda
    const filteredBackgrounds = backgrounds.filter((bg) => {
        const matchesCategory = !selectedCategory || bg.category === selectedCategory;
        const matchesSearch = !searchQuery || bg.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="h-full w-full bg-gray-50 flex flex-col transition-colors duration-300">
            {/* Search y Filters */}
            <div className="flex-shrink-0 border-b border-gray-200 p-6 pb-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full px-3 py-2 mb-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onCategoryChange(null)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                            !selectedCategory
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        Todos
                    </button>
                    {BACKGROUND_CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${
                                selectedCategory === category
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de backgrounds */}
            <div className="flex-1 overflow-y-auto p-6">
                {filteredBackgrounds.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p className="text-sm">No hay backgrounds con esos criterios</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                        {filteredBackgrounds.map((bg) => (
                            <BackgroundCard
                                key={bg.id}
                                background={bg}
                                onClick={() => onSelect(bg)}
                                isSelected={selectedBackground?.id === bg.id}
                                isFavorite={favorites.has(bg.id)}
                                onToggleFavorite={onToggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
