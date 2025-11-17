import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Conversor', href: '#converter', icon: '💱' },
    { label: 'Sobre', href: '#about', icon: 'ℹ️' },
    { label: 'API Docs', href: 'https://www.exchangerate-api.com/docs', icon: '📚', external: true }
  ]

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ryanreisoliveira/',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      label: 'GitHub',
      href: 'https://github.com/ryanreisnt',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-pure-black to-gray-900 py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Efeito de Fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-neon-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-neon-red rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-red to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-pure-white font-bold text-2xl">💱</span>
              </div>
              <div>
                <span className="text-pure-white font-extrabold text-2xl">
                  Conversor
                </span>
                <div className="text-neon-red text-xs font-semibold uppercase tracking-wider">
                  Moedas
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-md">
              Tecnologia de ponta para conversões precisas e confiáveis.
              Mais de 160 moedas suportadas com atualizações em tempo real.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-neon-red rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-pure-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="text-neon-red">🔗</span>
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-gray-400 hover:text-neon-red transition-colors text-sm group"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    {link.label}
                    {link.external && (
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-pure-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="text-neon-red">📊</span>
              Estatísticas
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-neon-red">160+</div>
                <div className="text-xs text-gray-400">Moedas Disponíveis</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-neon-red">{'< 1s'}</div>
                <div className="text-xs text-gray-400">Tempo de Resposta</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-neon-red">99.9%</div>
                <div className="text-xs text-gray-400">Uptime da API</div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter/CTA Section */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 mb-12 border border-gray-700">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-pure-white mb-4">
              🚀 Pronto para Converter?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Experimente nosso conversor de moedas e veja a diferença que a precisão técnica faz.
            </p>
            <button
              onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-neon-red text-pure-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-neon-red/50"
            >
              Começar Conversão
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <span>© {currentYear} Conversor de Moedas</span>
              <span className="hidden md:block">•</span>
              <span>Desenvolvido com ❤️ por Ryan Reis</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Powered by ExchangeRate-API</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistema Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
