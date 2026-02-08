import { useState } from 'react'
import { Header } from './components/Header'
import { BackgroundGrid } from './components/BackgroundGrid'
import { PreviewArea } from './components/PreviewArea'
import type { Background, BackgroundControls } from './types/background'
import { DEFAULT_CONTROLS } from './types/background'
import { generateVariation, generateRandomSeed, generateNextVariantSeed } from './utils/generateVariations'

function App() {
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null)
  const [controls, setControls] = useState<BackgroundControls>(DEFAULT_CONTROLS)
  const [angle, setAngle] = useState(135)
  const [seed, setSeed] = useState("default-seed")

  const handleSelectBackground = (background: Background) => {
    setSelectedBackground(background)
    // Reset controls cuando se selecciona un nuevo background
    setControls(background.controls)
    setAngle(background.angle ?? 135)
    setSeed(background.seed)
  }

  const handleGenerateVariant = () => {
    if (!selectedBackground) return
    
    // Generar siguiente seed basado en el actual
    const nextSeed = generateNextVariantSeed(seed)
    const variation = generateVariation(selectedBackground, nextSeed, "variant")
    
    setControls(variation.controls)
    setAngle(variation.angle)
    setSeed(variation.seed)
  }

  const handleRandomize = () => {
    if (!selectedBackground) return
    
    // Generar seed completamente aleatorio
    const randomSeed = generateRandomSeed()
    const variation = generateVariation(selectedBackground, randomSeed, "random")
    
    setControls(variation.controls)
    setAngle(variation.angle)
    setSeed(variation.seed)
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
            seed={seed}
            onControlsChange={setControls}
            onAngleChange={setAngle}
            onGenerateVariant={handleGenerateVariant}
            onRandomize={handleRandomize}
          />
        </section>
      </main>
    </div>
  )
}

export default App
