import React from 'react'
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import geoData from "../../assets/data/countries-50m.json"
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

interface GeographyProps {
  rsmKey: string;
  properties: {
    name: string;
  };
}


const WorldMap = () => {
  return (
    <>
      <ComposableMap>
        <Geographies geography={geoData}>
          {({ geographies }: { geographies: GeographyProps[] }) =>
            geographies.map((geo: GeographyProps) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#e5e5e5", outline: "none" },
                  hover: { fill: "#334155", outline: "none" },
                  pressed: { outline: "none" }
                }}
                onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                  const tooltipElement = e.currentTarget;
                  tooltipElement.setAttribute("data-tooltip-content", geo.properties.name);
                }}
                data-tooltip-id="tooltip"
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      <Tooltip id="tooltip" place="top" style={{ backgroundColor: 'black', color: 'white' }}/>
    </>
  );
}

export default WorldMap
