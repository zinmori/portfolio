'use client';

import ProjectForm from '../_components/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      <ProjectForm />
    </div>
  );
}
