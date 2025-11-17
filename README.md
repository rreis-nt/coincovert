# 💱 CoinConvert - Conversor de Moedas

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![ExchangeRate API](https://img.shields.io/badge/ExchangeRate_API-Real_Time-FF6B6B?style=for-the-badge)](https://exchangerate-api.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> Um conversor de moedas moderno e intuitivo, desenvolvido com React e Vite, oferecendo conversões em tempo real com uma interface elegante e responsiva.



## ✨ Características Principais

- 🚀 **Conversão em Tempo Real**: Taxas atualizadas instantaneamente via ExchangeRate API
- 🎨 **Interface Moderna**: Design responsivo com animações suaves e efeitos visuais
- ⚡ **Performance Otimizada**: Debounce de 250ms para conversões eficientes
- 🌍 **160+ Moedas**: Suporte a mais de 160 moedas globais
- 📱 **Mobile-First**: Experiência perfeita em dispositivos móveis e desktop
- ♿ **Acessibilidade**: Componentes semânticos e suporte a leitores de tela
- 🔄 **Troca Rápida**: Botão para inverter moedas de origem e destino
- 📊 **Taxas Detalhadas**: Exibição clara das taxas de câmbio atuais

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca JavaScript para interfaces de usuário
- **Vite 5.0.8** - Build tool e dev server ultra-rápido
- **Tailwind CSS 3.4.0** - Framework CSS utilitário
- **PostCSS** - Processador CSS com Autoprefixer

### APIs e Integrações
- **ExchangeRate API** - Taxas de câmbio em tempo real
- **Intl.NumberFormat** - Formatação de moedas localizada (pt-BR)

### Desenvolvimento
- **ESLint** - Linting para código JavaScript/React
- **Git** - Controle de versão
- **VS Code** - Editor de código recomendado

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Git

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/rreis-nt/coincovert.git
   cd coincovert
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   - O servidor estará rodando em `http://localhost:3000`
   - A página será aberta automaticamente

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm run preview      # Visualiza o build de produção
```

## 📁 Estrutura do Projeto

```
coincovert/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── ConverterSection.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── InfoSection.jsx
│   │   ├── Popup.jsx
│   │   └── IconChevronDown.jsx
│   ├── hooks/              # Hooks customizados
│   │   ├── useExchangeRate.js
│   │   └── useRatesMock.js
│   ├── constants/          # Constantes da aplicação
│   │   └── colors.js
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Ponto de entrada
│   └── index.css           # Estilos globais
├── assets/                 # Imagens e ícones
│   ├── logo.svg
│   └── icons/
├── css/                    # Estilos CSS adicionais
├── js/                     # Scripts JavaScript
├── index.html              # HTML principal
├── package.json            # Dependências e scripts
├── vite.config.js          # Configuração do Vite
├── tailwind.config.js      # Configuração do Tailwind
├── postcss.config.js       # Configuração do PostCSS
└── README.md               # Este arquivo
```

## 🎯 Como Usar

1. **Digite o valor**: Insira a quantia que deseja converter no campo "Quantia"
2. **Selecione as moedas**: Escolha a moeda de origem ("De") e destino ("Para")
3. **Veja o resultado**: O valor convertido aparece automaticamente no campo "Total"
4. **Troque as moedas**: Use o botão vermelho para inverter origem e destino
5. **Verifique as taxas**: Clique em "ℹ️ Taxas fornecidas pela ExchangeRate-API" para mais informações

## 🔧 Funcionalidades Técnicas

### Hook useExchangeRate
- Gerenciamento de estado para taxas de câmbio
- Fetch automático da API ExchangeRate
- Tratamento de erros e loading states
- Formatação de moedas localizada
- Cálculo de conversões precisas

### Debounce Otimizado
- Delay de 250ms para evitar chamadas excessivas
- Conversão automática após input do usuário
- Performance aprimorada em dispositivos móveis

### Design System
- Cores customizadas: Neon Red (#E00000), Pure Black, Pure White
- Bordas arredondadas personalizadas
- Animações CSS suaves
- Gradientes e efeitos de brilho

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição
- Mantenha o código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Siga as convenções de nomenclatura existentes
- Atualize o README se necessário

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Ryan Reis** - *Desenvolvedor Full-Stack*

- GitHub: [@rreis-nt](https://github.com/rreis-nt)
- LinkedIn: [Ryan Antonio](https://www.linkedin.com/in/ryanreisoliveira/)
- Email: ryanreisoliveira08@gmail.com

## 🙏 Agradecimentos

- [ExchangeRate API](https://exchangerate-api.com/) - Por fornecer as taxas de câmbio
- [Tailwind CSS](https://tailwindcss.com/) - Pelo incrível framework CSS
- [React](https://reactjs.org/) - Pela biblioteca que torna tudo possível
- [Vite](https://vitejs.dev/) - Pelo build tool revolucionário

## 📞 Suporte

Se você tiver alguma dúvida ou sugestão:

- Abra uma [issue](https://github.com/rreis-nt/coincovert/issues) no GitHub
- Entre em contato diretamente comigo

---

⭐ **Se este projeto te ajudou, dê uma estrela no GitHub!**

![Made with ❤️ by Ryan Reis](https://img.shields.io/badge/Made%20with%20❤️%20by-Ryan%20Reis-red?style=for-the-badge)
