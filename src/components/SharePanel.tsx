import { useState } from "react";
import type { Background, BackgroundControls } from "../types/background";
import { generateShareUrl, copyShareUrlToClipboard } from "../utils/shareUrl";

interface SharePanelProps {
  background: Background;
  controls: BackgroundControls;
  angle: number;
}

export function SharePanel({ background, controls, angle }: SharePanelProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = generateShareUrl(background, controls, angle);
    const success = await copyShareUrlToClipboard(url);
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex gap-2 items-center">
        <span className="text-xs font-medium text-gray-700">Compartir:</span>
        <button
          onClick={handleShare}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            copied
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 active:scale-95"
          }`}
        >
          <span>{copied ? "✓" : "🔗"}</span>
          <span>{copied ? "Copiado" : "Copiar Link"}</span>
        </button>
      </div>
    </div>
  );
}
