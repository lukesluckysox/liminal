import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Liminal — A Cabinet of Instruments for Thought',
  description:
    'Six serious thinking tools. Not chatbots, not therapy. Each tool performs a distinct mode of inquiry.',
  openGraph: {
    title: 'Liminal',
    description: 'A cabinet of instruments for thought.',
    type: 'website',
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
        {/* Fonts: Cormorant Garamond (display) + Satoshi (body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0c0b09" />
      </head>
      <body>{children}</body>
    </html>
  );
}
