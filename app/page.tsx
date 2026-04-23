'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ─────────────────────────────────────────────────────────
   INLINE SVG ICONS  (Carbon UI set – no emoji, no external lib)
───────────────────────────────────────────────────────── */
const IconBook = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M28 5H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M4 7h11v18H4Zm13 18V7h11v18Z"/>
    <path d="M19 10h7v2h-7zm0 5h7v2h-7zm0 5h7v2h-7zM6 10h7v2H6zm0 5h7v2H6zm0 5h7v2H6z"/>
  </svg>
);
const IconAI = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16 25a6.99 6.99 0 0 1-5.833-3.129l1.666-1.107a5 5 0 0 0 8.334 0l1.666 1.107A6.99 6.99 0 0 1 16 25m4-11a2 2 0 1 0 2 2a1.98 1.98 0 0 0-2-2m-8 0a2 2 0 1 0 2 2a1.98 1.98 0 0 0-2-2"/>
    <path d="M30 16v-2h-2v-4a4 4 0 0 0-4-4h-2V2h-2v4h-8V2h-2v4H8a4 4 0 0 0-4 4v4H2v2h2v5H2v2h2v3a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-3h2v-2h-2v-5Zm-4 10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2Z"/>
  </svg>
);
const IconShield = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M14 16.59L11.41 14L10 15.41l4 4l8-8L20.59 10z"/>
    <path d="m16 30l-6.176-3.293A10.98 10.98 0 0 1 4 17V4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v13a10.98 10.98 0 0 1-5.824 9.707ZM6 4v13a8.99 8.99 0 0 0 4.766 7.942L16 27.733l5.234-2.79A8.99 8.99 0 0 0 26 17V4Z"/>
  </svg>
);
const IconChart = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="m4.67 28l6.39-12l7.3 6.49a2 2 0 0 0 1.7.47a2 2 0 0 0 1.42-1.07L27 10.9l-1.82-.9l-5.49 11l-7.3-6.49a2 2 0 0 0-1.68-.51a2 2 0 0 0-1.42 1L4 25V2H2v26a2 2 0 0 0 2 2h26v-2Z"/>
  </svg>
);
const IconEnterprise = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 8h2v4H8zm0 6h2v4H8zm6-6h2v4h-2zm0 6h2v4h-2zm-6 6h2v4H8zm6 0h2v4h-2z"/>
    <path d="M30 14a2 2 0 0 0-2-2h-6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v26h28ZM4 4h16v24H4Zm18 24V14h6v14Z"/>
  </svg>
);
const IconCheck = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="m14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415z"/>
    <path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12"/>
  </svg>
);
const IconArrowRight = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 16L12 26l-1.4-1.4l8.6-8.6l-8.6-8.6L12 6z"/>
  </svg>
);
const IconUsers = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M26 30h-2v-3a5.006 5.006 0 0 0-5-5h-6a5.006 5.006 0 0 0-5 5v3H6v-3a7.01 7.01 0 0 1 7-7h6a7.01 7.01 0 0 1 7 7Z"/>
    <path d="M4 2v2h5v7a7 7 0 0 0 14 0V4h5V2Zm7 2h10v3H11Zm5 12a5 5 0 0 1-5-5V9h10v2a5 5 0 0 1-5 5"/>
  </svg>
);
const IconStar = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16 2l-4 10H2l9 6.6L7.6 30L16 24l8.4 6L21 18.6L30 12H20z"/>
  </svg>
);
const IconMenu = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4 6h24v2H4zm0 12h24v2H4zm0 12h24v2H4z"/>
  </svg>
);
const IconClose = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6z"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <IconAI className="w-7 h-7" />,
    color: 'text-indigo-900 bg-indigo-200 border-2 border-[#312E81]',
    cardBg: 'bg-[#FFF4E0]',
    title: 'Evaluasi AI Otomatis',
    desc: 'Koreksi instan latihan Schreiben dan Grammatik berbasis GPT-4o. Murid mendapat umpan-balik detil — tanpa menunggu guru.',
    mockup: (
      <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-300 rounded-full border-[3px] border-[#312E81] flex items-center justify-center rotate-12 shadow-[3px_3px_0px_#312E81] animate-pulse">
        <span className="text-lg">✨</span>
      </div>
    )
  },
  {
    icon: <IconShield className="w-7 h-7" />,
    color: 'text-emerald-900 bg-emerald-300 border-2 border-[#312E81]',
    cardBg: 'bg-[#E1FDE4]',
    title: 'Proteksi Hak Akses',
    desc: 'Sistem expiry per batch (4 bulan), 1 akun = 1 perangkat. Aset bank soal lembaga terlindungi sepenuhnya dari sharing akun.',
    mockup: (
      <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-400 rounded-xl border-[3px] border-[#312E81] flex items-center justify-center -rotate-6 shadow-[3px_3px_0px_#312E81]">
        <span className="text-lg">🔒</span>
      </div>
    )
  },
  {
    icon: <IconChart className="w-7 h-7" />,
    color: 'text-violet-900 bg-violet-300 border-2 border-[#312E81]',
    cardBg: 'bg-[#F3E8FF]',
    title: 'Analitik Progres Murid',
    desc: 'Dashboard real-time menampilkan persentase penyelesaian dan skor per murid — sehingga guru fokus hanya di area yang butuh intervensi.',
    mockup: (
      <div className="absolute bottom-5 right-5 flex items-end gap-1">
        <div className="w-3 h-5 bg-violet-300 border-[2px] border-[#312E81] rounded-t-sm" />
        <div className="w-3 h-9 bg-[#312E81] rounded-t-sm" />
        <div className="w-3 h-6 bg-violet-400 border-[2px] border-[#312E81] rounded-t-sm" />
      </div>
    )
  },
  {
    icon: <IconEnterprise className="w-7 h-7" />,
    color: 'text-amber-900 bg-amber-300 border-2 border-[#312E81]',
    cardBg: 'bg-[#FFE4E6]',
    title: 'Admin Panel Mandiri',
    desc: 'Staf kursus bisa mengelola pendaftaran batch, menerbitkan kode akses, dan memutar modul baru tanpa harus menghubungi developer.',
    mockup: (
      <div className="absolute top-4 right-4 w-14 h-9 bg-white border-[3px] border-[#312E81] rounded-lg shadow-[3px_3px_0px_#312E81] flex items-center px-2 gap-1.5">
        <div className="w-2.5 h-2.5 bg-red-400 rounded-full border border-[#312E81]" />
        <div className="flex-1 h-2 bg-amber-200 border border-[#312E81] rounded-full" />
      </div>
    )
  },
  {
    icon: <IconBook className="w-7 h-7" />,
    color: 'text-rose-900 bg-rose-300 border-2 border-[#312E81]',
    cardBg: 'bg-[#E0F2FE]',
    title: 'Kurikulum A1-B1',
    desc: 'Materi selaras peta standar Goethe-Institut: Wortschatz, Grammatik, Hören, Schreiben — per kapitel dan per level.',
    mockup: (
      <div className="absolute bottom-5 right-5 w-11 h-14 bg-sky-300 border-[3px] border-[#312E81] rounded-t-lg shadow-[3px_3px_0px_#312E81] flex flex-col justify-start p-2 gap-1.5">
        <div className="h-1.5 bg-white rounded-full border border-[#312E81]"/>
        <div className="h-1.5 w-2/3 bg-indigo-200 rounded-full border border-[#312E81]"/>
      </div>
    )
  },
  {
    icon: <IconUsers className="w-7 h-7" />,
    color: 'text-sky-900 bg-sky-300 border-2 border-[#312E81]',
    cardBg: 'bg-[#F1F5F9]',
    title: 'Live Kuis Interaktif',
    desc: 'Guru generate soal Kahoot-style menggunakan AI langsung di kelas. Murid menjawab real-time di ponsel masing-masing.',
    mockup: (
      <div className="absolute top-4 right-4 w-12 h-12 bg-orange-100 border-[3px] border-[#312E81] rounded-full shadow-[3px_3px_0px_#312E81] flex items-center justify-center">
        <span className="text-lg">🔥</span>
      </div>
    )
  },
];

