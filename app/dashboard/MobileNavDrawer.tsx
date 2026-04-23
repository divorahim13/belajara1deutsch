'use client'

import { useState } from 'react';
import DashboardSidebarNav from './DashboardSidebarNav';

export default function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 bg-indigo-800 rounded-lg text-white hover:bg-indigo-700 transition-colors"
        aria-label="Open Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-indigo-950 border-r-4 border-indigo-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b-4 border-indigo-900 flex justify-between items-center bg-indigo-950">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>🇩🇪</span> Kapitel Menu
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-indigo-400 hover:bg-indigo-800 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto" onClick={() => setIsOpen(false)}>
          <DashboardSidebarNav />
        </div>
      </div>
    </>
  );
}
