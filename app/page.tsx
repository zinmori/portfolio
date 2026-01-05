import type { Metadata } from 'next';
import Link from 'next/link';
import { FaDesktop, FaBook } from 'react-icons/fa';
import { HiOutlineCommandLine } from 'react-icons/hi2';

export const metadata: Metadata = {
  title: 'Ezechiel Kokou Agban - Data Scientist & Software Developer',
  description:
    'Portfolio de Ezechiel Kokou Agban (BigZ), Data Scientist et développeur full-stack basé au Togo. Spécialisé en Machine Learning, Deep Learning et développement web avec React, Next.js, Python et JavaScript.',
  openGraph: {
    title: 'Ezechiel Kokou Agban - Data Scientist & Software Developer',
    description:
      "Data Scientist et développeur full-stack passionné par l'IA, le Machine Learning et la création de solutions innovantes. Découvrez mes projets et compétences.",
    type: 'website',
    url: 'https://ezechiel.bigz.dev/',
    images: [
      {
        url: 'https://ezechiel.bigz.dev/profil.jpg',
        width: 1200,
        height: 630,
        alt: 'Ezechiel Kokou Agban - Data Scientist & Software Developer',
      },
    ],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ezechiel Kokou Agban',
  jobTitle: 'Data Scientist & Software Developer',
  url: 'https://ezechiel.bigz.dev/',
  image: 'https://ezechiel.bigz.dev/profil.jpg',
  description:
    'Data Scientist et développeur full-stack spécialisé en Machine Learning, Deep Learning et développement web moderne.',
  sameAs: [
    'https://linkedin.com/in/kokou-ezechiel-agban',
    'https://github.com/zinmori',
  ],
  knowsAbout: [
    'Machine Learning',
    'Deep Learning',
    'Data Science',
    'Python',
    'JavaScript',
    'React',
    'Next.js',
    'TensorFlow',
    'PyTorch',
  ],
};

export default function LandingPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-black" />
        
        {/* Subtle animated orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-5xl px-6">
          {/* Title Section */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Choose Your Experience
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-400 max-w-md mx-auto">
              Three unique ways to explore my portfolio
            </p>
          </div>

          {/* Mode Cards - Horizontal Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full max-w-3xl">
            {/* Interface Card */}
            <Link
              href="/normal"
              className="group relative w-full sm:w-1/3 max-w-[200px]"
            >
              <div className="relative flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:bg-slate-800/60 hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                {/* Icon container */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 mb-4 transition-all duration-500 group-hover:from-blue-500/30 group-hover:to-blue-600/20">
                  <FaDesktop className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-wide">
                  Interface
                </h2>
                <p className="text-xs text-slate-500 text-center">
                  Modern UI
                </p>
                
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Link>

            {/* Terminal Card */}
            <Link
              href="/terminal"
              className="group relative w-full sm:w-1/3 max-w-[200px]"
            >
              <div className="relative flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:bg-slate-800/60 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                {/* Icon container */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 mb-4 transition-all duration-500 group-hover:from-emerald-500/30 group-hover:to-emerald-600/20">
                  <HiOutlineCommandLine className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400 transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-wide">
                  Terminal
                </h2>
                <p className="text-xs text-slate-500 text-center">
                  CLI Style
                </p>
                
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Link>

            {/* Story Card */}
            <Link
              href="/book"
              className="group relative w-full sm:w-1/3 max-w-[200px]"
            >
              <div className="relative flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:bg-slate-800/60 hover:border-amber-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
                {/* Icon container */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 mb-4 transition-all duration-500 group-hover:from-amber-500/30 group-hover:to-amber-600/20">
                  <FaBook className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-wide">
                  Story
                </h2>
                <p className="text-xs text-slate-500 text-center">
                  Narrative
                </p>
                
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-amber-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Link>
          </div>

          {/* Subtle footer hint */}
          <p className="mt-8 md:mt-12 text-xs text-slate-600">
            Click a card to begin
          </p>
        </div>
      </div>
    </main>
  );
}
