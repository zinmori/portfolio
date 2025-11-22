'use client';

import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

function AdminContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!session && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-gray-800 p-6">
        <h1 className="text-2xl font-bold mb-8 text-green-500">Admin Panel</h1>
        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-green-400">
            Dashboard
          </Link>
          <Link href="/admin/projects" className="block hover:text-green-400">
            Projects
          </Link>
          <Link href="/admin/posts" className="block hover:text-green-400">
            Blog Posts
          </Link>
          <Link href="/admin/experience" className="block hover:text-green-400">
            Experience
          </Link>
          <Link href="/admin/education" className="block hover:text-green-400">
            Education
          </Link>
          <Link
            href="/admin/certificates"
            className="block hover:text-green-400"
          >
            Certificates
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminContent>{children}</AdminContent>
    </SessionProvider>
  );
}
