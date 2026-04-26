"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
    "tiertrainer": { meaning: "pelatih hewan", type: "Kata Benda" },
    "film": { meaning: "film", type: "Kata Benda" },
    "traumberuf": { meaning: "profesi impian", type: "Kata Benda" },
    "eigentlich": { meaning: "sebenarnya", type: "Adverbia" },
    "tieren": { meaning: "hewan-hewan", type: "Kata Benda" },
    "hunde": { meaning: "anjing-anjing", type: "Kata Benda" },
    "besonders": { meaning: "terutama / khususnya", type: "Adverbia" },
    "arbeitsalltag": { meaning: "keseharian kerja", type: "Kata Benda" },
    "feste": { meaning: "tetap", type: "Kata Sifat" },
    "arbeitszeiten": { meaning: "jam kerja", type: "Kata Benda" },
    "überhaupt": { meaning: "sama sekali", type: "Adverbia" },
    "flexibel": { meaning: "fleksibel", type: "Kata Sifat" },
    "wochenende": { meaning: "akhir pekan", type: "Kata Benda" },
    "drehen": { meaning: "syuting", type: "Kata Kerja" },
    "klingt": { meaning: "terdengar", type: "Kata Kerja" },
    "anstrengend": { meaning: "melelahkan", type: "Kata Sifat" },
    "gefährlich": { meaning: "berbahaya", type: "Kata Sifat" },
    "risiko": { meaning: "risiko", type: "Kata Benda" },
    "sicherheit": { meaning: "keamanan", type: "Kata Benda" },
    "wichtig": { meaning: "penting", type: "Kata Sifat" },
    "arbeitsklima": { meaning: "suasana kerja", type: "Kata Benda" },
    "team": { meaning: "tim", type: "Kata Benda" },
    "fantastisch": { meaning: "fantastis", type: "Kata Sifat" },
    "interview": { meaning: "wawancara", type: "Kata Benda" }
  };

export function HorenInteraktiv6() {
  return <HorenInteraktivTemplate kapitelId={6} dictionary={dictionary} />;
}

export default HorenInteraktiv6;
