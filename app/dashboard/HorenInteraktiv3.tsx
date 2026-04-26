"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = {
    // Übung 1
    "jugendliche": { meaning: "remaja-remaja", type: "Kata Benda" },
    "leben": { meaning: "kehidupan", type: "Kata Benda / Kata Kerja" },
    "probleme": { meaning: "masalah-masalah", type: "Kata Benda" },
    "sorgen": { meaning: "kekhawatiran", type: "Kata Benda" },
    "normal": { meaning: "normal", type: "Kata Sifat" },
    "anfang": { meaning: "pada mulanya / awal", type: "Kata Benda" },
    "kennen": { meaning: "mengenal", type: "Kata Kerja" },
    "verschieden": { meaning: "berbeda-beda", type: "Kata Sifat" },
    "warum": { meaning: "mengapa / kenapa", type: "Kata Tanya" },
    "freunde": { meaning: "teman-teman", type: "Kata Benda" },
    "schicksal": { meaning: "takdir / nasib", type: "Kata Benda" },
    "krankheit": { meaning: "penyakit", type: "Kata Benda" },
    "unfall": { meaning: "kecelakaan", type: "Kata Benda" },
    "plötzlich": { meaning: "tiba-tiba", type: "Adverbia" },
    "alles": { meaning: "segalanya", type: "Kata Ganti" },
    "krankenhaus": { meaning: "rumah sakit", type: "Kata Benda" },
    "club": { meaning: "klub", type: "Kata Benda" },
    "bänder": { meaning: "pita-pita", type: "Kata Benda" },
    "serie": { meaning: "serial", type: "Kata Benda" },
    "emotional": { meaning: "emosional", type: "Kata Sifat" },
    "schweres": { meaning: "berat / sulit", type: "Kata Sifat" },
    "gegenseitig": { meaning: "satu sama lain", type: "Adverbia" },

    // Übung 2
    "lehrerin": { meaning: "guru (perempuan)", type: "Kata Benda" },
    "wohnt": { meaning: "tinggal (dari wohnen)", type: "Kata Kerja" },
    "freund": { meaning: "pacar (laki-laki) / teman", type: "Kata Benda" },
    "mag": { meaning: "menyukai (dari mögen)", type: "Kata Kerja (Modal)" },
    "merkt": { meaning: "menyadari / memperhatikan", type: "Kata Kerja" },
    "träume": { meaning: "mimpi-mimpi", type: "Kata Benda" },
    "findet": { meaning: "merasa / menemukan", type: "Kata Kerja" },
    "langweilig": { meaning: "membosankan", type: "Kata Sifat" },
    "oma": { meaning: "nenek", type: "Kata Benda" },
    "krank": { meaning: "sakit", type: "Kata Sifat" },
    "weiß": { meaning: "tahu (dari wissen)", type: "Kata Kerja" },
    "machen": { meaning: "melakukan / membuat", type: "Kata Kerja" },
    "soll": { meaning: "seharusnya (dari sollen)", type: "Kata Kerja (Modal)" },
    "reise": { meaning: "perjalanan", type: "Kata Benda" },
    "tschechien": { meaning: "Republik Ceko", type: "Kata Benda" },
    "hauptperson": { meaning: "pemeran utama", type: "Kata Benda" },
    "entscheidung": { meaning: "keputusan", type: "Kata Benda" },
    "gestresst": { meaning: "stres", type: "Kata Sifat" },

    // Übung 3
    "entertainer": { meaning: "penghibur / entertainer", type: "Kata Benda" },
    "film": { meaning: "film", type: "Kata Benda" },
    "beschreibt": { meaning: "mendeskripsikan", type: "Kata Kerja" },
    "kindheit": { meaning: "masa kecil", type: "Kata Benda" },
    "talente": { meaning: "bakat-bakat", type: "Kata Benda" },
    "familie": { meaning: "keluarga", type: "Kata Benda" },
    "lacht": { meaning: "tertawa", type: "Kata Kerja" },
    "witze": { meaning: "lelucon", type: "Kata Benda" },
    "mutter": { meaning: "ibu", type: "Kata Benda" },
    "glücklich": { meaning: "bahagia", type: "Kata Sifat" },
    "humor": { meaning: "humor", type: "Kata Benda" },
    "stirbt": { meaning: "meninggal (dari sterben)", type: "Kata Kerja" },
    "jung": { meaning: "muda", type: "Kata Sifat" },
    "zeigt": { meaning: "menunjukkan", type: "Kata Kerja" },
    "wichtig": { meaning: "penting", type: "Kata Sifat" },
    "denkst": { meaning: "berpikir (dari denken)", type: "Kata Kerja" },
    "berühmter": { meaning: "terkenal", type: "Kata Sifat" },
    "schafft": { meaning: "berhasil (dari schaffen)", type: "Kata Kerja" },
    "zeiten": { meaning: "waktu / masa", type: "Kata Benda" }
  };

export function HorenInteraktiv3() {
  return <HorenInteraktivTemplate kapitelId={3} dictionary={dictionary} />;
}

export default HorenInteraktiv3;
