import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { allCars as carsData } from '../data/cars'
import { formatPrice } from '../utils/formatters'
import CarCard from './CarCard'

function CarListings({ searchParams }) {
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(8) // Show 8 cars initially (2 rows)

  // Filter cars based on search params
  const filteredCars = useMemo(() => {
    if (!searchParams || !searchParams.location) {
      return carsData
    }

    const searchLocation = searchParams.location.toLowerCase().trim()
    return carsData.filter(car => {
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
    return 'Istanbul'
  }, [searchParams])

  // Show message if no cars found
  const showNoResults = filteredCars.length === 0
  const hasMore = visibleCount < filteredCars.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6)
  }

  return (
    <div className="container py-8">
      {searchParams && searchParams.location && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{t('carListings.searchedFor')} {searchParams.location}</span>
            {searchParams.startDate && (
              <span className="text-sm">
                | {new Date(searchParams.startDate).toLocaleDateString('tr-TR')} - {searchParams.endDate ? new Date(searchParams.endDate).toLocaleDateString('tr-TR') : t('carListings.noDateSelected')}
              </span>
            )}
          </div>
          <p className="text-sm text-blue-600 mt-1">{filteredCars.length} {t('carListings.carsFound')}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{displayLocation} {t('carListings.title')} →</h2>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t('carListings.noResultsTitle')}
          </h3>
          <p className="text-gray-600">
            {t('carListings.noResultsDesc')}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.slice(0, visibleCount).map((car) => (
              <CarCard key={car.id} car={{
                ...car,
                price: formatPrice(car.price),
                location: car.location
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
        </>
      )}
    </div>
  )
}

export default CarListings
