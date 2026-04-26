import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInWithDiscord, signInWithGoogle } from '../lib/auth';
import { Chrome, MessageCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  const handleDiscordLogin = async () => {
    await signInWithDiscord();
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Visionario</h1>
          <p className="text-slate-400 text-lg">Hub</p>
          <p className="text-slate-500 text-sm mt-4">Acesse suas consultas de dados em um único lugar</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-8 text-center">Entrar</h2>

          <button
            onClick={handleDiscordLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 mb-4 transform hover:scale-105"
          >
            <MessageCircle size={20} />
            Entrar com Discord
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105"
          >
            <Chrome size={20} />
            Entrar com Google
          </button>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-slate-400 text-sm text-center">
              Ao entrar, você concorda com nossos <a href="#" className="text-blue-400 hover:text-blue-300">Termos de Serviço</a>
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">500+</div>
            <p className="text-slate-400 text-xs">Usuários Ativos</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">8</div>
            <p className="text-slate-400 text-xs">Módulos Disponíveis</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">99.9%</div>
            <p className="text-slate-400 text-xs">Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};
