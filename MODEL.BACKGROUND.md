# Background Data Model – Background Clash v2

## Estructura completa del modelo de datos para un Background

Este modelo soporta todas las fases del roadmap (Fase 2 a Fase 7).

---

## Interfaz TypeScript

```typescript
export interface Background {
  // IDENTIFICACIÓN
  id: string;                      // ID único (ej: "bg-solar-flare")
  name: string;                    // Nombre del background (ej: "Solar Flare")
  description?: string;            // Descripción opcional
  
  // TIPO y ESTRUCTURA del gradiente (FASE 2)
  type: 'linear' | 'radial' | 'conic' | 'repeating-linear' | 'repeating-radial';
  colors: ColorStop[];             // Array de colores con posiciones
  angle?: number;                  // 0-360° (solo para linear y conic) - FASE 2
  radialShape?: 'circle' | 'ellipse'; // (solo para radial)
  
  // CONTROLES DE VARIACIÓN (FASE 2)
  controls: {
    intensity: number;             // 0.5 - 2.0 (controla saturación del gradiente)
    saturation: number;            // 0.5 - 2.0 (saturación de colores)
    luminosity: number;            // 0.5 - 1.5 (brillo/luminancia)
    opacity: number;               // 0 - 1 (opacidad global)
  };
  
  // ORGANIZACIÓN (FASE 4)
  category: 'soft' | 'dark' | 'neon' | 'pastel' | 'nature';
  isFavorite: boolean;             // Toggle de favorito ⭐
  
  // REPRODUCIBILIDAD (FASE 3)
  seed: string;                    // Hash reproducible para variaciones
  
  // CSS GENERADO (FASE 1 & 5)
  css: string;                     // String CSS listo para copiar
  previewStyle: CSSProperties;     // Objeto para preview en React
  
  // EXPORT (FASE 5)
  export: {
    variants: {
      cssVariable: string;         // ej: "--bg-name: linear-gradient(...);"
      tailwindConfig: string;      // snippet para tailwind.config.js
      inlineStyle: string;         // ej: "background: linear-gradient(...);"
    };
    browserSupport: string[];      // ['all'] o ['modern'] o navegadores específicos
  };
  
  // SHARE (FASE 7)
  share: {
    url: string;                   // URL con parámetros para reproducir
    isShareable: boolean;
  };
  
  // METADATA
  metadata: {
    createdAt: string;             // ISO 8601
    updatedAt: string;             // ISO 8601
    version: number;               // Para controlar cambios
    isEdited: boolean;             // true si el usuario lo ha modificado
    baseId?: string;               // ID del original si fue clonado
  };
}

export interface ColorStop {
  color: string;                   // Hex, RGB, HSL
  stop: number;                    // 0-100 (porcentaje)
}
```

---

## Ejemplo JSON Completo

### Ejemplo 1: Gradiente Linear Simple (Soft)

```json
{
  "id": "bg-001-soft-gradient",
  "name": "Soft Gradient",
  "description": "Suave transición entre rosa y azul",
  "type": "linear",
  "colors": [
    { "color": "#f5d0fe", "stop": 0 },
    { "color": "#bae6fd", "stop": 100 }
  ],
  "angle": 135,
  "controls": {
    "intensity": 1.0,
    "saturation": 1.0,
    "luminosity": 1.0,
    "opacity": 1.0
  },
  "category": "soft",
  "isFavorite": false,
  "seed": "default-soft-001",
  "css": "background: linear-gradient(135deg, #f5d0fe, #bae6fd);",
  "previewStyle": {
    "background": "linear-gradient(135deg, #f5d0fe, #bae6fd)"
  },
  "export": {
    "variants": {
      "cssVariable": "--bg-soft-gradient: linear-gradient(135deg, #f5d0fe, #bae6fd);",
      "tailwindConfig": "backgroundImage: { softGradient: 'linear-gradient(135deg, #f5d0fe, #bae6fd)' }",
      "inlineStyle": "background: linear-gradient(135deg, #f5d0fe, #bae6fd);"
    },
    "browserSupport": ["all"]
  },
  "share": {
    "url": "bg-clash.io/preview?id=bg-001-soft-gradient&seed=default-soft-001",
    "isShareable": true
  },
  "metadata": {
    "createdAt": "2026-02-08T00:00:00Z",
    "updatedAt": "2026-02-08T00:00:00Z",
    "version": 1,
    "isEdited": false
  }
}
```

### Ejemplo 2: Gradiente Radial con Controles Modificados (Neon)

