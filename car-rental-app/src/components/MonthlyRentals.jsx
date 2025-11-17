import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { monthlyCategories as monthlyCategoriesData } from '../data/cars'
import { formatPrice } from '../utils/formatters'

function MonthlyRentals() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState({
    suv: 0,
    sedan: 0,
    luxury: 0
  })

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
      <div className="container">
        {monthlyCategoriesData.map((category) => {
          const visibleCars = getVisibleCars(category.cars, category.id)
          const canGoBack = currentIndex[category.id] > 0
          const canGoForward = currentIndex[category.id] + 4 < category.cars.length

          return (
            <div key={category.id} className="mb-16 last:mb-0">
              {/* Category Header - Center Aligned */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-4 w-full max-w-6xl">
                  <h2 className="text-3xl font-bold text-gray-900 flex-grow text-center">
                    {t(category.titleKey)} →
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
                            {formatPrice(car.savings)} {t('monthlyRentals.savings')}
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
                          <span className="text-gray-500 text-sm">({car.trips} {t('monthlyRentals.trips')})</span>
                        </div>

                        {/* Pricing */}
                        <div className="border-t pt-3">
                          <div className="flex items-baseline justify-between mb-1">
                            <span className="text-sm text-gray-600">{t('monthlyRentals.monthlyRental')}</span>
                            <span className="text-xl font-bold text-gray-900">{formatPrice(car.monthlyPrice)}</span>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            ≈ {formatPrice(car.dailyEquivalent)}{t('monthlyRentals.perDay')}
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
