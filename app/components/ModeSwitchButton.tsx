'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaDesktop, FaBook } from 'react-icons/fa';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { IoGrid } from 'react-icons/io5';
import { GlitchOverlay } from './GlitchOverlay';

const modes = [
  {
    key: 'normal',
    path: '/normal',
    icon: FaDesktop,
    label: 'Interface',
    color: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/40',
  },
  {
    key: 'terminal',
    path: '/terminal',
    icon: HiOutlineCommandLine,
    label: 'Terminal',
    color: 'from-emerald-500 to-green-600',
    glow: 'shadow-emerald-500/40',
  },
  {
    key: 'book',
    path: '/book',
    icon: FaBook,
    label: 'Book',
    color: 'from-amber-600 to-orange-700',
    glow: 'shadow-amber-500/40',
  },
];

export function ModeSwitchButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [isGlitching, setIsGlitching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [targetMode, setTargetMode] = useState('normal');

  // Ne pas afficher sur la page d'accueil "Choose your experience"
  if (pathname === '/' || pathname === '') {
    return null;
  }

  const handleSwitch = (target: string) => {
    const mode = target.replace('/', '') || 'normal';
    setTargetMode(mode);
    setIsGlitching(true);
    setIsOpen(false);

    setTimeout(() => {
      router.push(target);
      setTimeout(() => setIsGlitching(false), 500);
    }, 2000);
  };

  const currentMode = pathname?.startsWith('/terminal')
    ? 'terminal'
    : pathname?.startsWith('/book')
    ? 'book'
    : 'normal';

  const currentModeData = modes.find((m) => m.key === currentMode) || modes[0];
  const availableModes = modes.filter((m) => m.key !== currentMode);

  // Positions en arc de cercle (vers le haut-gauche)
  const getRadialPosition = (index: number, total: number) => {
    const startAngle = 200;
    const endAngle = 250;
    const angleStep = total > 1 ? (endAngle - startAngle) / (total - 1) : 0;
    const angle = startAngle + index * angleStep;
    const radian = (angle * Math.PI) / 180;
    const radius = 55;

    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  return (
    <>
      <GlitchOverlay active={isGlitching} targetMode={targetMode} />

      <div className="fixed bottom-4 right-4 z-50">
        {/* Menu radial */}
        <div className="relative">
          {availableModes.map((mode, index) => {
            const pos = getRadialPosition(index, availableModes.length);
            const Icon = mode.icon;

            return (
              <button
                key={mode.key}
                onClick={() => handleSwitch(mode.path)}
                style={{
                  transform: isOpen
                    ? `translate(${pos.x}px, ${pos.y}px) scale(1)`
                    : 'translate(0, 0) scale(0)',
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                }}
                className={`absolute bottom-0 right-0 p-2.5 rounded-xl text-white 
                  bg-gradient-to-br ${mode.color}
                  shadow-md ${mode.glow}
                  transition-all duration-300 ease-out
                  hover:scale-110 z-50`}
                title={mode.label}
              >
                <Icon size={16} />
              </button>
            );
          })}

          {/* Bouton principal */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative p-2.5 rounded-xl text-white 
              bg-gradient-to-br ${currentModeData.color}
              shadow-md ${currentModeData.glow}
              border border-white/20
              transition-all duration-300 ease-out
              hover:scale-105
              ${isOpen ? 'rotate-45' : ''}`}
          >
            <IoGrid size={18} className="relative z-10" />
          </button>
        </div>
      </div>
    </>
  );
}
