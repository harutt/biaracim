import { useState, useMemo, useRef, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CarCard from '../components/CarCard'
import MapView from '../components/MapView'
import FilterBar from '../components/FilterBar'
import { allCars as carsData } from '../data/cars'
import { formatPrice } from '../utils/formatters'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState('map') // grid, list, map - default to map
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedCarId, setSelectedCarId] = useState(null)

  // Search state for header
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const locationRef = useRef(null)

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
  const userLat = searchParams.get('lat')
  const userLng = searchParams.get('lng')
  const isNearbySearch = searchParams.get('nearby') === 'true'
  const vehicleTypeParam = searchParams.get('vehicleType')

  // Set vehicle type from URL parameter
  useEffect(() => {
    if (vehicleTypeParam) {
      // Convert URL param to filter value
      const typeMap = {
        'car-rental': 'all',
        'economy-rental': 'all', // Filter by price in component
        'midsize-rental': 'all', // Filter by price in component
        'luxury-rental': 'luxury',
        'suv-rental': 'suv',
        'sedan-rental': 'sedan',
        'hatchback-rental': 'hatchback',
        'wagon-rental': 'wagon',
        'minivan-rental': 'minivan',
        'cargo-van-rental': 'cargo',
        'truck-rental': 'truck',
        'electric-rental': 'electric',
      }
      const filterType = typeMap[vehicleTypeParam] || vehicleTypeParam
      setVehicleType(filterType)
    }
  }, [vehicleTypeParam])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get user's current location
  const getUserLocation = async () => {
    setIsGettingLocation(true)
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        })
      })

      const { latitude, longitude } = position.coords

      // Update URL with new location parameters
      const newParams = new URLSearchParams(searchParams)
      newParams.set('location', 'current')
      newParams.set('lat', latitude.toString())
      newParams.set('lng', longitude.toString())
      newParams.set('nearby', 'true')

      navigate(`/search?${newParams.toString()}`)
      setShowLocationDropdown(false)
    } catch (error) {
      console.error('Error getting location:', error)
      alert(error.code === 1 ? 'Konum izni reddedildi. Lütfen tarayıcı ayarlarından konum erişimine izin verin.' : 'Konum alınamadı. Lütfen tekrar deneyin.')
    } finally {
      setIsGettingLocation(false)
    }
  }

  // Handle location selection
  const handleLocationSelect = (selectedLocation) => {
    const newParams = new URLSearchParams(searchParams)

    if (selectedLocation === 'current') {
      getUserLocation()
      return
    }

    // Update location parameter
    newParams.set('location', selectedLocation)
    newParams.delete('lat')
    newParams.delete('lng')
    newParams.delete('nearby')

    navigate(`/search?${newParams.toString()}`)
    setShowLocationDropdown(false)
  }

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return distance
  }

  // Approximate coordinates for Turkish cities (for demo purposes)
  const cityCoordinates = {
    'istanbul': { lat: 41.0082, lng: 28.9784 },
    'sarıyer': { lat: 41.1688, lng: 29.0536 },
    'beşiktaş': { lat: 41.0422, lng: 29.0089 },
    'şişli': { lat: 41.0606, lng: 28.9876 },
    'fatih': { lat: 41.0204, lng: 28.9485 },
    'taksim': { lat: 41.0369, lng: 28.9850 },
    'ankara': { lat: 39.9334, lng: 32.8597 },
    'izmir': { lat: 38.4192, lng: 27.1287 },
    'antalya': { lat: 36.8969, lng: 30.7133 },
    'bursa': { lat: 40.1828, lng: 29.0665 },
    'adana': { lat: 37.0000, lng: 35.3213 }
  }

  // Format cars data for display (add formatted price, priceNum, and distance if user location available)
  const allCars = useMemo(() => {
    return carsData.map(car => {
      let distance = null

      // Calculate distance if user location is available and car has a city
      if (userLat && userLng && car.city) {
        const cityKey = car.city.toLowerCase().trim()
        const carCoords = cityCoordinates[cityKey]

        if (carCoords) {
          distance = calculateDistance(
            parseFloat(userLat),
            parseFloat(userLng),
            carCoords.lat,
            carCoords.lng
          )
        }
      }

      return {
        ...car,
        price: formatPrice(car.price),
        priceNum: car.price,
        distance: distance // Distance in km, or null if not calculable
      }
    })
  }, [userLat, userLng])

  // Filter and sort cars
  const processedCars = useMemo(() => {
    let filtered = [...allCars]

    // Filter by location
    if (location && location !== 'anywhere' && location !== 'current') {
      const searchLocation = location.toLowerCase().trim()
      filtered = filtered.filter(car => {
        const carLocation = car.location.toLowerCase()
        const carCity = car.city.toLowerCase()
        return carLocation.includes(searchLocation) ||
               carCity.includes(searchLocation) ||
               searchLocation.includes(carCity)
      })
    }

    // If nearby search, filter by distance (within 50km) and sort by distance
    if (isNearbySearch && userLat && userLng) {
      // Filter cars that have distance calculated and are within 50km
      filtered = filtered.filter(car => car.distance !== null && car.distance <= 50)
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
    if (isNearbySearch && userLat && userLng) {
      // If nearby search, always sort by distance first
      filtered.sort((a, b) => (a.distance || 999) - (b.distance || 999))
    } else {
      // Normal sorting
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
    }

    return filtered
  }, [allCars, location, priceRange, vehicleType, makeModel, yearRange, seats, electricOnly, sortBy, isNearbySearch, userLat, userLng])

  // Popular cities
  const popularCities = [
    { name: 'İstanbul', icon: '🏙️' },
    { name: 'Ankara', icon: '🏛️' },
    { name: 'İzmir', icon: '🌊' },
    { name: 'Antalya', icon: '🏖️' },
    { name: 'Bursa', icon: '🏔️' }
  ]

  return (
    <>
      {/* Search bar is now in Header component */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40" style={{ display: 'none' }}>
        <div className="max-w-[1600px] mx-auto px-8 py-2">
          <div className="flex items-center gap-0.5">
            {/* Where */}
            <div className="flex-1 p-2 relative border-b-2 border-gray-200 hover:border-purple-500 transition-colors" ref={locationRef}>
              <label className="block text-[9px] text-gray-600 mb-0">{t('hero.where')}</label>
              <input
                type="text"
                placeholder={t('hero.wherePlaceholder')}
                value={location === 'current' ? '📍 Mevcut Konumum' : location}
                onFocus={() => setShowLocationDropdown(true)}
                readOnly
                className="w-full text-gray-800 placeholder-gray-400 focus:outline-none text-sm cursor-pointer bg-transparent"
              />

              {/* Location Dropdown */}
              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  {/* Current Location Option */}
                  <button
                    onClick={() => handleLocationSelect('current')}
                    disabled={isGettingLocation}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 disabled:opacity-50"
                  >
                    {isGettingLocation ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-gray-600">Konum alınıyor...</span>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl">
                          📍
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Mevcut Konumum</div>
                          <div className="text-xs text-gray-500">Yakınımdaki arabaları göster</div>
                        </div>
                      </>
                    )}
                  </button>

                  <div className="border-t border-gray-100 my-2"></div>

                  {/* Popular Cities */}
                  <div className="px-4 py-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Popüler Şehirler
                    </div>
                    <div className="space-y-1">
                      {popularCities.map(city => (
                        <button
                          key={city.name}
                          onClick={() => handleLocationSelect(city.name)}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                        >
                          <span className="text-xl">{city.icon}</span>
                          <span className="font-medium text-gray-700">{city.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* From Date */}
            <div className="flex-1 p-2 border-b-2 border-gray-200 hover:border-purple-500 transition-colors">
              <label className="block text-[9px] text-gray-600 mb-0">{t('hero.from')}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={startDate ? new Date(startDate).toLocaleDateString('tr-TR') : ''}
                  placeholder={t('hero.addDate')}
                  readOnly
                  className="flex-1 text-gray-800 placeholder-gray-400 focus:outline-none text-sm cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={startTime || ''}
                  placeholder={t('hero.selectTime')}
                  readOnly
                  className={`flex-1 text-sm focus:outline-none cursor-pointer bg-transparent ${
                    startDate ? 'text-gray-800 placeholder-gray-400' : 'text-gray-400 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* Until Date */}
            <div className="flex-1 p-2 border-b-2 border-gray-200 hover:border-purple-500 transition-colors">
              <label className="block text-[9px] text-gray-600 mb-0">{t('hero.until')}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={endDate ? new Date(endDate).toLocaleDateString('tr-TR') : ''}
                  placeholder={t('hero.addDate')}
                  readOnly
                  className="flex-1 text-gray-800 placeholder-gray-400 focus:outline-none text-sm cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={endTime || ''}
                  placeholder={t('hero.selectTime')}
                  readOnly
                  className={`flex-1 text-sm focus:outline-none cursor-pointer bg-transparent ${
                    endDate ? 'text-gray-800 placeholder-gray-400' : 'text-gray-400 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="btn-search ml-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
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
                  Araç bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Filtrelerinizi ayarlamayı, tarihlerinizi değiştirmeyi veya haritayı keşfetmeyi deneyin
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
                  Tüm filtreleri temizle
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
                              {car.distance !== null && isNearbySearch && (
                                <span className="text-purple-600 font-medium">
                                  • {car.distance.toFixed(1)} km
                                </span>
                              )}
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
                    userLat={userLat}
                    userLng={userLng}
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
