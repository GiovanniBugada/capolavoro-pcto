import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import ProgressBar from '@/components/ui/ProgressBar';
import SlideCounter from '@/components/ui/SlideCounter';

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
          <ProgressBar />

          <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[80] font-mono-eyebrow text-ink mix-blend-difference">
            CAPOLAVORO_PCTO_2026
          </div>

          <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[80] mix-blend-difference">
            <SlideCounter total={15} />
          </div>

          <div
            className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[80] font-mono-eyebrow text-ink mix-blend-difference pointer-events-none"
            style={{ animation: 'navHintFade 5s 4s forwards' }}
          >
            ← → SPAZIO PER NAVIGARE
          </div>

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
