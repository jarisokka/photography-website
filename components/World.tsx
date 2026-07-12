import WorldMap from './ui/worldMap'
import visitedCountries from '../assets/data/visited-countries-data.json'
import locationData from '../assets/data/location-data.json'

const World = () => (
  <section className="section-container" id="travels">
    <div className="w-full px-5 md:px-8">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <WorldMap visitedCountries={visitedCountries} locations={locationData as any} />
    </div>
  </section>
)

export default World
