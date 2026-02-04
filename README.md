# Background Clash

> A modern, minimalist web app to discover and preview CSS backgrounds instantly.

**Background Clash** is a fast and visual tool designed for developers and designers. Browse a curated collection of beautiful gradients and backgrounds, preview them in a real-time layout, and copy the CSS code with a single click. No login, no backend, just pure utility.

![App Preview](https://placehold.co/800x450?text=App+Preview+Placeholder)

## ✨ Features

- **Instant Preview**: Click any background to see it applied immediately to the layout.
- **Visual Feedback**: smooth transitions and clear selection states.
- **One-Click Copy**: Copy the exact CSS code to your clipboard instantly.
- **Zero Friction**: No account required, works directly in the browser.
- **Responsive Design**: optimized for desktop and mobile viewing.

## 🛠️ Tech Stack

Built with a focus on performance and developer experience:

- **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling
- **[React](https://react.dev/)**: Library for web and native user interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript with syntax for types
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tu-usuario/background-clash.git
   cd background-clash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:5173` to view the app.

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components
│   ├── BackgroundCard.tsx
│   ├── BackgroundGrid.tsx
│   ├── CopyButton.tsx
│   ├── Header.tsx
│   └── PreviewArea.tsx
├── data/            # Static data (backgrounds list)
│   └── backgrounds.ts
├── styles/          # Global styles
│   └── globals.css
├── App.tsx          # Main layout and state management
└── main.tsx         # Entry point
```

## 📦 Status

**Current Status**: MVP (Minimum Viable Product)
- ✅ Functional Grid & Preview
- ✅ Copy to Clipboard
- ✅ Responsive UI
