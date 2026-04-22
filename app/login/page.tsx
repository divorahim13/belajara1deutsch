'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

function IconEye({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconLoader() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError('Email atau password tidak valid. Silakan periksa kembali.');
      setIsLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles').select('role').eq('id', user.id).single();
      const role = profile?.role;
      if (role === 'super_admin') router.push('/superadmin');
      else if (role === 'admin_teacher' || role === 'client_owner') router.push('/admin');
      else router.push('/dashboard');
    }
    router.refresh();
  };

  return (
    <>
      <style>{`
        .bg-pattern {
          background-color: #EEF2FF;
          background-image: radial-gradient(#C7D2FE 1px, transparent 1px);
          background-size: 24px 24px;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="min-h-screen bg-pattern flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Soft Animated Blobs for "Clean & Smooth" feel */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[420px] relative z-10">
          
          {/* Header/Logo section */}
          <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-[3px] border-[#4338CA] rounded-2xl shadow-[0px_4px_0px_0px_#4338CA] mb-5">
              <span className="text-3xl font-black text-[#4F46E5] font-heading">dp</span>
            </div>
            <h1 className="text-4xl font-black text-indigo-950 mb-2 font-heading tracking-wide">
              Deutsch Pintar
            </h1>
            <p className="text-indigo-600 font-bold text-sm">
              Platform LMS Bahasa Jerman Terintegrasi
            </p>
          </div>

          {/* Claymorphism Card matching globals.css */}
          <div className="clay-card bg-white p-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-950 font-heading">
              Masuk ke Dasbor
            </h2>
            
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border-2 border-red-200 text-sm font-bold flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-indigo-900 ml-1">Email</label>
                <input 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@sekolah.com"
                  className="w-full px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all text-indigo-950 font-medium placeholder:text-indigo-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-indigo-900 ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all text-indigo-950 font-medium placeholder:text-indigo-400 pr-12"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-indigo-400 hover:text-[#4F46E5] transition-colors"
                  >
                    <IconEye open={showPassword} />
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading || !email || !password}
                className="clay-button w-full mt-2 flex justify-center items-center gap-2 text-[1rem] py-[14px]"
              >
                {isLoading ? (
                  <>
                    <IconLoader />
                    Memproses...
                  </>
                ) : (
                  'Masuk Sekarang'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-indigo-50 flex flex-col gap-3 text-center">
              <p className="text-sm font-bold text-indigo-900 mb-1">Belum punya akun?</p>
              <Link 
                href="/signup" 
                className="w-full flex justify-center items-center py-3 bg-white border-2 border-[#4F46E5] text-[#4F46E5] rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-sm"
              >
                Daftar dengan Kode Lisensi
              </Link>
              <p className="text-xs font-semibold text-indigo-400 leading-relaxed mt-2">
                Akses sistem diarahkan otomatis berdasarkan peran Anda.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
