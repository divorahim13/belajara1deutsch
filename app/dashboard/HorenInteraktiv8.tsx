"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
  "lernprobleme": { meaning: "masalah belajar", type: "Kata Benda" },
  "schlafen": { meaning: "tidur", type: "Kata Kerja" },
  "prüfung": { meaning: "ujian", type: "Kata Benda" },
  "nervös": { meaning: "gugup", type: "Kata Sifat" },
  "spät": { meaning: "terlambat", type: "Kata Sifat" },
  "zeit": { meaning: "waktu", type: "Kata Benda" },
  "vergesse": { meaning: "lupa", type: "Kata Kerja" },
  "konzentrieren": { meaning: "berkonsentrasi", type: "Kata Kerja" },
  "handy": { meaning: "ponsel", type: "Kata Benda" },
  "zeitplan": { meaning: "jadwal/rencana", type: "Kata Benda" },
  "pausen": { meaning: "jeda istirahat", type: "Kata Benda" },
  "einplanen": { meaning: "merencanakan", type: "Kata Kerja" },
  "ausschalten": { meaning: "mematikan", type: "Kata Kerja" },
  "thema": { meaning: "topik", type: "Kata Benda" },
  "projekt": { meaning: "proyek", type: "Kata Benda" },
  "gewählt": { meaning: "memilih", type: "Kata Kerja" },
  "wichtig": { meaning: "penting", type: "Kata Sifat" },
  "idee": { meaning: "ide", type: "Kata Benda" },
  "freiwilligen": { meaning: "para relawan", type: "Kata Benda" },
  "kindern": { meaning: "anak-anak", type: "Kata Benda" },
  "jugendlichen": { meaning: "remaja", type: "Kata Benda" },
  "helfen": { meaning: "membantu", type: "Kata Kerja" },
  "lehrenden": { meaning: "para pengajar", type: "Kata Benda" },
  "zusammen": { meaning: "bersama-sama", type: "Kata Keterangan" }
};

export function HorenInteraktiv8() {
  return <HorenInteraktivTemplate kapitelId={8} dictionary={dictionary} />;
}

export default HorenInteraktiv8;
