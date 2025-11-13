import { useTranslation } from 'react-i18next'
import CarCard from './CarCard'

function CarListings() {
  const { t } = useTranslation()
  // Sample car data
  const sampleCars = [
    { id: 1, name: 'Toyota Corolla 2021', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop', price: '₺450', rating: 4.9 },
    { id: 2, name: 'Volkswagen Golf 2020', image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop', price: '₺380', rating: 4.8 },
    { id: 3, name: 'BMW 3 Series 2022', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop', price: '₺850', rating: 5.0 },
    { id: 4, name: 'Renault Clio 2021', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop', price: '₺320', rating: 4.7 },
    { id: 5, name: 'Honda Civic 2022', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', price: '₺550', rating: 4.9 },
    { id: 6, name: 'Mercedes C-Class 2023', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop', price: '₺1200', rating: 5.0 },
    { id: 7, name: 'Ford Focus 2020', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop', price: '₺400', rating: 4.6 },
    { id: 8, name: 'Audi A4 2022', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop', price: '₺950', rating: 4.9 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{t('carListings.title')} →</h2>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  )
}

export default CarListings
