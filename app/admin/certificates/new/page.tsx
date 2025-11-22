'use client';

import CertificateForm from '../_components/CertificateForm';

export default function NewCertificatePage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Add Certificate</h1>
      <CertificateForm />
    </div>
  );
}
