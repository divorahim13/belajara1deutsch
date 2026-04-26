"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
  "wohnorte": { meaning: "tempat tinggal", type: "Kata Benda" },
  "hausboot": { meaning: "rumah perahu", type: "Kata Benda" },
  "frisch": { meaning: "segar", type: "Kata Sifat" },
  "wasser": { meaning: "air", type: "Kata Benda" },
  "bauernhof": { meaning: "peternakan", type: "Kata Benda" },
  "natur": { meaning: "alam", type: "Kata Benda" },
  "schön": { meaning: "indah", type: "Kata Sifat" },
  "urlaub": { meaning: "liburan", type: "Kata Benda" },
  "ferienwohnung": { meaning: "apartemen liburan", type: "Kata Benda" },
  "stadtrand": { meaning: "pinggir kota", type: "Kata Benda" },
  "familie": { meaning: "keluarga", type: "Kata Benda" },
  "gefallen": { meaning: "bantuan/kebaikan", type: "Kata Benda" },
  "blumen": { meaning: "bunga", type: "Kata Benda" },
  "gießen": { meaning: "menyiram", type: "Kata Kerja" },
  "beschwerde": { meaning: "keluhan", type: "Kata Benda" },
  "hund": { meaning: "anjing", type: "Kata Benda" },
  "bellt": { meaning: "menggonggong", type: "Kata Kerja" },
  "laut": { meaning: "keras/berisik", type: "Kata Sifat" },
  "schlafen": { meaning: "tidur", type: "Kata Kerja" },
  "kätzchen": { meaning: "anak kucing", type: "Kata Benda" },
  "zeit": { meaning: "waktu", type: "Kata Benda" },
  "geld": { meaning: "uang", type: "Kata Benda" },
  "futter": { meaning: "makanan hewan", type: "Kata Benda" },
  "tierarzt": { meaning: "dokter hewan", type: "Kata Benda" },
  "teuer": { meaning: "mahal", type: "Kata Sifat" }
};

export function HorenInteraktiv10() {
  return <HorenInteraktivTemplate kapitelId={10} dictionary={dictionary} />;
}

export default HorenInteraktiv10;
