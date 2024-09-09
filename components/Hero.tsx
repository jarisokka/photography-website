"use client";

import cover_image from '../assets/images/kansi.jpg'
import Image from 'next/image';
import { Vortex } from './ui/vortex';

const Hero = () => {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
        <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={200}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Chasing Light, Capturing Moments
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            Inspired by the wild, the vast, and the tiny details of nature
        </div>
      </Vortex>
      <Image
          src={cover_image}
          alt="cover_image"
          className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-60"
        />
    </div>
  )
}

export default Hero
