import { useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { PreviewArea } from './components/previews/PreviewArea'
import { useBackground } from './hooks'
import { useDarkMode, initializeUIStore } from './stores'

function App() {
  const { selectedBackground } = useBackground()
  const darkMode = useDarkMode()

  // Initialize UI store on mount
  useEffect(() => {
    initializeUIStore()
  }, [])

  return (
    <div className={`flex flex-col h-screen w-full transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
    }`}>
      <Header />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr] overflow-hidden">
        <section className={`h-full overflow-y-auto border-r transition-colors duration-300 ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
          <Sidebar />
        </section>
        <section className={`h-full overflow-hidden relative transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <PreviewArea background={selectedBackground} />
        </section>
      </main>
    </div>
  )
}

export default App
