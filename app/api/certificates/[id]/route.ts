import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import { getServerSession } from 'next-auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  try {
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch certificate' },
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
    const certificate = await Certificate.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update certificate' },
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
    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete certificate' },
      { status: 500 },
    );
  }
}
