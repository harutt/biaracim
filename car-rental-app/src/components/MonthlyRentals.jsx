import { useState } from 'react'
import CarCard from './CarCard'

function MonthlyRentals() {
  const [currentIndex, setCurrentIndex] = useState({
    suv: 0,
    sedan: 0,
    luxury: 0
  })

  // Sample monthly rental data organized by category
  const monthlyCategories = [
    {
      id: 'suv',
      title: "İstanbul'da aylık SUV kiralama",
      cars: [
        {
          id: 1,
          name: 'BMW X5 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          monthlyPrice: '₺15,000',
          dailyEquivalent: '₺500',
          rating: 4.9,
          trips: 45,
          savings: '₺3,000'
        },
        {
          id: 2,
          name: 'Mercedes GLE 2022',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
          monthlyPrice: '₺18,000',
          dailyEquivalent: '₺600',
          rating: 5.0,
          trips: 38,
          savings: '₺3,500'
        },
        {
          id: 3,
          name: 'Audi Q7 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          monthlyPrice: '₺20,000',
          dailyEquivalent: '₺667',
          rating: 4.8,
          trips: 52,
          savings: '₺4,000'
        },
        {
          id: 4,
          name: 'Range Rover Sport 2023',
          image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop',
          monthlyPrice: '₺25,000',
          dailyEquivalent: '₺833',
          rating: 5.0,
          trips: 28,
          savings: '₺5,000'
        }
      ]
    },
    {
      id: 'sedan',
      title: "Ankara'da aylık sedan kiralama",
      cars: [
        {
          id: 5,
          name: 'BMW 5 Series 2023',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
          monthlyPrice: '₺12,000',
          dailyEquivalent: '₺400',
          rating: 4.9,
          trips: 67,
          savings: '₺2,500'
        },
        {
          id: 6,
          name: 'Mercedes E-Class 2022',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
          monthlyPrice: '₺14,000',
          dailyEquivalent: '₺467',
          rating: 5.0,
          trips: 54,
          savings: '₺3,000'
        },
        {
          id: 7,
          name: 'Audi A6 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          monthlyPrice: '₺13,500',
          dailyEquivalent: '₺450',
          rating: 4.85,
          trips: 42,
          savings: '₺2,800'
        },
        {
          id: 8,
          name: 'Tesla Model 3 2023',
          image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
          monthlyPrice: '₺16,000',
          dailyEquivalent: '₺533',
          rating: 4.95,
          trips: 71,
          savings: '₺3,500'
        }
      ]
    },
    {
      id: 'luxury',
      title: "İzmir'de aylık lüks araç kiralama",
      cars: [
        {
          id: 9,
          name: 'Porsche Cayenne 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          monthlyPrice: '₺30,000',
          dailyEquivalent: '₺1,000',
          rating: 5.0,
          trips: 23,
          savings: '₺6,000'
        },
        {
          id: 10,
          name: 'BMW X7 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          monthlyPrice: '₺22,000',
          dailyEquivalent: '₺733',
          rating: 4.9,
          trips: 31,
          savings: '₺4,500'
        },
        {
          id: 11,
          name: 'Mercedes S-Class 2023',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
          monthlyPrice: '₺28,000',
          dailyEquivalent: '₺933',
          rating: 5.0,
          trips: 19,
          savings: '₺5,500'
        },
        {
          id: 12,
          name: 'Audi Q8 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          monthlyPrice: '₺24,000',
          dailyEquivalent: '₺800',
          rating: 4.85,
          trips: 27,
          savings: '₺5,000'
        }
      ]
    }
  ]

  const handleNext = (categoryId) => {
    setCurrentIndex(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] + 1
    }))
  }

  const handlePrev = (categoryId) => {
    setCurrentIndex(prev => ({
      ...prev,
      [categoryId]: Math.max(0, prev[categoryId] - 1)
    }))
  }

  const getVisibleCars = (cars, categoryId) => {
    const startIndex = currentIndex[categoryId]
    return cars.slice(startIndex, startIndex + 4)
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {monthlyCategories.map((category) => {
          const visibleCars = getVisibleCars(category.cars, category.id)
          const canGoBack = currentIndex[category.id] > 0
          const canGoForward = currentIndex[category.id] + 4 < category.cars.length

          return (
            <div key={category.id} className="mb-16 last:mb-0">
              {/* Category Header - Center Aligned */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-4 w-full max-w-6xl">
                  <h2 className="text-3xl font-bold text-gray-900 flex-grow text-center">
                    {category.title} →
                  </h2>

                  {/* Navigation Arrows */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handlePrev(category.id)}
                      disabled={!canGoBack}
                      className={`p-2 rounded-full border-2 transition-all ${
                        canGoBack
                          ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'
                          : 'border-gray-200 text-gray-300 cursor-not-allowed'
                      }`}
                      aria-label="Previous"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleNext(category.id)}
                      disabled={!canGoForward}
                      className={`p-2 rounded-full border-2 transition-all ${
                        canGoForward
                          ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'
                          : 'border-gray-200 text-gray-300 cursor-not-allowed'
                      }`}
                      aria-label="Next"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Car Cards Grid - Center Aligned */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
                  {visibleCars.map((car) => (
                    <div key={car.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      {/* Car Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {car.savings && (
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {car.savings} tasarruf
                          </div>
                        )}
                      </div>

                      {/* Car Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{car.name}</h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="font-semibold text-gray-900">{car.rating}</span>
                          </div>
                          <span className="text-gray-500 text-sm">({car.trips} sürüş)</span>
                        </div>

                        {/* Pricing */}
                        <div className="border-t pt-3">
                          <div className="flex items-baseline justify-between mb-1">
                            <span className="text-sm text-gray-600">Aylık kiralama:</span>
                            <span className="text-xl font-bold text-gray-900">{car.monthlyPrice}</span>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            ≈ {car.dailyEquivalent}/gün
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthlyRentals
