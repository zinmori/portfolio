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

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Abstract background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-12 p-4 text-center md:space-y-24">
          {/* Title Section */}
          <div className="animate-fade-in-down">
            <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-extrabold text-transparent drop-shadow-lg md:text-7xl">
              Choose Your Path
            </h1>
            <p className="mt-4 text-lg text-slate-400 md:text-2xl">
              Select an interface to explore the portfolio
            </p>
          </div>

          {/* Triangular Layout */}
          <div className="relative flex flex-col items-center justify-center gap-12 md:gap-0">
            {/* Top: Interface */}
            <div className="md:mb-16 animate-fade-in-up delay-200">
              <Link
                href="/normal"
                className="group relative flex flex-col items-center"
              >
                <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 p-1 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-blue-500/50">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-950/50 backdrop-blur-sm">
                    <FaDesktop className="h-12 w-12 text-blue-400 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  {/* Glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-blue-500 opacity-0 blur transition-opacity duration-500 group-hover:opacity-30" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-blue-300 transition-colors group-hover:text-blue-200">
                  Interface
                </h2>
                <p className="text-sm text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Modern Web Experience
                </p>
              </Link>
            </div>

            {/* Bottom Row */}
            <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-12 md:flex-row md:gap-32">
              {/* Left: Terminal */}
              <div className="animate-fade-in-up delay-300">
                <Link
                  href="/terminal"
                  className="group relative flex flex-col items-center"
                >
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-900 p-1 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-red-500/50">
                    <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-slate-950/50 backdrop-blur-sm">
                      <HiOutlineCommandLine className="h-12 w-12 text-red-400 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {/* Glow */}
                    <div className="absolute -inset-1 rounded-2xl bg-red-500 opacity-0 blur transition-opacity duration-500 group-hover:opacity-30" />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-red-300 transition-colors group-hover:text-red-200">
                    Terminal
                  </h2>
                  <p className="text-sm text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Command Line Interface
                  </p>
                </Link>
              </div>

              {/* Right: Story */}
              <div className="animate-fade-in-up delay-400">
                <Link
                  href="/book"
                  className="group relative flex flex-col items-center"
                >
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-900 p-1 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-amber-500/50">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-950/50 backdrop-blur-sm">
                      <FaBook className="h-12 w-12 text-amber-400 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    {/* Glow */}
                    <div className="absolute -inset-1 rounded-2xl bg-amber-500 opacity-0 blur transition-opacity duration-500 group-hover:opacity-30" />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-amber-300 transition-colors group-hover:text-amber-200">
                    Story
                  </h2>
                  <p className="text-sm text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Interactive Narrative
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
