import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ezechiel Kokou Agban - Choose Your Experience',
  description:
    'Sélectionnez entre une interface graphique moderne et un mode terminal interactif pour découvrir le portfolio de BigZ.',
  openGraph: {
    title: 'Ezechiel Kokou Agban - Choose Your Experience',
    description:
      'Choisissez entre une interface moderne ou un terminal interactif pour explorer le portfolio.',
    type: 'website',
    url: 'https://ezechiel.bigz.dev/',
    images: [
      {
        url: 'https://ezechiel.bigz.dev/ezechiel.jpg',
        width: 1200,
        height: 630,
        alt: 'Portrait de Ezechiel Kokou Agban',
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
  sameAs: [
    'https://linkedin.com/in/kokou-ezechiel-agban',
    'https://github.com/zinmori',
  ],
};

export default function LandingPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
        {/* Matrix background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: 'url(/images/matrix.jpg)',
          }}
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="z-10 mx-auto max-w-4xl space-y-12 px-4 text-center">
          {/* Main title */}
          <div className="mb-16">
            <h1 className="bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Choose Your Path
            </h1>
          </div>

          {/* Pills choice */}
          <div className="flex flex-row items-center justify-center space-x-16 md:space-x-72">
            {/* Blue Pill - Normal Mode */}
            <Link
              href="/normal"
              className="group flex cursor-pointer flex-col items-center transition-transform duration-500 hover:scale-110"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-2xl transition-all duration-300 hover:shadow-blue-500/70 md:h-32 md:w-32 md:p-8">
                <div className="flex h-6 w-12 items-center justify-center rounded-full bg-blue-400 shadow-inner md:h-8 md:w-16">
                  <div className="h-4 w-8 rounded-full bg-gradient-to-r from-blue-200 to-blue-300 md:h-6 md:w-12" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
              </div>
              <p className="mt-4 text-lg font-bold text-blue-300 md:mt-6 md:text-xl">
                Interface
              </p>
            </Link>

            {/* Red Pill - Terminal Mode */}
            <Link
              href="/terminal"
              className="group flex cursor-pointer flex-col items-center transition-transform duration-500 hover:scale-110"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-800 p-6 shadow-2xl transition-all duration-300 hover:shadow-red-500/70 md:h-32 md:w-32 md:p-8">
                <div className="flex h-6 w-12 items-center justify-center rounded-full bg-red-400 shadow-inner md:h-8 md:w-16">
                  <div className="h-4 w-8 rounded-full bg-gradient-to-r from-red-200 to-red-300 md:h-6 md:w-12" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full border-4 border-red-400 opacity-0 group-hover:opacity-100 animate-ping" />
              </div>
              <p className="mt-4 text-lg font-bold text-red-300 md:mt-6 md:text-xl">
                Shell
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
