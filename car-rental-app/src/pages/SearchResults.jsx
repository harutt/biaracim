import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CarCard from '../components/CarCard'
import MapView from '../components/MapView'
import FilterBar from '../components/FilterBar'
import { allCars as carsData } from '../data/cars'
import { formatPrice } from '../utils/formatters'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState('map') // grid, list, map - default to map
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedCarId, setSelectedCarId] = useState(null)

  // Filters state
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [vehicleType, setVehicleType] = useState('all')
  const [makeModel, setMakeModel] = useState('all')
  const [yearRange, setYearRange] = useState([2015, 2025])
  const [seats, setSeats] = useState('all')
  const [electricOnly, setElectricOnly] = useState(false)
  const [deliverToMe, setDeliverToMe] = useState(false)

  // Get search params from URL
  const location = searchParams.get('location') || ''
  const startDate = searchParams.get('startDate') || ''
  const endDate = searchParams.get('endDate') || ''
  const startTime = searchParams.get('startTime') || ''
  const endTime = searchParams.get('endTime') || ''

  // Format cars data for display (add formatted price and priceNum)
  const allCars = useMemo(() => {
    return carsData.map(car => ({
      ...car,
      price: formatPrice(car.price),
      priceNum: car.price
    }))
  }, [])

  // Filter and sort cars
  const processedCars = useMemo(() => {
    let filtered = [...allCars]

    // Filter by location
    if (location && location !== 'anywhere') {
      const searchLocation = location.toLowerCase().trim()
      filtered = filtered.filter(car => {
        const carLocation = car.location.toLowerCase()
        const carCity = car.city.toLowerCase()
        return carLocation.includes(searchLocation) ||
               carCity.includes(searchLocation) ||
               searchLocation.includes(carCity)
      })
    }

    // Filter by price range
    filtered = filtered.filter(car =>
      car.priceNum >= priceRange[0] && car.priceNum <= priceRange[1]
    )

    // Filter by vehicle type
    if (vehicleType !== 'all') {
      filtered = filtered.filter(car => car.type === vehicleType)
    }

    // Filter by make/model
    if (makeModel !== 'all') {
      filtered = filtered.filter(car => car.make.toLowerCase() === makeModel.toLowerCase())
    }

    // Filter by year range
    filtered = filtered.filter(car =>
      car.year >= yearRange[0] && car.year <= yearRange[1]
    )

    // Filter by seats
    if (seats !== 'all') {
      const seatNum = parseInt(seats)
      if (seatNum === 7) {
        filtered = filtered.filter(car => car.seats >= 7)
      } else {
        filtered = filtered.filter(car => car.seats === seatNum)
      }
    }

    // Filter by electric only
    if (electricOnly) {
      filtered = filtered.filter(car => car.isElectric === true)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceNum - b.priceNum)
        break
      case 'price-high':
        filtered.sort((a, b) => b.priceNum - a.priceNum)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'relevance':
      default:
        // Keep default order or implement relevance logic
        break
    }

    return filtered
  }, [allCars, location, priceRange, vehicleType, makeModel, yearRange, seats, electricOnly, sortBy])

  return (
    <>
      {/* Top Search Bar - Simplified */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t('searchResults.backToHome')}</span>
            </Link>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{location || t('searchResults.anywhere')}</span>
            </div>
            {startDate && endDate && (
              <>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(startDate).toLocaleDateString('en-GB')} {startTime} - {new Date(endDate).toLocaleDateString('en-GB')} {endTime}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        vehicleType={vehicleType}
        setVehicleType={setVehicleType}
        makeModel={makeModel}
        setMakeModel={setMakeModel}
        yearRange={yearRange}
        setYearRange={setYearRange}
        seats={seats}
        setSeats={setSeats}
        electricOnly={electricOnly}
        setElectricOnly={setElectricOnly}
        deliverToMe={deliverToMe}
        setDeliverToMe={setDeliverToMe}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <main className="w-full">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {processedCars.length}+ {t('searchResults.carsAvailable')}
                </h1>
                <p className="text-sm text-gray-600">{t('searchResults.sortedBy')} {t('searchResults.relevance').toLowerCase()}</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="relevance">{t('searchResults.sortedBy')} {t('searchResults.relevance').toLowerCase()}</option>
                  <option value="price-low">{t('searchResults.priceLowToHigh')}</option>
                  <option value="price-high">{t('searchResults.priceHighToLow')}</option>
                  <option value="rating">{t('searchResults.highestRated')}</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 rounded ${viewMode === 'map' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Car Grid/List/Map */}
            {processedCars.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No cars found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => {
                    setPriceRange([0, 2000])
                    setVehicleType('all')
                    setMakeModel('all')
                    setYearRange([2015, 2025])
                    setSeats('all')
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : viewMode === 'map' ? (
              /* Map View */
              <div className="grid grid-cols-2 gap-6 h-[calc(100vh-250px)]">
                {/* Left: Car List (Scrollable) */}
                <div className="overflow-y-auto space-y-4 pr-2">
                  {processedCars.map((car) => (
                    <Link
                      key={car.id}
                      to={`/car/${car.id}`}
                      className="flex gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{car.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>{car.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-xl">{car.price}</div>
                            <div className="text-sm text-gray-500">{t('searchResults.perDay')}</div>
                          </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-medium">{car.rating}</span>
                            {car.trips && <span className="text-sm text-gray-500">({car.trips} trips)</span>}
                          </div>
                          {car.isNew && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                              New listing
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Right: Map */}
                <div className="sticky top-[145px] h-[calc(100vh-250px)] bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <MapView
                    cars={processedCars}
                    selectedCarId={selectedCarId}
                    onCarSelect={setSelectedCarId}
                  />
                </div>
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default SearchResults
