import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AllFiltersModal from './AllFiltersModal'

function FilterBar({
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
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dropdownRefs = useRef({})

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown].contains(event.target)) {
          setOpenDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown])

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  const FilterButton = ({ name, label, children, hasValue }) => {
    const buttonRef = useRef(null)
    const [dropdownStyle, setDropdownStyle] = useState({})

    useEffect(() => {
      if (openDropdown === name && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setDropdownStyle({
          position: 'fixed',
          top: `${rect.bottom + 8}px`,
          left: `${rect.left}px`,
        })
      }
    }, [openDropdown, name])

    return (
      <div className="relative" ref={(el) => dropdownRefs.current[name] = el}>
        <button
          ref={buttonRef}
          onClick={() => toggleDropdown(name)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg hover:border-gray-400 transition-colors ${
            hasValue ? 'border-gray-900 bg-gray-50' : 'border-gray-300 bg-white'
          }`}
        >
          <span className="text-sm font-medium">{label}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {openDropdown === name && (
          <div style={dropdownStyle} className="bg-white border border-gray-200 rounded-xl shadow-xl z-[999] min-w-[280px] max-h-[400px] overflow-y-auto">
            {children}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
    <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40 overflow-visible">
      <div className="max-w-[1600px] mx-auto px-8 py-4 overflow-visible">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 overflow-y-visible">
          {/* All Filters - Icon Button */}
          <button className="p-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>

          {/* Price */}
          <FilterButton
            name="price"
            label={t('searchResults.price')}
            hasValue={priceRange[1] < 2000}
          >
            <div className="p-6">
              <h4 className="font-semibold mb-4">{t('searchResults.priceRange')}</h4>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-blue-600"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">₺{priceRange[0]}</span>
                  <span className="font-medium">₺{priceRange[1]}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setPriceRange([0, 2000])
                      setOpenDropdown(null)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    {t('searchResults.clear')}
                  </button>
                  <button
                    onClick={() => setOpenDropdown(null)}
                    className="btn-primary text-sm flex-1"
                  >
                    {t('searchResults.apply')}
                  </button>
                </div>
              </div>
            </div>
          </FilterButton>

          {/* Vehicle Type */}
          <FilterButton
            name="vehicleType"
            label={t('searchResults.vehicleType')}
            hasValue={vehicleType !== 'all'}
          >
            <div className="p-4">
              <div className="space-y-2">
                {[
                  { value: 'all', label: t('searchResults.allTypes') },
                  { value: 'sedan', label: t('searchResults.sedan') },
                  { value: 'suv', label: t('searchResults.suv') },
                  { value: 'hatchback', label: t('searchResults.hatchback') },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setVehicleType(type.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 text-sm ${
                      vehicleType === type.value ? 'bg-gray-100 font-medium' : ''
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </FilterButton>

          {/* Make & Model */}
          <FilterButton
            name="makeModel"
            label={t('searchResults.makeModel')}
            hasValue={makeModel !== 'all'}
          >
            <div className="p-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-2">
                {[
                  { value: 'all', label: t('searchResults.allMakes') },
                  { value: 'toyota', label: 'Toyota' },
                  { value: 'volkswagen', label: 'Volkswagen' },
                  { value: 'bmw', label: 'BMW' },
                  { value: 'mercedes', label: 'Mercedes' },
                  { value: 'honda', label: 'Honda' },
                  { value: 'audi', label: 'Audi' },
                  { value: 'renault', label: 'Renault' },
                  { value: 'ford', label: 'Ford' },
                  { value: 'peugeot', label: 'Peugeot' },
                  { value: 'opel', label: 'Opel' },
                  { value: 'hyundai', label: 'Hyundai' },
                  { value: 'kia', label: 'Kia' },
                ].map((make) => (
                  <button
                    key={make.value}
                    onClick={() => {
                      setMakeModel(make.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 text-sm ${
                      makeModel === make.value ? 'bg-gray-100 font-medium' : ''
                    }`}
                  >
                    {make.label}
                  </button>
                ))}
              </div>
            </div>
          </FilterButton>

          {/* Years */}
          <FilterButton
            name="years"
            label={t('searchResults.years')}
            hasValue={yearRange[0] !== 2015 || yearRange[1] !== 2025}
          >
            <div className="p-6">
              <h4 className="font-semibold mb-4">{t('searchResults.yearRange')}</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="2015"
                    max="2025"
                    value={yearRange[0]}
                    onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-gray-500">—</span>
                  <input
                    type="number"
                    min="2015"
                    max="2025"
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setYearRange([2015, 2025])
                      setOpenDropdown(null)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                  >
                    {t('searchResults.clear')}
                  </button>
                  <button
                    onClick={() => setOpenDropdown(null)}
                    className="btn-primary text-sm flex-1"
                  >
                    {t('searchResults.apply')}
                  </button>
                </div>
              </div>
            </div>
          </FilterButton>

          {/* Seats */}
          <FilterButton
            name="seats"
            label={t('searchResults.seats')}
            hasValue={seats !== 'all'}
          >
            <div className="p-4">
              <div className="space-y-2">
                {[
                  { value: 'all', label: t('searchResults.any') },
                  { value: '2', label: `2 ${t('searchResults.seats').toLowerCase()}` },
                  { value: '4', label: `4 ${t('searchResults.seats').toLowerCase()}` },
                  { value: '5', label: `5 ${t('searchResults.seats').toLowerCase()}` },
                  { value: '7', label: `7+ ${t('searchResults.seats').toLowerCase()}` },
                ].map((seat) => (
                  <button
                    key={seat.value}
                    onClick={() => {
                      setSeats(seat.value)
                      setOpenDropdown(null)
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 text-sm ${
                      seats === seat.value ? 'bg-gray-100 font-medium' : ''
                    }`}
                  >
                    {seat.label}
                  </button>
                ))}
              </div>
            </div>
          </FilterButton>

          {/* Electric */}
          <button
            onClick={() => setElectricOnly(!electricOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg hover:border-gray-400 transition-colors flex-shrink-0 ${
              electricOnly ? 'border-gray-900 bg-gray-50' : 'border-gray-300 bg-white'
            }`}
          >
            <span className="text-sm font-medium">{t('searchResults.electric')}</span>
          </button>

          {/* Deliver to me */}
          <button
            onClick={() => setDeliverToMe(!deliverToMe)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg hover:border-gray-400 transition-colors flex-shrink-0 ${
              deliverToMe ? 'border-gray-900 bg-gray-50' : 'border-gray-300 bg-white'
            }`}
          >
            <span className="text-sm font-medium">{t('searchResults.deliverToMe')}</span>
          </button>

          {/* All filters button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex-shrink-0 ml-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="text-sm font-medium">{t('searchResults.allFilters')}</span>
          </button>
        </div>
      </div>
    </div>

    {/* All Filters Modal */}
    <AllFiltersModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      vehicleType={vehicleType}
      setVehicleType={setVehicleType}
      makeModel={makeModel}
      setMakeModel={setMakeModel}
      yearRange={yearRange}
      setYearRange={setYearRange}
      seats={seats}
      setSeats={setSeats}
      electricOnly={electricOnly}
      setElectricOnly={setElectricOnly}
      deliverToMe={deliverToMe}
      setDeliverToMe={setDeliverToMe}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
    </>
  )
}

export default FilterBar
