import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function AllFiltersModal({
  isOpen,
  onClose,
  priceRange,
  setPriceRange,
  vehicleType,
  setVehicleType,
  makeModel,
  setMakeModel,
  yearRange,
  setYearRange,
  seats,
  setSeats,
  electricOnly,
  setElectricOnly,
  deliverToMe,
  setDeliverToMe,
  sortBy,
  setSortBy
}) {
  const { t } = useTranslation()

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleReset = () => {
    setPriceRange([0, 2000])
    setVehicleType('all')
    setMakeModel('all')
    setYearRange([2015, 2025])
    setSeats('all')
    setElectricOnly(false)
    setDeliverToMe(false)
    setSortBy('relevance')
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">{t('searchResults.allFilters')}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              {t('searchResults.reset')}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Sort by */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('searchResults.sortBy')}</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="relevance">{t('searchResults.relevance')}</option>
              <option value="price-low">{t('searchResults.priceLowToHigh')}</option>
              <option value="price-high">{t('searchResults.priceHighToLow')}</option>
              <option value="rating">{t('searchResults.highestRated')}</option>
            </select>
          </div>

          {/* Daily price */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('searchResults.dailyPrice')}</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">₺{priceRange[0]}</span>
                <span className="text-sm text-gray-500">—</span>
                <span className="text-sm font-medium">₺{priceRange[1]}+{t('searchResults.perDay')}</span>
              </div>
            </div>
          </div>

          {/* Vehicle type */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('searchResults.vehicleType')}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'all', label: t('searchResults.allTypes'), icon: '🚗' },
                { value: 'sedan', label: t('searchResults.sedan'), icon: '🚙' },
                { value: 'suv', label: t('searchResults.suv'), icon: '🚐' },
                { value: 'hatchback', label: t('searchResults.hatchback'), icon: '🚗' },
                { value: 'minivan', label: t('searchResults.minivan'), icon: '🚙' },
                { value: 'truck', label: t('searchResults.truck'), icon: '🛻' },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setVehicleType(type.value)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl transition-all ${
                    vehicleType === type.value
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <span className="text-3xl">{type.icon}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Make & Model */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('searchResults.makeModel')}</h3>
            <select
              value={makeModel}
              onChange={(e) => setMakeModel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">{t('searchResults.allMakes')}</option>
              <option value="toyota">Toyota</option>
              <option value="volkswagen">Volkswagen</option>
              <option value="bmw">BMW</option>
              <option value="mercedes">Mercedes</option>
              <option value="honda">Honda</option>
              <option value="audi">Audi</option>
              <option value="renault">Renault</option>
              <option value="ford">Ford</option>
              <option value="peugeot">Peugeot</option>
              <option value="opel">Opel</option>
              <option value="hyundai">Hyundai</option>
              <option value="kia">Kia</option>
            </select>
          </div>

          {/* Years */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('searchResults.years')}</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="2015"
                max="2025"
                value={yearRange[0]}
                onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="From"
              />
              <span className="text-gray-500">—</span>
              <input
                type="number"
                min="2015"
                max="2025"
                value={yearRange[1]}
                onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="To"
              />
            </div>
          </div>

          {/* Seats */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('searchResults.seats')}</h3>
            <div className="grid grid-cols-5 gap-3">
              {[
                { value: 'all', label: t('searchResults.any') },
                { value: '2', label: '2' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '7', label: '7+' },
              ].map((seat) => (
                <button
                  key={seat.value}
                  onClick={() => setSeats(seat.value)}
                  className={`py-3 px-4 border-2 rounded-lg font-medium transition-all ${
                    seats === seat.value
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {seat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle attributes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{t('searchResults.vehicleAttributes')}</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={electricOnly}
                  onChange={(e) => setElectricOnly(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">{t('searchResults.electric')}</div>
                  <div className="text-sm text-gray-500">{t('searchResults.electricOnly')}</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={deliverToMe}
                  onChange={(e) => setDeliverToMe(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium">{t('searchResults.deliverToMe')}</div>
                  <div className="text-sm text-gray-500">{t('searchResults.deliverToLocation')}</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="btn-primary w-full py-3"
          >
            {t('searchResults.viewResults')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllFiltersModal
