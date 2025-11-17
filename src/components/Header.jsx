import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-pure-black shadow-2xl border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-12 h-12 bg-gradient-to-br from-neon-red to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-pure-white font-bold text-2xl">💱</span>
            </div>
            <div>
              <span className="text-pure-white font-extrabold text-2xl group-hover:text-neon-red transition-colors">
                Conversor
              </span>
              <div className="text-neon-red text-xs font-semibold uppercase tracking-wider">
                Moedas
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {[
              { id: 'home', label: 'Início', icon: '🏠' },
              { id: 'converter', label: 'Conversor', icon: '💱' },
              { id: 'about', label: 'Sobre', icon: 'ℹ️' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-6 py-3 text-pure-white hover:text-neon-red transition-all duration-300 font-semibold rounded-full hover:bg-white/10 group"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </span>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-neon-red group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('converter')}
              className="bg-neon-red text-pure-white px-6 py-3 rounded-full font-bold hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-neon-red/50"
            >
              Converter Agora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-pure-white hover:text-neon-red hover:bg-gray-700 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl mt-4 p-6 border border-gray-800">
            <nav className="flex flex-col space-y-2">
              {[
                { id: 'home', label: 'Início', icon: '🏠' },
                { id: 'converter', label: 'Conversor', icon: '💱' },
                { id: 'about', label: 'Sobre', icon: 'ℹ️' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-4 w-full px-4 py-3 text-left text-pure-white hover:text-neon-red hover:bg-white/10 transition-all duration-300 rounded-xl font-medium"
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-700 pt-4 mt-4">
                <button
                  onClick={() => scrollToSection('converter')}
                  className="w-full bg-neon-red text-pure-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all duration-300"
                >
                  Converter Agora
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
