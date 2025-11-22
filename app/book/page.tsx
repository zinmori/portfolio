import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Experience from '@/models/Experience';
import Education from '@/models/Education';
import Certificate from '@/models/Certificate';
import BookContent from './_components/BookContent';

export const dynamic = 'force-dynamic';

async function getData() {
  await dbConnect();

  const projects = await Project.find({})
    .sort({ order: 1, createdAt: -1 })
    .lean();
  const experiences = await Experience.find({}).sort({ startDate: -1 }).lean();
  const educations = await Education.find({}).sort({ startDate: -1 }).lean();
  const certificates = await Certificate.find({}).sort({ date: -1 }).lean();

  // Helper to serialize MongoDB documents
  const serialize = (data: any[]) =>
    data.map((item) => {
      const serialized = { ...item };

      // Convert _id to string
      if (serialized._id) serialized._id = serialized._id.toString();

      // Convert dates to ISO strings
      if (serialized.startDate)
        serialized.startDate = new Date(serialized.startDate).toISOString();
      if (serialized.endDate)
        serialized.endDate = new Date(serialized.endDate).toISOString();
      if (serialized.date)
        serialized.date = new Date(serialized.date).toISOString();
      if (serialized.createdAt)
        serialized.createdAt = new Date(serialized.createdAt).toISOString();
      if (serialized.updatedAt)
        serialized.updatedAt = new Date(serialized.updatedAt).toISOString();

      return serialized;
    });

  return {
    projects: serialize(projects),
    experiences: serialize(experiences),
    educations: serialize(educations),
    certificates: serialize(certificates),
  };
}

export default async function BookPage() {
  const { projects, experiences, educations, certificates } = await getData();

  return (
    <BookContent
      projects={projects}
      experiences={experiences}
      educations={educations}
      certificates={certificates}
    />
  );
}
