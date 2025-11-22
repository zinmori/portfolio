'use client';

import PostForm from '../_components/PostForm';

export default function NewPostPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Write New Post</h1>
      <PostForm />
    </div>
  );
}
