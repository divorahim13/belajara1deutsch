---
name: DeutschPintar Kapitel Standards
description: Standardisasi dan panduan pembuatan konten (Grammatik, Wortschatz, UI, Horen) untuk semua Kapitel di platform DeutschPintar A1/A2.
---

# DeutschPintar Kapitel Standards

Skill ini berisi panduan dan standar wajib yang harus diikuti saat membuat, memperluas, atau mendesain ulang modul pembelajaran (Kapitel) di aplikasi DeutschPintar. Standar ini diciptakan untuk memastikan bahwa materi bahasa Jerman yang disajikan tidak "sekadar lewat", melainkan mendalam, interaktif, secara visual konsisten (Neo-Brutalist), dan sangat membantu untuk persiapan ujian A2.

## 1. Modul Hören (Audio & TTS) - PENGGUNAAN OPENAI API
Semua simulasi audio percakapan pada modul **Hören** di setiap Kapitel (Kapitel 1, 2, 3, dst.) **WAJIB** menggunakan endpoint Text-to-Speech (TTS) bawaan (`/api/tts`) yang ditenagai oleh OpenAI API. 

Jangan menggunakan file `.mp3` statis (kecuali jika disuruh). Gunakan endpoint secara dinamis dengan format percakapan (dialog) yang mendukung pergantian suara berdasarkan gender pembicara (misalnya `onyx` untuk cowok, `nova` untuk cewek). Format penggunaannya di dalam array data latihan adalah sebagai berikut:

```typescript
type DialogueLine = {
  speaker: string; // Misal: "Interviewer", "Vira"
  text: string;    // Teks percakapan bahasa Jerman di sini...
  voice: string;   // Misal: "onyx" (cowok), "nova" (cewek), "alloy" (netral)
};

// Di dalam komponen, panggil API per baris dialog:
// const url = `/api/tts?text=${encodeURIComponent(line.text)}&voice=${line.voice}`;
```

Selain itu, modul Hören **wajib** memiliki:
- **Audio Waveform UI**: Tampilan visual gelombang suara (`progress bar` khusus) saat dimainkan.
- **TranscriptUI**: Teks interaktif yang menggunakan `renderInteractiveText` sehingga kata-katanya dapat di-hover untuk memunculkan kamus. Highlight visual (misal `border-l-4`) harus sinkron dengan baris dialog yang sedang diputar.
- **Keselarasan Kosakata (Wortschatz-Synchronisation)**: Seluruh kosa kata yang digunakan dalam dialog Hören (juga modul Lesen dan Übung) **HARUS** diambil dari materi spesifik yang sedang diajarkan pada Kapitel tersebut. Jangan menggunakan kosa kata dari Kapitel lain secara dominan, pastikan materi baru di Kapitel saat ini selalu ditekankan dan diuji.

## 2. Struktur Data Grammatik (Tata Bahasa)
Setiap kali Anda membuat atau memperbarui objek dalam array `grammatik`, pastikan objek tersebut mengikuti struktur tipe data berikut (semua bahasa pengantar dalam bahasa Indonesia):

```typescript
type GrammatikItem = {
  name: string; // Nama topik, misal 'Das Perfekt'
  farbe: string; // Warna untuk border/header, misal 'indigo', 'orange'
  erklärung: string; // Penjelasan dasar yang mudah dimengerti.
  tiefenErklaerung?: string; // (WAJIB ADA) Penjelasan linguistik mendalam, "mengapa" hal tersebut terjadi.
  struktur?: string; // (WAJIB ADA) Rumus kalimat, misal 'Subjekt + Verb + ...'
  konjugationsTabelle?: { // (OPSIONAL TAPI SANGAT DISARANKAN) Untuk materi kata kerja atau deklinasi.
    headers: string[]; // Contoh: ['Pronomen', 'haben', 'sein']
    rows: string[][]; // Contoh: [['ich', 'habe', 'bin'], ['du', 'hast', 'bist']]
  };
  beispiele: { satz: string; terjemahan: string }[]; // (WAJIB) Minimal 2-3 contoh utama.
  mehrBeispiele?: { satz: string; terjemahan: string }[]; // (WAJIB ADA) Contoh tambahan agar siswa lebih paham.
  falle?: string; // (OPSIONAL TAPI DISARANKAN) Kesalahan umum yang sering dilakukan murid.
};
```

