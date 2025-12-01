import Navbar from '../../../src/components/Navbar';
import ParticleBackground from '../../../src/components/ParticleBackground';
import BlogList from './_components/BlogList';

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden text-white">
      <ParticleBackground />

      <Navbar />

      <main className="relative z-20 pt-32 px-6 max-w-7xl mx-auto pb-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            The Z-Files
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A space to share my discoveries, projects, and thoughts.
          </p>
        </div>

        <BlogList />
      </main>
    </div>
  );
}
