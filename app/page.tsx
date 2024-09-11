import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/floatingNavbar";

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
        <Footer />
      </div>
    </main>  
  );
}
