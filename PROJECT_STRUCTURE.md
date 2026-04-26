# Estrutura do Projeto - Visionario Hub

## Árvore de Diretórios

```
visionario-hub/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Cabeçalho do dashboard com info do usuário
│   │   └── Sidebar.tsx         # Menu lateral com navegação principal
│   ├── context/
│   │   └── AuthContext.tsx     # Contexto de autenticação global
│   ├── lib/
│   │   ├── api.ts             # Funções para chamadas às APIs
│   │   ├── auth.ts            # Funções de autenticação Supabase
│   │   └── supabase.ts        # Cliente Supabase configurado
│   ├── pages/
│   │   ├── Login.tsx          # Página de login com Discord e Google
│   │   ├── Dashboard.tsx       # Layout principal do dashboard
│   │   ├── Modules.tsx         # Listagem e busca de módulos
│   │   ├── Consult.tsx         # Interface de consulta às APIs
│   │   ├── History.tsx         # Histórico de consultas realizadas
│   │   └── Offers.tsx          # Planos e sistema de pagamento
│   ├── App.tsx                # Componente raiz com routing
│   ├── routes.tsx             # Configuração de rotas e proteção
│   ├── main.tsx               # Entry point da aplicação
│   └── index.css              # Estilos globais
├── supabase/
│   └── functions/
│       └── create_payment/
│           └── index.ts       # Edge Function para Mercado Pago
├── .env                       # Variáveis de ambiente (Supabase)
├── index.html                 # HTML principal
├── package.json               # Dependências do projeto
├── tailwind.config.js         # Configuração Tailwind CSS
├── tsconfig.json              # Configuração TypeScript
├── vite.config.ts             # Configuração Vite
├── SETUP.md                   # Guia de configuração
├── API_MODULES.md             # Documentação dos módulos de API
└── PROJECT_STRUCTURE.md       # Este arquivo
```

## Fluxo de Autenticação

```
┌─────────────────────────────────────────────┐
│         Página de Login                      │
│  ┌─────────────────────────────────────────┐│
│  │ Botão Discord Login                      ││
│  │ Botão Google Login                       ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────┐
│    Supabase Auth (OAuth 2.0)                 │
│  ┌─────────────────────────────────────────┐│
│  │ Discord/Google Authorization             ││
│  │ Redirecionamento para Callback           ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────┐
│    AuthContext atualizado                    │
│  ┌─────────────────────────────────────────┐│
│  │ User: { id, email, ... }                ││
│  │ Session: JWT válida                     ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────┐
│    Redirecionamento para Dashboard           │
│  ┌─────────────────────────────────────────┐│
│  │ Sidebar + Header + Conteúdo             ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

## Arquitetura de Componentes

```
App
├── BrowserRouter
│   ├── AuthProvider
│   │   └── AppRoutes
│   │       ├── Route: "/" → Login
│   │       └── Route: "/dashboard" → ProtectedRoute
│   │           └── Dashboard
│   │               ├── Sidebar
│   │               ├── Header
│   │               └── Outlet
│   │                   ├── Route: "modules" → Modules
│   │                   ├── Route: "consult" → Consult
│   │                   ├── Route: "history" → History
│   │                   └── Route: "offers" → Offers
```

## Fluxo de Consulta de Dados

```
┌──────────────────┐
│ Página Consult   │
└────────┬─────────┘
         │
         ↓
┌──────────────────────────────────┐
│ Selecionar Módulo                │
│ (CPF, Telefone, CEP, etc)        │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ Inserir dados                    │
│ (entrada do usuário)             │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ Chamar API (fetch...Data)        │
│ lib/api.ts                       │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ API Externa                      │
│ https://ef92b778ba...            │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ Registrar na tabela api_calls    │
│ (histórico)                      │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ Exibir resultado ao usuário      │
│ (JSON formatado)                 │
└──────────────────────────────────┘
```

## Fluxo de Pagamento (Mercado Pago)

```
┌──────────────────────────┐
│ Página Ofertas           │
│ Seleçionar Plano         │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ handleUpgrade()                          │
│ - Valida plano                           │
│ - Prepara dados de pagamento             │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Chama Edge Function: create_payment      │
│ POST /functions/v1/create_payment        │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Edge Function processa:                  │
│ - Valida entrada                         │
│ - Chama Mercado Pago API                 │
│ - Retorna checkout link                  │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Redireciona para Mercado Pago            │
│ window.location.href = initPoint         │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Usuário completa pagamento               │
│ - Seleciona método de pagamento          │
│ - Autoriza transação                     │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Mercado Pago webhook notifica backend    │
│ - Atualiza status da subscription        │
│ - Registra pagamento                     │
└────────┬─────────────────────────────────┘
         │
         ↓
┌──────────────────────────────────────────┐
│ Usuário redirecionado para dashboard     │
│ com novo plano ativo                     │
└──────────────────────────────────────────┘
```

## Banco de Dados - Relacionamentos

```
auth.users (Supabase Auth)
    │
    ├── 1:1 ──→ profiles
    │           (id, email, full_name, avatar_url)
    │
    ├── 1:N ──→ subscriptions
    │           (user_id, plan_id, status, ...)
    │
    ├── 1:N ──→ user_modules
    │           (user_id, module_id, access_level)
    │
    └── 1:N ──→ api_calls
                (user_id, module_id, request, response)

plans
    │
    └── 1:N ──→ subscriptions
                (plan_id, ...)

modules
    │
    ├── 1:N ──→ user_modules
    │           (module_id, ...)
    │
    └── 1:N ──→ api_calls
                (module_id, ...)
```

## Tecnologias Utilizadas

### Frontend
- **React 18.3** - UI Framework
- **TypeScript 5.5** - Type safety
- **Tailwind CSS 3.4** - Styling
- **Lucide React** - Icons
- **React Router v6** - Routing
- **Axios** - HTTP client

### Backend
- **Supabase** - Database & Auth
- **PostgreSQL** - Database
- **Edge Functions** - Serverless functions
- **Mercado Pago API** - Payment processing

### Build & Dev
- **Vite 5.4** - Build tool
- **ESLint** - Linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Tema e Design

- **Paleta de Cores**: Dark theme com tons de azul e slate
- **Tipografia**: Sans-serif moderna
- **Animações**: Transições suaves e hover states
- **Responsividade**: Mobile-first approach
- **Acessibilidade**: Contraste adequado, navegação por teclado

## Segurança

- **Row Level Security (RLS)** - Proteção de dados por usuário
- **JWT Authentication** - Tokens seguros
- **HTTPS/TLS** - Criptografia em trânsito
- **LGPD Compliant** - Proteção de dados pessoais
- **Input Validation** - Validação no frontend e backend
- **API Token Rotation** - Tokens renovados automaticamente

## Performance

- **Code Splitting** - Carregamento sob demanda
- **Lazy Loading** - Componentes carregados quando necessário
- **Gzip Compression** - Redução de tamanho
- **Image Optimization** - Imagens otimizadas
- **Caching** - Cache de dados do usuário

## Próximos Passos Recomendados

1. Configurar Discord e Google OAuth no Supabase
2. Adicionar Mercado Pago Access Token às variáveis de ambiente
3. Testar fluxo de autenticação completo
4. Validar integração com APIs externas
5. Implementar testes automatizados
6. Deploy em produção