```json
{
  "id": "bg-002-neon-pulse",
  "name": "Neon Pulse",
  "description": "Efecto radial intenso con colores neón",
  "type": "radial",
  "colors": [
    { "color": "#c33764", "stop": 0 },
    { "color": "#1d2671", "stop": 100 }
  ],
  "radialShape": "circle",
  "controls": {
    "intensity": 1.5,
    "saturation": 1.8,
    "luminosity": 0.9,
    "opacity": 1.0
  },
  "category": "neon",
  "isFavorite": true,
  "seed": "neon-pulse-v1",
  "css": "background: radial-gradient(circle, rgba(195, 55, 100, 1) 0%, rgba(29, 38, 113, 1) 100%);",
  "previewStyle": {
    "background": "radial-gradient(circle, rgba(195, 55, 100, 1) 0%, rgba(29, 38, 113, 1) 100%)"
  },
  "export": {
    "variants": {
      "cssVariable": "--bg-neon-pulse: radial-gradient(circle, rgba(195, 55, 100, 1) 0%, rgba(29, 38, 113, 1) 100%);",
      "tailwindConfig": "backgroundImage: { neonPulse: 'radial-gradient(circle, rgba(195, 55, 100, 1) 0%, rgba(29, 38, 113, 1) 100%)' }",
      "inlineStyle": "background: radial-gradient(circle, rgba(195, 55, 100, 1) 0%, rgba(29, 38, 113, 1) 100%);"
    },
    "browserSupport": ["all"]
  },
  "share": {
    "url": "bg-clash.io/preview?id=bg-002-neon-pulse&seed=neon-pulse-v1&type=radial&shape=circle&intensity=1.5&saturation=1.8&luminosity=0.9",
    "isShareable": true
  },
  "metadata": {
    "createdAt": "2026-02-08T10:30:00Z",
    "updatedAt": "2026-02-08T14:22:00Z",
    "version": 2,
    "isEdited": true
  }
}
```

### Ejemplo 3: Gradiente Multi-Color (Nature)

```json
{
  "id": "bg-003-forest-depth",
  "name": "Forest Depth",
  "description": "Gradiente natural con múltiples tonos de verde",
  "type": "linear",
  "colors": [
    { "color": "#1a3a1a", "stop": 0 },
    { "color": "#2d5a2d", "stop": 40 },
    { "color": "#4a7c4e", "stop": 70 },
    { "color": "#7aa76f", "stop": 100 }
  ],
  "angle": 180,
  "controls": {
    "intensity": 1.2,
    "saturation": 0.9,
    "luminosity": 1.0,
    "opacity": 1.0
  },
  "category": "nature",
  "isFavorite": false,
  "seed": "forest-depth-01",
  "css": "background: linear-gradient(180deg, #1a3a1a 0%, #2d5a2d 40%, #4a7c4e 70%, #7aa76f 100%);",
  "previewStyle": {
    "background": "linear-gradient(180deg, #1a3a1a 0%, #2d5a2d 40%, #4a7c4e 70%, #7aa76f 100%)"
  },
  "export": {
    "variants": {
      "cssVariable": "--bg-forest-depth: linear-gradient(180deg, #1a3a1a 0%, #2d5a2d 40%, #4a7c4e 70%, #7aa76f 100%);",
      "tailwindConfig": "backgroundImage: { forestDepth: 'linear-gradient(180deg, #1a3a1a 0%, #2d5a2d 40%, #4a7c4e 70%, #7aa76f 100%)' }",
      "inlineStyle": "background: linear-gradient(180deg, #1a3a1a 0%, #2d5a2d 40%, #4a7c4e 70%, #7aa76f 100%);"
    },
    "browserSupport": ["all"]
  },
  "share": {
    "url": "bg-clash.io/preview?id=bg-003-forest-depth&seed=forest-depth-01&angle=180&colors=%231a3a1a-0,%232d5a2d-40,%234a7c4e-70,%237aa76f-100",
    "isShareable": true
  },
  "metadata": {
    "createdAt": "2026-02-07T08:15:00Z",
    "updatedAt": "2026-02-08T12:00:00Z",
    "version": 1,
    "isEdited": false
  }
}
```

### Ejemplo 4: Variante Modificada (Clonado con ediciones)

