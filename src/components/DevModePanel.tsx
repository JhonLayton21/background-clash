import { useState } from "react";
import type { Background, BackgroundControls } from "../types/background";
import { generateControlledCSS } from "../utils/applyControls";
import { generateCSSVariable } from "../utils/generateExport";

interface DevModePanelProps {
  background: Background;
  controls: BackgroundControls;
  angle: number;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

export function DevModePanel({ background, controls, angle, isOpen, onToggle }: DevModePanelProps) {
  const [showVariables, setShowVariables] = useState(false);
  const [copied, setCopied] = useState(false);

  const cssRaw = generateControlledCSS(background, controls, angle);
  const cssVariable = generateCSSVariable(background, controls, angle);
  const displayedCode = showVariables ? cssVariable : cssRaw;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) {
    return (
      <div className="border-t border-gray-200 p-4 bg-white">
        <button
          onClick={() => onToggle(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
        >
          <span>⚙️</span>
          <span>Dev Mode</span>
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <button
          onClick={() => onToggle(false)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
        >
          <span>⚙️</span>
          <span>Dev Mode</span>
        </button>
        <div className="flex gap-2 items-center">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showVariables}
              onChange={(e) => setShowVariables(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 cursor-pointer"
            />
            Variables
          </label>
        </div>
      </div>

      {/* Code display */}
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-xs font-mono text-gray-800 bg-white p-3 rounded-lg border border-gray-200 overflow-x-auto">
          {displayedCode}
        </pre>
      </div>

      {/* Copy button */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            copied
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-blue-500 text-white border border-blue-600 hover:bg-blue-600 active:scale-95"
          }`}
        >
          <span>{copied ? "✓" : "📋"}</span>
          <span>{copied ? "Copiado" : "Copiar CSS Completo"}</span>
        </button>
      </div>
    </div>
  );
}
