import React, { useState } from 'react'

const Popup = ({ isOpen, onClose, rates, lastUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('currency') // 'currency' or 'rate'

  if (!isOpen) return null

  const filteredRates = rates
    ? Object.entries(rates).filter(([currency]) =>
        currency.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const sortedRates = [...filteredRates].sort((a, b) => {
    if (sortBy === 'rate') {
      return b[1] - a[1] // Maior para menor
    }
    return a[0].localeCompare(b[0]) // Alfabético
  })

  const displayedRates = sortedRates.slice(0, 50) // Limitar para performance

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div className="bg-pure-white rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 id="popup-title" className="text-2xl md:text-3xl font-bold text-pure-black mb-2">
              📊 Taxas de Câmbio em Tempo Real
            </h2>
            <p className="text-gray-600 text-sm">
              Dados fornecidos pela ExchangeRate-API (Base: USD)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors text-xl font-bold"
            aria-label="Fechar popup"
          >
            ×
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neon-red/10 rounded-full flex items-center justify-center">
                <svg width="20" height="20" fill="none" stroke="#E00000" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Última Atualização</p>
                <p className="text-sm font-semibold text-pure-black">
                  {lastUpdate ? lastUpdate.toLocaleString('pt-BR') : 'Carregando...'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neon-red/10 rounded-full flex items-center justify-center">
                <svg width="20" height="20" fill="none" stroke="#E00000" strokeWidth="2">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total de Moedas</p>
                <p className="text-sm font-semibold text-pure-black">
                  {rates ? Object.keys(rates).length : 0} disponíveis
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neon-red/10 rounded-full flex items-center justify-center">
                <svg width="20" height="20" fill="none" stroke="#E00000" strokeWidth="2">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Fonte</p>
                <p className="text-sm font-semibold text-pure-black">
                  ExchangeRate-API
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="search-currency" className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Buscar Moeda
            </label>
            <input
              id="search-currency"
              type="text"
              placeholder="Digite o código da moeda (ex: EUR, GBP, JPY)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-neon-red focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
              📋 Ordenar por
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-neon-red focus:border-transparent outline-none bg-white"
            >
              <option value="currency">Código da Moeda</option>
              <option value="rate">Valor da Taxa</option>
            </select>
          </div>
        </div>

        {/* Rates Table */}
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            {rates && displayedRates.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {displayedRates.map(([currency, rate]) => (
                  <div key={currency} className="flex justify-between items-center p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-neon-red/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-neon-red">{currency.slice(0, 2)}</span>
                      </div>
                      <span className="font-semibold text-pure-black">{currency}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-neon-red">
                        {rate.toFixed(6)}
                      </span>
                      <p className="text-xs text-gray-500">
                        1 USD = {rate.toFixed(4)} {currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <svg width="48" height="48" fill="none" stroke="#9CA3AF" strokeWidth="2" className="mx-auto mb-4">
                  <path d="M9.663 17h4.673M12 3v1m0 16v1m9.325-3H16m-6.675 0H5.663"/>
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 7v5m0 5v5"/>
                </svg>
                <p className="text-gray-500 font-medium">Carregando taxas de câmbio...</p>
                <p className="text-gray-400 text-sm mt-1">Aguarde enquanto buscamos os dados mais recentes</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              ⚠️ <strong>Atenção:</strong> As taxas de câmbio podem variar devido às flutuações do mercado financeiro.
              Use estas informações como referência e consulte fontes oficiais para transações importantes.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-neon-red text-white rounded-full font-semibold hover:bg-red-700 transition-colors focus:ring-2 focus:ring-neon-red focus:ring-offset-2"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
