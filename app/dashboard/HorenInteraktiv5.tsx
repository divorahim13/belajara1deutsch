"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
    // H1: Vorstellungsgespräch im Hotel
    "vorstellungsgespräch": { meaning: "wawancara kerja", type: "Kata Benda" },
    "hotel": { meaning: "hotel", type: "Kata Benda" },
    "lebenslauf": { meaning: "CV / riwayat hidup", type: "Kata Benda" },
    "erfahrung": { meaning: "pengalaman", type: "Kata Benda" },
    "bewerben": { meaning: "melamar", type: "Kata Kerja" },
    "ausland": { meaning: "luar negeri", type: "Kata Benda" },
    "teilzeit": { meaning: "paruh waktu", type: "Kata Benda" },
    "vollzeit": { meaning: "penuh waktu", type: "Kata Benda" },
    
    // H2: Ein Job für Max
    "job": { meaning: "pekerjaan", type: "Kata Benda" },
    "stellenanzeige": { meaning: "lowongan kerja", type: "Kata Benda" },
    "verdienen": { meaning: "menghasilkan (uang)", type: "Kata Kerja" },
    "lohn": { meaning: "upah / gaji", type: "Kata Benda" },
    "bewerbung": { meaning: "lamaran (pekerjaan)", type: "Kata Benda" },
    "gehalt": { meaning: "gaji", type: "Kata Benda" },
    "kollegen": { meaning: "rekan kerja", type: "Kata Benda" },

    // H3: Auf der Bank
    "konto": { meaning: "rekening", type: "Kata Benda" },
    "eröffnen": { meaning: "membuka", type: "Kata Kerja" },
    "bankkarte": { meaning: "kartu bank / ATM", type: "Kata Benda" },
    "geheimzahl": { meaning: "PIN / angka rahasia", type: "Kata Benda" },
    "überweisen": { meaning: "mentransfer", type: "Kata Kerja" },
    "abheben": { meaning: "menarik uang", type: "Kata Kerja" },
    "einzahlen": { meaning: "menyetorkan uang", type: "Kata Kerja" },
    "unterschreiben": { meaning: "menandatangani", type: "Kata Kerja" },
    "formular": { meaning: "formulir", type: "Kata Benda" },

    // H4: Auf der Behörde
    "behörde": { meaning: "instansi pemerintah", type: "Kata Benda" },
    "amt": { meaning: "kantor dinas", type: "Kata Benda" },
    "meldebescheinigung": { meaning: "keterangan domisili", type: "Kata Benda" },
    "ausfüllen": { meaning: "mengisi", type: "Kata Kerja" },
    "pass": { meaning: "paspor", type: "Kata Benda" },
    "verlängern": { meaning: "memperpanjang", type: "Kata Kerja" },
    "wartezeit": { meaning: "waktu tunggu", type: "Kata Benda" },
    "nummer": { meaning: "nomor antrean", type: "Kata Benda" },
    "ziehen": { meaning: "mengambil / menarik", type: "Kata Kerja" },

    // H5: Bei der Polizei
    "polizei": { meaning: "polisi", type: "Kata Benda" },
    "diebstahl": { meaning: "pencurian", type: "Kata Benda" },
    "anzeigen": { meaning: "melaporkan ke polisi", type: "Kata Kerja" },
    "gestohlen": { meaning: "dicuri (Partizip II)", type: "Kata Kerja" },
    "portemonnaie": { meaning: "dompet", type: "Kata Benda" },
    "ausweis": { meaning: "kartu identitas", type: "Kata Benda" },
    "sperren": { meaning: "memblokir", type: "Kata Kerja" },
    "protokoll": { meaning: "berita acara", type: "Kata Benda" },

    // H6: Höfliche Bitten im Büro
    "höflich": { meaning: "sopan", type: "Kata Sifat" },
    "bitte": { meaning: "permintaan / tolong", type: "Kata Benda / Adverbia" },
    "büro": { meaning: "kantor", type: "Kata Benda" },
    "kopieren": { meaning: "menyalin / fotokopi", type: "Kata Kerja" },
    "fenster": { meaning: "jendela", type: "Kata Benda" },
    "schließen": { meaning: "menutup", type: "Kata Kerja" },
    "könnten": { meaning: "bisakah (Konjunktiv II)", type: "Kata Kerja" },
    "helfen": { meaning: "membantu", type: "Kata Kerja" },

    // H7: Interview: Stadt oder Land?
    "stadt": { meaning: "kota", type: "Kata Benda" },
    "land": { meaning: "desa / pedesaan", type: "Kata Benda" },
    "zentrum": { meaning: "pusat", type: "Kata Benda" },
    "ruhig": { meaning: "tenang", type: "Kata Sifat" },
    "laut": { meaning: "berisik", type: "Kata Sifat" },
    "verkehr": { meaning: "lalu lintas", type: "Kata Benda" },
    "luft": { meaning: "udara", type: "Kata Benda" },
    "natur": { meaning: "alam", type: "Kata Benda" },
    "vorteile": { meaning: "keuntungan", type: "Kata Benda" },
    "nachteile": { meaning: "kerugian", type: "Kata Benda" }
};

export function HorenInteraktiv5() {
  return <HorenInteraktivTemplate kapitelId={5} dictionary={dictionary} />;
}

export default HorenInteraktiv5;
