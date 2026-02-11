import { useState, useEffect } from "react";
import type { SavedBackground } from "../types/background";
import { getSavedBackgrounds, deleteBackground } from "../utils/localStorage";
import { Button } from "./ui/button";
import { SaveAll } from "lucide-react";

interface SavedBackgroundsListProps {
    onSelectBackground: (background: SavedBackground) => void;
}

export function SavedBackgroundsList({ onSelectBackground }: SavedBackgroundsListProps) {
    const [savedBackgrounds, setSavedBackgrounds] = useState<SavedBackground[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setSavedBackgrounds(getSavedBackgrounds());
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm("¿Eliminar este fondo guardado?")) {
            deleteBackground(id);
            setSavedBackgrounds(getSavedBackgrounds());
        }
    };

    const handleSelect = (background: SavedBackground) => {
        onSelectBackground(background);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    savedBackgrounds.length > 0
                        ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title="Fondos guardados"
            >
                <span><SaveAll className="h-4 w-4"/></span>
                <span>{savedBackgrounds.length}</span>
            </Button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-40 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
                        <h4 className="font-bold text-gray-900">Fondos Guardados ({savedBackgrounds.length})</h4>
                    </div>

                    {savedBackgrounds.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            <p>No hay fondos guardados aún</p>
                            <p className="text-xs mt-2">Crea variaciones y guarda las que te gusten</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {savedBackgrounds.map((bg) => (
                                <div key={bg.id} className="p-3 hover:bg-gray-50 hover:dark:bg-neutral-950 transition-colors">
                                    <button
                                        onClick={() => handleSelect(bg)}
                                        className="w-full text-left mb-2"
                                    >
                                        <div
                                            className="w-full h-24 rounded-lg shadow-sm border border-gray-200 mb-2"
                                            style={bg.previewStyle}
                                        />
                                        <p className="text-sm font-medium text-gray-900 truncate">{bg.name}</p>
                                        {bg.userNotes && (
                                            <p className="text-xs text-gray-500 line-clamp-2">{bg.userNotes}</p>
                                        )}
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(bg.savedAt).toLocaleDateString()}
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(bg.id)}
                                        className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
