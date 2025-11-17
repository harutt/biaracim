import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { nearbyCars as nearbyCarsData } from '../data/cars'
import { formatPrice } from '../utils/formatters'
import CarCard from './CarCard'

function NearbyCarListings({ searchParams }) {
  const { t } = useTranslation()
  const [locationPermission, setLocationPermission] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [visibleCount, setVisibleCount] = useState(8) // Show 8 cars initially (2 rows)

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission('granted')
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          setLocationPermission('denied')
          console.error('Location error:', error)
        }
      )
    } else {
      setLocationPermission('unsupported')
    }
  }

  // Filter cars based on search params
  const filteredCars = useMemo(() => {
    if (!searchParams || !searchParams.location) {
      return nearbyCarsData
    }

    const searchLocation = searchParams.location.toLowerCase().trim()
    return nearbyCarsData.filter(car => {
      const carLocation = car.location.toLowerCase()
      const carCity = car.city.toLowerCase()

      return carLocation.includes(searchLocation) ||
             carCity.includes(searchLocation) ||
             searchLocation.includes(carCity)
    })
  }, [searchParams])

  // Determine the display location
  const displayLocation = useMemo(() => {
    if (searchParams && searchParams.location) {
      return searchParams.location
    }
    return t('nearbyCarListings.yourLocation')
  }, [searchParams, t])

  // Show message if no cars found
  const showNoResults = filteredCars.length === 0
  const hasMore = visibleCount < filteredCars.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  return (
    <div className="container py-8">
      {/* Location Permission Banner */}
      {!locationPermission && (
        <div className="mb-6 p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{t('nearbyCarListings.seeNearbyCars')}</h3>
                <p className="text-sm text-gray-600 mt-1">{t('nearbyCarListings.shareLocationDesc')}</p>
              </div>
            </div>
            <button
              onClick={requestLocationPermission}
              className="btn-primary whitespace-nowrap"
            >
              {t('nearbyCarListings.shareLocation')}
            </button>
          </div>
        </div>
      )}

      {locationPermission === 'denied' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-red-900">{t('nearbyCarListings.locationDenied')}</h4>
              <p className="text-sm text-red-800 mt-1">{t('nearbyCarListings.locationDeniedDesc')}</p>
            </div>
          </div>
        </div>
      )}

      {locationPermission === 'granted' && userLocation && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-green-800 font-medium">{t('nearbyCarListings.locationReceived')}</p>
          </div>
        </div>
      )}

      {/* Search Info Banner */}
      {searchParams && searchParams.location && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{t('nearbyCarListings.searchedNearby')} {searchParams.location}</span>
            {searchParams.startDate && (
              <span className="text-sm">
                | {new Date(searchParams.startDate).toLocaleDateString('tr-TR')} - {searchParams.endDate ? new Date(searchParams.endDate).toLocaleDateString('tr-TR') : t('carListings.noDateSelected')}
              </span>
            )}
          </div>
          <p className="text-sm text-green-600 mt-1">{filteredCars.length} {t('nearbyCarListings.nearbyCarsFound')}</p>
        </div>
      )}

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{displayLocation} {t('nearbyCarListings.carsNearby')} →</h2>
          <p className="text-gray-600 mt-1 text-sm">{t('nearbyCarListings.sortedByDistance')}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {showNoResults ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t('nearbyCarListings.noCarsNearby')}
          </h3>
          <p className="text-gray-600">
            {t('nearbyCarListings.noCarsNearbyDesc')}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.slice(0, visibleCount).map((car) => (
              <div key={car.id} className="relative">
                {/* Distance Badge */}
                <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md border border-gray-200">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-700">{car.distance}</span>
                  </div>
                </div>
                <CarCard car={{
                  ...car,
                  price: formatPrice(car.price)
                }} />
              </div>
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
        </>
      )}

      {/* Info Banner */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">{t('nearbyCarListings.discoverNearbyCars')}</h4>
            <p className="text-sm text-blue-800">
              {t('nearbyCarListings.distanceDisclaimer')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NearbyCarListings
