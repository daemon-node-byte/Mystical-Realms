import { Whisper, Didact_Gothic } from 'next/font/google';

export const themeFont1 = Whisper({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-theme-font-1',
});

export const themeFont2 = Didact_Gothic({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-theme-font-2',
});
