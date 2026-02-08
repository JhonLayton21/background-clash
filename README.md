# Background Clash v2

> Una biblioteca creativa, rápida, usable y reutilizable de fondos CSS.

**Background Clash v2** es una herramienta moderna diseñada para desarrolladores y diseñadores. Explorar una colección curada de gradientes CSS hermosos, previewizarlos en tiempo real, aplicar variaciones creativas, guardar tus favoritos y compartir diseños exactos con otros. Todo en el navegador, sin login ni backend.

**[🚀 Abre la app en background-clash.vercel.app](https://background-clash.vercel.app)**

---

## ✨ Funcionalidades

### Fase 1: UX/UI Polish
- **Jerarquía visual clara**: sidebar organizado con cards visuales
- **Estados intuitivos**: Selected, Hover, Active con feedback visual
- **Preview limpio**: enfoque total en el diseño sin distracciones
- **Animaciones suaves**: transiciones de 200-300ms entre interacciones
- **Interfaz cuidada**: diseño moderno y profesional listo para uso diario

### Fase 2: Controles de Variación
- **Control de Ángulo**: ajusta la rotación del gradiente (0-360°, paso 15°)
- **Intensidad**: modula la saturación del gradiente (0.5-2.0)
- **Saturación**: controla la intensidad del color (0.5-2.0)
- **Luminosidad**: ajusta el brillo general (0.5-1.5)
- **Opacidad**: transparencia global (0-1)
- **Botón Reset**: vuelve a valores por defecto al instante
- **Preview en tiempo real**: cambios aplicados instantáneamente

### Fase 3: Variants & Random
- **Generate Variant**: crea variaciones controladas e incrementales del fondo
- **Randomize**: exploración completamente aleatoria basada en seed
- **Seed reproducible**: mismo seed = mismo resultado (perfecto para compartir)
- **Variaciones inteligentes**: ángulo, intensidad y saturación se ajustan automáticamente

### Fase 4: Organización & Descubrimiento
- **5 Categorías**: Soft, Dark, Neon, Pastel, Nature
- **Filtro por categoría**: cambios en tiempo real
- **Búsqueda por nombre**: encuentra backgrounds escribiendo
- **Favoritos ⭐**: marca tus backgrounds favoritos
- **Sistema de filtros combinado**: categoría + búsqueda + favoritos

### Fase 5: Export & Usabilidad
- **Copy CSS (default)**: CSS puro listo para copiar
- **CSS Variable**: exporta como `--bg-name: linear-gradient(...);`
- **Tailwind Config**: snippet ready-to-use para `tailwind.config.js`
- **Inline Style**: formato HTML `style="background: ...;"`
- **Compatibilidad**: muestra soporte en Chrome, Firefox, Safari, Edge

### Fase 6: Presets & Collections
- **Colecciones predefinidas**: Soft UI, Dark Mode, Vibrant, Natural
- **Guardar fondos personalizados**: botón "Guardar 💾"
- **Modal elegante**: nombre + notas opcionales
- **Panel de fondos guardados**: dropdown con contador y vista previa
- **Persistencia localStorage**: tus fondos persisten entre sesiones
- **Cargar fondos guardados**: un click para volver a aplicar

### Fase 7: Share & Dev Features
- **URL compartible**: botón "Copiar Link 🔗"
- **Parámetros en URL**: `?bgId=...&angle=...&intensity=...` etc.
- **Carga desde URL**: abre link = carga background exacto con todos los controles
- **Dev Mode expandible**: botón "⚙️ Dev Mode"
- **Mostrar código CSS completo**: preview del CSS en `<pre>` monospace
- **Toggle Raw/Variables**: alterna entre CSS puro y variables CSS

---

## 🎨 Características Técnicas

### Datos & Modelo
- **12 backgrounds predefinidos**: con estructura completa (colores, ángulo, categoria)
- **Modelo de datos completo**: soporta todas las fases (2-7)
- **TypeScript tipado**: type-safe en toda la aplicación
- **Colores con posiciones**: ColorStop interface para máxima flexibilidad

### Controles Inteligentes
- **Ranges seguros**: valores validados automáticamente
- **Valores por defecto sensatos**: sin configuración complicada
- **Aplicación inmediata**: CSS filters para preview en tiempo real
- **Reproducibilidad**: basado en seed pseudo-aleatorio

### Estado & Persistencia
- **Gestión centralizada**: App.tsx orquesta todo el estado
- **localStorage automático**: fondos guardados persisten
- **URL params**: compartir estados exactos sin guardar
- **Máxima flexibilidad**: copy-paste sin modificaciones

---

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling
- **[React 18](https://react.dev/)**: UI con hooks modernos
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe en toda la app
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling
- **[CSS Gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient)**: Linear, Radial, Conic, Repeating

---

## 🚀 Quick Start

### Visita la app
```
https://background-clash.vercel.app
```

### O ejecuta localmente

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/background-clash.git
   cd background-clash
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en navegador**
   Visita `http://localhost:5173`

---

## 📂 Estructura de Proyecto

```text
src/
├── components/
│   ├── BackgroundCard.tsx        # Card individual (con favorito)
│   ├── BackgroundGrid.tsx        # Grid con filtros y búsqueda
│   ├── ControlsPanel.tsx         # Sliders + botones (Generate, Randomize)
│   ├── CopyButton.tsx            # Deprecated (moved to ExportPanel)
│   ├── DevModePanel.tsx          # Dev Mode expandible (Fase 7)
│   ├── ExportPanel.tsx           # Opciones de export (CSS, Variable, Tailwind, Inline)
│   ├── Header.tsx                # Encabezado app
│   ├── PreviewArea.tsx           # Preview + Controles + Export + Share + Dev
│   ├── SaveBackgroundModal.tsx   # Modal para guardar fondos personalizados
│   └── SavedBackgroundsList.tsx  # Dropdown de fondos guardados
├── data/
│   ├── backgrounds.ts            # 12 backgrounds predefinidos
│   └── collections.ts            # Colecciones temáticas (Fase 6)
├── styles/
│   ├── globals.css
│   └── index.css
├── types/
│   └── background.ts             # Interfaces de datos (completas para todas las fases)
├── utils/
│   ├── applyControls.ts          # Genera CSS con controles aplicados
│   ├── generateExport.ts         # Funciones de export (Variable, Tailwind, Inline)
│   ├── generateVariations.ts     # Seed-based variation generation
│   ├── localStorage.ts           # Persistencia de fondos guardados
│   └── shareUrl.ts               # URL encoding/decoding para compartir
├── App.tsx                       # Orquestación principal
└── main.tsx                      # Entry point
```

---

## 💾 Cómo Usar

### Buscar & Filtrar
1. Usa las **categorías** (Soft, Dark, Neon, Pastel, Nature)
2. **Busca por nombre** en el input
3. Marca **⭐ favoritos** en cada card

### Personalizar
1. Selecciona un background
2. Ajusta los **5 sliders** (Ángulo, Intensidad, Saturación, Luminosidad, Opacidad)
3. El **preview cambia en tiempo real**

### Explorar Variaciones
1. **Generate Variant**: crea variaciones controladas (pequeños cambios)
2. **Randomize**: explora aleatoriamente (cambios grandes)
3. Presiona varias veces para encontrar lo que te gusta

### Guardar & Compartir
1. **Guardar 💾**: abre modal, ingresa nombre y notas opcionales
2. **Copiar Link 🔗**: compartible como URL exacta
3. **Fondos Guardados**: dropdown muestra todo lo que guardaste

### Exportar Código
Selecciona el formato que necesitas:
- **Copy CSS**: CSS puro
- **CSS Variable**: para usar en `:root {}`
- **Tailwind Config**: para `tailwind.config.js`
- **Inline Style**: para HTML directo

### Dev Mode
1. Botón **⚙️ Dev Mode** (expandible)
2. Ver código CSS completo
3. Toggle **Variables** para alternar formato
4. **Copiar CSS Completo** para tu proyecto

---

## 🎯 Principios del Proyecto

- ✅ **Menos controles, mejores resultados**
- ✅ **Todo debe ser copy-paste friendly**
- ✅ **El preview es el centro del producto**
- ✅ **UX inmediata: cero curva de aprendizaje**
- ✅ **Cada fondo es visualmente usable, editable, reproducible**

---

## 📊 Definición de Éxito

Background Clash v2 es exitoso si:

- ✅ Permite elegir un fondo en **< 10 segundos**
- ✅ El CSS se usa **sin modificaciones**
- ✅ Se convierte en **herramienta recurrente**

---

## 🔗 Links

- **Live**: [background-clash.vercel.app](https://background-clash.vercel.app)
- **Repository**: GitHub (tu repo)
- **Issues & Feedback**: Reporta bugs o sugiere features

---

## 📝 License

MIT

---

**Hecho con ❤️ para desarrolladores y diseñadores que valoran la simplicidad y la creatividad.**
