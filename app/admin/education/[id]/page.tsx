'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EducationForm from '../_components/EducationForm';

export default function EditEducationPage() {
  const params = useParams();
  const [education, setEducation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch(`/api/education/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setEducation(data);
        }
      } catch (error) {
        console.error('Failed to fetch education', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchEducation();
    }
  }, [params.id]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (!education)
    return <div className="p-8 text-white">Education not found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Edit Education</h1>
      <EducationForm initialData={education} isEditing />
    </div>
  );
}
