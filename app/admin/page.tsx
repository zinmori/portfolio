'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {session?.user?.email}</span>
          <button
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/projects" className="block group">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-green-500 transition-colors">
            <h2 className="text-xl font-bold mb-2 text-green-400">Projects</h2>
            <p className="text-gray-400">Manage your portfolio projects</p>
          </div>
        </Link>

        <Link href="/admin/posts" className="block group">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-blue-500 transition-colors">
            <h2 className="text-xl font-bold mb-2 text-blue-400">Blog Posts</h2>
            <p className="text-gray-400">Write and edit articles</p>
          </div>
        </Link>

        <Link href="/admin/experience" className="block group">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-purple-500 transition-colors">
            <h2 className="text-xl font-bold mb-2 text-purple-400">
              Experience
            </h2>
            <p className="text-gray-400">Update your work history</p>
          </div>
        </Link>

        <Link href="/admin/education" className="block group">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-yellow-500 transition-colors">
            <h2 className="text-xl font-bold mb-2 text-yellow-400">
              Education
            </h2>
            <p className="text-gray-400">Manage education history</p>
          </div>
        </Link>

        <Link href="/admin/certificates" className="block group">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-red-500 transition-colors">
            <h2 className="text-xl font-bold mb-2 text-red-400">
              Certificates
            </h2>
            <p className="text-gray-400">Manage certifications</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
