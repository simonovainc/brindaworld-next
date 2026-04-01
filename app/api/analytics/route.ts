import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface AnalyticsEventPayload {
  eventType: string;
  metadata?: Record<string, any>;
  sessionId: string;
  profileId?: string;
  timestamp: number;
}

interface RequestBody {
  events: AnalyticsEventPayload[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    // Validate request shape
    if (!Array.isArray(body.events)) {
      return NextResponse.json(
        { error: 'Invalid request: events must be an array' },
        { status: 400 }
      );
    }

    if (body.events.length === 0) {
      return NextResponse.json({ success: true, inserted: 0 });
    }

    // Validate each event
    const validEvents = body.events.filter((event) => {
      return (
        event.eventType &&
        event.sessionId &&
        typeof event.timestamp === 'number'
      );
    });

    if (validEvents.length === 0) {
      return NextResponse.json(
        { error: 'No valid events in request' },
        { status: 400 }
      );
    }

    // Transform events for insertion
    const insertData = validEvents.map((event) => ({
      event_type: event.eventType,
      session_id: event.sessionId,
      profile_id: event.profileId || null,
      metadata: event.metadata || {},
      created_at: new Date(event.timestamp).toISOString(),
    }));

    // Use admin client to insert events (allows anon session events)
    const adminClient = createAdminClient();
    const { error, data } = await adminClient
      .from('analytics_events')
      .insert(insertData);

    if (error) {
      console.error('Failed to insert analytics events:', error);
      return NextResponse.json(
        { error: 'Failed to insert events' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inserted: validEvents.length,
    });
  } catch (error) {
    console.error('Analytics endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
