import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Geometry } from 'geojson';
//import { geoCentroid, geoOrthographic, geoMercator, GeoProjection } from "d3-geo";
import geoData from "../../assets/data/countries-50m.json";
import { Tooltip } from "react-tooltip";
import { MdLocationOn } from "react-icons/md";
import 'react-tooltip/dist/react-tooltip.css';

interface GeographyProps {
  rsmKey: string;
  properties: {
    name: string;
  };
  geometry: Geometry;
}

interface WorldMapProps {
  visitedCountries: { name: string; region: string }[];
}

interface Location {
  name: string;
  coordinates: [number, number]; // Tuple with two elements: longitude, latitude
  region: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ visitedCountries }) => {

  const regionZoomConfig: { [key: string]: { rotate: [number, number, number], coordinates: [number, number], scale: number } } = {
    Europe: { rotate: [0, 0, 0], coordinates: [5, 57], scale: 350 },
    Africa: { rotate: [0, 0, 0], coordinates: [20, 0], scale: 300 },
    Asia: { rotate: [0, 0, 0], coordinates: [100, 25], scale: 400 },
    NorthAmerica: { rotate: [0, 0, 0], coordinates: [-100, 40], scale: 400 },
  };

    // Example list of locations
    const locations: Location[] = [
      { name: "Rome", coordinates: [12.4964, 41.9028], region: "Europe" },
      { name: "Paris", coordinates: [2.3522, 48.8566], region: "Europe" },
      { name: "Tokyo", coordinates: [139.6917, 35.6895], region: "Asia" }, 
      { name: "London", coordinates: [-0.1180, 51.5099], region: "Europe" },
      { name: "New York", coordinates: [-74.006, 40.7128], region: "NorthAmerica" }
    ];

  const [position, setPosition] = useState({ rotate:[0, 0, 0] as [number, number, number], coordinates: [0, 25] as [number, number], scale: 120 });
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
    setPosition({ rotate:[0, 0, 0], coordinates: [0, 25], scale: 120 });
    setIsZoomedIn(false);
  };

  const handleLocationClick = (locationName: string) => {
    console.log(`Clicked on location: ${locationName}`);
  };

  const adjustCoordinates = (coordinates: [number, number]): [number, number] => {
    return [coordinates[0] + -1.5, coordinates[1] + 2.4];
  };

  return (
    <div className="relative bg-slate-700/[0.2] rounded-md">
      {isZoomedIn && (
          <button 
            className="absolute top-10 right-4 ml-auto px-4 py-3 rounded-md bg-slate-700/[0.2] border border-white/[0.2] text-white text-xs font-bold hover:bg-[rgba(65,80,95,0.5)] z-10"
            onClick={handleReset}
          >Reset
          </button>
        )}
      <ComposableMap
        width={800}
        height={400}
        projection="geoMercator"
        style={{ width: "100%", height: "auto" }}
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
                    stroke="#bbbbbb"
                    strokeWidth={0.2}
                    
                    style={{
                      default: {
                        fill: isVisited ? "#333333" : "none",
                        outline: "none"
                      },
                      hover: {
                        fill: isVisited ? "#4f4f4f" : "#000000",
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

          {isZoomedIn && locations.map((location, index) => (
          <Marker key={index} coordinates={adjustCoordinates(location.coordinates)}>
            <MdLocationOn
              size={24}
              fill="red"
              style={{ cursor: 'pointer' }} 
              onClick={() => handleLocationClick(location.name)}
            />
          </Marker>
        ))}
      </ComposableMap>

      <Tooltip id="tooltip" place="top" style={{ backgroundColor: 'black', color: 'white' }} />

    </div>
  );
};

export default WorldMap;
