import { Hero } from "../sections/Hero.jsx";
import { Catalog } from "../sections/Catalog.jsx";
import { Included } from "../sections/Included.jsx";
import { HowItWorks } from "../sections/HowItWorks.jsx";
import { CTA } from "../sections/CTA.jsx";

export function Home() {
  return (
    <>
      <Hero />
      <Catalog />
      <Included />
      <HowItWorks />
      <CTA />
    </>
  );
}
