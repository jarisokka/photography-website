import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Geometry } from 'geojson';
import geoData from "../../assets/data/countries-50m.json";
import { Tooltip } from "react-tooltip";
import { MdLocationOn } from "react-icons/md";
import 'react-tooltip/dist/react-tooltip.css';
import useIntersectionObserver from '../../lib/useIntersectionObserver';

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
  imageUrl: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ visitedCountries, locations }) => {

  const regionZoomConfig: { [key: string]: { rotate: [number, number, number], coordinates: [number, number], scale: number } } = {
    Europe: { rotate: [0, 0, 0], coordinates: [5, 57], scale: 350 },
    Africa: { rotate: [0, 0, 0], coordinates: [20, 0], scale: 300 },
    Asia: { rotate: [0, 0, 0], coordinates: [100, 25], scale: 400 },
    NorthAmerica: { rotate: [0, 0, 0], coordinates: [-100, 40], scale: 400 },
  };

  const router = useRouter()
  const [position, setPosition] = useState({ rotate:[0, 0, 0] as [number, number, number], coordinates: [0, 25] as [number, number], scale: 120 });
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);
  const { isIntersecting, elementRef } = useIntersectionObserver<HTMLDivElement>();
  const [loading, setLoading] = useState(true);

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
    sessionStorage.removeItem('mapZoomState');
  };

  const handleViewImage = (imageUrl: string) => {
    // Save scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());

    // Save the current map position (zoom state)
    sessionStorage.setItem('mapZoomState', JSON.stringify(position));
    const url = `/photo?imageUrl=${encodeURIComponent(imageUrl)}`;
    router.push(url);
  };

  const adjustCoordinates = (coordinates: [number, number]): [number, number] => {
    return [coordinates[0] + (-1.65), coordinates[1] + 2.0];
  };

  useEffect(() => {
    if (isIntersecting) {
      const targetCount = visitedCountries.length - 1;
      let currentCount = 0;
      const stepTime = 50; // How fast the number increases
      const duration = 3000; // 3 seconds for full animation
  
      const increment = targetCount / (duration / stepTime); // Increment per step
  
      const animationInterval = setInterval(() => {
        if (currentCount < targetCount) {
          currentCount += increment;
          setAnimatedCount(Math.round(currentCount));
        } else {
          clearInterval(animationInterval);
        }
      }, stepTime);
  
      return () => clearInterval(animationInterval);
    }
  }, [loading, isIntersecting, isZoomedIn]);

  useEffect(() => {
    // Restore the scroll position
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }
  
    // Restore the map zoom state
    const savedZoomState = sessionStorage.getItem('mapZoomState');
    if (savedZoomState) {
      setPosition(JSON.parse(savedZoomState));
      setIsZoomedIn(true); // Indicate that the map is zoomed in
    }
    setLoading(false);
  }, []);


  return (
    <div className="relative bg-slate-700/[0.2] rounded-md" ref={elementRef}>
      {!isZoomedIn && !loading && (
            <div className="absolute md:bottom-10 bottom-4 left-4 text-center">
              <h2 className="p-0">
                Countries visited
              </h2>
              <h1 className="md:text-6xl">
                +{animatedCount}
              </h1>
            </div>
        )}
      {isZoomedIn && (
          <button 
            className="absolute sm:top-10 sm:right-4 sm:left-auto top-4 left-4 px-4 py-3 rounded-md bg-slate-700/[0.2] border border-white/[0.2] text-white text-xs font-bold hover:bg-[rgba(65,80,95,0.5)] z-10"
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
              onClick={() => handleViewImage(location.imageUrl)}
              style={{ outline: 'none' }} 
            >
            <foreignObject className="w-6 h-6">
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
            <div className="flex flex-col items-center justify-center text-center w-20 h-24">
                {imageUrl && (
                <div className="flex items-center justify-center h-full">
                  <img src={imageUrl} alt="location" className="w-16 h-16 object-cover" />
                </div>
                )}
              <div className="w-full text-center text-sm mt-auto">{name}</div>
            </div>
          );
        }}
        style={{ backgroundColor: 'black', color: 'white', borderRadius: '8%' }}
      />
    </div>
  );
};

export default WorldMap;
