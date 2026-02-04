import { Header } from './components/Header'
import { BackgroundGrid } from './components/BackgroundGrid'
import { PreviewArea } from './components/PreviewArea'

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-white text-gray-900">
      <Header />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[400px_1fr] overflow-hidden">
        <section className="h-full overflow-y-auto border-r border-gray-200">
          <BackgroundGrid />
        </section>
        <section className="h-full overflow-hidden bg-gray-50 relative">
          <PreviewArea />
        </section>
      </main>
    </div>
  )
}

export default App
