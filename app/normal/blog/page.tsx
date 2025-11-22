import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../../src/components/Navbar';
import ParticleBackground from '../../../src/components/ParticleBackground';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

async function getPosts() {
  await dbConnect();
  const posts = await Post.find({ published: true }).sort({ date: -1 }).lean();
  return posts.map((post) => ({
    ...post,
    _id: post._id.toString(),
    slug: post.slug,
    title: post.title,
    date: new Date(post.date).toISOString().split('T')[0],
    description: post.excerpt,
    tags: post.tags,
    coverImage: post.coverImage,
  }));
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden text-white">
      <ParticleBackground />

      <Navbar />

      <main className="relative z-20 pt-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            The Z-Files
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A space to share my discoveries, projects, and thoughts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              href={`/normal/blog/${post.slug}`}
              key={post.slug}
              className="group"
            >
              <article className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                {post.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-0.5 rounded bg-green-900/30 text-green-400 border border-green-900/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Read more →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
