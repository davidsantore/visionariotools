# Módulos de API - Visionario Hub

## Visão Geral

Visionario Hub integra 7 módulos diferentes para consulta de dados públicos. Cada módulo fornece informações específicas através de APIs robustas e confiáveis.

## Módulos Disponíveis

### 1. CPF Completo
- **API Type**: cpf
- **Status**: Online
- **Descrição**: A consulta de CPF retorna nome, CPF, data de nascimento, filiação e endereço completo
- **Uso**: Validação de identidade, verificação de dados pessoais
- **Exemplo Input**: `12345678901` (sem formatação) ou `123.456.789-01` (formatado)
- **Resposta**: JSON com dados pessoais completos

### 2. Wolf Plus Telefone
- **API Type**: phone
- **Status**: Online
- **Descrição**: Módulo inteligente para consultas completas e precisas de dados telefônicos
- **Uso**: Busca de operadora, validação de telefone, localização geográfica
- **Exemplo Input**: `11987654321` (sem formatação) ou `(11) 98765-4321` (formatado)
- **Resposta**: Dados do telefone, operadora, localização

### 3. Placa Master
- **API Type**: plate
- **Status**: Online
- **Descrição**: Consulta dados detalhados através de informações de placa veicular
- **Uso**: Busca de dados de veículos, validação de propriedade
- **Exemplo Input**: `ABC1234` ou `ABC-1234`
- **Resposta**: Dados do veículo, proprietário, histórico

### 4. Wolf Telefone Max
- **API Type**: phone (variação)
- **Status**: Online
- **Descrição**: Versão avançada de consulta telefônica com mais detalhes
- **Uso**: Validação completa de contato, dados de proprietário
- **Exemplo Input**: `11987654321`
- **Resposta**: Dados expandidos do telefone

### 5. CNH Wolf
- **API Type**: cnh
- **Status**: Online
- **Descrição**: O módulo retorna dados de CNH, incluindo informações pessoais e histórico de infrações
- **Uso**: Validação de habilitação, verificação de infrator
- **Exemplo Input**: `12345678901` (número da CNH)
- **Resposta**: Dados de habilitação, vigência, categorias, infrações

### 6. Foto RJ
- **API Type**: photo
- **Status**: Online
- **Descrição**: Módulo que busca em uma base de 6,3 milhões de CPFs com fotografias do Rio de Janeiro
- **Uso**: Busca de identificação, verificação biométrica
- **Exemplo Input**: `12345678901` (número do CPF)
- **Resposta**: Foto de identificação, dados pessoais associados

### 7. Wolf PIS
- **API Type**: pis
- **Status**: Online
- **Descrição**: Módulo para buscar informações detalhadas de PIS/PASEP no Brasil
- **Uso**: Validação de contribuinte, histórico de contribuição
- **Exemplo Input**: `17033259504` (número do PIS)
- **Resposta**: Dados de filiação, contribuições, histórico

## Integração Técnica

### Código de Exemplo

```typescript
// Importar função da API
import { fetchCPFData } from '../lib/api';

// Usar no componente
const handleConsult = async () => {
  try {
    const data = await fetchCPFData('12345678901');
    console.log('Resultado:', data);
  } catch (error) {
    console.error('Erro na consulta:', error);
  }
};
```

### Tratamento de Erros

```typescript
try {
  const result = await fetchCPFData(input);
  // Processar resultado
} catch (error) {
  if (error.response?.status === 404) {
    // Dados não encontrados
  } else if (error.response?.status === 429) {
    // Rate limit atingido
  } else {
    // Outro erro
  }
}
```

## Planos de Acesso

### Free (Grátis)
- 10 consultas por mês
- 1 módulo disponível (CPF)
- Suporte básico

### Starter (R$ 29,90/mês)
- 100 consultas por mês
- 3 módulos disponíveis
- Suporte prioritário
- Histórico de 6 meses

### Professional (R$ 99,90/mês)
- 1000 consultas por mês
- Todos os 7 módulos
- Suporte 24/7
- API completa
- Histórico ilimitado

### Enterprise (R$ 299,90/mês)
- Consultas ilimitadas
- Todos os módulos
- Suporte dedicado 24/7
- API com limite customizado
- Integrações customizadas
- SLA garantido

## Rate Limiting

- **Free**: 10 consultas/mês
- **Starter**: 100 consultas/mês
- **Professional**: 1000 consultas/mês
- **Enterprise**: Ilimitado

## Melhores Práticas

### 1. Validação de Input
Sempre validar dados antes de enviar:
```typescript
const cleanCpf = cpf.replace(/\D/g, '');
if (cleanCpf.length !== 11) {
  throw new Error('CPF inválido');
}
```

### 2. Tratamento de Cache
Implementar cache para reduzir chamadas:
```typescript
const [cache, setCache] = useState({});
if (cache[cpf]) {
  return cache[cpf];
}
```

### 3. Feedback ao Usuário
Sempre informar status das operações:
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleConsult = async () => {
  setLoading(true);
  setError(null);
  try {
    const result = await fetchCPFData(input);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

## Compliance e Segurança

- Todas as APIs respeitam LGPD (Lei Geral de Proteção de Dados)
- Dados sensíveis são encriptados em trânsito
- Tokens de autenticação são renovados automaticamente
- Logs de auditoria para todas as consultas

## Suporte e Documentação

Para mais informações sobre cada API:
- Consulte o dashboard de módulos
- Acesse a documentação do provedor
- Contate nosso suporte 24/7

## Changelog

### v1.0.0 - Release Inicial
- 7 módulos integrados
- Sistema de autenticação
- Dashboard completo
- Integração com Mercado Pago
