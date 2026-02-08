import { useState } from "react";
import type { Background, SavedBackground } from "../types/background";
import { saveBackground, generateSavedBackgroundId } from "../utils/localStorage";

interface SaveBackgroundModalProps {
    background: Background;
    onClose: () => void;
    onSave: (saved: SavedBackground) => void;
}

export function SaveBackgroundModal({ background, onClose, onSave }: SaveBackgroundModalProps) {
    const [name, setName] = useState(`${background.name} - Saved`);
    const [notes, setNotes] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        if (!name.trim()) {
            alert("Por favor ingresa un nombre para el fondo");
            return;
        }

        setIsSaving(true);
        const savedBackground: SavedBackground = {
            ...background,
            id: generateSavedBackgroundId(name),
            savedAt: new Date().toISOString(),
            userNotes: notes || undefined,
            usageCount: 0,
        };

        saveBackground(savedBackground);
        onSave(savedBackground);
        
        setTimeout(() => {
            setIsSaving(false);
            onClose();
        }, 300);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-200"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-full mx-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Guardar fondo personalizado</h3>

                {/* Input para nombre */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del fondo
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Mi fondo personalizado"
                    />
                </div>

                {/* Textarea para notas */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notas (opcional)
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm"
                        placeholder="Ej: Para landing page, proyecto X..."
                        rows={3}
                    />
                </div>

                {/* Botones */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-all active:scale-95"
                    >
                        {isSaving ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
