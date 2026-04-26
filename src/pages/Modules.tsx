import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Zap, Database, Phone, MapPin, FileText, User as UserIcon } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  description: string;
  api_type: string;
  status: string;
  icon_name: string;
}

const moduleIcons: Record<string, React.ReactNode> = {
  cpf: <FileText className="text-blue-400" size={24} />,
  phone: <Phone className="text-purple-400" size={24} />,
  cep: <MapPin className="text-cyan-400" size={24} />,
  rg: <Database className="text-green-400" size={24} />,
  name: <UserIcon className="text-pink-400" size={24} />,
};

export const Modules: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    const filtered = modules.filter(
      (m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredModules(filtered);
  }, [searchTerm, modules]);

  const fetchModules = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('modules').select('*');
    if (!error && data) {
      setModules(data);
      setFilteredModules(data);
    }
    setLoading(false);
  };

  const handleAccessModule = (moduleId: string) => {
    // Redirect to consultation page with module selected
    window.location.href = `/dashboard/consult?module=${moduleId}`;
  };

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Módulos para Consultas</h1>
        <p className="text-slate-400">Diversas opções de consultas em um único lugar.</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Pesquisar módulo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-400">Carregando módulos...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:scale-105 cursor-pointer"
              onClick={() => handleAccessModule(module.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-all duration-300">
                  {moduleIcons[module.api_type] || <Zap className="text-slate-400" size={24} />}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-slate-400">
                    {module.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {module.name}
              </h3>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2">{module.description}</p>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                Acessar Consulta
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredModules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">Nenhum módulo encontrado</p>
        </div>
      )}
    </div>
  );
};
