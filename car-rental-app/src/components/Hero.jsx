import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

function Hero({ onSearch }) {
  const { t } = useTranslation()
  const [searchData, setSearchData] = useState({
    location: '',
    startDate: '',
    startTime: '10:00',
    endDate: '',
    endTime: '10:00'
  })

  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [activeInput, setActiveInput] = useState(null) // 'from' or 'until'
  const [calendarView, setCalendarView] = useState('dates')

  const locationRef = useRef(null)
  const datePickerRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false)
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchData)
    }
  }

  const handleLocationSelect = (location) => {
    setSearchData(prev => ({ ...prev, location }))
    setShowLocationDropdown(false)
  }

  const locations = {
    current: { icon: '📍', label: 'Mevcut konum', value: 'current' },
    anywhere: { icon: '🌍', label: 'Her yerde', subtitle: 'Tüm araçlara göz at', value: '' },
    airports: [
      { icon: '✈️', label: 'İstanbul Havalimanı (IST)', value: 'İstanbul Havalimanı' },
      { icon: '✈️', label: 'Sabiha Gökçen Havalimanı (SAW)', value: 'Sabiha Gökçen' },
      { icon: '✈️', label: 'Ankara Esenboğa Havalimanı (ESB)', value: 'Ankara' },
      { icon: '✈️', label: 'İzmir Adnan Menderes Havalimanı (ADB)', value: 'İzmir' },
    ],
    cities: [
      { icon: '🏙️', label: 'İstanbul', value: 'İstanbul' },
      { icon: '🏙️', label: 'Ankara', value: 'Ankara' },
      { icon: '🏙️', label: 'İzmir', value: 'İzmir' },
      { icon: '🏙️', label: 'Antalya', value: 'Antalya' },
    ],
    trainStations: [
      { icon: '🚂', label: 'Ankara Garı', value: 'Ankara' },
      { icon: '🚂', label: 'Haydarpaşa Garı, İstanbul', value: 'İstanbul' },
    ],
    hotels: [
      { icon: '🏨', label: 'Hilton İstanbul', value: 'İstanbul' },
      { icon: '🏨', label: 'Sheraton Ankara', value: 'Ankara' },
    ],
  }

  return (
    <div className="relative bg-gradient-to-r from-cyan-700 via-teal-700 to-cyan-800 text-white">
      {/* Background Pattern/Image */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=600&fit=crop')] bg-cover bg-center"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 pb-32">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-6xl mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '400', letterSpacing: '0.03em', lineHeight: '1.15' }}>
            Kiralama ofisini atla
          </h1>
          <p className="text-base md:text-lg opacity-85" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '300', letterSpacing: '0.05em' }}>
            İstediğin arabayı, istediğin yerden kirala
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-2 relative overflow-visible">
          <div className="flex flex-col md:flex-row gap-2 relative overflow-visible">
            {/* Where */}
            <div className="flex-1 p-4 relative" ref={locationRef}>
              <label className="block text-xs text-gray-600 mb-1">Nerede</label>
              <input
                type="text"
                placeholder="Şehir, havaalanı, adres veya otel"
                value={searchData.location}
                onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
                onFocus={() => setShowLocationDropdown(true)}
                className="w-full text-gray-800 placeholder-gray-400 focus:outline-none text-sm"
              />

              {/* Location Dropdown */}
              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-3 w-full md:w-96 bg-white rounded-xl shadow-2xl z-[9999] max-h-96 overflow-y-auto border border-gray-200">
                  <div className="p-2">
                    {/* Current Location */}
                    <button
                      onClick={() => handleLocationSelect('current')}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <span className="text-2xl">{locations.current.icon}</span>
                      <span className="text-gray-800 font-medium">{locations.current.label}</span>
                    </button>

                    {/* Anywhere */}
                    <button
                      onClick={() => handleLocationSelect(locations.anywhere.value)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <span className="text-2xl">{locations.anywhere.icon}</span>
                      <div>
                        <div className="text-gray-800 font-medium">{locations.anywhere.label}</div>
                        <div className="text-xs text-gray-500">{locations.anywhere.subtitle}</div>
                      </div>
                    </button>

                    <hr className="my-2" />

                    {/* Airports */}
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Havaalanları</div>
                    {locations.airports.map((airport, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLocationSelect(airport.value)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <span className="text-2xl">{airport.icon}</span>
                        <span className="text-gray-800">{airport.label}</span>
                      </button>
                    ))}

                    <hr className="my-2" />

                    {/* Cities */}
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Şehirler</div>
                    {locations.cities.map((city, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLocationSelect(city.value)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <span className="text-2xl">{city.icon}</span>
                        <span className="text-gray-800">{city.label}</span>
                      </button>
                    ))}

                    <hr className="my-2" />

                    {/* Train Stations */}
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Tren istasyonları</div>
                    {locations.trainStations.map((station, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLocationSelect(station.value)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <span className="text-2xl">{station.icon}</span>
                        <span className="text-gray-800">{station.label}</span>
                      </button>
                    ))}

                    <hr className="my-2" />

                    {/* Hotels */}
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Oteller</div>
                    {locations.hotels.map((hotel, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLocationSelect(hotel.value)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <span className="text-2xl">{hotel.icon}</span>
                        <span className="text-gray-800">{hotel.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* From Date */}
            <div className="flex-1 p-4">
              <label className="block text-xs text-gray-600 mb-1">Başlangıç</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveInput('from')
                    setShowDatePicker(true)
                  }}
                  className="flex-1 text-left text-gray-800 text-sm hover:bg-gray-50 rounded px-2 py-1"
                >
                  {searchData.startDate || 'Tarih ekle'}
                </button>
                <input
                  type="time"
                  value={searchData.startTime}
                  onChange={(e) => setSearchData(prev => ({ ...prev, startTime: e.target.value }))}
                  className="flex-1 text-gray-800 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* Until Date */}
            <div className="flex-1 p-4">
              <label className="block text-xs text-gray-600 mb-1">Bitiş</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveInput('until')
                    setShowDatePicker(true)
                  }}
                  className="flex-1 text-left text-gray-800 text-sm hover:bg-gray-50 rounded px-2 py-1"
                >
                  {searchData.endDate || 'Tarih ekle'}
                </button>
                <input
                  type="time"
                  value={searchData.endTime}
                  onChange={(e) => setSearchData(prev => ({ ...prev, endTime: e.target.value }))}
                  className="flex-1 text-gray-800 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Date Picker Dropdown */}
          {showDatePicker && (
            <div ref={datePickerRef} className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl z-[9999] p-6 border border-gray-200">
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setCalendarView('dates')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    calendarView === 'dates'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Tarihler
                </button>
                <button
                  onClick={() => setCalendarView('months')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    calendarView === 'months'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Aylar
                </button>
              </div>

              {calendarView === 'dates' && (
                <div className="flex gap-8 justify-center">
                  {/* Calendar placeholders - simplified for now */}
                  <div>
                    <h3 className="text-center font-semibold text-gray-800 mb-4">Ekim 2025</h3>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'].map(day => (
                        <div key={day} className="text-gray-500 font-medium">{day}</div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <button
                          key={day}
                          onClick={() => {
                            const date = `2025-10-${String(day).padStart(2, '0')}`
                            if (activeInput === 'from') {
                              setSearchData(prev => ({ ...prev, startDate: date }))
                            } else {
                              setSearchData(prev => ({ ...prev, endDate: date }))
                            }
                          }}
                          className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-gray-700 hover:text-purple-700"
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-center font-semibold text-gray-800 mb-4">Kasım 2025</h3>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'].map(day => (
                        <div key={day} className="text-gray-500 font-medium">{day}</div>
                      ))}
                      {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                        <button
                          key={day}
                          onClick={() => {
                            const date = `2025-11-${String(day).padStart(2, '0')}`
                            if (activeInput === 'from') {
                              setSearchData(prev => ({ ...prev, startDate: date }))
                            } else {
                              setSearchData(prev => ({ ...prev, endDate: date }))
                            }
                          }}
                          className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-gray-700 hover:text-purple-700"
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                <button
                  onClick={() => setSearchData(prev => ({ ...prev, startDate: '', endDate: '' }))}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Sıfırla
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-6 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
