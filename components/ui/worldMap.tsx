"use client";

import React, { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Geometry } from 'geojson';
import { IconArrowLeft, IconArrowRight, IconCamera, IconChevronRight, IconFocus2, IconMapPin, IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import geoData from '../../assets/data/countries-50m.json';

type Region = 'World' | 'Europe' | 'Asia' | 'NorthAmerica' | 'Africa';
interface GeographyProps { rsmKey: string; properties: { name: string }; geometry: Geometry; }
interface Country { name: string; region: string; iso2: string; visitedYear?: number; }
interface Location { name: string; countryIso2: string; coordinates: [number, number]; imageUrl: string; }
interface WorldMapProps { visitedCountries: Country[]; locations?: Location[]; }

const regionZoomConfig: Record<Region, { coordinates: [number, number]; scale: number }> = {
  World: { coordinates: [0, 25], scale: 120 }, Europe: { coordinates: [8, 53], scale: 350 },
  Asia: { coordinates: [105, 28], scale: 275 }, NorthAmerica: { coordinates: [-100, 41], scale: 275 }, Africa: { coordinates: [20, 2], scale: 260 },
};
const countryLabel = (country?: Country) => country?.name === 'United States of America' ? 'USA' : country?.name;

// The map is always projected once at world scale; "flying" to a region is done by
// animating a CSS transform on a wrapper <g> (GPU-composited, no re-projection).
const MAP_W = 980, MAP_H = 500;
const WORLD_CENTER = regionZoomConfig.World.coordinates;
const WORLD_SCALE = regionZoomConfig.World.scale;
const rawMercator = (lng: number, lat: number): [number, number] => [(lng * Math.PI) / 180, Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))];
const projectWorld = ([lng, lat]: [number, number]): [number, number] => {
  const [rx, ry] = rawMercator(lng, lat);
  const [crx, cry] = rawMercator(WORLD_CENTER[0], WORLD_CENTER[1]);
  return [MAP_W / 2 + WORLD_SCALE * (rx - crx), MAP_H / 2 - WORLD_SCALE * (ry - cry)];
};

