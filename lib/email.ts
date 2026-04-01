/**
 * Email Service - Supports Resend or Brevo
 * Free tier: Resend (100 emails/day), Brevo (300 emails/day)
 * Falls back to console logging if no API key is configured
 */

type EmailProvider = 'resend' | 'brevo' | 'console';

interface EmailOptions {
  to: string;
  from?: string;
  subject: string;
  html?: string;
  text?: string;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const getEmailProvider = (): EmailProvider => {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (process.env.BREVO_API_KEY) return 'brevo';
  return 'console';
};

const DEFAULT_FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@brindaworld.com';

/**
 * Send email via Resend
 */
async function sendViaResend(options: EmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: 'RESEND_API_KEY not configured',
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from || DEFAULT_FROM_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.id,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Send email via Brevo
 */
async function sendViaBrevo(options: EmailOptions): Promise<SendEmailResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: 'BREVO_API_KEY not configured',
    };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: options.from || DEFAULT_FROM_EMAIL },
        to: [{ email: options.to }],
        subject: options.subject,
        htmlContent: options.html,
        textContent: options.text,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Console logging fallback
 */
function sendViaConsole(options: EmailOptions): SendEmailResult {
  console.log('[EMAIL] Development mode - logging to console');
  console.log(`To: ${options.to}`);
  console.log(`From: ${options.from || DEFAULT_FROM_EMAIL}`);
  console.log(`Subject: ${options.subject}`);
  console.log(`---`);
  console.log(options.html || options.text || '(No content)');
  console.log(`---`);

  return {
    success: true,
    messageId: `dev-${Date.now()}`,
  };
}

/**
 * Send an email
 */
export async function sendEmail(options: EmailOptions): Promise<SendEmailResult> {
  const provider = getEmailProvider();

  console.log(`[EMAIL] Sending via ${provider}:`, options.to);

  if (provider === 'resend') {
    return sendViaResend(options);
  } else if (provider === 'brevo') {
    return sendViaBrevo(options);
  } else {
    return sendViaConsole(options);
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(email: string, name: string): Promise<SendEmailResult> {
  return sendEmail({
    to: email,
    subject: 'Welcome to BrindaWorld!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { color: #6B21A8; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .content { margin-bottom: 20px; }
            .cta {
              background-color: #6B21A8;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
            }
            .footer { font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Welcome to BrindaWorld!</div>

            <div class="content">
              <p>Hi ${name},</p>

              <p>Welcome to BrindaWorld! We're excited to have you join our community of girls learning, growing, and empowering themselves through education.</p>

              <p>You now have access to:</p>
              <ul>
                <li>Six learning modules: Chess, Coding, She Can Be, Geography, Leadership, and Wellness</li>
                <li>Progress tracking and achievement badges</li>
                <li>Personalized learning paths</li>
                <li>Community support and mentorship</li>
              </ul>

              <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://brindaworld.com'}/modules/chess" class="cta">
                  Start Learning Now
                </a>
              </p>
            </div>

            <div class="footer">
              <p>Questions? Contact us at support@brindaworld.com</p>
              <p>&copy; 2026 Simonova Inc. Empowering girls through education.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Welcome to BrindaWorld!\n\nHi ${name},\n\nWelcome to BrindaWorld! We're excited to have you join our community.\n\nYou now have access to six learning modules and more. Visit https://brindaworld.com/modules/chess to get started.\n\nQuestions? Contact support@brindaworld.com`,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetLink: string,
  name: string
): Promise<SendEmailResult> {
  return sendEmail({
    to: email,
    subject: 'Reset Your BrindaWorld Password',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { color: #6B21A8; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .content { margin-bottom: 20px; }
            .cta {
              background-color: #6B21A8;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
            }
            .warning { background-color: #FEF3C7; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Reset Your Password</div>

            <div class="content">
              <p>Hi ${name},</p>

              <p>We received a request to reset your BrindaWorld password. Click the button below to create a new password.</p>

              <p>
                <a href="${resetLink}" class="cta">Reset Password</a>
              </p>

              <p>This link will expire in 24 hours.</p>

              <div class="warning">
                <strong>Didn't request this?</strong> If you didn't request a password reset, you can safely ignore this email. Your password won't change unless you click the link above.
              </div>
            </div>

            <div class="footer">
              <p>Questions? Contact us at support@brindaworld.com</p>
              <p>&copy; 2026 Simonova Inc. Empowering girls through education.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Reset Your Password\n\nHi ${name},\n\nClick this link to reset your password:\n${resetLink}\n\nThis link expires in 24 hours.\n\nDidn't request this? Ignore this email.\n\nQuestions? Contact support@brindaworld.com`,
  });
}

/**
 * Send parental consent verification email
 */
export async function sendParentalConsentEmail(
  email: string,
  consentLink: string,
  childName: string
): Promise<SendEmailResult> {
  return sendEmail({
    to: email,
    subject: 'Verify Parental Consent for BrindaWorld',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { color: #6B21A8; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .content { margin-bottom: 20px; }
            .cta {
              background-color: #6B21A8;
              color: white;
              padding: 10px 20px;
              border-radius: 5px;
              text-decoration: none;
              display: inline-block;
            }
            .footer { font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Verify Parental Consent</div>

            <div class="content">
              <p>Hello,</p>

              <p>A request was made to create a BrindaWorld account for ${childName}. To comply with child safety regulations, we need your parental consent.</p>

              <p>Please verify your consent by clicking the button below:</p>

              <p>
                <a href="${consentLink}" class="cta">Verify Parental Consent</a>
              </p>

              <p>This verification link will expire in 7 days. If you didn't request this, please disregard this email.</p>
            </div>

            <div class="footer">
              <p>Questions? Contact us at support@brindaworld.com</p>
              <p>&copy; 2026 Simonova Inc. Empowering girls through education.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Verify Parental Consent\n\nHello,\n\nA request was made to create a BrindaWorld account for ${childName}. Click the link below to verify your parental consent:\n${consentLink}\n\nThis link expires in 7 days.\n\nQuestions? Contact support@brindaworld.com`,
  });
}
