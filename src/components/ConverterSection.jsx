import React, { useState, useEffect, useCallback } from 'react'
import useExchangeRate from '../hooks/useExchangeRate'
import IconChevronDown from './IconChevronDown'

const ConverterSection = ({ onOpenPopup }) => {
  const { convert, formatCurrency, currencies, loading, error, lastUpdate, getExchangeRate } = useExchangeRate()

  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('BRL')
  const [toCurrency, setToCurrency] = useState('USD')
  const [result, setResult] = useState(0)
  const [debouncedAmount, setDebouncedAmount] = useState('')
  const [exchangeRate, setExchangeRate] = useState(0)
  const [conversionHistory, setConversionHistory] = useState([])

  // Debounce do input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAmount(amount)
    }, 250)
    return () => clearTimeout(timer)
  }, [amount])

  // Conversão automática
  useEffect(() => {
    if (debouncedAmount && !isNaN(debouncedAmount) && currencies.length > 0) {
      const converted = convert(fromCurrency, toCurrency, debouncedAmount)
      setResult(converted)
      const rate = getExchangeRate(fromCurrency, toCurrency)
      setExchangeRate(rate)

      // Add to history if valid conversion
      if (converted > 0 && rate > 0) {
        const newEntry = {
          amount: parseFloat(debouncedAmount),
          fromCurrency,
          toCurrency,
          result: converted,
          exchangeRate: rate,
          timestamp: new Date()
        }
        setConversionHistory(prev => {
          const updated = [newEntry, ...prev].slice(0, 5)
          return updated
        })
      }
    } else {
      setResult(0)
      setExchangeRate(0)
    }
  }, [debouncedAmount, fromCurrency, toCurrency, convert, currencies, getExchangeRate])

  const handleAmountChange = (e) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <section
      id="converter"
      className="bg-gray-bg py-20 px-6 md:px-12 lg:px-24"
      aria-labelledby="converter-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header da Seção */}
        <div className="text-center mb-12 animate-fade-in">
          <h2
            id="converter-heading"
            className="text-4xl md:text-5xl font-extrabold text-pure-black mb-4"
          >
            Conversor de <span className="text-neon-red">Moedas</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conversões em tempo real com taxas atualizadas da API ExchangeRate
          </p>
          {lastUpdate && (
            <p className="text-sm text-gray-500 mt-2">
              📅 Última atualização: {lastUpdate.toLocaleString('pt-BR')}
            </p>
          )}
        </div>

        {/* Card Principal */}
        <div className="bg-pure-black rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">

          {/* Efeito de Brilho */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-red to-transparent"></div>

          {/* Loading State */}
          {loading && (
            <div className="absolute inset-0 bg-pure-black/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-neon-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-semibold">Carregando taxas...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 border-2 border-red-500 rounded-xl p-4 mb-6 flex items-center gap-3">
              <svg width="24" height="24" fill="none" stroke="#EF4444" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4m0 4h.01"/>
              </svg>
              <p className="text-red-400 font-medium">Erro ao carregar taxas: {error}</p>
            </div>
          )}

          {/* Grid de 3 Colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_auto_1.2fr] gap-6 items-center">

            {/* Coluna 1 - Input */}
            <div className="bg-pure-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <label
                htmlFor="amount-input"
                className="block text-pure-black font-bold mb-3 text-lg"
              >
                💰 Quantia
              </label>
              <input
                id="amount-input"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full text-4xl font-bold text-pure-black bg-transparent border-none outline-none mb-4 placeholder-gray-300"
                aria-label="Digite a quantia a converter"
                aria-describedby="amount-help"
              />
              <span id="amount-help" className="sr-only">
                Digite apenas números e ponto decimal
              </span>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="from-currency"
                    className="block text-pure-black text-sm font-semibold mb-2"
                  >
                    🌍 De:
                  </label>
                  <div className="relative">
                    <select
                      id="from-currency"
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl appearance-none cursor-pointer font-bold text-pure-black focus:ring-4 focus:ring-neon-red focus:bg-white transition-all"
                      aria-label="Selecione a moeda de origem"
                    >
                      {currencies.map(curr => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="to-currency"
                    className="block text-pure-black text-sm font-semibold mb-2"
                  >
                    🎯 Para:
                  </label>
                  <div className="relative">
                    <select
                      id="to-currency"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl appearance-none cursor-pointer font-bold text-pure-black focus:ring-4 focus:ring-neon-red focus:bg-white transition-all"
                      aria-label="Selecione a moeda de destino"
                    >
                      {currencies.map(curr => (
                        <option key={curr} value={curr}>{curr}</option>
                      ))}
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 2 - Botão de Troca */}
            <div className="flex justify-center lg:mx-4">
              <button
                onClick={swapCurrencies}
                className="w-16 h-16 lg:w-20 lg:h-20 bg-neon-red border-4 border-pure-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:rotate-180 transition-all duration-500 lg:rotate-0 rotate-90 group"
                aria-label="Trocar moedas"
              >
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  className="group-hover:scale-110 transition-transform"
                >
                  <path d="M7 16h10m0 0l-3-3m3 3l-3 3M17 8h-10m0 0l3-3m-3 3l3 3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Coluna 3 - Resultado */}
            <div
              className="bg-pure-white rounded-2xl p-6 shadow-lg border-4 border-neon-red transform hover:scale-105 transition-transform duration-300 relative overflow-hidden"
              role="region"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Efeito de Brilho Interno */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-red/10 rounded-full blur-3xl"></div>

              <label className="block text-pure-black font-bold mb-3 text-lg relative z-10">
                💵 Total
              </label>
              <div
                className="text-4xl md:text-5xl font-bold text-neon-red mb-4 break-words relative z-10"
                aria-label={`Resultado: ${formatCurrency(result, toCurrency)}`}
              >
                {loading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  formatCurrency(result, toCurrency)
                )}
              </div>

              <div className="space-y-2 text-sm text-pure-black relative z-10">
                <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-semibold">De:</span>
                  <span className="font-bold text-neon-red">{fromCurrency}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                  <span className="font-semibold">Para:</span>
                  <span className="font-bold text-neon-red">{toCurrency}</span>
                </div>
                {exchangeRate > 0 && (
                  <div className="flex justify-between items-center bg-neon-red/10 rounded-lg px-3 py-2 mt-3">
                    <span className="font-semibold">Taxa:</span>
                    <span className="font-bold text-neon-red">
                      1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-8 text-center">
            <button
              onClick={onOpenPopup}
              className="text-white hover:text-neon-red transition-colors duration-300 text-sm underline focus:text-neon-red flex items-center gap-2 mx-auto"
              aria-label="Ver informações sobre taxas de câmbio"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              ℹ️ Taxas fornecidas pela ExchangeRate-API em tempo real
            </button>
          </div>
        </div>

        {/* Histórico de Conversões */}
        {conversionHistory.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-pure-black mb-6 text-center">
              📊 Últimas <span className="text-neon-red">Conversões</span>
            </h3>
            <div className="space-y-4">
              {conversionHistory.map((entry, index) => (
                <div
                  key={index}
                  className="bg-pure-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-neon-red"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-lg font-bold text-pure-black">
                        {entry.amount.toFixed(2)} {entry.fromCurrency} → {formatCurrency(entry.result, entry.toCurrency)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Taxa: 1 {entry.fromCurrency} = {entry.exchangeRate.toFixed(4)} {entry.toCurrency}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {entry.timestamp.toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cards de Recursos */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-pure-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-neon-red/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" fill="none" stroke="#E00000" strokeWidth="2">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-pure-black mb-2">Conversão Rápida</h3>
            <p className="text-gray-600 text-sm">
              Resultados instantâneos com debounce otimizado de 250ms
            </p>
          </div>

          <div className="bg-pure-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-neon-red/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" fill="none" stroke="#E00000" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-pure-black mb-2">Taxas Reais</h3>
            <p className="text-gray-600 text-sm">
              Dados atualizados da ExchangeRate-API com mais de 160 moedas
            </p>
          </div>

          <div className="bg-pure-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-neon-red/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" fill="none" stroke="#E00000" strokeWidth="2">
                <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-pure-black mb-2">Interface Moderna</h3>
            <p className="text-gray-600 text-sm">
              Design responsivo e acessível com animações suaves
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConverterSection
