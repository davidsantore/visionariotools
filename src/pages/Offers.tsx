import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Check, Zap } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_period: string;
  features: string[];
}

export const Offers: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
    if (user) {
      fetchUserSubscription();
    }
  }, [user]);

  const fetchPlans = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('plans')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true });

    if (data) {
      setPlans(data as unknown as Plan[]);
    }
    setLoading(false);
  };

  const fetchUserSubscription = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .maybeSingle();

    setUserSubscription(data);
  };

  const handleUpgrade = async (planId: string) => {
    if (!user) {
      navigate('/');
      return;
    }

    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create_payment`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          userId: user.id,
          planName: plan.name,
          planPrice: plan.price,
          userEmail: user.email,
        }),
      });

      const data = await response.json();

      if (data.success && data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        alert('Erro ao criar pagamento. Tente novamente.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Planos e Ofertas</h1>
        <p className="text-slate-400">Escolha o plano ideal para suas necessidades</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-400">Carregando planos...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = userSubscription?.plan_id === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative bg-slate-800/40 backdrop-blur-sm border rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${
                  isCurrentPlan
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/20'
                    : 'border-slate-700 hover:border-blue-500/50'
                }`}
              >
                {isCurrentPlan && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Check size={16} />
                    Atual
                  </div>
                )}

                <h3 className="text-white font-bold text-2xl mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-slate-400">
                      {plan.currency}/{plan.billing_period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrentPlan ? (
                  <button disabled className="w-full bg-slate-700 text-slate-400 font-bold py-3 px-4 rounded-lg cursor-not-allowed">
                    Plano Ativo
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Zap size={18} />
                    Contratar Agora
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && plans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">Nenhum plano disponível no momento</p>
        </div>
      )}
    </div>
  );
};
