import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Clock, Loader } from 'lucide-react';

interface ApiCall {
  id: string;
  module_id: string;
  endpoint: string;
  request_data: any;
  response_data: any;
  status_code: number;
  created_at: string;
}

export const History: React.FC = () => {
  const { user } = useAuth();
  const [calls, setCalls] = useState<ApiCall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('api_calls')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (data) setCalls(data);
    setLoading(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('pt-BR');
  };

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Histórico</h1>
        <p className="text-slate-400">Suas últimas consultas realizadas</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="animate-spin text-blue-400" size={32} />
        </div>
      ) : calls.length === 0 ? (
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
          <Clock className="mx-auto mb-4 text-slate-500" size={48} />
          <p className="text-slate-400 text-lg">Nenhuma consulta realizada ainda</p>
        </div>
      ) : (
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-slate-300 font-semibold">API</th>
                  <th className="px-6 py-4 text-left text-slate-300 font-semibold">Dados Enviados</th>
                  <th className="px-6 py-4 text-left text-slate-300 font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-slate-300 font-semibold">Data/Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {calls.map((call) => (
                  <tr key={call.id} className="hover:bg-slate-700/30 transition-colors duration-300">
                    <td className="px-6 py-4">
                      <span className="text-blue-400 font-semibold uppercase text-sm">{call.endpoint}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <code className="bg-slate-900/50 px-3 py-1 rounded text-sm">
                        {JSON.stringify(call.request_data).substring(0, 50)}...
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        call.status_code === 200
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {call.status_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{formatDate(call.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
