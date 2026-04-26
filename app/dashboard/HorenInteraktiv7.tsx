"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
  "fahrkarte": { meaning: "tiket perjalanan", type: "Kata Benda" },
  "kaufen": { meaning: "membeli", type: "Kata Kerja" },
  "automat": { meaning: "mesin otomatis", type: "Kata Benda" },
  "gleis": { meaning: "peron / jalur kereta", type: "Kata Benda" },
  "verspätung": { meaning: "keterlambatan", type: "Kata Benda" },
  "minuten": { meaning: "menit", type: "Kata Benda" },
  "entschuldigung": { meaning: "permisi / maaf", type: "Kata Benda" },
  "aussteigen": { meaning: "turun (kendaraan)", type: "Kata Kerja" },
  "bahnhof": { meaning: "stasiun", type: "Kata Benda" },
  "platz": { meaning: "tempat / kursi", type: "Kata Benda" },
  "reserviert": { meaning: "dipesan / direservasi", type: "Kata Kerja" },
  "fenster": { meaning: "jendela", type: "Kata Benda" },
  "gepäck": { meaning: "bagasi / barang bawaan", type: "Kata Benda" },
  "schwer": { meaning: "berat", type: "Kata Sifat" },
  "helfen": { meaning: "membantu", type: "Kata Kerja" },
  "gerne": { meaning: "dengan senang hati", type: "Adverbia" }
};

export function HorenInteraktiv7() {
  return <HorenInteraktivTemplate kapitelId={7} dictionary={dictionary} />;
}

export default HorenInteraktiv7;
