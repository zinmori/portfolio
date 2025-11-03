import { useRouter } from 'next/router';
import matrixBg from '../assets/images/matrix.jpg';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Ezechiel Kokou Agban - Data Scientist & Software Developer
        </title>
        <meta
          name="description"
          content="Portfolio of Ezechiel Kokou Agban - Data Scientist & Software Developer"
        />
        <meta
          name="keywords"
          content="Ezechiel Kokou Agban, BigZ, Data Scientist, Développeur Logiciel, Portfolio, Intelligence Artificielle, Machine Learning, Développement Web"
        />
        <meta name="author" content="Ezechiel Kokou Agban" />
        <meta
          property="og:title"
          content="Ezechiel Kokou Agban - Data Scientist & Software Developer"
        />
        <meta
          property="og:description"
          content="Portfolio de Ezechiel Kokou Agban, Data Scientist et Développeur Logiciel."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ezechiel.bigz.dev/" />
        <meta
          property="og:image"
          content="https://ezechiel.bigz.dev/ezechiel.jpg"
        />
        <script type="application/ld+json">
          {`
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ezechiel Kokou Agban",
            "jobTitle": "Data Scientist & Software Developer",
            "url": "https://ezechiel.bigz.dev/",
            "sameAs": [
                "https://linkedin.com/in/kokou-ezechiel-agban",
                "https://github.com/zinmori"
            ]
        }
        `}
        </script>
      </Head>
      <main>
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
          {/* Matrix background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
            style={{
              backgroundImage: `url(${matrixBg.src || matrixBg})`,
            }}
          ></div>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="z-10 text-center space-y-12 max-w-4xl mx-auto px-4">
            {/* Main title */}
            <div className="mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                Choose Your Path
              </h1>
            </div>

            {/* Pills choice */}
            <div className="flex flex-row items-center justify-center space-x-16 md:space-x-72">
              {/* Blue Pill - Normal Mode */}
              <div
                className="group cursor-pointer flex flex-col items-center transform transition-all duration-500 hover:scale-110"
                onClick={() => router.push('/normal')}
              >
                <div className="relative p-6 md:p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-2xl hover:shadow-blue-500/70 transition-all duration-300">
                  <div className="w-12 h-6 md:w-16 md:h-8 bg-blue-400 rounded-full shadow-inner flex items-center justify-center">
                    <div className="w-8 h-4 md:w-12 md:h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full"></div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  {/* Pulse animation */}
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-0 group-hover:opacity-100 hover:animate-ping"></div>
                </div>
                <p className="mt-4 md:mt-6 text-blue-300 font-bold text-lg md:text-xl">
                  Interface
                </p>
              </div>

              {/* Red Pill - Terminal Mode */}
              <div
                className="group cursor-pointer flex flex-col items-center transform transition-all duration-500 hover:scale-110"
                onClick={() => router.push('/terminal')}
              >
                <div className="relative p-6 md:p-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-2xl hover:shadow-red-500/70 transition-all duration-300">
                  <div className="w-12 h-6 md:w-16 md:h-8 bg-red-400 rounded-full shadow-inner flex items-center justify-center">
                    <div className="w-8 h-4 md:w-12 md:h-6 bg-gradient-to-r from-red-200 to-red-300 rounded-full"></div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  {/* Pulse animation */}
                  <div className="absolute inset-0 rounded-full border-4 border-red-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>
                <p className="mt-4 md:mt-6 text-red-300 font-bold text-lg md:text-xl">
                  Shell
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
