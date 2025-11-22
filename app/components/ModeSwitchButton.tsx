'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaDesktop, FaBook } from 'react-icons/fa';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { GlitchOverlay } from './GlitchOverlay';

export function ModeSwitchButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [isGlitching, setIsGlitching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitch = (target: string) => {
    setIsGlitching(true);
    setIsOpen(false);

    setTimeout(() => {
      router.push(target);
      setTimeout(() => setIsGlitching(false), 500);
    }, 500);
  };

  const currentMode = pathname?.startsWith('/terminal')
    ? 'terminal'
    : pathname?.startsWith('/book')
    ? 'book'
    : 'normal';

  return (
    <>
      <GlitchOverlay active={isGlitching} />

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
            {currentMode !== 'normal' && (
              <button
                onClick={() => handleSwitch('/normal')}
                className="bg-blue-600 p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group"
                title="Interface Mode"
              >
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-medium whitespace-nowrap">
                  Interface
                </span>
                <FaDesktop size={20} />
              </button>
            )}

            {currentMode !== 'terminal' && (
              <button
                onClick={() => handleSwitch('/terminal')}
                className="bg-green-700 p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group"
                title="Terminal Mode"
              >
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-medium whitespace-nowrap">
                  Terminal
                </span>
                <HiOutlineCommandLine size={20} />
              </button>
            )}

            {currentMode !== 'book' && (
              <button
                onClick={() => handleSwitch('/book')}
                className="bg-[#8b4513] p-3 rounded-full text-white shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group"
                title="Book Mode"
              >
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-medium whitespace-nowrap">
                  Book
                </span>
                <FaBook size={20} />
              </button>
            )}
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full text-white shadow-xl hover:scale-105 transition-all duration-300 ${
            isOpen ? 'bg-red-600 rotate-45' : 'bg-gray-800'
          }`}
        >
          {isOpen ? (
            <span className="text-xl font-bold">+</span>
          ) : (
            <span className="text-sm font-bold">MODE</span>
          )}
        </button>
      </div>
    </>
  );
}
