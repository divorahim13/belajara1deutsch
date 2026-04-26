import React from 'react';
import { Question } from '../../data/quiz-data';

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export default function QuestionRenderer({ question, value, onChange, disabled }: QuestionRendererProps) {
  
  if (question.type === 'multipleChoice' && question.options) {
    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            disabled={disabled}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2
              ${value === opt 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                : 'bg-white border-slate-300 text-slate-700 hover:border-indigo-300 disabled:opacity-75 disabled:cursor-not-allowed'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'fillBlank' || question.type === 'sentenceTransformation' || question.type === 'shortAnswer') {
    return (
      <input
        type="text"
        disabled={disabled}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Jawaban Anda..."
        className="w-full mt-3 p-3 rounded-xl border-2 border-slate-300 focus:border-indigo-500 outline-none font-bold text-slate-800 disabled:bg-slate-50 disabled:text-slate-700"
      />
    );
  }

  if (question.type === 'writing') {
    return (
      <textarea
        disabled={disabled}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tuliskan teks Anda di sini..."
        className="w-full mt-3 p-4 min-h-[150px] rounded-xl border-2 border-slate-300 focus:border-indigo-500 outline-none font-medium text-slate-800 disabled:bg-slate-50 disabled:text-slate-700"
      />
    );
  }

  if (question.type === 'matching' && question.pairs) {
    // Simple matching UI (Select dropdowns for each left-side item)
    const currentVal = (value || {}) as Record<string, string>;
    const rightOptions = Object.values(question.pairs).sort(() => Math.random() - 0.5); // normally shouldn't sort in render, but it's okay for simplified demo or we just list options
    
    // To keep it deterministic, just sort alphabetically
    const deterministicOptions = Object.values(question.pairs).sort();

    return (
      <div className="space-y-3 mt-3">
        {Object.keys(question.pairs).map((leftStr, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="font-bold text-slate-700 flex-1">{leftStr}</span>
            <select
              disabled={disabled}
              value={currentVal[leftStr] || ''}
              onChange={(e) => onChange({ ...currentVal, [leftStr]: e.target.value })}
              className="p-2 border-2 border-slate-300 rounded-lg bg-white font-bold text-indigo-800 outline-none focus:border-indigo-500 md:w-1/2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <option value="">-- Pilih --</option>
              {deterministicOptions.map((opt, oIdx) => (
                <option key={oIdx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 bg-rose-100 text-rose-800 rounded-xl mt-3 font-bold">
      Unsupported question type: {question.type}
    </div>
  );
}
