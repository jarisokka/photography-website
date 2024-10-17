import React from 'react'
import WorldMap from './ui/worldMap'

const visitedCountries = [
  { name: "Finland", region: "Europe" },
  { name: "Sweden", region: "Europe" },
  { name: "Norway", region: "Europe" },
  { name: "Denmark", region: "Europe" },
  { name: "Germany", region: "Europe" },
  { name: "Czechia", region: "Europe" },
  { name: "San Marino", region: "Europe" },
  { name: "Portugal", region: "Europe" },
  { name: "Spain", region: "Europe" },
  { name: "Belgium", region: "Europe" },
  { name: "Hungary", region: "Europe" },
  { name: "Italy", region: "Europe" },
  { name: "Russia", region: "Europe" },
  { name: "Switzerland", region: "Europe" },
  { name: "Slovenia", region: "Europe" },
  { name: "Austria", region: "Europe" },
  { name: "Greece", region: "Europe" },
  { name: "Cyprus", region: "Europe" },
  { name: "Estonia", region: "Europe" },
  { name: "Poland", region: "Europe" },
  { name: "Netherlands", region: "Europe" },
  { name: "France", region: "Europe" },
  { name: "Monaco", region: "Europe" },
  { name: "United Kingdom", region: "Europe" },
  { name: "South Africa", region: "Africa" },
  { name: "eSwatini", region: "Africa" },
  { name: "Tunisia", region: "Africa" },
  { name: "Japan", region: "Asia" },
  { name: "Malaysia", region: "Asia" },
  { name: "Vietnam", region: "Asia" },
  { name: "Indonesia", region: "Asia" },
  { name: "Singapore", region: "Asia" },
  { name: "Thailand", region: "Asia" },
  { name: "China", region: "Asia" },
  { name: "Cambodia", region: "Asia" },
  { name: "United States of America", region: "NorthAmerica" },
  { name: "Canada", region: "NorthAmerica" },
];

const locationData = [
  { name: "Rome", coordinates: [12.4964, 41.9028], imageUrl: "/images/travel/EV2A2762.jpg" },
  { name: "Paris", coordinates: [2.3522, 48.8566], imageUrl: "/images/travel/EV2A2762.jpg" },
  { name: "Tokyo", coordinates: [139.6917, 35.6895], imageUrl: "/images/travel/EV2A2762.jpg" },
  { name: "Kyoto", coordinates: [135.768326, 35.011665], imageUrl: "/images/travel/EV2A2762.jpg" },  
  { name: "London", coordinates: [-0.1180, 51.5099], imageUrl: "/images/travel/EV2A2762.jpg" },
  { name: "New York", coordinates: [-74.006, 40.7128], imageUrl: "/images/travel/EV2A2762.jpg" }
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
