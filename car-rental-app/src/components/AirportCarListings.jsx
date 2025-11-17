import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { airportCars } from '../data/cars'
import { formatPrice } from '../utils/formatters'
import CarCard from './CarCard'

function AirportCarListings() {
  const { t } = useTranslation()

  // Scroll function for horizontal scrolling
  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId)
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="container py-8">
      {airportCars.map((airport) => (
        <div key={airport.id} className="mb-12">
          {/* Airport Section Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to={`/airport/${airport.slug}`}>
              <h2 className="text-2xl font-bold hover:underline cursor-pointer">
                {t(airport.nameKey)} {t('airportCarListings.carRental')} →
              </h2>
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => scrollContainer(`airport-${airport.id}`, 'left')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label={t('airportCarListings.scrollLeft')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollContainer(`airport-${airport.id}`, 'right')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label={t('airportCarListings.scrollRight')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Car Cards */}
          <div
            id={`airport-${airport.id}`}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {airport.cars.map((car) => (
              <div key={car.id} className="flex-none w-80">
                <CarCard car={{
                  ...car,
                  price: formatPrice(car.price),
                  location: t(car.locationKey)
                }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AirportCarListings