const WorldMap: React.FC<WorldMapProps> = ({ visitedCountries, locations = [] }) => {
  const [activeRegion, setActiveRegion] = useState<Region>('World');
  const [selectedCountryName, setSelectedCountryName] = useState('Japan');
  const [zoom, setZoom] = useState(1);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const selectedCountry = visitedCountries.find((country) => country.name === selectedCountryName) ?? visitedCountries[0];
  const selectedLocations = useMemo(() => locations.filter((location) => location.countryIso2 === selectedCountry?.iso2), [locations, selectedCountry]);
  const visibleLocations = useMemo(() => activeRegion === 'World' ? [] : locations.filter((location) => visitedCountries.find((country) => country.iso2 === location.countryIso2)?.region === activeRegion), [activeRegion, locations, visitedCountries]);
  const recentCountries = useMemo(() => visitedCountries.filter((country) => locations.some((location) => location.countryIso2 === country.iso2)).sort((a, b) => (b.visitedYear ?? 0) - (a.visitedYear ?? 0)).slice(0, 3), [locations, visitedCountries]);
  const continentCount = new Set(visitedCountries.map((country) => country.region)).size;
  const countryByName = useMemo(() => new Map(visitedCountries.map((country) => [country.name, country])), [visitedCountries]);
  const photographedIso = useMemo(() => new Set(locations.map((location) => location.countryIso2)), [locations]);

  // Camera transform for the active region (translate + scale) applied to the map layer.
  const flyScale = (regionZoomConfig[activeRegion].scale / WORLD_SCALE) * zoom;
  const [regionX, regionY] = projectWorld(regionZoomConfig[activeRegion].coordinates);
  const flyTransform = `translate(${MAP_W / 2 - flyScale * regionX}px, ${MAP_H / 2 - flyScale * regionY}px) scale(${flyScale})`;

  const selectCountry = (name: string) => {
    const country = visitedCountries.find((item) => item.name === name);
    if (!country) return;
    setSelectedCountryName(name); setActiveRegion(country.region as Region); setZoom(1);
  };
  const changeRegion = (region: Region) => {
    setActiveRegion(region); setZoom(1);
    if (region !== 'World') {
      const country = visitedCountries.find((item) => item.region === region && locations.some((location) => location.countryIso2 === item.iso2));
      if (country) setSelectedCountryName(country.name);
    }
  };

  return <div className="text-neutral-100">
    <header className="title-container mb-8">
      <h1>Mapping My Adventures</h1>
      <h2>Tracing my travels across the globe, and a few moments captured in photos</h2>
      <p className="mx-auto max-w-5xl">A map of the countries I&apos;ve visited. Select a country to see the locations I&apos;ve photographed there.</p>
      <div className="mx-auto mt-5 grid max-w-3xl grid-cols-2 gap-y-4 sm:grid-cols-4">
        {[[visitedCountries.length, 'Countries visited'], [continentCount, 'Continents explored'], [locations.length, 'Photography locations'], ['∞', 'Moments captured']].map(([value, label]) => <div className="border-l border-white/15 px-4 first:border-l-0" key={String(label)}><p className="!p-0 text-2xl font-bold text-white">{value}</p><p className="!p-0 text-xs text-neutral-400">{label}</p></div>)}
      </div>
    </header>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
      <div className="min-w-0">
        <div className="mb-3 flex items-center justify-between gap-5 border-b border-white/10">
          <div className="flex min-w-0 gap-5 overflow-x-auto">{(['World', 'Europe', 'Asia', 'NorthAmerica', 'Africa'] as Region[]).map((region) => <button key={region} onClick={() => changeRegion(region)} className={`shrink-0 border-b-2 pb-3 text-xs font-bold uppercase transition ${activeRegion === region ? 'border-white text-white' : 'border-transparent text-neutral-500 hover:text-white'}`}>{region === 'NorthAmerica' ? 'North America' : region}</button>)}</div>
          <div className="hidden items-center gap-4 text-xs text-neutral-400 md:flex"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full border border-[#87a6cc] bg-[#314a69]" />Visited</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full border border-[#a8c7e8] bg-[#4f6f9c]" />With photos</span></div>
        </div>
        <div className="relative overflow-hidden rounded-md border border-slate-700/[0.4] bg-slate-700/[0.2]">
          <ComposableMap width={MAP_W} height={MAP_H} projection="geoMercator" className="h-auto w-full" projectionConfig={{ center: WORLD_CENTER, scale: WORLD_SCALE }}>
            <g style={{ transform: flyTransform, transformOrigin: '0px 0px', transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)' }}>
              <Geographies geography={geoData}>{({ geographies }: { geographies: GeographyProps[] }) => geographies.filter((geo) => geo.properties.name !== 'Antarctica').map((geo) => {
                const country = countryByName.get(geo.properties.name);
                const hasPhotos = Boolean(country && photographedIso.has(country.iso2));
                return <Geography key={geo.rsmKey} geography={geo} vectorEffect="non-scaling-stroke" className={country ? 'map-country' : undefined} onClick={() => country && selectCountry(country.name)} style={{ default: { fill: country ? (hasPhotos ? '#4f6f9c' : '#314a69') : '#14202d', stroke: country ? (hasPhotos ? '#a8c7e8' : '#87a6cc') : '#243444', strokeWidth: country ? (hasPhotos ? .7 : .45) : .2, outline: 'none' }, hover: { fill: country ? '#6386b8' : '#1b2c3b', stroke: country ? '#c3ddf5' : '#243444', strokeWidth: country ? .9 : .2, outline: 'none', cursor: country ? 'pointer' : 'default' }, pressed: { outline: 'none' } }} />;
              })}</Geographies>
              {visibleLocations.map((location, index) => <Marker key={location.name} coordinates={location.coordinates}>
                <circle className="map-marker-pulse" r={4 / flyScale} fill="#a8c7e8" style={{ animationDelay: `${450 + index * 80}ms` }} />
                <circle className="map-marker-dot" r={4 / flyScale} fill="#a8c7e8" stroke="#eaf4ff" strokeWidth={1} vectorEffect="non-scaling-stroke" style={{ ['--marker-drop' as string]: `${-14 / flyScale}px`, animationDelay: `${250 + index * 80}ms` } as React.CSSProperties} />
              </Marker>)}
            </g>
          </ComposableMap>
          <div className="absolute bottom-4 left-4 flex flex-col overflow-hidden rounded-md border border-white/[0.2] bg-black/50"><button aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(value + .25, 2))} className="border-b border-white/10 p-2 text-neutral-300"><IconPlus size={18} /></button><button aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(value - .25, .7))} className="border-b border-white/10 p-2 text-neutral-300"><IconMinus size={18} /></button><button aria-label="Reset map" onClick={() => { setActiveRegion('World'); setZoom(1); }} className="p-2 text-neutral-300"><IconFocus2 size={18} /></button></div>
        </div>
        <div className="mt-4"><p className="mb-3 !p-0 text-xs font-bold uppercase tracking-wider text-neutral-400">Recently explored countries</p><div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{recentCountries.map((country) => { const cover = locations.find((location) => location.countryIso2 === country.iso2); return <button key={country.iso2} onClick={() => selectCountry(country.name)} className={`group overflow-hidden rounded-md border text-left transition ${selectedCountry?.name === country.name ? 'border-white/[0.6]' : 'border-slate-700/[0.4] hover:border-white/[0.4]'}`}>{cover && <img src={cover.imageUrl} alt="" className="h-28 w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100" />}<span className="flex items-center justify-between px-2.5 py-2 text-sm text-white"><span>{countryLabel(country)} <small className="text-neutral-400">{country.visitedYear}</small></span><IconCamera size={15} className="text-neutral-300" /></span></button>; })}</div></div>
      </div>
      <aside className="rounded-md border border-slate-700/[0.4] bg-slate-700/[0.2] p-5 sm:p-6 xl:h-fit">
        <div className="flex items-center gap-3"><img src={selectedCountry ? `https://flagcdn.com/w40/${selectedCountry.iso2.toLowerCase()}.png` : ''} alt={selectedCountry ? `${selectedCountry.name} flag` : ''} className="h-7 w-10 rounded-sm object-cover" /><h2 className="!p-0 text-3xl font-bold text-white">{countryLabel(selectedCountry)}</h2></div>
        <p className="!pb-0 !pt-3 text-sm text-neutral-400">{selectedCountry?.region === 'NorthAmerica' ? 'North America' : selectedCountry?.region}</p>
        <div className={`my-5 grid gap-4 border-y border-white/10 py-4 ${selectedCountry?.visitedYear ? 'grid-cols-2' : 'grid-cols-1'}`}>{selectedCountry?.visitedYear && <div className="flex gap-3"><IconMapPin className="mt-1 text-neutral-400" size={20} /><p className="!p-0 text-sm text-neutral-400">Visited<strong className="mt-1 block text-xl font-normal text-white">{selectedCountry.visitedYear}</strong></p></div>}<div className="flex gap-3"><IconCamera className="mt-1 text-neutral-400" size={20} /><p className="!p-0 text-sm text-neutral-400">Photography<strong className="mt-1 block text-xl font-normal text-white">{selectedLocations.length} locations</strong></p></div></div>
        {selectedLocations[0] && <button type="button" onClick={() => setViewerIndex(0)} className="block w-full overflow-hidden rounded-md"><img src={selectedLocations[0].imageUrl} alt={`${countryLabel(selectedCountry)} landscape`} className="h-52 w-full object-cover" /></button>}
        <h3 className="mb-2 mt-4 !text-left !text-base !font-bold">{selectedLocations.length ? 'Photography locations' : 'Photography'}</h3>
        <div className="divide-y divide-white/10">{selectedLocations.map((location, index) => <button type="button" onClick={() => setViewerIndex(index)} className="flex w-full items-center gap-3 py-3 text-left hover:bg-white/[0.04]" key={location.name}><IconMapPin size={18} className="shrink-0 text-neutral-400" /><div className="min-w-0 flex-1"><p className="!p-0 text-sm text-white">{location.name}</p><p className="!p-0 text-xs text-neutral-500">View photo</p></div><img src={location.imageUrl} alt="" className="h-12 w-20 rounded object-cover" /></button>)}{!selectedLocations.length && <p className="py-3 text-sm text-neutral-500">Visited, but no photography locations were captured on this trip.</p>}</div>
        {selectedLocations.length > 0 && <button type="button" onClick={() => setViewerIndex(0)} className="mt-5 flex w-full items-center justify-center gap-3 rounded-md border border-white/[0.2] bg-slate-700/[0.2] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-700/[0.4]">View all photos from {countryLabel(selectedCountry)} <IconChevronRight size={16} /></button>}
      </aside>
    </div>
    {viewerIndex !== null && selectedLocations[viewerIndex] && <div className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Photo viewer"><button type="button" aria-label="Close photo viewer" onClick={() => setViewerIndex(null)} className="absolute right-2 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-neutral-800 text-neutral-300 hover:border-neutral-300 md:right-4"><IconX size={24} /></button>{selectedLocations.length > 1 && <button type="button" aria-label="Previous photo" onClick={() => setViewerIndex((index) => index === null ? 0 : (index - 1 + selectedLocations.length) % selectedLocations.length)} className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-neutral-800 text-neutral-300 hover:border-neutral-300 md:left-4"><IconArrowLeft size={24} /></button>}<div className="w-full px-12 text-center md:px-20"><img src={selectedLocations[viewerIndex].imageUrl} alt={selectedLocations[viewerIndex].name} className="mx-auto max-h-[80vh] w-auto max-w-full object-contain" /><p className="mt-4 text-sm text-white">{selectedLocations[viewerIndex].name} <span className="text-neutral-400">({viewerIndex + 1} / {selectedLocations.length})</span></p></div>{selectedLocations.length > 1 && <button type="button" aria-label="Next photo" onClick={() => setViewerIndex((index) => index === null ? 0 : (index + 1) % selectedLocations.length)} className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-neutral-800 text-neutral-300 hover:border-neutral-300 md:right-4"><IconArrowRight size={24} /></button>}</div>}
  </div>;
};

export default WorldMap;
