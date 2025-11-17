import React, { useState } from 'react'
import Header from './components/Header'
import InfoSection from './components/InfoSection'
import ConverterSection from './components/ConverterSection'
import Popup from './components/Popup'
import Footer from './components/Footer'

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="bg-pure-black text-pure-white py-24 md:py-32 px-6 md:px-12 lg:px-24
                 relative hero-curve"
        role="banner"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-neon-red">Transforme valores</span>
              <br />
              <span className="text-pure-white">em segundos</span>
              <br />
              <span className="text-pure-white">com nosso conversor</span>
              <br />
              <span className="text-neon-red">intuitivo.</span>
            </h1>

            <button
              className="bg-neon-red text-pure-white px-10 py-4 rounded-full text-lg
                       font-bold uppercase tracking-wide
                       hover:bg-opacity-90 hover:shadow-2xl hover:scale-105
                       transition-all duration-300
                       focus:ring-4 focus:ring-neon-red focus:ring-opacity-50"
              aria-label="Começar a usar o conversor agora"
              onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
            >
              COMECE AGORA
            </button>
          </div>
        </div>

        {/* Scroll Icon */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-pulse-custom">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-label="Role para baixo"
            role="img"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="#E00000"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M24 16V32M24 32L16 24M24 32L32 24"
              stroke="#E00000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      <InfoSection />

      <ConverterSection onOpenPopup={() => setIsPopupOpen(true)} />

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Sobre as Taxas"
      >
        <p className="mb-4">
          Este conversor utiliza taxas de câmbio simuladas para demonstração.
        </p>
        <p className="mb-4">
          Em produção, as taxas seriam obtidas de APIs como:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>ExchangeRate-API</li>
          <li>Open Exchange Rates</li>
          <li>Fixer.io</li>
          <li>CurrencyAPI</li>
        </ul>
        <p className="mt-4 text-sm text-gray-300">
          As conversões são calculadas em tempo real com debounce de 250ms para melhor performance.
        </p>
      </Popup>

      <Footer />
    </div>
  )
}

export default App
