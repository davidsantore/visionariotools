import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaymentRequest {
  planId: string;
  userId: string;
  planName: string;
  planPrice: number;
  userEmail: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { planId, userId, planName, planPrice, userEmail }: PaymentRequest = await req.json();

    const mercadoPagoAccessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");

    if (!mercadoPagoAccessToken) {
      throw new Error("Mercado Pago token not configured");
    }

    const paymentData = {
      items: [
        {
          id: planId,
          title: planName,
          description: `Plano ${planName} - Visionario Hub`,
          quantity: 1,
          unit_price: planPrice,
          currency_id: "BRL",
        },
      ],
      payer: {
        email: userEmail,
      },
      back_urls: {
        success: `${Deno.env.get("PUBLIC_URL") || "http://localhost:5173"}/dashboard/offers?status=success`,
        failure: `${Deno.env.get("PUBLIC_URL") || "http://localhost:5173"}/dashboard/offers?status=failure`,
        pending: `${Deno.env.get("PUBLIC_URL") || "http://localhost:5173"}/dashboard/offers?status=pending`,
      },
      auto_return: "approved",
      external_reference: userId,
      notification_url: `${Deno.env.get("PUBLIC_URL") || "http://localhost:5173"}/api/webhooks/mercado-pago`,
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mercadoPagoAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Mercado Pago API error: ${error}`);
    }

    const preference = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        initPoint: preference.init_point,
        preferenceId: preference.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Payment creation error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
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
