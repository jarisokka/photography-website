import React from 'react'
import WorldMap from './ui/worldMap'

const visitedCountries = [
  { name: "Finland", region: "Europe" },
  { name: "Sweden", region: "Europe" },
  { name: "Norway", region: "Europe" },
  { name: "Germany", region: "Europe" },
  { name: "Belgium", region: "Europe" },
  { name: "Hungary", region: "Europe" },
  { name: "Italy", region: "Europe" },
  { name: "Russia", region: "Europe" },
  { name: "Switzerland", region: "Europe" },
  { name: "Slovenia", region: "Europe" },
  { name: "Austria", region: "Europe" },
  { name: "Greece", region: "Europe" },
  { name: "Estonia", region: "Europe" },
  { name: "Poland", region: "Europe" },
  { name: "Spain", region: "Europe" },
  { name: "South Africa", region: "Africa" },
  { name: "Lesotho", region: "Africa" },
  { name: "Tunisia", region: "Africa" },
  { name: "Japan", region: "Asia" },
  { name: "Malaysia", region: "Asia" },
  { name: "Vietnam", region: "Asia" },
  { name: "Thailand", region: "Asia" },
  { name: "China", region: "Asia" },
  { name: "United States of America", region: "NorthAmerica" },
  { name: "Canada", region: "NorthAmerica" },
];

const locationData = [
  { name: "Rome", coordinates: [12.4964, 41.9028], region: "Europe", imageUrl: "/images/travel/EV2A2762.jpg" },
  { name: "Paris", coordinates: [2.3522, 48.8566], region: "Europe", imageUrl: "/images/travel/EV2A2762.jpg" },
  { name: "Tokyo", coordinates: [139.6917, 35.6895], region: "Asia", imageUrl: "/images/travel/EV2A2762.jpg" }, 
  { name: "London", coordinates: [-0.1180, 51.5099], region: "Europe", imageUrl: "/images/travel/EV2A2762.jpg" },
  { name: "New York", coordinates: [-74.006, 40.7128], region: "NorthAmerica", imageUrl: "/images/travel/EV2A2762.jpg" }
];

const World = () => {
  return (
    <section className="section-container" id="about">
      <h1>
        New section
      </h1>
      <h2>
        Something here
      </h2>
      <div className="flex justify-center items-center max-h-[80vh] w-full md:px-6 px-3 overflow-hidden">
        <div className="w-full rounded-md relative">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <WorldMap visitedCountries={visitedCountries} locations={locationData as any}/>
        </div>
      </div>

    </section> 
  )
}

export default World
