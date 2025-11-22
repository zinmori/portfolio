'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Experience {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
}

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience');
      if (res.ok) {
        const data = await res.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Failed to fetch experience', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const res = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setExperiences(experiences.filter((e) => e._id !== id));
      } else {
        alert('Failed to delete experience');
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  if (isLoading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
        >
          Add Experience
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="p-4">Company</th>
              <th className="p-4">Position</th>
              <th className="p-4">Period</th>
              <th className="p-4">Order</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr
                key={exp._id}
                className="border-t border-gray-700 hover:bg-gray-750"
              >
                <td className="p-4 font-medium">{exp.company}</td>
                <td className="p-4 text-gray-400">{exp.position}</td>
                <td className="p-4 text-gray-400">
                  {new Date(exp.startDate).toLocaleDateString()} -{' '}
                  {exp.current
                    ? 'Present'
                    : exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString()
                    : ''}
                </td>
                <td className="p-4">{exp.order}</td>
                <td className="p-4 flex gap-2">
                  <Link
                    href={`/admin/experience/${exp._id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No experience found. Add your work history.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
