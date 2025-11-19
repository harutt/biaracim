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
  const [makeSearch, setMakeSearch] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
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
            <div className="p-6 w-[600px]">
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    value: 'all',
                    label: 'Arabalar',
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M52,22H48.58l-4-8A4,4,0,0,0,41,12H23a4,4,0,0,0-3.58,2.21l-4,8H12a4,4,0,0,0-4,4v8a4,4,0,0,0,2,3.46V46a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V44H42v2a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V37.46A4,4,0,0,0,56,34V26A4,4,0,0,0,52,22ZM21.42,16.42A1,1,0,0,1,22.32,16H41.68a1,1,0,0,1,.9.58L46.34,24H17.66ZM16,36a4,4,0,1,1,4-4A4,4,0,0,1,16,36Zm32,0a4,4,0,1,1,4-4A4,4,0,0,1,48,36Z"/>
                      </svg>
                    )
                  },
                  {
                    value: 'suv',
                    label: 'SUV\'lar',
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M56,26H52.82L48,16.68A4,4,0,0,0,44.24,14H19.76A4,4,0,0,0,16,16.68L11.18,26H8a4,4,0,0,0-4,4v6a4,4,0,0,0,2,3.46V48a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V46H46v2a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V39.46A4,4,0,0,0,60,36V30A4,4,0,0,0,56,26ZM19.76,18H44.24L48,26H16ZM16,38a4,4,0,1,1,4-4A4,4,0,0,1,16,38Zm32,0a4,4,0,1,1,4-4A4,4,0,0,1,48,38Z"/>
                      </svg>
                    )
                  },
                  {
                    value: 'minivan',
                    label: 'Minivanlar',
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M54,22H50V16a4,4,0,0,0-4-4H18a4,4,0,0,0-4,4v6H10a4,4,0,0,0-4,4V40a4,4,0,0,0,2,3.46V52a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V48H44v4a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V43.46A4,4,0,0,0,58,40V26A4,4,0,0,0,54,22ZM18,16H46v6H18ZM16,38a3,3,0,1,1,3-3A3,3,0,0,1,16,38Zm29,0a3,3,0,1,1,3-3A3,3,0,0,1,45,38Z"/>
                      </svg>
                    )
                  },
                  {
                    value: 'truck',
                    label: 'Kamyonetler',
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M58,28H50V18a4,4,0,0,0-4-4H10a4,4,0,0,0-4,4V40a4,4,0,0,0,2,3.46V50a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V48H44v2a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V41.46A4,4,0,0,0,58,38V32A4,4,0,0,0,58,28ZM50,32H46V28h4ZM16,42a4,4,0,1,1,4-4A4,4,0,0,1,16,42Zm32,0a4,4,0,1,1,4-4A4,4,0,0,1,48,42Z"/>
                      </svg>
                    )
                  },
                  {
                    value: 'van',
                    label: 'Vanlar',
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M54,20H48V14a4,4,0,0,0-4-4H12a4,4,0,0,0-4,4V42a4,4,0,0,0,2,3.46V52a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V48H40v4a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V45.46A4,4,0,0,0,54,42V24A4,4,0,0,0,54,20ZM14,40a3,3,0,1,1,3-3A3,3,0,0,1,14,40Zm22,0a3,3,0,1,1,3-3A3,3,0,0,1,36,40Zm12-16H12V14H44V20H48Z"/>
                      </svg>
                    )
                  },
                  {
                    value: 'cargo',
                    label: 'Kargo vanları',
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M54,18H48V12a4,4,0,0,0-4-4H12a4,4,0,0,0-4,4V44a4,4,0,0,0,2,3.46V54a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V50H42v4a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V47.46A4,4,0,0,0,56,44V22A4,4,0,0,0,54,18ZM16,42a4,4,0,1,1,4-4A4,4,0,0,1,16,42Zm32,0a4,4,0,1,1,4-4A4,4,0,0,1,48,42Z"/>
                      </svg>
                    )
                  },
                  {
                    value: 'boxtruck',
                    label: 'Kasalı kamyonlar',
                    icon: (
                      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M56,24H50V12a4,4,0,0,0-4-4H10a4,4,0,0,0-4,4V42a4,4,0,0,0,2,3.46V52a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V48H44v4a4,4,0,0,0,4,4h4a4,4,0,0,0,4-4V45.46A4,4,0,0,0,58,42V28A4,4,0,0,0,56,24ZM50,28H46V24h4ZM16,44a4,4,0,1,1,4-4A4,4,0,0,1,16,44Zm32,0a4,4,0,1,1,4-4A4,4,0,0,1,48,44Z"/>
                      </svg>
                    )
                  },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setVehicleType(type.value)
                      setOpenDropdown(null)
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:border-purple-400 ${
                      vehicleType === type.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`mb-2 ${vehicleType === type.value ? 'text-purple-600' : 'text-gray-600'}`}>
                      {type.icon}
                    </div>
                    <span className={`text-sm font-medium ${vehicleType === type.value ? 'text-purple-900' : 'text-gray-900'}`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => {
                    setVehicleType('all')
                    setOpenDropdown(null)
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Sıfırla
                </button>
                <button
                  onClick={() => setOpenDropdown(null)}
                  className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                >
                  87 sonuç göster
                </button>
              </div>
            </div>
          </FilterButton>

          {/* Make & Model */}
          <FilterButton
            name="makeModel"
            label={t('searchResults.makeModel')}
            hasValue={makeModel !== 'all'}
          >
            <div className="w-[450px]">
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Marka ara"
                    value={makeSearch}
                    onChange={(e) => setMakeSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* All Makes Header */}
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-bold">Tüm markalar</h3>
              </div>

              {/* Makes List */}
              <div className="max-h-[350px] overflow-y-auto">
                <div className="p-2">
                  {[
                    { value: 'all', label: 'Tüm markalar' },
                    { value: 'am-general', label: 'AM General' },
                    { value: 'acura', label: 'Acura' },
                    { value: 'alfa-romeo', label: 'Alfa-Romeo' },
                    { value: 'amc', label: 'Amc' },
                    { value: 'aston-martin', label: 'Aston Martin' },
                    { value: 'audi', label: 'Audi' },
                    { value: 'bmw', label: 'BMW' },
                    { value: 'bentley', label: 'Bentley' },
                    { value: 'buick', label: 'Buick' },
                    { value: 'cadillac', label: 'Cadillac' },
                    { value: 'chevrolet', label: 'Chevrolet' },
                    { value: 'chrysler', label: 'Chrysler' },
                    { value: 'dodge', label: 'Dodge' },
                    { value: 'ferrari', label: 'Ferrari' },
                    { value: 'fiat', label: 'Fiat' },
                    { value: 'ford', label: 'Ford' },
                    { value: 'genesis', label: 'Genesis' },
                    { value: 'gmc', label: 'GMC' },
                    { value: 'honda', label: 'Honda' },
                    { value: 'hyundai', label: 'Hyundai' },
                    { value: 'infiniti', label: 'Infiniti' },
                    { value: 'jaguar', label: 'Jaguar' },
                    { value: 'jeep', label: 'Jeep' },
                    { value: 'kia', label: 'Kia' },
                    { value: 'lamborghini', label: 'Lamborghini' },
                    { value: 'land-rover', label: 'Land Rover' },
                    { value: 'lexus', label: 'Lexus' },
                    { value: 'lincoln', label: 'Lincoln' },
                    { value: 'maserati', label: 'Maserati' },
                    { value: 'mazda', label: 'Mazda' },
                    { value: 'mercedes', label: 'Mercedes-Benz' },
                    { value: 'mini', label: 'MINI' },
                    { value: 'mitsubishi', label: 'Mitsubishi' },
                    { value: 'nissan', label: 'Nissan' },
                    { value: 'porsche', label: 'Porsche' },
                    { value: 'ram', label: 'Ram' },
                    { value: 'renault', label: 'Renault' },
                    { value: 'rolls-royce', label: 'Rolls-Royce' },
                    { value: 'subaru', label: 'Subaru' },
                    { value: 'tesla', label: 'Tesla' },
                    { value: 'toyota', label: 'Toyota' },
                    { value: 'volkswagen', label: 'Volkswagen' },
                    { value: 'volvo', label: 'Volvo' },
                  ]
                    .filter(make => make.label.toLowerCase().includes(makeSearch.toLowerCase()))
                    .map((make) => (
                    <label
                      key={make.value}
                      className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={makeModel === make.value}
                          onChange={() => setMakeModel(make.value)}
                          className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                        />
                        <span className="text-sm font-normal">{make.label}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-3 p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setMakeModel('all')
                    setMakeSearch('')
                    setOpenDropdown(null)
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Sıfırla
                </button>
                <button
                  onClick={() => setOpenDropdown(null)}
                  className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                >
                  87 sonuç göster
                </button>
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
          <FilterButton
            name="deliverToMe"
            label={t('searchResults.deliverToMe')}
            hasValue={deliverToMe}
          >
            <div className="w-[380px] p-6">
              <h3 className="text-lg font-bold mb-2">Ev sahibi arabayı bana getiriyor</h3>
              <p className="text-sm text-gray-600 mb-4">
                Doğrudan bir adrese veya belirli bir konuma teslim edilebilecek arabaları göster.
              </p>

              {/* Address Input */}
              <div className="relative mb-6">
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Adres girin"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Toggle Button */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium">Teslimat mevcut</div>
                  <div className="text-xs text-gray-600">Sadece teslim edilebilir arabaları göster</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDeliverToMe(!deliverToMe)
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    deliverToMe ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      deliverToMe ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDeliverToMe(false)
                    setDeliveryAddress('')
                    setOpenDropdown(null)
                  }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Sıfırla
                </button>
                <button
                  onClick={() => setOpenDropdown(null)}
                  className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium"
                >
                  Uygula
                </button>
              </div>
            </div>
          </FilterButton>

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
