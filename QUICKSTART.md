# Guia Rápido - Visionario Hub

## O que é Visionario Hub?

Visionario Hub é um platform profissional dark-theme para consulta de dados através de APIs integradas. O sistema oferece:

- Autenticação via Discord e Google
- Dashboard intuitivo e responsivo
- 7 módulos diferentes de consulta de dados
- Histórico completo de consultas
- Sistema de planos com integração Mercado Pago
- Interface moderna com tema dark

## Começando em 5 Minutos

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie ou atualize o arquivo `.env`:

```
VITE_SUPABASE_URL=https://gxzikjrxzhmhzdghglts.supabase.co
VITE_SUPABASE_ANON_KEY=seu_anon_key_aqui
```

### 3. Configurar Discord OAuth

No Supabase Dashboard:
1. Vá para **Authentication > Providers > Discord**
2. Ative o provider
3. Adicione:
   - **Client ID**: `1495795496848199873`
   - **Client Secret**: `JVR2olBOve7_8IYcr9eFxt9VRh1gHiz9`

### 4. Configurar Google OAuth

No Supabase Dashboard:
1. Vá para **Authentication > Providers > Google**
2. Ative o provider
3. Adicione suas credenciais do Google Cloud

### 5. Rodar Localmente

```bash
npm run dev
```

Acesse `http://localhost:5173`

## Primeiro Acesso

1. Clique em "Entrar com Discord" ou "Entrar com Google"
2. Autorize a aplicação
3. Você será redirecionado para o dashboard
4. Explore os módulos disponíveis

## Funcionalidades Principais

### Página de Login
- Login seguro com Discord
- Login seguro com Google
- Interface profissional dark-theme

### Dashboard
- **Módulos**: Visualize e busque todos os módulos disponíveis
- **Consultar**: Realize consultas em tempo real
- **Histórico**: Veja todas suas consultas anteriores
- **Ofertas**: Confira planos e faça upgrade

### Módulos de Consulta

#### CPF Completo
Retorna nome, CPF, data de nascimento, filiação e endereço
```
Entrada: 12345678901 ou 123.456.789-01
```

#### Telefone
Dados completos de telefone, operadora e localização
```
Entrada: 11987654321 ou (11) 98765-4321
```

#### CEP
Informações de endereço e localização
```
Entrada: 01234567 ou 01234-567
```

#### RG
Dados de identidade e validação
```
Entrada: 12345678901
```

#### Nome
Busca de pessoa por nome completo
```
Entrada: João Silva Santos
```

#### Placa
Dados de veículo
```
Entrada: ABC1234 ou ABC-1234
```

#### PIS
Informações de filiação e contribuição
```
Entrada: 17033259504
```

### Histórico de Consultas

Todos os dados consultados ficam registrados com:
- Data e hora exata
- Tipo de API utilizada
- Dados enviados
- Resultado recebido
- Status da requisição

### Planos e Pagamento

#### Planos Disponíveis

**Free** - Grátis
- 10 consultas/mês
- 1 módulo

**Starter** - R$ 29,90/mês
- 100 consultas/mês
- 3 módulos
- Suporte prioritário

**Professional** - R$ 99,90/mês
- 1000 consultas/mês
- Todos os módulos
- Suporte 24/7
- Histórico ilimitado

**Enterprise** - R$ 299,90/mês
- Consultas ilimitadas
- Tudo incluído
- SLA garantido
- Suporte dedicado

## Fluxo de Pagamento

1. Vá para **Ofertas**
2. Selecione o plano desejado
3. Clique em **Contratar Agora**
4. Você será redirecionado para o Mercado Pago
5. Complete o pagamento
6. Seu plano será ativado automaticamente

## Uso de APIs

### Exemplo: Consultar CPF

```typescript
import { fetchCPFData } from './lib/api';

const resultado = await fetchCPFData('12345678901');
console.log(resultado);
// {
//   nome: "João Silva",
//   cpf: "123.456.789-01",
//   data_nascimento: "01/01/1990",
//   filiacao: "Maria Silva",
//   endereco: "Rua ..., São Paulo, SP"
// }
```

### Exemplo: Consultar Telefone

```typescript
import { fetchPhoneData } from './lib/api';

const resultado = await fetchPhoneData('11987654321');
console.log(resultado);
// {
//   numero: "(11) 98765-4321",
//   operadora: "Vivo",
//   estado: "SP",
//   portabilidade: false
// }
```

## Dicas e Truques

### Busca Rápida
Na página de Módulos, use a barra de busca para encontrar rapidamente o módulo desejado.

### Consulta por URL
Acesse diretamente uma consulta:
```
http://localhost:5173/dashboard/consult?module=cpf
```

### Histórico Filtrado
No histórico, você pode ver todas suas consultas ordenadas por data.

### Dados Formatados Automaticamente
Os dados aceitos tanto com quanto sem formatação:
- CPF: `12345678901` ou `123.456.789-01`
- CEP: `01234567` ou `01234-567`
- Telefone: `11987654321` ou `(11) 98765-4321`

## Segurança

- Sua senha é gerenciada pelo Supabase (OAuth)
- Dados são criptografados em trânsito (HTTPS)
- Acesso protegido por Row Level Security
- Histórico de consultas apenas seu

## Troubleshooting

### "Erro ao fazer login"
- Certifique-se de que Discord/Google OAuth está configurado
- Verifique as variáveis de ambiente
- Limpe cache e cookies do navegador

### "Consulta retorna erro"
- Verifique se os dados foram inseridos corretamente
- Confirme que sua conta tem acesso ao módulo
- Verifique se seu plano permite mais consultas

### "Pagamento não funcionando"
- Certifique-se de que Mercado Pago está configurado
- Use dados de teste em sandbox
- Verifique os logs da edge function

## Próximas Ações

1. Configure Discord e Google OAuth
2. Configure Mercado Pago (opcional)
3. Convide usuários para testar
4. Implemente feedback dos usuários
5. Deploy em produção

## Suporte

Para dúvidas ou problemas:
- Consult SETUP.md para configuração detalhada
- Consult API_MODULES.md para documentação de APIs
- Consult PROJECT_STRUCTURE.md para entender a arquitetura
- Consult MERCADO_PAGO_SETUP.md para pagamentos

## Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Documentação Mercado Pago](https://www.mercadopago.com/developers)
- [Documentação React Router](https://reactrouter.com)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)

Boa sorte com Visionario Hub! 🚀
