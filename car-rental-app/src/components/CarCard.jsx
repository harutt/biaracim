import { useTranslation } from 'react-i18next'

function CarCard({ car }) {
  const { t } = useTranslation()

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-semibold text-lg mb-1">{car.name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">
          <span className="font-bold text-black">{car.price}</span>{t('carListings.perDay')}
        </span>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-sm font-medium">{car.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default CarCard
