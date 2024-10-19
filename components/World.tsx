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
      <h2>
        Tracing my travels across the globe, and a few moments captured in photos
      </h2>
      <div className="flex justify-center items-center max-h-[80vh] w-full md:px-6 px-3 overflow-hidden">
        <div className="w-full rounded-md relative pt-5">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <WorldMap visitedCountries={visitedCountries} locations={locationData as any}/>
        </div>
      </div>

    </section> 
  )
}

export default World
