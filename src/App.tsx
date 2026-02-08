import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { BackgroundGrid } from './components/BackgroundGrid'
import { PreviewArea } from './components/PreviewArea'
import { backgrounds } from './data/backgrounds'
import type { Background, BackgroundControls, BackgroundCategory } from './types/background'
import { DEFAULT_CONTROLS } from './types/background'
import { generateVariation, generateRandomSeed, generateNextVariantSeed } from './utils/generateVariations'
import { parseShareUrl } from './utils/shareUrl'

function App() {
  const [selectedBackground, setSelectedBackground] = useState<Background | null>(null)
  const [controls, setControls] = useState<BackgroundControls>(DEFAULT_CONTROLS)
  const [angle, setAngle] = useState(135)
  const [seed, setSeed] = useState("default-seed")
  
  // FASE 4: Estado para filtros, búsqueda y favoritos
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<BackgroundCategory | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // FASE 6: Estado para modal de guardar fondo
  const [showSaveModal, setShowSaveModal] = useState(false)

  // FASE 7: Estado para Dev Mode
  const [devMode, setDevMode] = useState(false)

  // FASE 7: Cargar estado desde URL al montar el componente
  useEffect(() => {
    const shareState = parseShareUrl()
    
    if (shareState.bgId) {
      const bg = backgrounds.find((b) => b.id === shareState.bgId)
      if (bg) {
        setSelectedBackground(bg)
        setAngle(shareState.angle ?? bg.angle ?? 135)
        setControls({
          intensity: shareState.intensity ?? DEFAULT_CONTROLS.intensity,
          saturation: shareState.saturation ?? DEFAULT_CONTROLS.saturation,
          luminosity: shareState.luminosity ?? DEFAULT_CONTROLS.luminosity,
          opacity: shareState.opacity ?? DEFAULT_CONTROLS.opacity,
        })
        setSeed(bg.seed)
      }
    }
  }, [])

  const handleSelectBackground = (background: Background) => {
    setSelectedBackground(background)
    setControls(background.controls)
    setAngle(background.angle ?? 135)
    setSeed(background.seed)
  }

  const handleGenerateVariant = () => {
    if (!selectedBackground) return
    
    const nextSeed = generateNextVariantSeed(seed)
    const variation = generateVariation(selectedBackground, nextSeed, "variant")
    
    setControls(variation.controls)
    setAngle(variation.angle)
    setSeed(variation.seed)
  }

  const handleRandomize = () => {
    if (!selectedBackground) return
    
    const randomSeed = generateRandomSeed()
    const variation = generateVariation(selectedBackground, randomSeed, "random")
    
    setControls(variation.controls)
    setAngle(variation.angle)
    setSeed(variation.seed)
  }

  // FASE 4: Toggle favoritos
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  // FASE 6: Cargar un fondo guardado
  const handleLoadSavedBackground = (background: Background) => {
    setSelectedBackground(background)
    setControls(background.controls)
    setAngle(background.angle ?? 135)
    setSeed(background.seed)
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-900">
      <Header />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[400px_1fr] overflow-hidden">
        <section className="h-full overflow-hidden border-r border-gray-200">
          <BackgroundGrid
            onSelect={handleSelectBackground}
            selectedBackground={selectedBackground}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
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
            showSaveModal={showSaveModal}
            onSaveModalToggle={setShowSaveModal}
            onLoadSavedBackground={handleLoadSavedBackground}
            devMode={devMode}
            onDevModeToggle={setDevMode}
          />
        </section>
      </main>
    </div>
  )
}

export default App
