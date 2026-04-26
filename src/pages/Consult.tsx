import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { fetchCPFData, fetchCEPData, fetchPhoneData, fetchRGData, fetchNameData } from '../lib/api';
import { Loader, AlertCircle, CheckCircle } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  api_type: string;
}

type QueryResult = {
  status: 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
};

export const Consult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState(searchParams.get('module') || '');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const { data } = await supabase.from('modules').select('*');
    if (data) setModules(data);
  };

  const handleConsult = async () => {
    if (!inputValue.trim() || !selectedModule) {
      setResult({ status: 'error', error: 'Preencha todos os campos' });
      return;
    }

    setResult({ status: 'loading' });

    try {
      const module = modules.find((m) => m.id === selectedModule);
      if (!module) throw new Error('Módulo não encontrado');

      let data;

      switch (module.api_type) {
        case 'cpf':
          data = await fetchCPFData(inputValue);
          break;
        case 'cep':
          data = await fetchCEPData(inputValue);
          break;
        case 'phone':
          data = await fetchPhoneData(inputValue);
          break;
        case 'rg':
          data = await fetchRGData(inputValue);
          break;
        case 'name':
          data = await fetchNameData(inputValue);
          break;
        default:
          throw new Error('Tipo de API não suportado');
      }

      if (user) {
        await supabase.from('api_calls').insert({
          user_id: user.id,
          module_id: selectedModule,
          endpoint: module.api_type,
          request_data: { input: inputValue },
          response_data: data,
          status_code: 200,
        });
      }

      setResult({ status: 'success', data });
    } catch (error: any) {
      setResult({ status: 'error', error: error.message || 'Erro ao consultar' });
    }
  };

  const selectedModuleData = modules.find((m) => m.id === selectedModule);

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Consultar</h1>
        <p className="text-slate-400">Realize consultas em nossos módulos disponíveis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h2 className="text-white font-bold text-lg mb-6">Selecionar Módulo</h2>

            <div className="space-y-3">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    selectedModule === module.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-slate-700/30 text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <p className="font-semibold">{module.name}</p>
                  <p className="text-xs mt-1 opacity-75">API: {module.api_type.toUpperCase()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            {selectedModuleData ? (
              <>
                <h2 className="text-white font-bold text-2xl mb-2">{selectedModuleData.name}</h2>
                <p className="text-slate-400 mb-8">API: {selectedModuleData.api_type.toUpperCase()}</p>

                <div className="mb-8">
                  <label className="block text-white font-semibold mb-3">Insira os dados para consulta</label>
                  <input
                    type="text"
                    placeholder={`Digite o ${selectedModuleData.api_type.toUpperCase()}`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleConsult()}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>

                <button
                  onClick={handleConsult}
                  disabled={result?.status === 'loading'}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {result?.status === 'loading' && <Loader size={20} className="animate-spin" />}
                  {result?.status === 'loading' ? 'Consultando...' : 'Realizar Consulta'}
                </button>

                {result && (
                  <div className="mt-8 pt-8 border-t border-slate-700">
                    {result.status === 'success' && (
                      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircle className="text-green-400" size={24} />
                          <h3 className="text-green-400 font-bold text-lg">Consulta Realizada com Sucesso</h3>
                        </div>
                        <pre className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-slate-300 text-sm overflow-x-auto max-h-96">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    )}

                    {result.status === 'error' && (
                      <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="text-red-400" size={24} />
                          <p className="text-red-400 font-semibold">{result.error}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">Selecione um módulo para começar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
