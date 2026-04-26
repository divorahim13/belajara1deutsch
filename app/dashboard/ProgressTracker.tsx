'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type ProgressTrackerProps = {
  kapitelId: string;
  totalSteps: number;
  currentStepId: string; // Kept for backwards compatibility, but not used for auto-completion anymore
};

export default function ProgressTracker({ kapitelId, totalSteps }: ProgressTrackerProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    // Load from local storage with safe parsing
    const saved = localStorage.getItem(`progress:${kapitelId}:${userId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedSteps(parsed);
        } else {
          setCompletedSteps([]);
        }
      } catch (e) {
        setCompletedSteps([]);
      }
    }
  }, [kapitelId]);

  useEffect(() => {
    const handleStepComplete = (e: Event) => {
      const customEvent = e as CustomEvent<{ kapitelId: string, stepId: string }>;
      if (customEvent.detail.kapitelId === kapitelId) {
        const { stepId } = customEvent.detail;
        setCompletedSteps(prev => {
          if (!prev.includes(stepId)) {
            const newCompleted = [...prev, stepId];
            if (userId) {
              try {
                localStorage.setItem(`progress:${kapitelId}:${userId}`, JSON.stringify(newCompleted));
              } catch (err) {
                console.error("Local storage error");
              }
            }
            return newCompleted;
          }
          return prev;
        });
      }
    };

    window.addEventListener('markStepComplete', handleStepComplete);
    return () => window.removeEventListener('markStepComplete', handleStepComplete);
  }, [kapitelId, userId]);

  // Sync to Database
  useEffect(() => {
    if (completedSteps.length > 0 && totalSteps > 0) {
      fetch('/api/progress/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kapitelId,
          completedSteps,
          totalSteps
        })
      }).catch(err => console.error('Failed to sync progress:', err));
    }
  }, [completedSteps.length, kapitelId, totalSteps]);

  const progressPercentage = totalSteps > 0 ? Math.min(100, Math.round((completedSteps.length / totalSteps) * 100)) : 0;

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
        <p className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Modul Selesai</p>
        <p className="text-xl font-black text-indigo-900">{completedSteps.length} / {totalSteps}</p>
      </div>
    </div>
  );
}

export function MarkCompleteButton({ stepId, kapitelId }: { stepId: string, kapitelId: string }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const checkCompletion = () => {
      const saved = localStorage.getItem(`progress:${kapitelId}:${userId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setIsCompleted(parsed.includes(stepId));
          } else {
            setIsCompleted(false);
          }
        } catch (e) {
          setIsCompleted(false);
        }
      } else {
        setIsCompleted(false);
      }
    };

    checkCompletion();

    const handleStepComplete = (e: Event) => {
      const customEvent = e as CustomEvent<{ kapitelId: string, stepId: string }>;
      if (customEvent.detail.kapitelId === kapitelId && customEvent.detail.stepId === stepId) {
        setIsCompleted(true);
      }
    };

    window.addEventListener('markStepComplete', handleStepComplete);
    return () => window.removeEventListener('markStepComplete', handleStepComplete);
  }, [stepId, kapitelId, userId]);

  const handleComplete = () => {
    if (!isCompleted) {
      window.dispatchEvent(new CustomEvent('markStepComplete', { detail: { stepId, kapitelId } }));
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="mt-12 flex justify-center animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-3 px-6 py-4 bg-emerald-50 text-emerald-700 font-bold rounded-2xl border-2 border-emerald-300 shadow-sm">
          <span className="text-2xl">✅</span> Modul ini sudah diselesaikan
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={handleComplete}
        className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg rounded-2xl border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all shadow-lg"
      >
        <span>🎯</span> Tandai Selesai
      </button>
    </div>
  );
}
