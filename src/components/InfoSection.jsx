import React from 'react'

const InfoSection = () => {
  const features = [
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      title: "Conversão Instantânea",
      description: "Resultados em tempo real com atualização automática das taxas de câmbio, garantindo precisão máxima em cada conversão.",
      details: ["Debounce otimizado de 250ms", "Cálculos em tempo real", "Sem delays desnecessários"]
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: "Taxas Confiáveis",
      description: "Utilizamos fontes oficiais e APIs especializadas para fornecer as taxas mais atualizadas e precisas do mercado financeiro.",
      details: ["ExchangeRate-API oficial", "Mais de 160 moedas", "Atualização automática"]
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
      ),
      title: "Interface Intuitiva",
      description: "Design moderno e responsivo que funciona perfeitamente em qualquer dispositivo, tornando a conversão de moedas uma experiência simples e agradável.",
      details: ["100% responsivo", "Acessibilidade WCAG", "Animações suaves"]
    }
  ]

  const stats = [
    { value: "160+", label: "Moedas Disponíveis" },
    { value: "< 1s", label: "Tempo de Resposta" },
    { value: "99.9%", label: "Uptime da API" },
    { value: "24/7", label: "Disponibilidade" }
  ]

  return (
    <section id="about" className="bg-pure-black py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Efeito de Fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-neon-red rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-neon-red/10 text-neon-red px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            Sobre o Conversor
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-pure-white mb-6">
            Tecnologia de Ponta para
            <span className="text-neon-red block">Conversões Precisar</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Descubra como nosso conversor de moedas combina precisão técnica, design moderno e
            confiabilidade para oferecer a melhor experiência de conversão financeira do mercado.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-red mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-700 hover:border-neon-red/30"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-neon-red rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-pure-white mb-4 group-hover:text-neon-red transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Details */}
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-neon-red rounded-full flex-shrink-0"></div>
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-red/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 border border-gray-700">
            <h3 className="text-2xl md:text-3xl font-bold text-pure-white mb-4">
              Pronto para Converter?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Experimente agora mesmo nosso conversor de moedas e veja a diferença que a tecnologia
              moderna pode fazer nas suas conversões financeiras.
            </p>
            <a
              href="#converter"
              className="inline-flex items-center gap-3 bg-neon-red text-pure-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-neon-red/50"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
              Começar Conversão
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection
