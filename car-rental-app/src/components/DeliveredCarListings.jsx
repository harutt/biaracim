import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { deliveryCities } from '../data/cars'
import { formatPrice } from '../utils/formatters'
import CarCard from './CarCard'

function DeliveredCarListings() {
  const { t } = useTranslation()
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [showAddressInput, setShowAddressInput] = useState(false)
  const [locationResults, setLocationResults] = useState([])
  const [searchingLocation, setSearchingLocation] = useState(false)
  const [showLocationResults, setShowLocationResults] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8) // Show 8 cars initially (2 rows)

  // Flatten all cars from all cities
  const allDeliveryCars = deliveryCities.flatMap(city =>
    city.cars.map(car => ({
      ...car,
      cityKey: city.nameKey
    }))
  )

  const hasMore = visibleCount < allDeliveryCars.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  // Search location using Nominatim API
  const searchLocation = async (query) => {
    if (query.length < 3) {
      setLocationResults([])
      setShowLocationResults(false)
      return
    }

    setSearchingLocation(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&` +
        `countrycodes=tr&` +
        `format=json&` +
        `limit=5&` +
        `addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'tr'
          }
        }
      )
      const data = await response.json()
      setLocationResults(data)
      setShowLocationResults(true)
    } catch (error) {
      console.error('Konum arama hatası:', error)
      setLocationResults([])
    } finally {
      setSearchingLocation(false)
    }
  }

  const handleAddressChange = (e) => {
    const value = e.target.value
    setDeliveryAddress(value)
    searchLocation(value)
  }

  const selectLocation = (location) => {
    const displayName = location.display_name.split(',').slice(0, 3).join(',')
    setDeliveryAddress(displayName)
    setShowLocationResults(false)
    console.log('Selected location:', location)
  }

  return (
    <div className="container py-8">
      {/* Delivery Info Section */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-12 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{t('deliveredCarListings.seeDeliveryCars')}</h3>
              <p className="text-sm text-gray-600 mt-1">{t('deliveredCarListings.ownerWillMeet')}</p>
            </div>
          </div>
          {!showAddressInput ? (
            <button
              onClick={() => setShowAddressInput(true)}
              className="btn-primary whitespace-nowrap"
            >
              {t('deliveredCarListings.enterAddress')}
            </button>
          ) : (
            <div className="flex gap-2 flex-1 max-w-md relative">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={t('deliveredCarListings.deliveryAddressPlaceholder')}
                  value={deliveryAddress}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />

                {/* Location Search Results Dropdown */}
                {showLocationResults && locationResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                    {searchingLocation ? (
                      <div className="p-4 text-center text-gray-500">{t('deliveredCarListings.searching')}</div>
                    ) : (
                      locationResults.map((location, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectLocation(location)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm">
                                {location.display_name.split(',')[0]}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {location.display_name.split(',').slice(1).join(',').trim()}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => console.log('Searching for:', deliveryAddress)}
                className="btn-primary whitespace-nowrap"
              >
                {t('deliveredCarListings.search')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* All Delivery Cars Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6">
          {t('deliveredCarListings.availableCars')} →
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allDeliveryCars.slice(0, visibleCount).map((car) => (
            <CarCard key={car.id} car={{
              ...car,
              price: formatPrice(car.price),
              location: t(car.cityKey)
            }} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="btn-load-more"
            >
              {t('common.loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeliveredCarListings
