import fs from 'fs';
import path from 'path';

const dashboardDir = path.join(process.cwd(), 'app', 'dashboard');

function processFiles() {
  for (let i = 1; i <= 12; i++) {
    let filePath = path.join(dashboardDir, `HorenInteraktiv${i}.tsx`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(dashboardDir, `kapitel-${i}`, `HorenInteraktiv${i}.tsx`);
    }
    if (!fs.existsSync(filePath)) {
      console.log(`Could not find HorenInteraktiv${i}.tsx`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    const dictMatch = content.match(/const dictionary(?::\s*Record<string,\s*{[^}]+}>)?\s*=\s*({[\s\S]*?});\n/);
    if (!dictMatch) {
      console.log(`Could not find dictionary in HorenInteraktiv${i}.tsx`);
      continue;
    }

    const dictContent = dictMatch[1];

    const newContent = `"use client";

import React from 'react';
import { HorenInteraktivTemplate } from '@/app/dashboard/HorenInteraktivTemplate';

const dictionary: Record<string, { meaning: string, type: string }> = ${dictContent};

export function HorenInteraktiv${i}() {
  return <HorenInteraktivTemplate kapitelId={${i}} dictionary={dictionary} />;
}

export default HorenInteraktiv${i};
`;
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated HorenInteraktiv${i}.tsx`);
  }
}

processFiles();