```json
{
  "id": "bg-004-soft-gradient-remix",
  "name": "Soft Gradient Remix",
  "description": "Versión personalizada del Soft Gradient original",
  "type": "linear",
  "colors": [
    { "color": "#f5d0fe", "stop": 0 },
    { "color": "#bae6fd", "stop": 100 }
  ],
  "angle": 90,
  "controls": {
    "intensity": 1.3,
    "saturation": 1.5,
    "luminosity": 0.95,
    "opacity": 0.95
  },
  "category": "soft",
  "isFavorite": true,
  "seed": "user-remix-20260208-001",
  "css": "background: linear-gradient(90deg, rgba(245, 208, 254, 0.95), rgba(186, 230, 253, 0.95));",
  "previewStyle": {
    "background": "linear-gradient(90deg, rgba(245, 208, 254, 0.95), rgba(186, 230, 253, 0.95))"
  },
  "export": {
    "variants": {
      "cssVariable": "--bg-soft-remix: linear-gradient(90deg, rgba(245, 208, 254, 0.95), rgba(186, 230, 253, 0.95));",
      "tailwindConfig": "backgroundImage: { softRemix: 'linear-gradient(90deg, rgba(245, 208, 254, 0.95), rgba(186, 230, 253, 0.95))' }",
      "inlineStyle": "background: linear-gradient(90deg, rgba(245, 208, 254, 0.95), rgba(186, 230, 253, 0.95));"
    },
    "browserSupport": ["all"]
  },
  "share": {
    "url": "bg-clash.io/preview?id=bg-004&seed=user-remix-20260208-001&angle=90&intensity=1.3&saturation=1.5&luminosity=0.95&opacity=0.95",
    "isShareable": true
  },
  "metadata": {
    "createdAt": "2026-02-08T15:45:00Z",
    "updatedAt": "2026-02-08T16:30:00Z",
    "version": 3,
    "isEdited": true,
    "baseId": "bg-001-soft-gradient"
  }
}
```

---

## Mapeo a Fases del Roadmap

| Campo | Fase | Propósito |
|-------|------|-----------|
| `id`, `name`, `description` | MVP | Identificación básica |
| `type`, `colors`, `angle` | Fase 2 | Controles de variación |
| `controls.*` | Fase 2 | Personalización sin romper simplicidad |
| `seed` | Fase 3 | Reproducibilidad de variaciones |
| `category`, `isFavorite` | Fase 4 | Organización y descubrimiento |
| `css`, `previewStyle` | Fase 5 | Estado y preview |
| `export.*` | Fase 5 | Múltiples formatos de export |
| `share.*` | Fase 7 | URLs reproducibles y sharing |
| `metadata.*` | Fase 6 | Persistencia en localStorage |

---

## Reglas de Validación

✅ **Controles siempre dentro de rangos seguros:**
- `intensity`: 0.5 - 2.0 (default: 1.0)
- `saturation`: 0.5 - 2.0 (default: 1.0)
- `luminosity`: 0.5 - 1.5 (default: 1.0)
- `opacity`: 0 - 1 (default: 1.0)

✅ **Ángulo:**
- `angle`: 0 - 360° (solo para linear y conic)
- Incrementos recomendados: 15° o 45°

✅ **Colors:**
- Mínimo 2 stops, máximo 10
- Cada color debe ser válido (hex, rgb, hsl)
- Stops deben ser 0-100 y ordenados

✅ **Seed:**
- String alphanumeric para reproducibilidad
- Formato: `source-name-timestamp` o `user-remix-timestamp`

---

## Estructura para localStorage (Fase 6)

```typescript
export interface SavedBackground extends Background {
  // Campos adicionales para persistencia
  savedAt: string;              // ISO 8601
  userNotes?: string;           // Notas personales del usuario
  usageCount?: number;          // Cuántas veces se usó
}

// En localStorage bajo la key: `bg-clash-saved-{id}`
```

---

## Serialización para URL (Fase 7 Share)

Parámetros básicos:
```
?id={id}
&seed={seed}
&type={type}
&angle={angle}
&colors={color1-stop1,color2-stop2,...}
&intensity={intensity}
&saturation={saturation}
&luminosity={luminosity}
&opacity={opacity}
```

Ejemplo URL completa:
```
bg-clash.io/preview?id=bg-002&seed=neon-pulse-v1&type=radial&intensity=1.5&saturation=1.8&luminosity=0.9&opacity=1.0
```

---

## Próximos Pasos

1. **Actualizar `src/data/backgrounds.ts`** con esta estructura
2. **Crear tipos en `src/types/background.ts`** con las interfaces
3. **Fase 2:** Agregar UI controls para `angle`, `intensity`, `saturation`, `luminosity`, `opacity`
4. **Fase 3:** Implementar seed y algoritmo de variaciones
5. **Fase 4:** Filtrado por categoría y búsqueda
6. **Fase 5:** Generador de CSS según controles
7. **Fase 7:** URL sharing y dev mode
