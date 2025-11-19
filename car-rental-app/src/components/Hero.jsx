import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function Hero({ onSearch }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [searchData, setSearchData] = useState({
    location: '',
    startDate: '',
    startTime: '10:00',
    endDate: '',
    endTime: '10:00',
    userLat: null,
    userLng: null
  })

  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [activeInput, setActiveInput] = useState(null) // 'from' or 'until'
  const [activeTimeInput, setActiveTimeInput] = useState(null) // 'start' or 'end'
  const [calendarView, setCalendarView] = useState('dates')
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const locationRef = useRef(null)
  const datePickerRef = useRef(null)
  const timePickerRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false)
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false)
      }
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        setShowTimePicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams()
    if (searchData.location) params.append('location', searchData.location)
    if (searchData.startDate) params.append('startDate', searchData.startDate)
    if (searchData.endDate) params.append('endDate', searchData.endDate)
    if (searchData.startTime) params.append('startTime', searchData.startTime)
    if (searchData.endTime) params.append('endTime', searchData.endTime)

    // Add user coordinates if searching by current location
    if (searchData.location === 'current' && searchData.userLat && searchData.userLng) {
      params.append('lat', searchData.userLat)
      params.append('lng', searchData.userLng)
      params.append('nearby', 'true')
    }

    // Navigate to search results page
    navigate(`/search?${params.toString()}`)

    // Also call the onSearch callback if provided (for backwards compatibility)
    if (onSearch) {
      onSearch(searchData)
    }
  }

  const getUserLocation = async () => {
    setIsGettingLocation(true)

    try {
      if (!navigator.geolocation) {
        alert('Tarayıcınız konum hizmetlerini desteklemiyor')
        setIsGettingLocation(false)
        return false
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        })
      })

      const { latitude, longitude } = position.coords
      setSearchData(prev => ({
        ...prev,
        location: 'current',
        userLat: latitude,
        userLng: longitude
      }))

      setIsGettingLocation(false)
      setShowLocationDropdown(false)
      return true
    } catch (error) {
      setIsGettingLocation(false)
      console.error('Konum alınamadı:', error)

      if (error.code === 1) {
        alert('Konum izni reddedildi. Lütfen tarayıcı ayarlarından konum iznini aktif edin.')
      } else if (error.code === 2) {
        alert('Konum bilgisi alınamadı. Lütfen tekrar deneyin.')
      } else if (error.code === 3) {
        alert('Konum alınırken zaman aşımı oluştu. Lütfen tekrar deneyin.')
      }
      return false
    }
  }

  const handleLocationSelect = async (location) => {
    if (location === 'current') {
      await getUserLocation()
    } else {
      setSearchData(prev => ({ ...prev, location, userLat: null, userLng: null }))
      setShowLocationDropdown(false)
    }
  }

  const handleTimeSelect = (time) => {
    if (activeTimeInput === 'start') {
      setSearchData(prev => ({ ...prev, startTime: time }))
    } else {
      setSearchData(prev => ({ ...prev, endTime: time }))
    }
    setShowTimePicker(false)
  }

  // Generate time options (every 30 minutes)
  const generateTimeOptions = () => {
    const times = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push(timeString)
      }
    }
    return times
  }

  const LocationIcon = ({ type, className = "w-5 h-5" }) => {
    const icons = {
      pin: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      globe: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      plane: <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>,
      building: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
      train: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      hotel: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    }
    return icons[type] || null
  }

  const locations = {
    current: { iconType: 'pin', label: t('hero.currentLocation'), value: 'current' },
    anywhere: { iconType: 'globe', label: t('hero.anywhere'), subtitle: t('hero.browseAllCars'), value: '' },
    airports: [
      { iconType: 'plane', label: 'İstanbul Havalimanı (IST)', value: 'İstanbul Havalimanı' },
      { iconType: 'plane', label: 'Sabiha Gökçen Havalimanı (SAW)', value: 'Sabiha Gökçen' },
      { iconType: 'plane', label: 'Ankara Esenboğa Havalimanı (ESB)', value: 'Ankara' },
      { iconType: 'plane', label: 'İzmir Adnan Menderes Havalimanı (ADB)', value: 'İzmir' },
    ],
    cities: [
      { iconType: 'building', label: 'İstanbul', value: 'İstanbul' },
      { iconType: 'building', label: 'Ankara', value: 'Ankara' },
      { iconType: 'building', label: 'İzmir', value: 'İzmir' },
      { iconType: 'building', label: 'Antalya', value: 'Antalya' },
    ],
    trainStations: [
      { iconType: 'train', label: 'Ankara Garı', value: 'Ankara' },
      { iconType: 'train', label: 'Haydarpaşa Garı, İstanbul', value: 'İstanbul' },
    ],
    hotels: [
      { iconType: 'hotel', label: 'Hilton İstanbul', value: 'İstanbul' },
      { iconType: 'hotel', label: 'Sheraton Ankara', value: 'Ankara' },
    ],
  }

  return (
    <div className="relative min-h-[400px] flex items-center w-full overflow-hidden">
      {/* Background Image - constrained to container width */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-full max-w-5xl relative h-full">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=2000&h=1200&fit=crop&q=80')] bg-cover bg-center rounded-2xl"></div>
          {/* Pastel overlay - more opaque for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/90 via-purple-50/85 to-pink-50/85 rounded-2xl"></div>
        </div>
      </div>

      <div className="relative w-full py-10">
        <div className="container max-w-5xl mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-800">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl p-0.5 relative overflow-visible">
          <div className="flex flex-col md:flex-row gap-0.5 relative overflow-visible">
            {/* Where */}
            <div className="flex-1 p-2 relative" ref={locationRef}>
              <label className="block text-[9px] text-gray-600 mb-0">{t('hero.where')}</label>
              <input
                type="text"
                placeholder={t('hero.wherePlaceholder')}
                value={searchData.location === 'current' ? '📍 Mevcut Konumum' : searchData.location}
                onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value, userLat: null, userLng: null }))}
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
                      disabled={isGettingLocation}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGettingLocation ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-gray-800 font-medium">Konum alınıyor...</span>
                        </>
                      ) : (
                        <>
                          <LocationIcon type={locations.current.iconType} className="w-5 h-5 text-gray-700" />
                          <span className="text-gray-800 font-medium">{locations.current.label}</span>
                        </>
                      )}
                    </button>

                    {/* Anywhere */}
                    <button
                      onClick={() => handleLocationSelect(locations.anywhere.value)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <LocationIcon type={locations.anywhere.iconType} className="w-5 h-5 text-gray-700" />
                      <div>
                        <div className="text-gray-800 font-medium">{locations.anywhere.label}</div>
                        <div className="text-xs text-gray-500">{locations.anywhere.subtitle}</div>
                      </div>
                    </button>

                    <hr className="my-2" />

                    {/* Airports */}
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">{t('hero.airports')}</div>
                    {locations.airports.map((airport, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLocationSelect(airport.value)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <LocationIcon type={airport.iconType} className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">{airport.label}</span>
                      </button>
                    ))}

                    <hr className="my-2" />

                    {/* Cities */}
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">{t('hero.cities')}</div>
                    {locations.cities.map((city, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLocationSelect(city.value)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <LocationIcon type={city.iconType} className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">{city.label}</span>
                      </button>
                    ))}

                    <hr className="my-2" />

                    {/* Train Stations */}
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">{t('hero.trainStations')}</div>
                    {locations.trainStations.map((station, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLocationSelect(station.value)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <LocationIcon type={station.iconType} className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-800">{station.label}</span>
                      </button>
                    ))}

                    <hr className="my-2" />

                    {/* Hotels */}
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">{t('hero.hotels')}</div>
                    {locations.hotels.map((hotel, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLocationSelect(hotel.value)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <LocationIcon type={hotel.iconType} className="w-5 h-5 text-gray-700" />
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
            <div className="flex-1 p-2 relative">
              <label className="block text-[9px] text-gray-600 mb-0">{t('hero.from')}</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveInput('from')
                    setShowDatePicker(true)
                    setShowTimePicker(false)
                  }}
                  className="flex-1 text-left text-gray-800 text-sm hover:bg-gray-50 rounded px-2 py-1"
                >
                  {searchData.startDate || t('hero.addDate')}
                </button>
                <button
                  onClick={() => {
                    if (searchData.startDate) {
                      setActiveTimeInput('start')
                      setShowTimePicker(true)
                      setShowDatePicker(false)
                    }
                  }}
                  disabled={!searchData.startDate}
                  className={`flex-1 text-left text-sm rounded px-2 py-1 ${
                    searchData.startDate
                      ? 'text-gray-800 hover:bg-gray-50 cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed bg-gray-50'
                  }`}
                >
                  {searchData.startTime}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* Until Date */}
            <div className="flex-1 p-2 relative">
              <label className="block text-[9px] text-gray-600 mb-0">{t('hero.until')}</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveInput('until')
                    setShowDatePicker(true)
                    setShowTimePicker(false)
                  }}
                  className="flex-1 text-left text-gray-800 text-sm hover:bg-gray-50 rounded px-2 py-1"
                >
                  {searchData.endDate || t('hero.addDate')}
                </button>
                <button
                  onClick={() => {
                    if (searchData.endDate) {
                      setActiveTimeInput('end')
                      setShowTimePicker(true)
                      setShowDatePicker(false)
                    }
                  }}
                  disabled={!searchData.endDate}
                  className={`flex-1 text-left text-sm rounded px-2 py-1 ${
                    searchData.endDate
                      ? 'text-gray-800 hover:bg-gray-50 cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed bg-gray-50'
                  }`}
                >
                  {searchData.endTime}
                </button>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="btn-search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={calendarView === 'dates' ? 'btn-tab-active' : 'btn-tab-inactive'}
                >
                  {t('hero.dates')}
                </button>
                <button
                  onClick={() => setCalendarView('months')}
                  className={calendarView === 'months' ? 'btn-tab-active' : 'btn-tab-inactive'}
                >
                  {t('hero.months')}
                </button>
              </div>

              {calendarView === 'dates' && (
                <div className="flex gap-8 justify-center">
                  {/* Calendar placeholders - simplified for now */}
                  <div>
                    <h3 className="text-center font-semibold text-gray-800 mb-4">Ekim 2025</h3>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {[t('hero.monday'), t('hero.tuesday'), t('hero.wednesday'), t('hero.thursday'), t('hero.friday'), t('hero.saturday'), t('hero.sunday')].map(day => (
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
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 hover:text-black"
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-center font-semibold text-gray-800 mb-4">Kasım 2025</h3>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {[t('hero.monday'), t('hero.tuesday'), t('hero.wednesday'), t('hero.thursday'), t('hero.friday'), t('hero.saturday'), t('hero.sunday')].map(day => (
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
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 hover:text-black"
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
                  className="btn-secondary"
                >
                  {t('hero.reset')}
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="btn-primary"
                >
                  {t('hero.save')}
                </button>
              </div>
            </div>
          )}

          {/* Time Picker Dropdown */}
          {showTimePicker && (
            <div ref={timePickerRef} className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl shadow-2xl z-[9999] p-6 border border-gray-200 max-w-md mx-auto">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {activeTimeInput === 'start' ? t('hero.startTime') : t('hero.endTime')}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{t('hero.selectTime')}</p>
              </div>

              <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                {generateTimeOptions().map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-3 text-sm rounded-lg transition-colors ${
                      (activeTimeInput === 'start' && searchData.startTime === time) ||
                      (activeTimeInput === 'end' && searchData.endTime === time)
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowTimePicker(false)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {t('hero.cancel')}
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
