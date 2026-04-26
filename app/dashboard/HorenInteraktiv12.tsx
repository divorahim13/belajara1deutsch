"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
  "festival": { meaning: "festival", type: "Kata Benda" },
  "indie": { meaning: "indie", type: "Kata Sifat" },
  "unterkunft": { meaning: "akomodasi", type: "Kata Benda" },
  "tickets": { meaning: "tiket", type: "Kata Benda" },
  "konzert": { meaning: "konser", type: "Kata Benda" },
  "radiosprecher": { meaning: "penyiar radio", type: "Kata Benda" },
  "nachrichten": { meaning: "berita", type: "Kata Benda" },
  "flohmarkt": { meaning: "pasar loak", type: "Kata Benda" },
  "wertvoll": { meaning: "berharga", type: "Kata Sifat" },
  "tierbilder": { meaning: "lukisan hewan", type: "Kata Benda" },
  "künstler": { meaning: "seniman", type: "Kata Benda" },
  "rock": { meaning: "musik rock", type: "Kata Benda" },
  "elektro": { meaning: "musik elektro", type: "Kata Benda" },
  "fahrt": { meaning: "perjalanan", type: "Kata Benda" },
  "rucksack": { meaning: "ransel", type: "Kata Benda" },
  "live": { meaning: "langsung (live)", type: "Kata Sifat" },
  "müde": { meaning: "lelah", type: "Kata Sifat" },
  "eingeschlafen": { meaning: "tertidur", type: "Kata Kerja (Partizip II)" },
  "stille": { meaning: "keheningan", type: "Kata Benda" },
  "expertin": { meaning: "pakar perempuan", type: "Kata Benda" },
  "stimme": { meaning: "suara", type: "Kata Benda" },
  "abstrakter": { meaning: "lebih abstrak", type: "Kata Sifat" },
  "kreativer": { meaning: "lebih kreatif", type: "Kata Sifat" }
};

export function HorenInteraktiv12() {
  return <HorenInteraktivTemplate kapitelId={12} dictionary={dictionary} />;
}

export default HorenInteraktiv12;
