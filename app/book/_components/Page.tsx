'use client';

import { forwardRef } from 'react';

interface PageProps {
  children: React.ReactNode;
  number?: number;
  className?: string;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, number, className = '' }, ref) => {
    return (
      <div
        className="demoPage bg-[#fdfbf7] h-full shadow-inner relative overflow-hidden"
        ref={ref}
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] mix-blend-multiply" />

        {/* Inner Shadow for spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />

        <div
          className={`relative z-0 h-full p-8 md:p-12 flex flex-col ${className}`}
        >
          {children}

          {number && (
            <div className="absolute bottom-6 left-0 right-0 text-center font-serif text-gray-400 text-sm">
              - {number} -
            </div>
          )}
        </div>
      </div>
    );
  },
);

Page.displayName = 'Page';

export const Cover = forwardRef<
  HTMLDivElement,
  { title: string; subtitle: string }
>(({ title, subtitle }, ref) => {
  return (
    <div
      className="demoPage bg-[#8b4513] text-[#e6c9a8] h-full shadow-2xl border-4 border-[#5c2e0b] rounded-r-sm relative"
      ref={ref}
    >
      {/* Leather Texture */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />

      <div className="relative h-full flex flex-col items-center justify-center p-12 border-[2px] border-[#e6c9a8]/30 m-4">
        <div className="text-center space-y-8">
          <h1 className="font-serif text-6xl font-bold tracking-wider uppercase border-b-2 border-[#e6c9a8] pb-4">
            {title}
          </h1>
          <p className="font-handwriting text-3xl italic opacity-90">
            {subtitle}
          </p>
        </div>

        <div className="absolute bottom-12 text-sm font-serif tracking-widest opacity-70 uppercase">
          The Chronicles of a Developer
        </div>
      </div>
    </div>
  );
});

Cover.displayName = 'Cover';
