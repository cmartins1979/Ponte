import React, { useState } from 'react';
import { LogoMentorLogistica } from './LogoMentorLogistica';
import { ShieldCheck, KeyRound, User, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginScreenProps {
  onLogin: (profile: UserProfile, accessKey: string) => void;
}

const REQUIRED_ACCESS_KEY = 'PONTE2026';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, informe um e-mail válido para vincular seu diário.');
      return;
    }

    const cleanKey = accessKey.trim().toUpperCase();
    if (!cleanKey) {
      setError('Por favor, informe a Chave de Acesso da sua turma da mentoria.');
      return;
    }

    if (cleanKey !== REQUIRED_ACCESS_KEY) {
      setError('Chave de acesso incorreta. O acesso é exclusivo com a chave oficial PONTE2026.');
      return;
    }

    // Iniciais do nome
    const parts = name.trim().split(' ');
    const initials =
      parts.length > 1
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : name.slice(0, 2).toUpperCase();

    const profile: UserProfile = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      initials,
      role: 'Aluno Método PONTE',
    };

    setError(null);
    onLogin(profile, cleanKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0B2046] to-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background graphic elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo in Official Badge Style */}
        <div className="flex justify-center mb-6">
          <LogoMentorLogistica variant="full" size="md" />
        </div>

        {/* Card */}
        <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/80 p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-sky-100 text-sky-900 inline-block mb-2">
              Acesso Exclusivo para Alunos
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              Diário de Travessia PONTE
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Preencha seus dados para acessar e salvar seu workbook individual com segurança.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-700" />
                <span>Nome Completo</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Eduardo da Silva"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-600 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-700" />
                <span>E-mail do Aluno</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-600 transition-all"
                required
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Usado para isolar e salvar seu diário individual com segurança neste navegador.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-sky-700" />
                  <span>Chave de Acesso da Turma</span>
                </label>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/60">
                  Obrigatório
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="Digite: PONTE2026"
                  autoCapitalize="characters"
                  autoComplete="off"
                  className="w-full pl-3.5 pr-10 py-2.5 text-sm font-mono tracking-wider bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 placeholder:font-sans placeholder:tracking-normal focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-600 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
                  title={showPassword ? 'Ocultar chave' : 'Mostrar chave'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Chave oficial exclusiva da mentoria: <strong className="text-slate-700">PONTE2026</strong>
              </p>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 accent-sky-600"
                />
                <span className="text-xs text-slate-600 font-medium">
                  Lembrar meu acesso neste dispositivo
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#0B2046] hover:bg-[#123068] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 group"
            >
              <span>Entrar no Diário de Travessia</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        {/* Security note */}
        <div className="mt-5 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Ambiente Protegido</span>
        </div>
      </div>
    </div>
  );
};
