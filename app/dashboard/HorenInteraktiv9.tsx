"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
  "sportmotive": { meaning: "alasan berolahraga", type: "Kata Benda" },
  "bewegen": { meaning: "bergerak", type: "Kata Kerja" },
  "teilnehmen": { meaning: "mengikuti / ikut serta", type: "Kata Kerja" },
  "wettbewerben": { meaning: "kompetisi", type: "Kata Benda" },
  "medaillen": { meaning: "medali-medali", type: "Kata Benda" },
  "gesundheit": { meaning: "kesehatan", type: "Kata Benda" },
  "entspannen": { meaning: "bersantai", type: "Kata Kerja" },
  "grenzen": { meaning: "batas-batas", type: "Kata Benda" },
  "kennenlernen": { meaning: "mengenal", type: "Kata Kerja" },
  "team": { meaning: "tim", type: "Kata Benda" },
  "spielen": { meaning: "bermain", type: "Kata Kerja" },
  "vorschlag": { meaning: "usulan", type: "Kata Benda" },
  "klettern": { meaning: "memanjat", type: "Kata Kerja" },
  "zustimmen": { meaning: "menyetujui", type: "Kata Kerja" },
  "ablehnen": { meaning: "menolak", type: "Kata Kerja" },
  "verabreden": { meaning: "berjanji bertemu", type: "Kata Kerja" },
  "wochenende": { meaning: "akhir pekan", type: "Kata Benda" },
  "halle": { meaning: "aula / gedung olahraga", type: "Kata Benda" },
  "angst": { meaning: "takut", type: "Kata Benda" },
  "hoch": { meaning: "tinggi", type: "Kata Sifat" },
  "lieber": { meaning: "lebih suka", type: "Kata Keterangan" },
  "radtour": { meaning: "tur sepeda", type: "Kata Benda" }
};

export function HorenInteraktiv9() {
  return <HorenInteraktivTemplate kapitelId={9} dictionary={dictionary} />;
}

export default HorenInteraktiv9;
