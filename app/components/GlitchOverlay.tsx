'use client';

export const GlitchOverlay = ({ active }: { active: boolean }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none bg-black animate-fade-in"></div>
  );
};
