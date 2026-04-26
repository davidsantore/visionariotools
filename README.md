# Visionario Hub

Plataforma profissional de consulta de dados com tema dark, autenticação social e sistema de planos integrado.

## Características Principais

✨ **Autenticação Social**
- Login via Discord
- Login via Google
- Gerenciamento seguro de sessão

🎨 **Design Moderno**
- Interface dark-theme profissional
- Tema totalmente responsivo
- Animações suaves e micro-interações
- Componentes intuitivos e acessíveis

📊 **7 Módulos de API**
- CPF Completo
- Telefone (múltiplas versões)
- CEP/Endereço
- RG
- Nome
- Placa Veicular
- PIS/PASEP

💳 **Sistema de Planos**
- 4 planos diferentes (Free, Starter, Professional, Enterprise)
- Integração com Mercado Pago
- Gerenciamento automático de subscriptions

📈 **Dashboard Completo**
- Visualização de módulos disponíveis
- Interface de consulta interativa
- Histórico completo de consultas
- Gerenciamento de planos

## Stack Técnico

### Frontend
- **React 18.3** - UI Library
- **TypeScript 5.5** - Type Safety
- **Tailwind CSS 3.4** - Styling
- **React Router v6** - Routing
- **Lucide React** - Icons
- **Axios** - HTTP Client
- **Vite 5.4** - Build Tool

### Backend
- **Supabase** - Database & Auth
- **PostgreSQL** - Data Storage
- **Edge Functions** - Serverless Functions
- **Row Level Security** - Data Protection

### Integrations
- **Discord OAuth** - Social Login
- **Google OAuth** - Social Login
- **Mercado Pago** - Payment Processing

## Arquitetura

```
┌─────────────────────────────────────────────┐
│           Frontend (React + TS)              │
├─────────────────────────────────────────────┤
│ • Login Page (Discord/Google)               │
│ • Dashboard (Sidebar + Header)              │
│ • Módulos Page (Cards + Search)             │
│ • Consulta Page (Forms + Results)           │
│ • Histórico Page (Tabela)                   │
│ • Ofertas Page (Planos)                     │
└────────────────┬────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼───┐  ┌──────▼──────┐  ┌▼─────────────┐
│ Auth  │  │ Supabase DB │  │ Edge Funcs   │
│       │  │             │  │              │
│Discord│  │ • profiles  │  │ • Payments   │
│Google │  │ • plans     │  │ • Webhooks   │
└───────┘  │ • modules   │  └──────────────┘
           │ • subscr.   │
           │ • api_calls │
           └─────┬──────┘
                 │
        ┌────────┴─────────┐
        │                  │
    ┌───▼────┐      ┌──────▼──────┐
    │External│      │ Mercado Pago│
    │ APIs   │      │   Payment    │
    │(CPF, ..│      │  Processing  │
    └────────┘      └──────────────┘
```

## Estrutura de Pastas

```
src/
├── components/     # Componentes reutilizáveis
├── context/        # Context API (Auth)
├── lib/           # Funções auxiliares
├── pages/         # Páginas da aplicação
├── App.tsx        # Componente raiz
├── routes.tsx     # Configuração de rotas
└── index.css      # Estilos globais

supabase/
└── functions/     # Edge Functions serverless
```

## Começando

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Supabase
- Aplicação Discord/Google OAuth

### Instalação

```bash
# 1. Clonar repositório
git clone <repo-url>
cd visionario-hub

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# 4. Rodar servidor de desenvolvimento
npm run dev

# 5. Abrir navegador
# http://localhost:5173
```

### Build para Produção

```bash
npm run build
npm run preview
```

## Documentação

- **[QUICKSTART.md](./QUICKSTART.md)** - Guia rápido para começar
- **[SETUP.md](./SETUP.md)** - Configuração detalhada
- **[API_MODULES.md](./API_MODULES.md)** - Documentação de APIs
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Arquitetura
- **[MERCADO_PAGO_SETUP.md](./MERCADO_PAGO_SETUP.md)** - Pagamentos

## Fluxos Principais

### Fluxo de Autenticação
```
Usuário → Clica Discord/Google → Autoriza → Supabase Auth → Dashboard
```

### Fluxo de Consulta
```
Usuário → Seleciona Módulo → Insere Dados → API Externa → Histórico
```

### Fluxo de Pagamento
```
Usuário → Escolhe Plano → Edge Function → Mercado Pago → Subscription
```

## Planos de Acesso

| Plano | Preço | Consultas | Módulos | Suporte |
|-------|-------|-----------|---------|---------|
| Free | Grátis | 10/mês | 1 | Básico |
| Starter | R$ 29,90 | 100/mês | 3 | Prioritário |
| Professional | R$ 99,90 | 1000/mês | 7 | 24/7 |
| Enterprise | R$ 299,90 | Ilimitado | 7 | Dedicado |

## Segurança

- ✅ Row Level Security (RLS) em todas tabelas
- ✅ Autenticação JWT via Supabase
- ✅ Criptografia em trânsito (HTTPS/TLS)
- ✅ Validação de entrada no frontend e backend
- ✅ Proteção contra CSRF
- ✅ LGPD compliant

## Performance

- 🚀 Build otimizado (110KB gzipped)
- ⚡ Code splitting automático
- 🖼️ Lazy loading de componentes
- 📦 Caching inteligente
- 🔄 SSR ready (Supabase)

## Desenvolvimento

### Scripts Disponíveis

```bash
npm run dev       # Rodar servidor de desenvolvimento
npm run build     # Build para produção
npm run preview   # Preview de produção
npm run lint      # Rodar linter
npm run typecheck # Verificar tipos TypeScript
```

### Padrões de Código

- TypeScript strict mode
- ESLint configuration
- Tailwind CSS utilities
- React Hooks pattern
- Componentes funcionais

## Contribuindo

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Roadmap

- [ ] Testes automatizados (Jest + React Testing Library)
- [ ] Dashboard de analytics
- [ ] Integração com mais provedores de pagamento
- [ ] API REST pública
- [ ] Webhook processing melhorado
- [ ] Notificações por email
- [ ] Exportação de dados em CSV/PDF
- [ ] Múltiplos idiomas (i18n)

## Troubleshooting

### Build falha com erro de dependências
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Login não funciona
1. Verifique configuração de Discord/Google OAuth
2. Confirme Redirect URI está correto
3. Limpe cookies e cache do navegador

### Consultas retornam erro
1. Valide formato dos dados de entrada
2. Verifique se seu plano permite consultas
3. Confirme que módulo está online

Consulte [QUICKSTART.md](./QUICKSTART.md) para mais detalhes.

## License

MIT License - veja LICENSE.md para detalhes

## Contato & Suporte

- Email: suporte@visionariohub.com
- Discord: [Servidor Community]
- GitHub Issues: [Reportar bugs]

---

Desenvolvido com ❤️ usando React, TypeScript e Supabase

**Visionario Hub v1.0.0** - Plataforma de Consulta de Dados Premium
