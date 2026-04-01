import type { Metadata } from 'next';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider';
import { AccessibilityPanel } from '@/components/ui/AccessibilityPanel';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrindaWorld - Girls Empowerment EdTech Platform',
  description: 'Empower girls through chess, coding, geography, and leadership education',
  keywords: 'girls education, chess, coding, edtech, leadership, empowerment',
  authors: [{ name: 'BrindaWorld' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'BrindaWorld - Girls Empowerment EdTech Platform',
    description: 'Empower girls through chess, coding, geography, and leadership education',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'BrindaWorld',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrindaWorld',
    description: 'Empower girls through chess, coding, geography, and leadership education',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6B21A8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <AccessibilityProvider>
          <AuthProvider>
            <AnalyticsProvider>
              <main id="main-content">
                {children}
              </main>
              <AccessibilityPanel />
            </AnalyticsProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
