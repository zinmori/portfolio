'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { FaDesktop } from 'react-icons/fa';
import { HiOutlineCommandLine } from 'react-icons/hi2';

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

  const { target, label } = useMemo(() => resolveTarget(pathname), [pathname]);

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      data-mode={label.toLowerCase()}
    >
      <Link
        href={target}
        aria-label={`Changer de mode pour ${label.toLowerCase()}`}
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
      </Link>
    </div>
  );
}
