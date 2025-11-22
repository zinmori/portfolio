import Navbar from '../../../../src/components/Navbar';
import ParticleBackground from '../../../../src/components/ParticleBackground';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import ShareButtons from './_components/ShareButtons';
import { FaClock } from 'react-icons/fa';

export async function generateStaticParams() {
  await dbConnect();
  const posts = await Post.find({ published: true }).select('slug').lean();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string) {
  await dbConnect();
  const post = await Post.findOne({ slug, published: true }).lean();
  if (!post) return null;

  return {
    ...post,
    _id: post._id.toString(),
    date: new Date(post.date).toISOString().split('T')[0],
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const words = post.content.split(/\s+/g).length;
  const timeToRead = Math.ceil(words / 200);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden text-white">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-20 pt-32 px-6 max-w-4xl mx-auto pb-20">
        <Link
          href="/normal/blog"
          className="inline-flex items-center text-green-400 hover:text-green-300 mb-8 transition-colors"
        >
          ← Back to blog
        </Link>

        <article>
          <header className="mb-12 text-center">
            <div className="flex justify-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium px-3 py-1 rounded-full bg-green-900/30 text-green-400 border border-green-900/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
              <time>{post.date}</time>
              <span>•</span>
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{timeToRead} min read</span>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-green-400 hover:prose-a:text-green-300 prose-strong:text-white prose-code:text-green-300">
            <MDXRemote source={post.content} />
          </div>

          <ShareButtons title={post.title} slug={slug} />
        </article>
      </main>
    </div>
  );
}
