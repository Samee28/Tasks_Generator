import { NextRequest, NextResponse } from 'next/server';
import { loadSpecs } from '@/lib/specs';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const specs = loadSpecs();
    const spec = specs.find(s => s.id === params.id);

    if (!spec) {
      return NextResponse.json(
        { error: 'Specification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(spec);
  } catch (error) {
    console.error('Error fetching spec:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spec' },
      { status: 500 }
    );
  }
}
