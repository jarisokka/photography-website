import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import geoData from "../../assets/data/countries-50m.json";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

interface GeographyProps {
  rsmKey: string;
  properties: {
    name: string;
  };
}

const WorldMap = () => {
  const visitedCountries = [
    "Finland",
    "Sweden",
    "Norway",
    "Germany",
    "Belgium",
    "Hungary",
    "United States of America",
    "Spain",
    "South Africa",
    "Lesotho",
    "Canada",
    "Japan",
    "Tunisia",
    "Italy",
    "Thailand",
    "Vietnam",
    "Malaysia",
    "Russia",
    "Switzerland",
    "Slovenia",
    "Austria",
    "China",
    "Greece"
  ];

  return (
    <>
      <ComposableMap>
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={5}>
          <Geographies geography={geoData}>
            {({ geographies }: { geographies: GeographyProps[] }) =>
              geographies
                .filter((geo: GeographyProps) => geo.properties.name !== "Antarctica")
                .map((geo: GeographyProps) => {
                const isVisited = visitedCountries.includes(geo.properties.name);

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
                    data-tooltip-id="tooltip"
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <Tooltip id="tooltip" place="top" style={{ backgroundColor: 'black', color: 'white' }} />
    </>
  );
};

export default WorldMap;
