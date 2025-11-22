import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Education from '@/models/Education';
import { getServerSession } from 'next-auth';

export async function GET() {
  await dbConnect();
  try {
    const education = await Education.find({}).sort({
      order: 1,
      startDate: -1,
    });
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  try {
    const body = await request.json();
    const education = await Education.create(body);
    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 },
    );
  }
}
