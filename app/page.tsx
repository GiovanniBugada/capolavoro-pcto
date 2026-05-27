import Loader from './sections/Loader';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import IndexSection from './sections/Index';
import StudioGrassi from './sections/StudioGrassi';
import SettoriGeometra from './sections/SettoriGeometra';
import Aspettative from './sections/Aspettative';
import QuattroAree from './sections/QuattroAree';
import AutoCAD from './sections/AutoCAD';
import Rilievi from './sections/Rilievi';
import Planimetrie from './sections/Planimetrie';
import Materie from './sections/Materie';
import Verticali from './sections/Verticali';
import Skills from './sections/Skills';
import Chiusura from './sections/Chiusura';

export default function Page() {
  return (
    <>
      <Loader />
      <Hero />
      <Manifesto />
      <IndexSection />
      <StudioGrassi />
      <SettoriGeometra />
      <Aspettative />
      <QuattroAree />
      <AutoCAD />
      <Rilievi />
      <Planimetrie />
      <Materie />
      <Verticali />
      <Skills />
      <Chiusura />
    </>
  );
}