const TESTIMONIALS = [
  {
    name: 'Andini Putri',
    role: 'Direktur Akademik – Kursus Makna',
    text: 'Evaluasi AI-nya benar-benar menghemat waktu pengajar kami. Murid juga jadi lebih aktif berlatih karena umpan-balik langsung tersedia.',
    rating: 5,
  },
  {
    name: 'Bima Prasetya',
    role: 'Pengajar Bahasa Jerman – Level A2',
    text: 'Dashboard progres per murid itu sangat membantu perencanaan kelas. Saya bisa langsung identifikasi siapa yang perlu remedial.',
    rating: 5,
  },
  {
    name: 'Citra Handayani',
    role: 'Murid – Persiapan Goethe B1',
    text: 'Platform-nya terasa seperti punya guru privat 24 jam. Koreksi tulisan saya langsung muncul dan penjelasannya sangat mudah dipahami.',
    rating: 5,
  },
];

const ROLES = [
  {
    label: 'Guru / Pengajar',
    points: ['Dashboard murid real-time', 'Otomatisasi evaluasi tugas', 'Kuis live berbasis AI'],
  },
  {
    label: 'Murid',
    points: ['Latihan mandiri kapan saja', 'Umpan-balik instan setiap soal', 'Progres visual yang memotivasi'],
  },
  {
    label: 'Pengelola Kursus',
    points: ['Kelola batch tanpa developer', 'Proteksi konten & anti-sharing', 'Lisensi transparan per murid'],
  },
];

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(0);

  return (
    <div
      className="min-h-screen overflow-x-hidden text-[#312E81] selection:bg-indigo-200"
      style={{ background: '#EEF2FF', fontFamily: 'var(--font-jakarta, Plus Jakarta Sans, sans-serif)' }}
    >

      {/* ── FLOATING NAVBAR ── */}
      <header
        className="fixed top-4 left-4 right-4 z-50 rounded-2xl border-[3px] border-[#1E1B4B] shadow-[6px_6px_0px_#1E1B4B] bg-white transition-all"
      >
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <IconBook className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#312E81] text-base leading-none">
              Deutsch<span className="text-indigo-700">Pintar</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-indigo-700">
            <a href="#solusi" className="hover:text-indigo-900 transition-colors duration-200 cursor-pointer">Solusi</a>
            <a href="#fitur" className="hover:text-indigo-900 transition-colors duration-200 cursor-pointer">Fitur</a>
            <a href="#testimoni" className="hover:text-indigo-900 transition-colors duration-200 cursor-pointer">Testimoni</a>
            <a href="#pricing" className="hover:text-indigo-900 transition-colors duration-200 cursor-pointer">Harga</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden md:inline-flex text-sm font-medium text-indigo-700 hover:text-indigo-900 transition-colors duration-200 cursor-pointer"
            >
              Demo
            </Link>
            <button className="px-4 py-2 text-sm font-black rounded-xl bg-[#FFD800] text-[#1E1B4B] border-[3px] border-[#1E1B4B] shadow-[4px_4px_0px_#1E1B4B] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#1E1B4B] transition-all cursor-pointer">
              Hubungi Kami
            </button>
            {/* Mobile toggle */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-indigo-50 transition-colors duration-200 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <IconClose className="w-5 h-5 text-indigo-700" /> : <IconMenu className="w-5 h-5 text-indigo-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden px-5 pb-4 pt-2 flex flex-col gap-3 border-t border-indigo-100/50">
            {['#solusi', '#fitur', '#testimoni', '#pricing'].map((href) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-indigo-800 hover:text-indigo-600 transition-colors cursor-pointer py-1"
                onClick={() => setMobileOpen(false)}
              >
                {href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1)}
              </a>
            ))}
            <Link href="/dashboard" className="text-sm font-medium text-indigo-600 cursor-pointer py-1">Demo Platform</Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="pt-36 pb-24 px-4 relative overflow-visible">
        {/* Blob container – totally unclipped so blur radiates out naturally */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-400/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-400/30 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-[3px] border-[#1E1B4B] shadow-[4px_4px_0px_#1E1B4B] text-[#1E1B4B] text-xs font-black uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Platform B2B Bahasa Jerman
              </div>

              <h1 className="text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-6 text-[#1E1B4B]">
                Tingkatkan Kelulusan{' '}
                <span className="relative inline-block px-3 py-1 mt-2">
                  <span className="relative z-10 text-[#1E1B4B]">Goethe-Zertifikat</span>
                  <span className="absolute inset-0 bg-[#FF90E8] border-[3px] border-[#1E1B4B] shadow-[4px_4px_0px_#1E1B4B] -rotate-2 -z-0 rounded-2xl" />
                </span>{' '}
                Murid Anda.
              </h1>

              <p className="text-lg text-indigo-800 leading-relaxed mb-10 max-w-lg font-medium">
                LMS terspesialisasi dengan AI Evaluator, analitik progres murid real-time, dan sistem kuis interaktif—dirancang eksklusif untuk institusi bahasa Jerman.
              </p>

              {/* CTA group */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FFD800] text-[#1E1B4B] font-black rounded-xl border-[3px] border-[#1E1B4B] shadow-[6px_6px_0px_#1E1B4B] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#1E1B4B] transition-all text-base cursor-pointer"
                >
                  Coba Demo Platform
                  <IconArrowRight className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#1E1B4B] font-black rounded-xl border-[3px] border-[#1E1B4B] shadow-[6px_6px_0px_#1E1B4B] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#1E1B4B] transition-all cursor-pointer text-base">
                  Jadwalkan Konsultasi
                </button>
              </div>

              {/* Social proof numbers */}
              <div className="mt-10 flex items-center gap-8">
                {[
                  { value: 'A1-B1', label: 'Kurikulum Lengkap' },
                  { value: '< 2 rb', label: 'Rp per koreksi AI' },
                  { value: '99.9%', label: 'Uptime SLA' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-extrabold text-indigo-800">{s.value}</div>
                    <div className="text-xs text-indigo-700 font-bold mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: UI Mock */}
            <div className="relative">
              <div className="rounded-2xl border-4 border-[#1E1B4B] bg-white shadow-[8px_8px_0px_#1E1B4B] overflow-hidden rotate-[-1deg]">
                {/* Fake browser bar */}
                <div className="h-10 bg-white border-b-4 border-[#1E1B4B] flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <div className="flex-1 mx-4 h-5 rounded-md bg-indigo-100 max-w-xs text-xs text-indigo-800 flex items-center px-3 font-mono font-bold">
                    deutschpintar.id/dashboard
                  </div>
                </div>
                {/* Dashboard body mock */}
                <div className="p-5 bg-[#F8F7FF] flex gap-4" style={{ minHeight: 320 }}>
                  {/* Sidebar */}
                  <div className="w-40 flex flex-col gap-2 shrink-0">
                    <div className="h-8 bg-indigo-600 rounded-lg w-full" />
                    {['h-8 bg-indigo-100', 'h-8 bg-indigo-100', 'h-8 bg-indigo-100'].map((cls, i) => (
                      <div key={i} className={`${cls} rounded-lg`} />
                    ))}
                    <div className="mt-auto h-20 rounded-xl border border-emerald-200 bg-emerald-50 p-3 flex flex-col gap-2">
                      <div className="h-2.5 w-16 bg-emerald-300 rounded" />
                      <div className="h-2 w-full bg-emerald-100 rounded" />
                      <div className="h-2 w-3/4 bg-emerald-100 rounded" />
                    </div>
                  </div>
                  {/* Content area */}
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex gap-3">
                      {['bg-indigo-600 text-white', 'bg-white border border-indigo-100', 'bg-white border border-indigo-100'].map((cls, i) => (
                        <div key={i} className={`flex-1 rounded-xl p-3 ${cls}`}>
                          <div className={`h-2 w-10 rounded mb-2 ${i === 0 ? 'bg-white/40' : 'bg-indigo-100'}`} />
                          <div className={`text-lg font-bold ${i === 0 ? 'text-white' : 'text-indigo-800'}`}>
                            {i === 0 ? '87%' : i === 1 ? '24' : '4.8'}
                          </div>
                          <div className={`h-1.5 w-16 rounded mt-1 ${i === 0 ? 'bg-white/20' : 'bg-indigo-50'}`} />
                        </div>
                      ))}
                    </div>
                    <div className="bg-white rounded-xl border border-indigo-100 p-4 flex-1">
                      <div className="h-2.5 w-28 bg-indigo-100 rounded mb-4" />
                      {[65, 80, 45, 90].map((w, i) => (
                        <div key={i} className="flex items-center gap-3 mb-3">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 shrink-0" />
                          <div className="flex-1">
                            <div className="h-2 bg-indigo-50 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${w}%` }} />
                            </div>
                          </div>
                          <div className="text-xs font-black text-indigo-800 w-8 text-right">{w}%</div>
                        </div>
                      ))}
                    </div>
                    {/* AI badge */}
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-xs font-black text-emerald-800">Evaluasi AI Aktif · 3 jawaban baru sedang diproses</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating notification – positioned INSIDE the card, no negative offsets */}
              <div className="absolute bottom-10 left-2 bg-[#E1FDE4] rounded-2xl border-[3px] border-[#1E1B4B] shadow-[4px_4px_0px_#1E1B4B] px-4 py-3 flex items-center gap-3 -rotate-3 hover:rotate-0 transition-transform cursor-default">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 border-2 border-[#1E1B4B]">
                  <IconAI className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1E1B4B]">Koreksi Selesai</div>
                  <div className="text-[11px] text-indigo-700 font-bold">Schreiben Kapitel 3 · 2 detik lalu</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SOLUTIONS BY ROLE (Tab-switch) ── */}
      <section id="solusi" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-700 text-sm font-black uppercase tracking-widest mb-3">Dirancang untuk semua pihak</p>
            <h2 className="text-4xl font-extrabold text-[#1E1B4B] leading-tight">
              Solusi yang tepat untuk setiap peran
            </h2>
          </div>

          {/* Role tabs */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {ROLES.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setActiveRole(i)}
                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-200 cursor-pointer border-[3px] border-[#1E1B4B] ${
                  activeRole === i
                    ? 'bg-[#FFD800] text-[#1E1B4B] shadow-[2px_2px_0px_#1E1B4B] translate-y-1 translate-x-1'
                    : 'bg-white text-[#1E1B4B] shadow-[4px_4px_0px_#1E1B4B] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#1E1B4B]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Role points */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-4 border-[#1E1B4B] p-8 shadow-[8px_8px_0px_#1E1B4B]">
            <p className="text-xl font-black text-[#1E1B4B] mb-6">{ROLES[activeRole].label}</p>
            <ul className="flex flex-col gap-4">
              {ROLES[activeRole].points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <IconCheck className="w-4 h-4 text-emerald-600" />
                  </span>
                  <span className="text-indigo-800 font-medium">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="fitur" className="py-24 px-4 bg-white relative">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#312E81 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-indigo-700 text-sm font-black uppercase tracking-widest mb-3">Infrastruktur kelas enterprise</p>
            <h2 className="text-4xl font-extrabold text-[#1E1B4B]">Semua yang dibutuhkan, sudah tersedia</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`group relative p-8 rounded-[2rem] border-[3px] border-[#312E81] ${f.cardBg} shadow-[6px_6px_0px_#312E81] hover:shadow-[2px_2px_0px_#312E81] hover:translate-y-1 hover:translate-x-1 transition-all duration-200 cursor-default overflow-hidden`}
              >
                {/* Comic Mockup / Decorative Bubble Element */}
                {f.mockup}
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-[3px_3px_0px_#312E81] ${f.color}`}>
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#1E1B4B] mb-3">{f.title}</h3>
                  <p className="text-sm text-indigo-800 leading-relaxed font-bold">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimoni" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-700 text-sm font-black uppercase tracking-widest mb-3">Dari pengguna nyata</p>
            <h2 className="text-4xl font-extrabold text-[#1E1B4B]">Dipercaya komunitas pengajar</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-[#E0F2FE] rounded-[2rem] border-[3px] border-[#1E1B4B] p-7 shadow-[6px_6px_0px_#1E1B4B] flex flex-col justify-between hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#1E1B4B] transition-all"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <IconStar key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>
                <p className="text-indigo-900 leading-relaxed font-bold mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="text-sm font-black text-[#1E1B4B]">{t.name}</div>
                  <div className="text-xs text-indigo-800 font-bold mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING / CTA ── */}
      <section id="pricing" className="py-24 px-4 bg-[#FF90E8] text-[#1E1B4B] relative border-y-4 border-[#1E1B4B]">
        {/* Decorative pattern & blur blobs */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E1B4B 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-white/40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <p className="text-indigo-900 text-sm font-black uppercase tracking-widest mb-4">Model Lisensi B2B</p>
              <h2 className="text-4xl font-black leading-tight mb-6 text-[#1E1B4B]">
                Bayar sekali. Akses satu batch. Tanpa langganan tersembunyi.
              </h2>
              <p className="text-[#1E1B4B] font-bold leading-relaxed mb-8">
                Skema <strong className="text-white bg-[#1E1B4B] px-2 py-1 mx-1 border-2 border-[#1E1B4B] rounded shadow-[2px_2px_0px_#1E1B4B]">Buy-Out per Batch/Level</strong> memberikan biaya prediktabel bagi lembaga kursus dan margin keuntungan yang sehat. Tidak ada biaya bulanan, tidak ada kejutan tagihan.
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  'Rp 70.000 – 150.000 per murid per level',
                  'Dashboard admin mandiri tanpa developer',
                  'Garansi uptime & dukungan teknis prioritas',
                  'Demo gratis sebelum kontrak',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#1E1B4B] font-black">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-[#1E1B4B] flex items-center justify-center shrink-0">
                      <IconCheck className="w-4 h-4 text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Contact card */}
            <div className="bg-white border-[3px] border-[#1E1B4B] rounded-[2rem] p-8 shadow-[8px_8px_0px_#1E1B4B] rotate-2 transition-transform hover:rotate-0">
              <div className="flex items-center gap-2 mb-2">
                <IconEnterprise className="w-5 h-5 text-indigo-700" />
                <span className="text-indigo-700 text-sm font-black uppercase tracking-wider">Lisensi Institusi</span>
              </div>
              <div className="text-4xl font-black text-[#1E1B4B] mb-1">Kontrak Partner</div>
              <p className="text-indigo-800 text-sm font-bold mb-8 pb-8 border-b-[3px] border-indigo-200">
                Disesuaikan berdasarkan jumlah murid, level, dan durasi program kursus Anda.
              </p>

              <div className="flex flex-col gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Nama lembaga"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F8F7FF] border-[3px] border-[#1E1B4B] text-[#1E1B4B] font-bold placeholder-indigo-400 focus:outline-none focus:shadow-[4px_4px_0px_#1E1B4B] transition-all"
                />
                <input
                  type="email"
                  placeholder="Email PIC / koordinator"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F8F7FF] border-[3px] border-[#1E1B4B] text-[#1E1B4B] font-bold placeholder-indigo-400 focus:outline-none focus:shadow-[4px_4px_0px_#1E1B4B] transition-all"
                />
              </div>

              <button className="w-full py-4 bg-emerald-400 border-[3px] border-[#1E1B4B] hover:translate-y-1 hover:translate-x-1 shadow-[4px_4px_0px_#1E1B4B] hover:shadow-[2px_2px_0px_#1E1B4B] text-[#1E1B4B] font-black rounded-xl transition-all cursor-pointer mb-3">
                Minta Penawaran Sekarang
              </button>
              <button className="w-full py-3.5 bg-white border-[3px] border-[#1E1B4B] hover:translate-y-1 hover:translate-x-1 shadow-[4px_4px_0px_#1E1B4B] hover:shadow-[2px_2px_0px_#1E1B4B] text-[#1E1B4B] font-black rounded-xl transition-all cursor-pointer text-sm">
                Jadwalkan Demo Gratis
              </button>

              <p className="text-center text-xs font-bold text-indigo-700 mt-5">Respon dalam 1×24 jam hari kerja</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ── */}
      <section className="py-16 px-4 bg-[#FFD800] text-[#1E1B4B] text-center">
        <h2 className="text-2xl md:text-3xl font-black mb-4">Siap mengubah kelas bahasa Jerman Anda?</h2>
        <p className="text-[#1E1B4B] font-bold mb-8 max-w-xl mx-auto">Coba portal murid gratis sekarang. Tidak perlu daftar, tidak perlu kartu kredit.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E1B4B] font-black rounded-xl border-[3px] border-[#1E1B4B] shadow-[6px_6px_0px_#1E1B4B] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#1E1B4B] transition-all cursor-pointer"
        >
          Buka Demo Platform
          <IconArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1E1B4B] py-10 px-4 border-t-[3px] border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
              <IconBook className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white">DeutschPintar</span>
          </div>
          <p className="text-xs text-indigo-100 font-medium">© {new Date().getFullYear()} DeutschPintar. Hak Cipta Dilindungi. Dibuat oleh Cipta Web.</p>
          <p className="text-xs text-indigo-100">Powered by Vercel · Supabase · GPT-4o</p>
        </div>
      </footer>
    </div>
  );
}
