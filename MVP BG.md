# MVP – Web App de Fondos 

## 1. Objetivo del proyecto

Crear una **app web sencilla, rápida y visual** donde el usuario:

* Entra y ve **fondos para apps web de inmediato** (sin registro).
* Puede **previsualizar** cada fondo aplicándolo al layout.
* Puede **copiar el código CSS** del fondo para usarlo en su proyecto.
* Tiene una experiencia fluida, limpia y enfocada en utilidad.

---

## 2. Stack tecnológico (similar al proyecto anterior)

### Frontend

* **Vite + React** (rápido, simple, moderno)
* **TypeScript** (opcional pero recomendado)
* **Tailwind CSS** (estilos rápidos y consistentes)
* **clsx / cva** (opcional, para manejar variantes)

### Estado / lógica

* React hooks (`useState`, `useMemo`)
* Sin backend en el MVP (fondos hardcodeados en JSON)

### Deploy

* Vercel o Netlify

---

## 3. Funcionalidades del MVP

### Core (imprescindible)

* Grid de fondos visibles al cargar la página
* Preview en vivo al hacer click en un fondo
* Botón para copiar el código CSS
* Feedback visual al copiar (toast o tooltip)

### UX / UI

* Diseño limpio y minimalista
* Animaciones suaves (hover / transición de fondo)
* Responsive (desktop primero, mobile correcto)

### NO incluido en el MVP

* Login / usuarios
* Favoritos
* Filtros avanzados
* Base de datos

---

## 4. Estructura del proyecto

```
project-root/
├─ src/
│  ├─ components/
│  │  ├─ BackgroundCard.tsx
│  │  ├─ BackgroundGrid.tsx
│  │  ├─ PreviewArea.tsx
│  │  └─ CopyButton.tsx
│  ├─ data/
│  │  └─ backgrounds.ts
│  ├─ styles/
│  │  └─ globals.css
│  ├─ App.tsx
│  └─ main.tsx
├─ public/
├─ index.html
├─ tailwind.config.js
├─ package.json
└─ README.md
```

---

## 5. Modelo de datos (fondos)

```ts
{
  id: string
  name: string
  css: string
  previewStyle: React.CSSProperties
}
```

Ejemplo:

```ts
{
  id: "bg-01",
  name: "Soft Gradient",
  css: "background: linear-gradient(135deg, #f5d0fe, #bae6fd);",
  previewStyle: {
    background: "linear-gradient(135deg, #f5d0fe, #bae6fd)"
  }
}
```

---

## 6. Pasos para crear el proyecto desde cero

### 1. Crear proyecto

```bash
npm create vite@latest bg-app -- --template react-ts
cd bg-app
npm install
```

### 2. Instalar Tailwind

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configurar `tailwind.config.js`:

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

En `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Dependencias adicionales

```bash
npm install clsx
npm install lucide-react
```

---

## 7. Primer objetivo técnico

* Mostrar grid con al menos **12 fondos**
* Al hacer click, aplicar fondo al preview
* Copiar CSS al portapapeles

---

## 8. Métrica de éxito del MVP

* El usuario entiende la app en menos de 5 segundos
* Puede copiar un fondo en menos de 2 clicks
* Carga rápida y sin fricción

---

## 9. Próxima fase (fuera del MVP)

* Filtros por tipo (gradiente, noise, mesh)
* Modo oscuro
* Guardar favoritos en localStorage
* Exportar como Tailwind class

---

## 10. Estado

🟢 Listo para comenzar desarrollo
