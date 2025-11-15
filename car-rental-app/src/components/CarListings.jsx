import { useMemo } from 'react'
import CarCard from './CarCard'

function CarListings({ searchParams }) {
  // Sample car data with locations
  const allCars = [
    { id: 1, name: 'Toyota Corolla 2021', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop', price: '₺450', rating: 4.9, location: 'İstanbul', city: 'istanbul' },
    { id: 2, name: 'Volkswagen Golf 2020', image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop', price: '₺380', rating: 4.8, location: 'İstanbul', city: 'istanbul' },
    { id: 3, name: 'BMW 3 Series 2022', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', price: '₺850', rating: 5.0, location: 'İstanbul', city: 'istanbul' },
    { id: 4, name: 'Renault Clio 2021', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop', price: '₺320', rating: 4.7, location: 'İstanbul', city: 'istanbul' },
    { id: 5, name: 'Honda Civic 2022', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', price: '₺550', rating: 4.9, location: 'Ankara', city: 'ankara' },
    { id: 6, name: 'Mercedes C-Class 2023', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop', price: '₺1200', rating: 5.0, location: 'Ankara', city: 'ankara' },
    { id: 7, name: 'Ford Focus 2020', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', price: '₺400', rating: 4.6, location: 'İzmir', city: 'izmir' },
    { id: 8, name: 'Audi A4 2022', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', price: '₺950', rating: 4.9, location: 'İzmir', city: 'izmir' },
    { id: 9, name: 'Peugeot 3008 2022', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop', price: '₺550', rating: 4.85, location: 'Antalya', city: 'antalya' },
    { id: 10, name: 'Opel Insignia 2021', image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop', price: '₺480', rating: 4.7, location: 'Antalya', city: 'antalya' },
    { id: 11, name: 'Hyundai Tucson 2023', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop', price: '₺700', rating: 4.88, location: 'İstanbul', city: 'istanbul' },
    { id: 12, name: 'Kia Sportage 2022', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', price: '₺650', rating: 4.82, location: 'Ankara', city: 'ankara' },
  ]

  // Filter cars based on search params
  const filteredCars = useMemo(() => {
    if (!searchParams || !searchParams.location) {
      return allCars
    }

    const searchLocation = searchParams.location.toLowerCase().trim()
    return allCars.filter(car => {
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
    return 'İstanbul'
  }, [searchParams])

  // Show message if no cars found
  const showNoResults = filteredCars.length === 0

  return (
    <div className="container py-8">
      {searchParams && searchParams.location && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Arama yapıldı: {searchParams.location}</span>
            {searchParams.startDate && (
              <span className="text-sm">
                | {new Date(searchParams.startDate).toLocaleDateString('tr-TR')} - {searchParams.endDate ? new Date(searchParams.endDate).toLocaleDateString('tr-TR') : 'Tarih seçilmedi'}
              </span>
            )}
          </div>
          <p className="text-sm text-blue-600 mt-1">{filteredCars.length} araç bulundu</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{displayLocation}'da uygun fiyatlı araç kiralama →</h2>
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
            Aradığınız lokasyonda araç bulunamadı
          </h3>
          <p className="text-gray-600">
            Lütfen farklı bir şehir veya konum deneyin
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CarListings
