'use client';

import { useState, useEffect } from 'react';
import { FaTwitter, FaLinkedin, FaLink, FaFacebook } from 'react-icons/fa';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(`${window.location.origin}/normal/blog/${slug}`);
    }
  }, [slug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!url) return null;

  return (
    <div className="flex items-center gap-4 py-6 border-t border-white/10 mt-12">
      <span className="text-gray-400 text-sm font-medium">
        Share this post:
      </span>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title,
        )}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={20} />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#0A66C2] transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={20} />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#1877F2] transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={20} />
      </a>

      <button
        onClick={handleCopy}
        className="text-gray-400 hover:text-white transition-colors relative group"
        aria-label="Copy link"
      >
        <FaLink size={20} />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
