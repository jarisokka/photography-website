"use client";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Recent from "@/components/Recent";
import FloatingNav from "@/components/ui/floatingNavbar";

export const runtime = "edge";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "Recent", link: "#recent" },
  { name: "Gallery", link: "#gallery" },
  { name: "About", link: "#about" },
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
        <Footer />
      </div>
    </main>  
  );
}
