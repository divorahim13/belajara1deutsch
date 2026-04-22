'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerStudent } from './actions';

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

export default function SignupPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await registerStudent(formData);
      
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        // Automatically redirect to dashboard on success
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
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
        {/* Soft Animated Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[420px] relative z-10 my-8">
          
          {/* Header/Logo section */}
          <div className="text-center mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white border-[3px] border-[#4338CA] rounded-xl shadow-[0px_4px_0px_0px_#4338CA] mb-4">
              <span className="text-2xl font-black text-[#4F46E5] font-heading">dp</span>
            </div>
            <h1 className="text-3xl font-black text-indigo-950 mb-2 font-heading tracking-wide">
              Registrasi Siswa
            </h1>
            <p className="text-indigo-600 font-bold text-sm">
              Buat akun dengan kode lisensi dari kelasmu
            </p>
          </div>

          {/* Claymorphism Card matching globals.css */}
          <div className="clay-card bg-white p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border-2 border-red-200 text-sm font-bold flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-indigo-900 ml-1">Nama Lengkap</label>
                <input 
                  type="text"
                  name="fullName"
                  placeholder="Budi Santoso"
                  className="w-full px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all text-indigo-950 font-medium placeholder:text-indigo-400"
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-indigo-900 ml-1">Email Aktif</label>
                <input 
                  type="email"
                  name="email"
                  placeholder="budi@email.com"
                  className="w-full px-4 py-3 bg-indigo-50/50 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-[#4F46E5] focus:bg-white transition-all text-indigo-950 font-medium placeholder:text-indigo-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-indigo-900 ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Minimal 6 karakter"
                    minLength={6}
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

              <div className="space-y-1.5 pt-2">
                <label className="block text-sm font-bold text-indigo-900 ml-1">Kode Lisensi (License Key)</label>
                <input 
                  type="text"
                  name="licenseCode"
                  placeholder="Contoh: DIVO-A1-XXXXX"
                  className="w-full px-4 py-3 bg-amber-50/50 border-2 border-amber-300 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-amber-50 transition-all text-indigo-950 font-bold placeholder:text-amber-500 uppercase tracking-widest text-center"
                  required
                />
                <p className="text-xs font-semibold text-indigo-400 ml-1 mt-1">Dapatkan kode ini dari guru atau pengurus kelasmu.</p>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="clay-button w-full mt-4 flex justify-center items-center gap-2 text-[1rem] py-[14px]"
              >
                {isLoading ? (
                  <>
                    <IconLoader />
                    Mendaftarkan...
                  </>
                ) : (
                  'Buat Akun Sekarang'
                )}
              </button>
            </form>

            <div className="mt-6 text-center border-t-2 border-indigo-50 pt-5">
              <p className="text-sm font-bold text-indigo-900">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-[#4F46E5] hover:text-indigo-800 underline decoration-2 underline-offset-2 transition-colors">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
