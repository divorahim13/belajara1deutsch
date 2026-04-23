'use client'

import { useState, useEffect } from 'react';

type ProgressTrackerProps = {
  kapitelId: string;
  totalSteps: number;
  currentStepId: string;
};

export default function ProgressTracker({ kapitelId, totalSteps, currentStepId }: ProgressTrackerProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem(`progress_${kapitelId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSteps(parsed);
      } catch (e) {}
    }
  }, [kapitelId]);

  useEffect(() => {
    // Add current step to completed if not already there
    if (currentStepId && !completedSteps.includes(currentStepId)) {
      const newCompleted = [...completedSteps, currentStepId];
      setCompletedSteps(newCompleted);
      localStorage.setItem(`progress_${kapitelId}`, JSON.stringify(newCompleted));
    }
  }, [currentStepId, completedSteps, kapitelId]);

  const progressPercentage = Math.min(100, Math.round((completedSteps.length / totalSteps) * 100));

  return (
    <div className="bg-white rounded-2xl border-4 border-indigo-900 p-4 shadow-[4px_4px_0px_#1E1B4B] mb-8 flex flex-col sm:flex-row items-center gap-4">
      <div className="flex-1 w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="font-extrabold text-indigo-900">Progres Belajar</span>
          <span className="font-black text-emerald-600">{progressPercentage}%</span>
        </div>
        <div className="h-4 bg-indigo-100 rounded-full border-2 border-indigo-900 overflow-hidden">
          <div 
            className="h-full bg-emerald-400 transition-all duration-1000 ease-out border-r-2 border-indigo-900"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="shrink-0 text-center sm:text-right">
        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Modul Selesai</p>
        <p className="text-xl font-black text-indigo-900">{completedSteps.length} / {totalSteps}</p>
      </div>
    </div>
  );
}
