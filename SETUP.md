# Visionario Hub - Guia de Configuração

## Configuração da Autenticação (Discord e Google)

### Discord OAuth Setup
1. Acesse https://discord.com/developers/applications
2. Clique em "New Application"
3. Vá para OAuth2 > General
4. Copie o **Client ID** e **Client Secret**
5. No Supabase, vá para Authentication > Providers
6. Selecione Discord e preencha:
   - **Client ID**: 1495795496848199873
   - **Client Secret**: JVR2olBOve7_8IYcr9eFxt9VRh1gHiz9
   - **Redirect URL**: https://gxzikjrxzhmhzdghglts.supabase.co/auth/v1/callback

### Google OAuth Setup
1. Acesse https://console.cloud.google.com
2. Crie um novo projeto
3. Ative Google+ API
4. Vá para Credenciais > OAuth 2.0 Client IDs
5. Copie Client ID e Client Secret
6. No Supabase, vá para Authentication > Providers
7. Selecione Google e preencha as credenciais

## Configuração do Mercado Pago

### Variáveis de Ambiente
Adicione ao seu `.env.local`:
```
VITE_SUPABASE_URL=https://gxzikjrxzhmhzdghglts.supabase.co
VITE_SUPABASE_ANON_KEY=seu_anon_key_aqui
```

### Mercado Pago Access Token
1. Acesse https://www.mercadopago.com/developers
2. Vá para API Credentials
3. Copie o **Access Token**
4. No Supabase, vá para Edge Functions > Secrets
5. Adicione: `MERCADO_PAGO_ACCESS_TOKEN=seu_token_aqui`

## APIs Externas Configuradas

### CPF Lookup API
- **Endpoint**: https://ef92b778ba5c4d1f9a7c3d8e2b1f6a90.vercel.app/api/cpf
- **Auth**: Bearer ef92b778ba
- **Retorna**: Nome, CPF, Data de Nascimento, Filiação, Endereço

### Outros Módulos Disponíveis
- **Telefone (Phone)**: /api/tel
- **CEP**: /api/cep
- **RG**: /api/rg
- **Nome**: /api/nome
- **Placa**: /api/plate

## Estrutura do Banco de Dados

### Tabelas Principais
- `profiles` - Dados do usuário
- `plans` - Planos disponíveis
- `modules` - Módulos de API
- `subscriptions` - Assinaturas do usuário
- `user_modules` - Acesso do usuário aos módulos
- `api_calls` - Histórico de consultas

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview de produção
npm run preview
```

## Recursos Principais

### 1. Sistema de Autenticação
- Login com Discord
- Login com Google
- Gerenciamento de sessão automático

### 2. Dashboard Profissional
- Sidebar com navegação intuitiva
- Header com informações do usuário
- Responsive design para desktop e mobile

### 3. Módulos de Consulta
- 7 módulos de API integrados
- Sistema de busca e filtro
- Interface amigável para consultas

### 4. Histórico de Consultas
- Registro de todas as consultas realizadas
- Visualização de dados enviados e recebidos
- Timestamps precisos

### 5. Sistema de Planos
- 4 planos disponíveis (Free, Starter, Professional, Enterprise)
- Integração com Mercado Pago
- Gerenciamento de subscrições

## Segurança

- Row Level Security (RLS) ativado em todas as tabelas
- Autenticação via Supabase Auth
- Tokens JWT para API calls
- Dados sensíveis protegidos por policies

## Suporte

Para dúvidas ou problemas, consulte a documentação do Supabase:
https://supabase.com/docs
