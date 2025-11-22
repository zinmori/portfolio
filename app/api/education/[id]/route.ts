import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Education from '@/models/Education';
import { getServerSession } from 'next-auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  try {
    const education = await Education.findById(id);
    if (!education) {
      return NextResponse.json(
        { error: 'Education not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  try {
    const body = await request.json();
    const education = await Education.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!education) {
      return NextResponse.json(
        { error: 'Education not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update education' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;
  try {
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return NextResponse.json(
        { error: 'Education not found' },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 },
    );
  }
}
