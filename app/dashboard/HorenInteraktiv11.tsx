"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
  "unterwegs": { meaning: "dalam perjalanan/bepergian", type: "Adverbia" },
  "konzerten": { meaning: "konser", type: "Kata Benda" },
  "verreist": { meaning: "bepergian", type: "Kata Kerja (Partizip II)" },
  "verbracht": { meaning: "menghabiskan waktu", type: "Kata Kerja (Partizip II)" },
  "gearbeitet": { meaning: "bekerja", type: "Kata Kerja (Partizip II)" },
  "krankenschwester": { meaning: "perawat", type: "Kata Benda" },
  "hobbys": { meaning: "hobi", type: "Kata Benda" },
  "büro": { meaning: "kantor", type: "Kata Benda" },
  "urlaub": { meaning: "liburan", type: "Kata Benda" },
  "stau": { meaning: "kemacetan", type: "Kata Benda" },
  "diskutieren": { meaning: "berdiskusi", type: "Kata Kerja" },
  "fristen": { meaning: "tenggat waktu", type: "Kata Benda" },
  "eng": { meaning: "sempit/ketat", type: "Kata Sifat" },
  "chef": { meaning: "bos", type: "Kata Benda" },
  "klingelt": { meaning: "berdering", type: "Kata Kerja" },
  "ausruhen": { meaning: "beristirahat", type: "Kata Kerja" },
  "rücken": { meaning: "punggung", type: "Kata Benda" },
  "weh": { meaning: "sakit", type: "Kata Sifat" },
  "geld": { meaning: "uang", type: "Kata Benda" },
  "gold": { meaning: "emas", type: "Kata Benda" },
  "mund": { meaning: "mulut", type: "Kata Benda" },
  "rat": { meaning: "nasihat/solusi", type: "Kata Benda" },
  "heilt": { meaning: "menyembuhkan", type: "Kata Kerja" },
  "wunden": { meaning: "luka", type: "Kata Benda" },
  "ding": { meaning: "benda/hal", type: "Kata Benda" },
  "weile": { meaning: "waktu/sementara", type: "Kata Benda" },
  "besorgen": { meaning: "mengurus/melakukan", type: "Kata Kerja" },
  "verschiebe": { meaning: "menunda", type: "Kata Kerja" }
};

export function HorenInteraktiv11() {
  return <HorenInteraktivTemplate kapitelId={11} dictionary={dictionary} />;
}

export default HorenInteraktiv11;
