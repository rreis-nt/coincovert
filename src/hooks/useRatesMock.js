import { useState, useEffect, useCallback } from 'react'

const MOCK_RATES = {
  USD: 1.0,
  BRL: 5.12,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
}

export const useRatesMock = () => {
  const [rates, setRates] = useState(MOCK_RATES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simula carregamento inicial
    setLoading(true)
    setTimeout(() => {
      setRates(MOCK_RATES)
      setLoading(false)
    }, 500)
  }, [])

  const convert = useCallback((from, to, amount) => {
    if (!from || !to || !amount || isNaN(amount)) {
      return 0
    }

    const numAmount = parseFloat(amount)
    if (numAmount <= 0) return 0

    // Converte para USD primeiro, depois para moeda de destino
    const amountInUSD = numAmount / rates[from]
    const result = amountInUSD * rates[to]

    return result
  }, [rates])

  const formatCurrency = useCallback((value, currency) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }, [])

  return {
    rates,
    loading,
    error,
    convert,
    formatCurrency,
    currencies: Object.keys(MOCK_RATES),
  }
}

export default useRatesMock
