# Mapa do Site - Visionario Hub

## Estrutura de Navegação

```
Visionario Hub
├── / (Login)
│   ├── Entrar com Discord
│   ├── Entrar com Google
│   └── Redirecionamento para /dashboard
│
└── /dashboard (Protegido)
    ├── Sidebar Menu
    │   ├── 🎯 Módulos → /dashboard/modules
    │   ├── 🔍 Consultar → /dashboard/consult
    │   ├── 📊 Histórico → /dashboard/history
    │   ├── 🎁 Ofertas → /dashboard/offers
    │   ├── ⚙️ Configurações → /dashboard/settings (futuro)
    │   ├── ❓ Suporte → /dashboard/support (futuro)
    │   └── 🚪 Sair → / (logout)
    │
    ├── /dashboard/modules
    │   ├── Título: "Módulos para Consultas"
    │   ├── Barra de Busca
    │   └── Grid de Cards
    │       ├── CPF Completo [Online]
    │       ├── Wolf Plus Telefone [Online]
    │       ├── Placa Master [Online]
    │       ├── Wolf Telefone Max [Online]
    │       ├── CNH Wolf [Online]
    │       ├── Foto RJ [Online]
    │       └── Wolf PIS [Online]
    │
    ├── /dashboard/consult
    │   ├── Painel Esquerdo: Seleção de Módulo
    │   │   └── Lista clicável dos 7 módulos
    │   │
    │   └── Painel Direito: Interface de Consulta
    │       ├── Informações do Módulo
    │       ├── Campo de Entrada (texto)
    │       ├── Botão "Realizar Consulta"
    │       └── Seção de Resultado (ao consultar)
    │           ├── Sucesso: Exibe JSON formatado
    │           └── Erro: Mensagem de erro
    │
    ├── /dashboard/history
    │   ├── Título: "Histórico"
    │   ├── Subtítulo: "Suas últimas consultas realizadas"
    │   └── Tabela de Histórico
    │       ├── Coluna: API (CPF, Telefone, etc)
    │       ├── Coluna: Dados Enviados
    │       ├── Coluna: Status (200, 400, etc)
    │       └── Coluna: Data/Hora
    │
    └── /dashboard/offers
        ├── Título: "Planos e Ofertas"
        ├── Subtítulo: "Escolha o plano ideal"
        └── Grid de Cards (4 Planos)
            ├── Plan Card: Free (Grátis)
            │   ├── 10 consultas/mês
            │   ├── 1 módulo
            │   └── Botão: [Usar Plano Grátis]
            │
            ├── Plan Card: Starter (R$ 29,90)
            │   ├── 100 consultas/mês
            │   ├── 3 módulos
            │   └── Botão: [Contratar Agora] → Mercado Pago
            │
            ├── Plan Card: Professional (R$ 99,90)
            │   ├── 1000 consultas/mês
            │   ├── 7 módulos
            │   └── Botão: [Contratar Agora] → Mercado Pago
            │
            └── Plan Card: Enterprise (R$ 299,90)
                ├── Ilimitado
                ├── Todos os módulos
                └── Botão: [Contratar Agora] → Mercado Pago
                    ↓
                    Mercado Pago Checkout
                    ↓
                    Callback de sucesso
                    ↓
                    Volta para /dashboard/offers
```

## Componentes de Interface

### Header (Todas as páginas do dashboard)
```
┌─────────────────────────────────────────────┐
│ Dashboard | Bem-vindo de volta!  👤 Usuário │
└─────────────────────────────────────────────┘
```

### Sidebar (Todas as páginas do dashboard)
```
┌──────────────────────┐
│ 🚀 Visionario        │
│    Hub               │
├──────────────────────┤
│ 🎯 Módulos [Active]  │
│ 🔍 Consultar         │
│ 📊 Histórico         │
│ 🎁 Ofertas           │
├──────────────────────┤
│ ⚙️ Configurações     │
│ ❓ Suporte           │
│ 🚪 Sair              │
└──────────────────────┘
```

## Fluxos de Usuário

### Fluxo 1: Novo Usuário
```
1. Acessa /
2. Vê página de login profissional
3. Clica em Discord ou Google
4. Autoriza aplicação
5. Redirecionado para /dashboard/modules
6. Vê 7 módulos disponíveis
```

