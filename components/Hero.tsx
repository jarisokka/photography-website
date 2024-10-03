import { useState, useEffect } from 'react';
import coverImage from '../assets/images/cover.jpg'
import highlights from '../assets/images/cover_light.webp'
import Image from 'next/image';
import Vortex from './ui/vortexAnimation';
import CustomButton from './ui/customButton';
import { MdOutlineCamera } from "react-icons/md";

const HeroTitles = () => (
  <div className="absolute top-1/4 transform text-center z-10">
    <h1 className="hero-title">
      Chasing Light, Capturing Moments
    </h1>
    <h2 className="hero-subtitle">
      Inspired by the wild, the vast, and the tiny details of nature
    </h2>
    <a href="#gallery">
      <CustomButton
        title="Show my work"
        icon={<MdOutlineCamera />}
      />
    </a>
  </div>
);

const Hero = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home">
      <div className="relative w-full h-screen overflow-hidden">
        {!isSmallScreen ? (
          <Vortex
            rangeY={400}
            particleCount={180}
            baseHue={200}
            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          >
            <HeroTitles />
          </Vortex>
        ) : (
          <HeroTitles />
        )}
        <Image
          src={coverImage}
          alt="cover_image"
          className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-60 z-0"
        />
        <Image
          src={highlights}
          alt="highlights"
          className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom animate-light z-0"
        />
      </div>
    </section>
  );
};

export default Hero
