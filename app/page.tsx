import Loader from './sections/Loader';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import IndexSection from './sections/Index';
import StudioGrassi from './sections/StudioGrassi';
import Aspettative from './sections/Aspettative';
import AutoCAD from './sections/AutoCAD';
import Rilievi from './sections/Rilievi';
import Planimetrie from './sections/Planimetrie';
import Materie from './sections/Materie';
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
      <Aspettative />
      <AutoCAD />
      <Rilievi />
      <Planimetrie />
      <Materie />
      <Skills />
      <Chiusura />
    </>
  );
}
