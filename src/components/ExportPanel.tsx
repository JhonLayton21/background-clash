import { useState } from "react";
import type { Background, BackgroundControls } from "../types/background";
import { generateCSSVariable, generateTailwindConfig, generateInlineStyle, getCompatibilityLabel } from "../utils/generateExport";
import { generateControlledCSS } from "../utils/applyControls";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

interface ExportPanelProps {
    background: Background;
    controls: BackgroundControls;
    angle: number;
}

export function ExportPanel({ background, controls, angle }: ExportPanelProps) {
    const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

    const cssVariable = generateCSSVariable(background, controls, angle);
    const tailwindConfig = generateTailwindConfig(background, controls, angle);
    const inlineStyle = generateInlineStyle(background, controls, angle);
    const css = generateControlledCSS(background, controls, angle);

    const handleCopy = (text: string, format: string) => {
        navigator.clipboard.writeText(text);
        setCopiedFormat(format);
        setTimeout(() => setCopiedFormat(null), 2000);
    };

    const exportOptions = [
        { label: "Copy CSS", text: css, format: "css" },
        { label: "CSS Variable", text: cssVariable, format: "variable" },
        { label: "Tailwind Config", text: tailwindConfig, format: "tailwind" },
        { label: "Inline Style", text: inlineStyle, format: "inline" },
    ];

    return (
  <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-950">
    {/* Compatibilidad */}
    <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
      <span className="font-medium">Compatibilidad:</span>{" "}
      {getCompatibilityLabel(background)}
    </div>

    {/* Opciones de export */}
    <div className="space-y-2">
      <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
        Exportar como:
      </div>

      <div className="grid grid-cols-2 gap-2">
        {exportOptions.map((option) => {
          const isCopied = copiedFormat === option.format;

          return (
            <Button
              key={option.format}
              onClick={() => handleCopy(option.text, option.format)}
              className={`
                px-3 py-2 text-xs font-medium rounded-lg 
                transition-all duration-200 active:scale-95
                ${
                  isCopied
                    ? `
                      bg-green-100 text-green-700 border border-green-300
                      dark:bg-neutral-500 dark:text-gray-200 dark:border-gray-600
                    `
                    : `
                      bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200
                      dark:bg-neutral-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-neutral-700
                    `
                }
              `}
            >
              {isCopied ? (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Copiado
                </span>
              ) : (
                option.label
              )}
            </Button>
          );
        })}
      </div>
    </div>
  </div>
);

}
