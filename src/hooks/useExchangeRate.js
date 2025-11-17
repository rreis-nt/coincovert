import { useState, useEffect, useCallback } from 'react'

const API_KEY = '1a920c6e03b846f0938c8f9e'
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`

export const useExchangeRate = () => {
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [baseCurrency, setBaseCurrency] = useState('USD')

  const fetchRates = useCallback(async (base = 'USD') => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/${base}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.result === 'success') {
        setRates(data.conversion_rates)
        setLastUpdate(new Date(data.time_last_update_unix * 1000))
        setBaseCurrency(base)
      } else {
        throw new Error(data['error-type'] || 'Erro desconhecido')
      }
    } catch (err) {
      setError(err.message)
      console.error('Erro ao buscar taxas:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates('USD')
  }, [fetchRates])

  const convert = useCallback((from, to, amount) => {
    if (!from || !to || !amount || isNaN(amount) || !rates[from] || !rates[to]) {
      return 0
    }

    const numAmount = parseFloat(amount)
    if (numAmount <= 0) return 0

    // Converte para base USD primeiro, depois para moeda destino
    const amountInBase = numAmount / rates[from]
    const result = amountInBase * rates[to]

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

  const getExchangeRate = useCallback((from, to) => {
    if (!rates[from] || !rates[to]) return 0
    return rates[to] / rates[from]
  }, [rates])

  const currencies = Object.keys(rates).sort()

  return {
    rates,
    loading,
    error,
    convert,
    formatCurrency,
    currencies,
    lastUpdate,
    baseCurrency,
    fetchRates,
    getExchangeRate,
  }
}

export default useExchangeRate
