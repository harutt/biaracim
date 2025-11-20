import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { allCars } from '../data/cars'
import CarCard from './CarCard'
import { formatPrice } from '../utils/formatters'

function CitiesSection() {
  const { t } = useTranslation()
  const scrollRefs = useRef({})

  const scroll = (cityId, direction) => {
    const container = scrollRefs.current[cityId]
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Major Turkish cities
  const cities = [
    { id: 'istanbul', name: 'İstanbul' },
    { id: 'ankara', name: 'Ankara' },
    { id: 'izmir', name: 'İzmir' },
    { id: 'antalya', name: 'Antalya' },
    { id: 'bursa', name: 'Bursa' },
  ]

  // Get cars for each city
  const getCityCars = (cityName) => {
    let filtered = allCars.filter(car =>
      car.location.toLowerCase().includes(cityName.toLowerCase()) ||
      car.city.toLowerCase().includes(cityName.toLowerCase())
    )

    // If we have less than 5 cars, pad with other cars to fill the row
    if (filtered.length < 5) {
      const otherCars = allCars.filter(car => !filtered.find(f => f.id === car.id))
      filtered = [...filtered, ...otherCars].slice(0, 8)
    } else {
      filtered = filtered.slice(0, 8)
    }

    return filtered
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 space-y-12">
      {cities.map((city) => {
        const cars = getCityCars(city.name)

        if (cars.length === 0) return null

        return (
          <div key={city.id}>
            <div className="flex items-center justify-between mb-6">
              <Link
                to={`/search?location=${encodeURIComponent(city.name)}`}
                className="text-2xl font-bold hover:underline"
              >
                {city.name} araç kiralama →
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll(city.id, 'left')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll(city.id, 'right')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={(el) => scrollRefs.current[city.id] = el}
              className="overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-4 pb-4">
                {cars.map((car) => (
                  <div key={car.id} className="w-[235px] flex-shrink-0">
                    <CarCard car={{
                      ...car,
                      price: formatPrice(car.price),
                      location: car.location
                    }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CitiesSection
