import { NextRequest, NextResponse } from 'next/server';
import { loadSpecs } from '@/lib/specs';

export async function GET(request: NextRequest) {
  try {
    const specs = loadSpecs();
    const summary = specs.slice(0, 5).map(spec => ({
      id: spec.id,
      createdAt: spec.createdAt,
      goal: spec.goal,
      users: spec.users,
      constraints: spec.constraints
    }));

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching specs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch specs' },
      { status: 500 }
    );
  }
}
