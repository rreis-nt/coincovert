// ===========================
// CONVERSOR DE MOEDAS COM API REAL
// ===========================

// Sua chave de API
const API_KEY = '1a920c6e03b846f0938c8f9e';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

// Cache de taxas para otimizar requisições
let cachedRates = {};
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hora em milissegundos

// Elementos do DOM
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const fromCurrencyDisplay = document.getElementById('fromCurrencyDisplay');
const resultElement = document.getElementById('result');

// Criar elemento de loading
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading-indicator';
loadingIndicator.textContent = '⏳';
loadingIndicator.style.display = 'none';
resultElement.parentElement.appendChild(loadingIndicator);

// Debounce para otimizar performance
let debounceTimer;
function debounce(func, delay = 500) {
  return function(...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Função para buscar taxas da API
async function fetchExchangeRates(baseCurrency) {
  const now = Date.now();

  // Verificar cache
  if (cachedRates[baseCurrency] && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRates[baseCurrency];
  }

  try {
    showLoading(true);

    const response = await fetch(`${API_URL}${baseCurrency}`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();

    if (data.result === 'success') {
      cachedRates[baseCurrency] = data.conversion_rates;
      lastFetchTime = now;
      showLoading(false);
      return data.conversion_rates;
    } else {
      throw new Error('Resposta inválida da API');
    }

  } catch (error) {
    console.error('Erro ao buscar taxas:', error);
    showLoading(false);
    showError('Erro ao buscar taxas. Tente novamente.');
    return null;
  }
}

// Função de conversão com API real
async function convertCurrency() {
  const amount = parseFloat(amountInput.value) || 0;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Sincronizar o display "De:"
  fromCurrencyDisplay.value = from;

  if (amount === 0) {
    resultElement.textContent = '$$$$';
    return;
  }

  // Buscar taxas da API
  const rates = await fetchExchangeRates(from);

  if (!rates) {
    resultElement.textContent = 'Erro';
    return;
  }

  // Calcular conversão
  const rate = rates[to];
  const result = amount * rate;

  // Formatar resultado com Intl.NumberFormat
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: to,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Animar resultado
  resultElement.style.opacity = '0';
  setTimeout(() => {
    resultElement.textContent = formatter.format(result);
    resultElement.style.opacity = '1';

    // Mostrar taxa de câmbio
    updateRateInfo(from, to, rate);
  }, 150);
}

// Mostrar/ocultar loading
function showLoading(show) {
  if (show) {
    resultElement.style.opacity = '0.3';
    loadingIndicator.style.display = 'block';
  } else {
    resultElement.style.opacity = '1';
    loadingIndicator.style.display = 'none';
  }
}

// Mostrar erro
function showError(message) {
  resultElement.textContent = '⚠️';
  resultElement.title = message;
  setTimeout(() => {
    resultElement.textContent = '$$$$';
    resultElement.title = '';
  }, 3000);
}

// Atualizar informação da taxa
function updateRateInfo(from, to, rate) {
  let rateInfo = document.querySelector('.rate-info');

  if (!rateInfo) {
    rateInfo = document.createElement('div');
    rateInfo.className = 'rate-info';
    resultElement.parentElement.appendChild(rateInfo);
  }

  rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  rateInfo.style.opacity = '1';
}

// Event listeners com debounce
amountInput.addEventListener('input', debounce(convertCurrency, 500));
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

// Animação suave no scroll
document.querySelector('.scroll-indicator').addEventListener('click', () => {
  document.querySelector('.about-section').scrollIntoView({
    behavior: 'smooth'
  });
});

// Animação do CTA button
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
  document.querySelector('.services-section').scrollIntoView({
    behavior: 'smooth'
  });
});

// Inicializar conversão
convertCurrency();

// Adicionar transição suave no resultado
resultElement.style.transition = 'opacity 0.3s ease';

// Atualizar cache a cada 1 hora
setInterval(() => {
  cachedRates = {};
  console.log('Cache de taxas limpo');
}, CACHE_DURATION);

// Log de inicialização
console.log('🚀 RREISNT COINCONVERT - API Integrada');
console.log('✅ Taxas de câmbio em tempo real ativas');
