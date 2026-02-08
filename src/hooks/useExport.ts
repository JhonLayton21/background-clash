import { useCallback } from "react";
import { useCurrentCSS } from "../stores";
import { useSelectedBackground } from "../stores";
import type { ExportFormat, ExportOption } from "../types";

/**
 * Hook: Generar diferentes formatos de export
 * Responsabilidad: CSS, CSS Variable, Tailwind, Inline Style, SCSS
 */
export const useExport = () => {
  const css = useCurrentCSS();
  const selectedBackground = useSelectedBackground();

  /**
   * Generar CSS puro
   */
  const generateCSSFormat = useCallback((): ExportOption => {
    return {
      label: "CSS",
      code: css,
      format: "css",
    };
  }, [css]);

  /**
   * Generar CSS Variable
   */
  const generateCSSVariable = useCallback((): ExportOption => {
    const variableName = selectedBackground
      ? selectedBackground.id.replace(/[_-]/g, "-")
      : "gradient";

    const code = `--gradient-${variableName}: ${css.replace("background: ", "").replace(";", "")};\nbackground: var(--gradient-${variableName});`;

    return {
      label: "CSS Variable",
      code,
      format: "cssVariable",
    };
  }, [css, selectedBackground]);

  /**
   * Generar configuración Tailwind
   */
  const generateTailwindClass = useCallback((): ExportOption => {
    const className = selectedBackground
      ? selectedBackground.id.replace(/[_-]/g, "-")
      : "gradient";

    const gradientValue = css
      .replace("background: ", "")
      .replace(";", "")
      .replace(/"/g, "'");

    const code = `module.exports = {\n  theme: {\n    extend: {\n      backgroundImage: {\n        'gradient-${className}': '${gradientValue}'\n      }\n    }\n  }\n}\n\n<!-- HTML -->\n<div class="bg-gradient-${className}"></div>`;

    return {
      label: "Tailwind Config",
      code,
      format: "tailwindClass",
    };
  }, [css, selectedBackground]);

  /**
   * Generar Inline Style
   */
  const generateInlineStyle = useCallback((): ExportOption => {
    const code = `<div style="${css.replace(";", "")}"></div>`;

    return {
      label: "Inline Style",
      code,
      format: "inlineStyle",
    };
  }, [css]);

  /**
   * Generar SCSS Variable
   */
  const generateSCSSVariable = useCallback((): ExportOption => {
    const variableName = selectedBackground
      ? selectedBackground.id.replace(/[_-]/g, "-")
      : "gradient";

    const gradientValue = css
      .replace("background: ", "")
      .replace(";", "");

    const code = `$gradient-${variableName}: ${gradientValue};\n\n.element {\n  background: $gradient-${variableName};\n}`;

    return {
      label: "SCSS",
      code,
      format: "scssVariable",
    };
  }, [css, selectedBackground]);

  /**
   * Generar todos los formatos
   */
  const generateAllFormats = useCallback(() => {
    return {
      css: generateCSSFormat(),
      cssVariable: generateCSSVariable(),
      tailwindClass: generateTailwindClass(),
      inlineStyle: generateInlineStyle(),
      scssVariable: generateSCSSVariable(),
    };
  }, [
    generateCSSFormat,
    generateCSSVariable,
    generateTailwindClass,
    generateInlineStyle,
    generateSCSSVariable,
  ]);

  /**
   * Generar formato específico
   */
  const generateFormat = useCallback((format: ExportFormat) => {
    switch (format) {
      case "css":
        return generateCSSFormat();
      case "cssVariable":
        return generateCSSVariable();
      case "tailwindClass":
        return generateTailwindClass();
      case "inlineStyle":
        return generateInlineStyle();
      case "scssVariable":
        return generateSCSSVariable();
      default:
        return generateCSSFormat();
    }
  }, [
    generateCSSFormat,
    generateCSSVariable,
    generateTailwindClass,
    generateInlineStyle,
    generateSCSSVariable,
  ]);

  return {
    generateCSSFormat,
    generateCSSVariable,
    generateTailwindClass,
    generateInlineStyle,
    generateSCSSVariable,
    generateAllFormats,
    generateFormat,
  };
};
