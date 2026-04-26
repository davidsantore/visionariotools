# Configuração do Mercado Pago - Visionario Hub

## Sua Chave de Acesso

**APP_USER**: `5444952091506396`
**Mercado Pago ID**: `APP_USR-5444952091506396-101512-ae62fba0fa5f6cdaa9b767d3370f5308-1727715481`

## Passo 1: Obter Access Token

1. Acesse https://www.mercadopago.com/developers
2. Faça login com sua conta Mercado Pago
3. Vá para **API Keys** ou **Credenciais**
4. Copie seu **Access Token** (production ou sandbox, dependendo do ambiente)

O token terá um formato similar a:
```
APP_USR-XXXXXXXXXXXXX-XXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXX-XXXXXXXXXX
```

## Passo 2: Configurar no Supabase

### Via Supabase Dashboard

1. Acesse seu projeto Supabase em https://app.supabase.com
2. Vá para **Edge Functions** no menu lateral
3. Selecione a função `create_payment`
4. Clique em **Settings** ou **Secrets**
5. Adicione uma nova secret:
   - **Name**: `MERCADO_PAGO_ACCESS_TOKEN`
   - **Value**: Cole seu Access Token aqui
6. Clique em **Save**

### Via CLI (alternativo)

```bash
# Você também pode usar a CLI do Supabase
supabase secrets set MERCADO_PAGO_ACCESS_TOKEN="seu_access_token_aqui"
```

## Passo 3: Configurar Webhook (Importante!)

### No Painel do Mercado Pago

1. Vá para https://www.mercadopago.com/developers/panel
2. Selecione **Webhooks** ou **Notificações**
3. Adicione uma nova URL de webhook:
   - **URL**: `https://seu_dominio_aqui/api/webhooks/mercado-pago`
   - **Events**: Selecione `payment.created`, `payment.updated`
4. Salve a configuração

### Criar Webhook Handler (Opcional)

Se você quiser processar as notificações do Mercado Pago automaticamente, crie uma nova edge function:

```typescript
// supabase/functions/mercado_pago_webhook/index.ts

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method === "POST") {
      const payload = await req.json();
      
      // Processar notificação de pagamento
      if (payload.type === "payment") {
        const paymentId = payload.data.id;
        const status = payload.action; // approved, rejected, pending
        
        console.log(`Pagamento ${paymentId}: ${status}`);
        
        // Aqui você poderia atualizar a subscription do usuário
        // Exemplo:
        // await supabase
        //   .from('subscriptions')
        //   .update({ status: status })
        //   .eq('mercado_pago_id', paymentId);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
```

## Passo 4: Testar Integração

### Ambiente de Testes (Sandbox)

Para testar sem fazer pagamentos reais:

1. Use o Access Token de **Sandbox**
2. Use dados de teste do Mercado Pago:

**Cartão de Crédito Teste (Aprovar)**:
- Número: `4111 1111 1111 1111`
- Validade: `12/25`
- CVV: `123`
- Nome: Qualquer nome

**Cartão de Crédito Teste (Rejeitar)**:
- Número: `5555 5555 5555 4444`
- Validade: `12/25`
- CVV: `123`

### Testar no Frontend

1. Vá para `/dashboard/offers`
2. Selecione um plano
3. Clique em "Contratar Agora"
4. Você será redirecionado para o Mercado Pago
5. Use um dos cartões de teste acima
6. Complete a transação

## Passo 5: Monitorar Pagamentos

### Dashboard do Mercado Pago

1. Acesse https://www.mercadopago.com/business/reports
2. Veja relatórios de pagamentos
3. Analise transações e tendências
4. Gerencie devoluções se necessário

### No Supabase

Monitore os pagamentos através das tabelas:

```sql
-- Ver todas as subscriptions
SELECT * FROM subscriptions;

-- Ver pagamentos de um usuário
SELECT * FROM subscriptions 
WHERE user_id = 'user_id_aqui'
ORDER BY created_at DESC;

-- Ver status dos planos
SELECT p.name, COUNT(s.id) as total_subscribers
FROM plans p
LEFT JOIN subscriptions s ON p.id = s.plan_id
WHERE s.status = 'active'
GROUP BY p.id;
```

## Troubleshooting

### Problema: "Erro ao criar pagamento"

**Solução**:
1. Verifique se o Access Token está correto
2. Confirme que a secret foi salva no Supabase
3. Verifique os logs da Edge Function
4. Teste a API do Mercado Pago diretamente

### Problema: "Redirecionamento não funciona"

**Solução**:
1. Certifique-se de que o `initPoint` foi recebido corretamente
2. Verifique o console do navegador para erros
3. Confirme que a URL de callback está configurada

### Problema: "Webhook não está sendo recebido"

**Solução**:
1. Verifique se a URL do webhook está correta
2. Confirme que o servidor está acessível publicamente
3. Teste o webhook manualmente no painel do Mercado Pago
4. Verifique os logs do webhook no Mercado Pago

## Links Úteis

- **Documentação Mercado Pago**: https://www.mercadopago.com.br/developers/pt/reference
- **SDKs Oficiais**: https://github.com/mercadopago
- **Status da API**: https://status.mercadopago.com
- **Suporte**: https://www.mercadopago.com.br/ajuda
- **Sandbox**: https://sandbox.mercadopago.com

## Segurança

### Boas Práticas

1. **Nunca** exponha seu Access Token no frontend
2. Use Edge Functions para processar pagamentos
3. Valide todos os webhooks usando a assinatura do Mercado Pago
4. Mantenha o token seguro em variáveis de ambiente
5. Implemente rate limiting para chamadas de API

### Validação de Webhook

Para validar que o webhook é genuíno:

```typescript
// Validar assinatura do webhook
const signature = req.headers.get('X-Signature');
const timestamp = req.headers.get('X-Timestamp');

// Implementar validação conforme documentação do Mercado Pago
```

## Configuração de Produção

Quando colocar em produção:

1. Use o Access Token de **PRODUÇÃO** (não sandbox)
2. Configure URLs de retorno para domínio real
3. Implemente validação de webhook robusta
4. Configure logging e monitoramento
5. Teste fluxo completo antes de ativar
6. Configure alertas para falhas de pagamento

## Comandos Úteis

```bash
# Ver secrets configuradas
supabase secrets list

# Atualizar secret
supabase secrets set MERCADO_PAGO_ACCESS_TOKEN="novo_token"

# Ver logs da edge function
supabase functions logs create_payment

# Testar função localmente
supabase functions serve create_payment
```

## Próximos Passos

1. ✅ Configure o Access Token
2. ✅ Teste com cartões de teste
3. ✅ Configure webhooks (opcional)
4. ✅ Implemente validação de webhook
5. ✅ Teste fluxo completo end-to-end
6. ✅ Migre para produção
7. ✅ Configure monitoramento
8. ✅ Implemente suporte ao cliente
