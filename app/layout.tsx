import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import ThemeObserver from '@/components/providers/ThemeObserver';
import CustomCursor from '@/components/ui/CustomCursor';
import ProgressBar from '@/components/ui/ProgressBar';
import SlideCounter from '@/components/ui/SlideCounter';
import ScrollTopButton from '@/components/ui/ScrollTopButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Dall’informatica al territorio — Giovanni Bugada · Capolavoro PCTO 2025–26',
  description:
    'Capolavoro per l’Esame di Stato 2025–26 di Giovanni Bugada (5A INF, ISISS Valle Seriana). Il PCTO presso lo Studio Geom. Sergio Grassi: AutoCAD, rilievi, planimetrie catastali — e l’incontro fra informatica e territorio.',
  authors: [{ name: 'Giovanni Bugada' }],
  keywords: [
    'PCTO',
    'Esame di Stato',
    'capolavoro',
    'AutoCAD',
    'rilievi',
    'planimetrie',
    'ISISS Valle Seriana',
    'Studio Grassi',
    'informatica',
    'territorio',
  ],
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} ${instrument.variable} ${mono.variable}`}>
      <body>
        <LenisProvider>
          <ThemeObserver />
          <ProgressBar />

          {/* Slide counter — top right */}
          <div className="fixed top-5 right-6 md:top-6 md:right-8 z-[80] pointer-events-none overlay-invert">
            <SlideCounter total={11} />
          </div>

          {/* Hint — bottom right, fades after 6s */}
          <div
            className="fixed bottom-5 right-6 md:bottom-6 md:right-8 z-[80] pointer-events-none overlay-invert"
            style={{ animation: 'navHintFade 6s 5s forwards' }}
          >
            <span className="font-mono uppercase tracking-widest-mono text-[10px] opacity-80">
              SCORRI ↓
            </span>
          </div>

          <ScrollTopButton />
          <CustomCursor />
          {children}
        </LenisProvider>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes navHintFade {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }
        ` }} />
      </body>
    </html>
  );
}
