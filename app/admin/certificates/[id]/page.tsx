'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CertificateForm from '../_components/CertificateForm';

export default function EditCertificatePage() {
  const params = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await fetch(`/api/certificates/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setCertificate(data);
        }
      } catch (error) {
        console.error('Failed to fetch certificate', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCertificate();
    }
  }, [params.id]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (!certificate)
    return <div className="p-8 text-white">Certificate not found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Edit Certificate</h1>
      <CertificateForm initialData={certificate} isEditing />
    </div>
  );
}