### Fluxo 2: Realizar Consulta
```
1. Em /dashboard/modules
2. Clica em um módulo (ex: CPF)
3. Redireciona para /dashboard/consult?module=cpf
4. Insere CPF (ex: 12345678901)
5. Clica em "Realizar Consulta"
6. API retorna dados
7. Resultado exibido em formato JSON
8. Consulta registrada em histórico
```

### Fluxo 3: Visualizar Histórico
```
1. Clica em "Histórico" no sidebar
2. Vai para /dashboard/history
3. Vê todas consultas anteriores em tabela
4. Cada linha mostra API, entrada, status e data
```

### Fluxo 4: Upgrade de Plano
```
1. Clica em "Ofertas" no sidebar
2. Vai para /dashboard/offers
3. Vê 4 planos com preços
4. Clica em "Contratar Agora"
5. Redireciona para Mercado Pago
6. Completa pagamento
7. Retorna para /dashboard/offers
8. Plano atualizado (badge "Atual")
```

## Banco de Dados - Relacionamentos

```
┌──────────────────┐
│  auth.users      │
│  (Supabase)      │
└────────┬─────────┘
         │
    ┌────┴──────┬──────────┬─────────┐
    │            │          │         │
┌───▼───────┐ ┌─▼────┐ ┌──▼──┐ ┌───▼────┐
│ profiles  │ │subs. │ │user_│ │api_    │
│           │ │crip. │ │mods │ │calls   │
└───────────┘ └──┬───┘ └─────┘ └────────┘
                 │
            ┌────▼────┐
            │  plans   │
            └──────────┘
```

## Estados da Aplicação

### Estado de Autenticação
```
Sem Autenticação
├── Usuário vê: Página de Login
├── Podem acessar: / (login)
└── Redirecionam para: /

Com Autenticação
├── Usuário vê: Dashboard
├── Podem acessar: /dashboard e subrotas
└── Redirecionam para: /dashboard/modules
```

### Estado de Consulta
```
Inicial (sem consulta)
├── Campo de entrada: vazio
├── Resultado: não exibido
└── Status: aguardando entrada

Carregando
├── Campo: desabilitado
├── Resultado: spinner
└── Status: "Consultando..."

Sucesso
├── Campo: habilitado
├── Resultado: JSON formatado (verde)
└── Status: "Consulta realizada"

Erro
├── Campo: habilitado
├── Resultado: mensagem de erro (vermelho)
└── Status: "Erro ao consultar"
```

## Paleta de Cores

### Dark Theme
```
Background:
├── Primária: #0f172a (slate-950)
├── Secundária: #1e293b (slate-900)
└── Terciária: #334155 (slate-700)

Acentos:
├── Azul: #3b82f6 (blue-500)
├── Verde: #10b981 (emerald-500)
├── Vermelho: #ef4444 (red-500)
└── Amarelo: #f59e0b (amber-500)

Texto:
├── Primário: #ffffff (white)
├── Secundário: #cbd5e1 (slate-300)
└── Terciário: #94a3b8 (slate-400)
```

## Responsividade

### Mobile (< 768px)
```
- Sidebar: Transformado em menu hamburger
- Grid: 1 coluna
- Tabela: Scroll horizontal
- Padding: Reduzido
```

### Tablet (768px - 1024px)
```
- Sidebar: Visível
- Grid: 2 colunas
- Layout: Adaptado
```

### Desktop (> 1024px)
```
- Sidebar: Visível (256px)
- Grid: 4 colunas
- Layout: Ótimo
```

## Animações

```
Transições:
├── Duração padrão: 300ms
├── Easing: ease-in-out
└── Elementos: borders, colors, shadows

Hover States:
├── Cards: scale(1.05) + shadow
├── Botões: background gradient shift
└── Links: color change

Loading:
└── Spinner: rotate infinito
```

## Validação e Erros

```
Entrada Vazia
├── Mensagem: "Preencha todos os campos"
├── Estilo: Aviso (amarelo)
└── Ação: Desabilita botão

Dados Inválidos
├── Mensagem: "CPF inválido"
├── Estilo: Erro (vermelho)
└── Ação: Permite reintentar

Erro de API
├── Mensagem: "Erro ao consultar. Tente novamente."
├── Estilo: Erro (vermelho)
└── Ação: Mostra detalhes técnicos
```

---

Este mapa fornece uma visão completa da navegação e estrutura do Visionario Hub.
