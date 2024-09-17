"use client";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Recent from "@/components/Recent";
import FloatingNav from "@/components/ui/floatingNavbar";

export const runtime = "edge";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "Recent", link: "#recent" },
  { name: "About", link: "#about" },
  { name: "Gallery", link: "#gallery" },
  { name: "Contact", link: "#contact" },
];

export default function Home() {
  return (
    <main>
      <div>
        <FloatingNav navItems={navItems} />
        <Hero />
        <Recent />
        <About />
        <Gallery />
        <Footer />
      </div>
    </main>  
  );
}
