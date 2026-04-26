import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Grid3x3 as Grid3X3, Search, Clock, Gift, HelpCircle, LogOut, Settings, Zap } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const menuItems = [
    { icon: Grid3X3, label: 'Módulos', path: '/dashboard/modules', color: 'text-blue-400' },
    { icon: Search, label: 'Consultar', path: '/dashboard/consult', color: 'text-purple-400' },
    { icon: Clock, label: 'Histórico', path: '/dashboard/history', color: 'text-cyan-400' },
    { icon: Gift, label: 'Ofertas', path: '/dashboard/offers', color: 'text-green-400' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="w-64 bg-slate-900/80 backdrop-blur-sm border-r border-slate-800 h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Visionario</h1>
            <p className="text-slate-400 text-xs">Hub</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon size={20} className={!isActive ? item.color : ''} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
          <Settings size={20} />
          <span className="font-medium">Configurações</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
          <HelpCircle size={20} />
          <span className="font-medium">Suporte</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300"
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};
