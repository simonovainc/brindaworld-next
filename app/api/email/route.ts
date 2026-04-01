import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

/**
 * Simple in-memory rate limiting (reset on server restart)
 * For production, use Redis or similar
 */
const rateLimits = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 emails per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimits.get(ip) || [];

  // Remove old timestamps
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW);

  if (recent.length >= RATE_LIMIT_MAX) {
    return false;
  }

  recent.push(now);
  rateLimits.set(ip, recent);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { to, subject, html, text, from } = body;

    // Validate input
    if (!to || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Require at least html or text content
    if (!html && !text) {
      return NextResponse.json(
        { error: 'Missing required fields: html or text content' },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendEmail({
      to,
      subject,
      html,
      text,
      from,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint returns API documentation
 */
export async function GET() {
  return NextResponse.json({
    message: 'Email API endpoint',
    endpoint: '/api/email',
    method: 'POST',
    documentation: {
      description: 'Send emails via the configured provider (Resend, Brevo, or console)',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        to: 'recipient@example.com (required)',
        subject: 'Email subject (required)',
        html: 'HTML content (optional)',
        text: 'Plain text content (optional)',
        from: 'sender@example.com (optional, defaults to noreply@brindaworld.com)',
      },
      response: {
        success: 'boolean',
        messageId: 'string (if success)',
        error: 'string (if error)',
      },
      rateLimiting: '5 emails per minute per IP',
    },
  });
}