**Aturan Penulisan:**
- **Tiefenerklärung:** Berikan analisis mendalam. Jika membahas *sein/haben* di Perfekt, jelaskan tentang *Ortswechsel* (perpindahan) dan *Zustandsänderung* (perubahan wujud).
- **Mehr Beispiele:** Sediakan setidaknya 4-5 kalimat ekstra dengan variasi subjek dan konteks.

## 3. Struktur Data Kosakata / Game (Khususnya Kata Kerja)
Ketika menyajikan daftar kata kerja (seperti *Partizip II* atau *Präteritum*), Anda harus menyertakan **semua bentuk konjugasi** agar siswa tidak hanya sekadar hafal artinya, namun juga tahu bagaimana menggunakannya dalam kalimat nyata.

```typescript
type VerbItem = {
  infinitiv: string;
  partizip: string; // (atau bentuk past tense lainnya)
  hilfsverb: 'haben' | 'sein';
  id: string; // Arti bahasa Indonesia
  beispiel: string; // Contoh kalimat bahasa Jerman yang natural
  praesens: [string, string, string, string, string, string]; // Konjugasi Präsens lengkap secara urut: [ich, du, er/sie/es, wir, ihr, sie/Sie]
}
```

## 4. Rendering Antarmuka (UI/UX)
Kita menggunakan **Neo-Brutalist styling**. Aturan UI:
1. **Clay Cards:** Komponen dibalut dengan card tebal. Class utilitas: `clay-card p-6 border-4 shadow-[4px_4px_0_0_rgba(...)]`.
2. **Interactive Toggles:** Gunakan `useState` untuk merender secara kondisional bagian yang terlalu panjang seperti `tiefenErklaerung` atau `mehrBeispiele` agar antarmuka tidak sesak (contoh: tombol *Lihat Lebih Banyak Contoh ▼*).
3. **Tabel (KonjugationsTabelle):** Render tabel menggunakan tag `<table>`, pastikan kontainer memiliki `overflow-x-auto` agar responsif di HP. Beri warna latar pada `<thead>` dan berikan `border-b` pada baris isi.
4. **Game Feedback:** Saat murid menjawab kuis (benar/salah), **selalu tampilkan informasi ekstra**. Jangan hanya "Benar/Salah", melainkan render:
   - Kalimat contoh (`beispiel`)
   - Tabel konjugasi (`praesens` di-map ke tabel grid kecil)

## 5. Pola Implementasi Komponen
Gunakan komponen `GrammatikKarte` sebagai standar perenderan materi tata bahasa. Pastikan komponen ini fleksibel menerima `item` dengan atribut baru.

Contoh pola untuk merender tabel:
```tsx
{item.konjugationsTabelle && (
  <div className="mt-6 overflow-x-auto rounded-xl border-2 border-slate-700">
    <table className="w-full text-left text-sm md:text-base border-collapse bg-white">
      <thead className={`bg-${item.farbe}-200 text-${item.farbe}-900`}>
        <tr>
          {item.konjugationsTabelle.headers.map((h, i) => (
            <th key={i} className="p-3 border-b-2 border-slate-700 font-black">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {item.konjugationsTabelle.rows.map((row, i) => (
          <tr key={i} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="p-3">
                {j === 0 ? <strong>{cell}</strong> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
```

**Kesimpulan:** 
Dengan standar ini, setiap kapitel baru (Kapitel 3, 4, dst) akan memiliki tingkat kedalaman dan kejelasan yang identik, serta modul audio otomatis menggunakan API, menjadikan DeutschPintar aplikasi yang komprehensif, menyenangkan, dan efektif untuk belajar bahasa Jerman.
