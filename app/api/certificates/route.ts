import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import { getServerSession } from 'next-auth';

export async function GET() {
  await dbConnect();
  try {
    const certificates = await Certificate.find({}).sort({
      order: 1,
      date: -1,
    });
    return NextResponse.json(certificates);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch certificates' },
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
    const certificate = await Certificate.create(body);
    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create certificate' },
      { status: 500 },
    );
  }
}
