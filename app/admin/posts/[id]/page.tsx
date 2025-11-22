'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PostForm from '../_components/PostForm';

export default function EditPostPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        }
      } catch (error) {
        console.error('Failed to fetch post', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (!post) return <div className="p-8 text-white">Post not found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostForm initialData={post} isEditing />
    </div>
  );
}
