import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { User } from 'lucide-react';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    setProfile(data);
  };

  return (
    <div className="h-20 bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-8">
      <div>
        <h2 className="text-white text-2xl font-bold">Dashboard</h2>
        <p className="text-slate-400 text-sm">Bem-vindo de volta!</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-white font-semibold">{profile?.full_name || user?.email}</p>
          <p className="text-slate-400 text-xs">{profile?.email}</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="text-white" size={24} />
          )}
        </div>
      </div>
    </div>
  );
};
