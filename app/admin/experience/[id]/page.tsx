'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ExperienceForm from '../_components/ExperienceForm';

export default function EditExperiencePage() {
  const params = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`/api/experience/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setExperience(data);
        }
      } catch (error) {
        console.error('Failed to fetch experience', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchExperience();
    }
  }, [params.id]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (!experience)
    return <div className="p-8 text-white">Experience not found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Edit Experience</h1>
      <ExperienceForm initialData={experience} isEditing />
    </div>
  );
}
