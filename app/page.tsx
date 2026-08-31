import { AboutSummary } from "@/components/AboutSummary";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SitePreloader } from "@/components/SitePreloader";
import { SkipLink } from "@/components/SkipLink";

export default function Home() {
  return (
    <>
      <SkipLink />
      <SitePreloader />
      <Header />
      <main id="main">
        <Hero />
        <AboutSummary />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
