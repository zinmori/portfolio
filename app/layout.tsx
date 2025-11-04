import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import '../src/index.css';
import { ModeSwitchButton } from './components/ModeSwitchButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ezechiel AGBAN - Data Scientist & Software Engineer',
  description:
    'A passionate Data Scientist and Software developer crafting digital experiences that make a difference.',
  keywords: [
    'Data Science',
    'Software Engineering',
    'Web Development',
    'Portfolio',
  ],
  authors: [{ name: 'Ezechiel AGBAN' }],
  openGraph: {
    title: 'Ezechiel AGBAN - Data Scientist & Software Engineer',
    description:
      'A passionate Data Scientist and Software developer crafting digital experiences that make a difference.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
        <ModeSwitchButton />
        <Analytics />
      </body>
    </html>
  );
}
