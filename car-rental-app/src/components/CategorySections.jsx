import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { allCars } from '../data/cars'
import CarCard from './CarCard'
import { formatPrice } from '../utils/formatters'

function CategorySections() {
  const { t } = useTranslation()
  const scrollRefs = useRef({})

  const scroll = (categoryId, direction) => {
    const container = scrollRefs.current[categoryId]
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Define categories with Turkish locations
  const categories = [
    {
      id: 'tesla-istanbul',
      title: t('categories.teslaIstanbul'),
      location: 'Istanbul',
      type: 'Tesla'
    },
    {
      id: 'suv-ankara',
      title: t('categories.suvAnkara'),
      location: 'Ankara',
      type: 'SUV'
    },
    {
      id: 'newer-izmir',
      title: t('categories.newerIzmir'),
      location: 'Izmir',
      year: 2023
    },
    {
      id: 'airport-saw',
      title: t('categories.airportSaw'),
      location: 'Sabiha Gökçen Airport',
      isAirport: true
    },
    {
      id: 'luxury-bodrum',
      title: t('categories.luxuryBodrum'),
      location: 'Bodrum',
      type: 'Luxury'
    },
    {
      id: 'affordable-antalya',
      title: t('categories.affordableAntalya'),
      location: 'Antalya',
      priceRange: 'affordable'
    }
  ]

  // Get filtered cars for each category
  const getCategoryCars = (category) => {
    let filtered = allCars

    if (category.location) {
      filtered = filtered.filter(car =>
        car.location.toLowerCase().includes(category.location.toLowerCase()) ||
        car.city.toLowerCase().includes(category.location.toLowerCase())
      )
    }

    if (category.type) {
      filtered = filtered.filter(car =>
        car.type.toLowerCase().includes(category.type.toLowerCase()) ||
        car.make.toLowerCase().includes(category.type.toLowerCase())
      )
    }

    if (category.year) {
      filtered = filtered.filter(car => car.year >= category.year)
    }

    if (category.priceRange === 'affordable') {
      filtered = filtered.filter(car => car.price <= 800)
    }

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
      {categories.map((category) => {
        const cars = getCategoryCars(category)

        if (cars.length === 0) return null

        return (
          <div key={category.id}>
            <div className="flex items-center justify-between mb-6">
              <Link
                to={`/search?location=${encodeURIComponent(category.location)}`}
                className="text-2xl font-bold hover:underline"
              >
                {category.title} →
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll(category.id, 'left')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll(category.id, 'right')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={(el) => scrollRefs.current[category.id] = el}
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

export default CategorySections
