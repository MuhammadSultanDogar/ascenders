import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import SocialWall from "@/components/sections/SocialWall";
import Contact from "@/components/sections/Contact";
import MarketsStrip from "@/components/sections/MarketsStrip";
import PartnersStrip from "@/components/sections/PartnersStrip";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <PartnersStrip />
        <MarketsStrip />
        <Services />
        <Portfolio />
        <About />
        <SocialWall />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
