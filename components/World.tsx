import React from 'react'
import WorldMap from './ui/worldMap'
import visitedCountries from "../assets/data/visited-countries-data.json"
import locationData from "../assets/data/location-data.json"

const World = () => {
  return (
    <section className="section-container" id="travels">
      <h1>
        Mapping My Adventures
      </h1>
      <div className="mx-8 md:mx-6 text-center">
        <h2>
          Tracing my travels across the globe, and a few moments captured in photos
        </h2>
        <p>
        Join me as I explore the world, one country at a time. Below is a map highlighting the places I&apos;ve visited across the globe. Click on any country to zoom into that region and discover some of the stunning locations I&apos;ve captured in photos. Hover over the pins to see a glimpse of these spots, and click for a full-screen view of the moment.
        </p>  
      </div>
      <div className="flex justify-center items-center max-h-[80vh] w-full md:px-6 px-3 overflow-hidden">
        <div className="w-full rounded-md relative mt-5 bg-slate-700/[0.2]">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <WorldMap visitedCountries={visitedCountries} locations={locationData as any}/>
        </div>
      </div>

    </section> 
  )
}

export default World
