'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyKeyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md transition-colors ${
        copied 
          ? 'bg-green-100 text-green-700' 
          : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'
      }`}
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
