import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
//import { geoCentroid } from "d3-geo";
import geoData from "../../assets/data/countries-50m.json";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

interface GeographyProps {
  rsmKey: string;
  properties: {
    name: string;
  };
  geometry: any;
}

interface WorldMapProps {
  visitedCountries: { name: string; region: string }[];
}

const WorldMap: React.FC<WorldMapProps> = ({ visitedCountries }) => {

  const regionZoomConfig: { [key: string]: { rotate: [number, number, number], coordinates: [number, number], scale: number } } = {
    Europe: { rotate: [-10, -10, 0], coordinates: [10, 45], scale: 550 },
    Africa: { rotate: [0, 0, 0], coordinates: [20, 0], scale: 300 },
    Asia: { rotate: [-10, -25, -35], coordinates: [90, -10], scale: 400 }, 
    NorthAmerica: { rotate: [100, -10, 0], coordinates: [-10, 40], scale: 400 },
  };

  const [position, setPosition] = useState({ rotate:[-11, 0, 0] as [number, number, number], coordinates: [0, 10] as [number, number], scale: 155 });
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const handleZoomIn = (geo: GeographyProps) => {
    const countryName = geo.properties.name;
  
    // Find the country in the visitedCountries list
    const countryData = visitedCountries.find(country => country.name === countryName);
    
    // If country exists and its region has a zoom config, zoom to that region
    if (countryData && regionZoomConfig[countryData.region]) {
      const { rotate, coordinates, scale } = regionZoomConfig[countryData.region];
      setPosition({
        rotate,
        coordinates,
        scale,
      });
      setIsZoomedIn(true);
    }
  };

  const handleReset = () => {
    setPosition({ rotate:[-11, 0, 0], coordinates: [0, 8], scale: 155 });
    setIsZoomedIn(false);
  };

  return (
    <div className="bg-slate-700/[0.2] rounded-md">
      {isZoomedIn && (
          <button 
            className="absolute top-4 right-4 h-12 w-50 overflow-hidden rounded-lg p-[3px] border border-white focus:outline-none hover:bg-[rgba(65,80,95,0.5)] z-10"
            onClick={handleReset}
          >
            <span
              className="px-3 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
                bg-transparent md:text-base text-xs text-neutral-200 gap-2"
            >
              Reset
            </span> 
          </button>
        )}
      <ComposableMap
        width={800}
        height={400}
        style={{ width: "auto", height: "100%" }}
        projectionConfig={{
          rotate: position.rotate,
          center: position.coordinates,
          scale: position.scale
        }}
        
      >     
          <Geographies geography={geoData}>
            {({ geographies }: { geographies: GeographyProps[] }) =>
              geographies
                .filter((geo: GeographyProps) => geo.properties.name !== "Antarctica")
                .map((geo: GeographyProps) => {
                
                const isVisited = visitedCountries.some(country => country.name === geo.properties.name);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#e5e5e5"
                    strokeWidth={0.3}
                    style={{
                      default: {
                        fill: isVisited ? "#334155" : "#000000",
                        outline: "none"
                      },
                      hover: {
                        fill: isVisited ? "#334155" : "#000000",
                        outline: "none"
                      },
                      pressed: { outline: "none" }
                    }}
                    onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                      const tooltipElement = e.currentTarget;
                      tooltipElement.setAttribute("data-tooltip-content", geo.properties.name);
                    }}
                    onClick={() => handleZoomIn(geo)} // Zoom in when clicked
                    data-tooltip-id="tooltip"
                  />
                );
              })
            }
          </Geographies>
      </ComposableMap>

      <Tooltip id="tooltip" place="top" style={{ backgroundColor: 'black', color: 'white' }} />

    </div>
  );
};

export default WorldMap;
