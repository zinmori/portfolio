'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTerminal, FaHome } from 'react-icons/fa';

export default function NotFound() {
  const pathname = usePathname();
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  useEffect(() => {
    if (pathname?.includes('/terminal')) {
      setIsTerminalMode(true);
    }
  }, [pathname]);

  if (isTerminalMode) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full space-y-4">
          <h1 className="text-4xl font-bold mb-8 animate-pulse">
            &gt; SYSTEM ERROR: 404
          </h1>
          <div className="border border-green-500 p-6 bg-green-900/10 rounded">
            <p className="mb-2">&gt; DIAGNOSTIC_TOOL --RUN</p>
            <p className="mb-2 text-red-500">
              [ERROR] SECTOR_NOT_FOUND_EXCEPTION
            </p>
            <p className="mb-2">
              &gt; The requested path &quot;{pathname}&quot; could not be
              located in the memory banks.
            </p>
            <p className="mb-4">&gt; SUGGESTED_ACTION: RETURN_TO_ROOT</p>
          </div>
          <div className="mt-8">
            <Link
              href="/terminal"
              className="inline-flex items-center space-x-2 border border-green-500 px-4 py-2 hover:bg-green-500 hover:text-black transition-colors"
            >
              <FaTerminal />
              <span>cd ~</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Matrix background effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/matrix.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-display font-bold mb-6">
          Lost in the Matrix?
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          The page you are looking for seems to have been deleted, moved, or
          never existed. It&apos;s a glitch in the simulation.
        </p>

        <Link
          href="/normal"
          className="btn-primary inline-flex items-center space-x-2"
        >
          <FaHome />
          <span>Return to Reality</span>
        </Link>
      </div>
    </div>
  );
}
