import { Link } from 'react-router-dom'
import { allCars } from '../data/cars'
import { formatPrice } from '../utils/formatters'

function RecentSearches() {
  // Simulated recent searches - in production this would come from localStorage or API
  const recentSearches = [
    {
      id: 1,
      car: allCars.find(car => car.make === 'Lexus'),
      location: 'Las Vegas, NV, USA',
      dates: 'Dec 3, 2025 - Mar 3, 2026'
    }
  ]

  // Sample cars inspired by searches
  const inspiredCars = [
    allCars.find(car => car.make === 'Lexus' && car.year === 2017),
    allCars.find(car => car.make === 'Tesla'),
    allCars.find(car => car.make === 'Toyota' && car.model.includes('Corolla')),
    allCars.find(car => car.make === 'Toyota' && car.type === 'Hatchback'),
    allCars.find(car => car.make === 'Hyundai'),
    allCars.find(car => car.make === 'Kia'),
    allCars.find(car => car.make === 'BMW'),
    allCars.find(car => car.make === 'Mercedes'),
  ].filter(Boolean).slice(0, 8)

  if (inspiredCars.length === 0) return null

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8">
      {/* Continue searching banner */}
      {recentSearches.length > 0 && (
        <div className="mb-6 flex justify-center">
          <Link
            to={`/search?location=${encodeURIComponent(recentSearches[0].location)}`}
            className="inline-flex items-center justify-between gap-4 px-6 py-4 bg-white border border-gray-200 rounded-lg hover:border-purple-400 transition-all group w-full max-w-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Araba aramaya devam et</h3>
                <p className="text-sm text-gray-600">{recentSearches[0].location}, {recentSearches[0].dates}</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* Inspired by recent searches */}
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Son aramalarınızdan ilham alın
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inspiredCars.map((car) => (
            <div
              key={car.id}
              className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-32 h-24 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{car.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-sm font-semibold">{car.rating}</span>
                      <svg className="w-4 h-4 text-purple-600 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {car.trips && (
                        <span className="text-sm text-gray-600">({car.trips} trips)</span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/car/${car.id}`}
                    className="text-sm font-semibold text-gray-900 underline hover:text-gray-700"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentSearches
