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
  locations?: Location[];
}

interface Location {
  name: string;
  coordinates: [number, number]; // Tuple with two elements: longitude, latitude
  region: string;
  imageUrl: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ visitedCountries, locations }) => {

  const regionZoomConfig: { [key: string]: { rotate: [number, number, number], coordinates: [number, number], scale: number } } = {
    Europe: { rotate: [0, 0, 0], coordinates: [5, 57], scale: 350 },
    Africa: { rotate: [0, 0, 0], coordinates: [20, 0], scale: 300 },
    Asia: { rotate: [0, 0, 0], coordinates: [100, 25], scale: 400 },
    NorthAmerica: { rotate: [0, 0, 0], coordinates: [-100, 40], scale: 400 },
  };

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
          >Zoom Out
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
                      pressed: { fill: isVisited ? "#4f4f4f" : "#000000", outline: "none" }
                    }}
                    onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                      const tooltipElement = e.currentTarget;
                      tooltipElement.setAttribute("data-tooltip-content", geo.properties.name);
                    }}
                    onClick={() => handleZoomIn(geo)} // Zoom in when clicked
                    data-tooltip-id="tooltipCountry"
                  />
                );
              })
            }
          </Geographies>

          {isZoomedIn && locations?.map((location, index) => (
          <Marker key={index} coordinates={adjustCoordinates(location.coordinates)}>
            <g
              data-tooltip-id="tooltipLocation"
              onMouseEnter={(e) => {
                const tooltip = e.currentTarget;
                tooltip.setAttribute("data-tooltip-content", JSON.stringify({ name: location.name, imageUrl: location.imageUrl }));
              }}
              onClick={() => handleLocationClick(location.name)}
              style={{ outline: 'none' }} 
            >
            <foreignObject width="24" height="24">
              <div className="icon-container">
                <MdLocationOn
                  size={24}
                  fill="#e5e5e5"
                  className="bounce"
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </foreignObject>
            </g>
          </Marker>
        ))}
      </ComposableMap>

      <Tooltip id="tooltipCountry" place="top" style={{ backgroundColor: 'black', color: 'white' }} />

      <Tooltip
        id="tooltipLocation"
        place="top"
        render={({ content }) => {
          if (!content) return null;
          const { name, imageUrl } = JSON.parse(content);
          return (
            <div className="flex-col items-center justify-center text-center">
                {imageUrl && (
                <div>
                  <img src={imageUrl} alt="location" className="w-12 h-12" />
                </div>
                )}
              <div>{name}</div>
            </div>
          );
        }}
        style={{ backgroundColor: 'black', color: 'white', borderRadius: '8%' }}
      />
    </div>
  );
};

export default WorldMap;
