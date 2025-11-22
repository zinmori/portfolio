import { Crimson_Text, Homemade_Apple } from 'next/font/google';

export const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
});

export const homemadeApple = Homemade_Apple({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-homemade',
  display: 'swap',
});
