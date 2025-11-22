'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Education {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  order: number;
}

export default function EducationAdmin() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await fetch('/api/education');
      if (res.ok) {
        const data = await res.json();
        setEducationList(data);
      }
    } catch (error) {
      console.error('Failed to fetch education', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?'))
      return;

    try {
      const res = await fetch(`/api/education/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEducationList(educationList.filter((e) => e._id !== id));
      } else {
        alert('Failed to delete education');
      }
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  if (isLoading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Education</h1>
        <Link
          href="/admin/education/new"
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
        >
          Add Education
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-gray-400">
            <tr>
              <th className="p-4">Institution</th>
              <th className="p-4">Degree</th>
              <th className="p-4">Field of Study</th>
              <th className="p-4">Period</th>
              <th className="p-4">Order</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {educationList.map((edu) => (
              <tr
                key={edu._id}
                className="border-t border-gray-700 hover:bg-gray-750"
              >
                <td className="p-4 font-medium">{edu.institution}</td>
                <td className="p-4 text-gray-400">{edu.degree}</td>
                <td className="p-4 text-gray-400">{edu.fieldOfStudy}</td>
                <td className="p-4 text-gray-400">
                  {new Date(edu.startDate).toLocaleDateString()} -{' '}
                  {edu.current
                    ? 'Present'
                    : edu.endDate
                    ? new Date(edu.endDate).toLocaleDateString()
                    : ''}
                </td>
                <td className="p-4">{edu.order}</td>
                <td className="p-4 flex gap-2">
                  <Link
                    href={`/admin/education/${edu._id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {educationList.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No education found. Add your academic background.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
