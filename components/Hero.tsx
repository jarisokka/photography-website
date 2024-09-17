import coverImage from '../assets/images/cover.jpg'
import Image from 'next/image';
import Vortex from './ui/vortexAnimation';
import CustomButton from './ui/customButton';
import { MdOutlineCamera } from "react-icons/md";

const Hero = () => {
  return (
    <section id="home">
      <div className="relative w-full h-screen overflow-hidden">
          <Vortex
          backgroundColor="black"
          rangeY={300}
          particleCount={180}
          baseHue={200}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
        <div className="absolute top-1/4 transform text-center">
          <h1 className="text-5xl xl:text-7xl lg:text-6xl md:text-5xl font-bold dark:text-white">
            Chasing Light, Capturing Moments
          </h1>
          <h2 className="font-light text-xl lg:text-4xl md:text-2xl dark:text-neutral-200 py-4">
            Inspired by the wild, the vast, and the tiny details of nature
          </h2>
          <a href="#gallery">
              <CustomButton
                title="Show my work"
                icon={ <MdOutlineCamera/> }
              />
          </a>  
        </div>
        </Vortex>
        <Image
            src={coverImage}
            alt="cover_image"
            className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-60"
          />
      </div>
    </section>
  )
}

export default Hero
