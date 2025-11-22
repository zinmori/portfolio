'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Certificate {
  _id: string;
  title: string;
  institution: string;
  date: string;
  order: number;
}

export default function CertificatesAdmin() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await fetch('/api/certificates');
      if (res.ok) {
        const data = await res.json();
        setCertificates(data);
      }
    } catch (error) {
      console.error('Failed to fetch certificates', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    try {
      const res = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setCertificates(certificates.filter((c) => c._id !== id));
      } else {
        alert('Failed to delete certificate');
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  if (isLoading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Certificates</h1>
        <Link
          href="/admin/certificates/new"
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Add Certificate
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Institution</th>
              <th className="p-4">Date</th>
              <th className="p-4">Order</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr
                key={cert._id}
                className="border-t border-gray-700 hover:bg-gray-750"
              >
                <td className="p-4 font-medium">{cert.title}</td>
                <td className="p-4 text-gray-400">{cert.institution}</td>
                <td className="p-4 text-gray-400">
                  {new Date(cert.date).toLocaleDateString()}
                </td>
                <td className="p-4">{cert.order}</td>
                <td className="p-4 flex gap-2">
                  <Link
                    href={`/admin/certificates/${cert._id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cert._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {certificates.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No certificates found. Add your achievements.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
