import React from 'react'
import { MovingCards } from './ui/movingCards'
import recentPhotos from '../assets/data/recent.json';

const Recent = () => {
  return (
    <div className="py-12 w-full flex justify-center items-center flex-col" id="recent">
      <h1 className="text-4xl xl:text-6xl lg:text-5xl md:text-4xl font-bold dark:text-white">
        Fresh Captures
      </h1>
      <h2 className="font-light text-base lg:text-2xl md:text-xl dark:text-neutral-200 py-4">
        Explore My Latest Work
      </h2> 
      <div className="block items-center justify-center overflow-hidden">
        <MovingCards
          items={recentPhotos}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  )
}

export default Recent
