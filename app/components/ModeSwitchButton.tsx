'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FaDesktop } from 'react-icons/fa';
import { HiOutlineCommandLine } from 'react-icons/hi2';
import { GlitchOverlay } from './GlitchOverlay';

function resolveTarget(pathname: string | null): {
  target: string;
  label: string;
} {
  if (pathname?.startsWith('/terminal')) {
    return {
      target: '/normal',
      label: 'Interface',
    };
  }

  return {
    target: '/terminal',
    label: 'Terminal',
  };
}

export function ModeSwitchButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [isGlitching, setIsGlitching] = useState(false);

  const { target, label } = useMemo(() => resolveTarget(pathname), [pathname]);

  const handleSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGlitching(true);

    // Play fade effect for 500ms before navigating
    setTimeout(() => {
      router.push(target);
      // Stop effect after navigation
      setTimeout(() => setIsGlitching(false), 500);
    }, 500);
  };

  return (
    <>
      <GlitchOverlay active={isGlitching} />
      <div
        className="fixed bottom-4 right-4 z-50"
        data-mode={label.toLowerCase()}
      >
        <a
          href={target}
          onClick={handleSwitch}
          aria-label={`Changer de mode pour ${label.toLowerCase()}`}
          className="cursor-pointer block"
        >
          {label === 'Terminal' ? (
            <HiOutlineCommandLine
              size={20}
              className="hover:scale-125 hover:text-green-700 text-white duration-100 transition-all"
            />
          ) : (
            <FaDesktop
              size={20}
              className="hover:scale-125 hover:text-blue-700 text-white duration-100 transition-all"
            />
          )}
        </a>
      </div>
    </>
  );
}
