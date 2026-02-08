import { useState } from 'react'
import { Header } from './components/Header'
import { BackgroundGrid } from './components/BackgroundGrid'
import { PreviewArea } from './components/PreviewArea'
import type { Background, BackgroundControls } from './types/background'
import { DEFAULT_CONTROLS } from './types/background'

function App() {
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null)
  const [controls, setControls] = useState<BackgroundControls>(DEFAULT_CONTROLS)
  const [angle, setAngle] = useState(135)

  const handleSelectBackground = (background: Background) => {
    setSelectedBackground(background)
    // Reset controls cuando se selecciona un nuevo background
    setControls(background.controls)
    setAngle(background.angle ?? 135)
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-900">
      <Header />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[400px_1fr] overflow-hidden">
        <section className="h-full overflow-y-auto border-r border-gray-200">
          <BackgroundGrid
            onSelect={handleSelectBackground}
            selectedBackground={selectedBackground}
          />
        </section>
        <section className="h-full overflow-hidden bg-gray-50 relative transition-colors duration-300">
          <PreviewArea 
            background={selectedBackground}
            controls={controls}
            angle={angle}
            onControlsChange={setControls}
            onAngleChange={setAngle}
          />
        </section>
      </main>
    </div>
  )
}

export default App
