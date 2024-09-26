import React from 'react'
import { MovingCards } from './ui/movingCards'
import recentPhotos from '../assets/data/recent.json';

const Recent = () => {
  return (
    <section className="section-container" id="recent">
      <h1>
        Fresh Captures
      </h1>
      <h2>
        Explore My Latest Work
      </h2> 
      <div className="block items-center justify-center overflow-hidden">
        <MovingCards
          items={recentPhotos}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  )
}

export default Recent
