'use client';

import { useEffect, useState } from 'react';

interface GlitchOverlayProps {
  active: boolean;
  targetMode?: string;
}

export const GlitchOverlay = ({
  active,
  targetMode = 'normal',
}: GlitchOverlayProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] pointer-events-none flex items-center justify-center transition-opacity duration-500 ${
        active ? 'opacity-100' : 'opacity-0'
      } ${
        targetMode === 'terminal'
          ? 'bg-black text-green-500 font-mono'
          : targetMode === 'book'
          ? 'bg-[#fdfbf7] text-[#8b4513] font-serif'
          : 'bg-slate-900 text-blue-400 font-sans'
      }`}
    >
      {targetMode === 'terminal' && (
        <div className="text-2xl">
          <span className="animate-pulse">&gt; INITIALIZING SHELL...</span>
        </div>
      )}

      {targetMode === 'book' && (
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📖</div>
          <div className="text-2xl italic">Opening the chronicles...</div>
        </div>
      )}

      {targetMode === 'normal' && (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-bold tracking-widest">
            LOADING INTERFACE
          </div>
        </div>
      )}
    </div>
  );
};
