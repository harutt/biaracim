import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { logOut } from '../firebase'

function Header() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const isHomePage = location.pathname === '/'
  const isSearchPage = location.pathname.startsWith('/search')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isStartDateOpen, setIsStartDateOpen] = useState(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState(false)
  const [isAgeOpen, setIsAgeOpen] = useState(false)
  const menuRef = useRef(null)
  const userRef = useRef(null)
  const locationRef = useRef(null)
  const startDateRef = useRef(null)
  const endDateRef = useRef(null)
  const ageRef = useRef(null)

  // Get location from URL params on search page
  const searchLocation = searchParams.get('location') || ''
  const displayLocation = searchLocation === 'current'
    ? '📍 Mevcut Konumum'
    : searchLocation || 'Şehir, havaalanı, adres veya otel'

  const handleLogout = async () => {
    try {
      await logOut()
      setIsMenuOpen(false)
      setIsUserOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserOpen(false)
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false)
      }
      if (startDateRef.current && !startDateRef.current.contains(event.target)) {
        setIsStartDateOpen(false)
      }
      if (endDateRef.current && !endDateRef.current.contains(event.target)) {
        setIsEndDateOpen(false)
      }
      if (ageRef.current && !ageRef.current.contains(event.target)) {
        setIsAgeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocationSelect = (selectedLocation) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('location', selectedLocation)
    navigate(`/search?${newParams.toString()}`)
    setIsLocationOpen(false)
  }

  const handleDateSelect = (date, type) => {
    const newParams = new URLSearchParams(searchParams)
    if (type === 'start') {
      newParams.set('startDate', date)
      if (!newParams.get('startTime')) {
        newParams.set('startTime', '10:00')
      }
    } else {
      newParams.set('endDate', date)
      if (!newParams.get('endTime')) {
        newParams.set('endTime', '10:00')
      }
    }
    navigate(`/search?${newParams.toString()}`)
  }

  const handleTimeSelect = (time, type) => {
    const newParams = new URLSearchParams(searchParams)
    if (type === 'start') {
      newParams.set('startTime', time)
    } else {
      newParams.set('endTime', time)
    }
    navigate(`/search?${newParams.toString()}`)
  }

  const handleAgeSelect = (age) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('age', age)
    navigate(`/search?${newParams.toString()}`)
    setIsAgeOpen(false)
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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full">
        <div className="container max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Search */}
          <div className="flex items-center gap-2 flex-1">
            <Link to="/" className="text-lg md:text-xl font-bold whitespace-nowrap">
              BiAracım
            </Link>
            {isSearchPage ? (
              // SearchResults page - Turo-style search bar
              <div className="flex items-center gap-6 flex-1 max-w-5xl ml-4">
                {/* Where */}
                <div className="flex-1 min-w-0 relative" ref={locationRef}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#593CFB' }}>Nerede</label>
                  <button
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className="flex items-center gap-2 w-full"
                  >
                    <span className="text-gray-900 text-sm font-medium truncate">
                      {displayLocation === 'Şehir, havaalanı, adres veya otel' ? displayLocation.split(',')[0] : displayLocation}
                    </span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="h-0.5 bg-gray-200 mt-1"></div>

                  {/* Location Dropdown */}
                  {isLocationOpen && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                      {/* History Section */}
                      <div className="px-4 py-2">
                        <div className="text-xs font-semibold text-gray-500 mb-2">History</div>
                        <button
                          onClick={() => handleLocationSelect(displayLocation)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{displayLocation}</div>
                            <div className="text-xs text-gray-500">Son arama</div>
                          </div>
                        </button>
                      </div>

                      <div className="border-t border-gray-100 my-2"></div>

                      {/* Airports */}
                      <div className="px-4 py-2">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Havaalanları</div>
                        <button
                          onClick={() => handleLocationSelect('İstanbul Havalimanı')}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">IST - İstanbul Havalimanı</span>
                        </button>
                        <button
                          onClick={() => handleLocationSelect('Sabiha Gökçen Havalimanı')}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">SAW - Sabiha Gökçen Havalimanı</span>
                        </button>
                      </div>

                      <div className="border-t border-gray-100 my-2"></div>

                      {/* Cities */}
                      <div className="px-4 py-2">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Şehirler</div>
                        {['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'].map((city) => (
                          <button
                            key={city}
                            onClick={() => handleLocationSelect(city)}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <span className="font-medium text-gray-900">{city}</span>
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 my-2"></div>

                      {/* Train Stations */}
                      <div className="px-4 py-2">
                        <div className="text-xs font-semibold text-gray-500 mb-2">Tren İstasyonları</div>
                        <button
                          onClick={() => handleLocationSelect('Ankara Garı')}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">Ankara Garı</span>
                        </button>
                        <button
                          onClick={() => handleLocationSelect('Haydarpaşa Garı')}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">Haydarpaşa Garı, İstanbul</span>
                        </button>
                      </div>

                      {/* Powered by Google */}
                      <div className="px-4 py-2 text-center">
                        <span className="text-xs text-gray-400">powered by </span>
                        <span className="text-xs font-semibold">
                          <span style={{ color: '#4285F4' }}>G</span>
                          <span style={{ color: '#EA4335' }}>o</span>
                          <span style={{ color: '#FBBC05' }}>o</span>
                          <span style={{ color: '#4285F4' }}>g</span>
                          <span style={{ color: '#34A853' }}>l</span>
                          <span style={{ color: '#EA4335' }}>e</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* From */}
                <div className="flex-1 min-w-0 relative" ref={startDateRef}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#593CFB' }}>Başlangıç</label>
                  <button
                    onClick={() => setIsStartDateOpen(!isStartDateOpen)}
                    className="flex items-center gap-2 w-full"
                  >
                    <span className="text-gray-900 text-sm truncate">
                      {searchParams.get('startDate')
                        ? new Date(searchParams.get('startDate')).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
                        : 'Tarih ekle'}
                    </span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {searchParams.get('startTime') && (
                    <button
                      onClick={() => setIsStartDateOpen(!isStartDateOpen)}
                      className="flex items-center gap-2 w-full mt-1"
                    >
                      <span className="text-gray-700 text-xs truncate">
                        {searchParams.get('startTime')}
                      </span>
                    </button>
                  )}
                  <div className="h-0.5 bg-gray-200 mt-1"></div>

                  {/* Start Date/Time Picker Modal */}
                  {isStartDateOpen && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50 max-h-96 overflow-y-auto">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Tarih Seç</h3>
                          <input
                            type="date"
                            value={searchParams.get('startDate') || ''}
                            onChange={(e) => handleDateSelect(e.target.value, 'start')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Saat Seç</h3>
                          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                            {generateTimeOptions().map((time) => (
                              <button
                                key={time}
                                onClick={() => {
                                  handleTimeSelect(time, 'start')
                                  setIsStartDateOpen(false)
                                }}
                                className={`p-2 text-xs rounded-lg transition-colors ${
                                  searchParams.get('startTime') === time
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Until */}
                <div className="flex-1 min-w-0 relative" ref={endDateRef}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#593CFB' }}>Bitiş</label>
                  <button
                    onClick={() => setIsEndDateOpen(!isEndDateOpen)}
                    className="flex items-center gap-2 w-full"
                  >
                    <span className="text-gray-900 text-sm truncate">
                      {searchParams.get('endDate')
                        ? new Date(searchParams.get('endDate')).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
                        : 'Tarih ekle'}
                    </span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {searchParams.get('endTime') && (
                    <button
                      onClick={() => setIsEndDateOpen(!isEndDateOpen)}
                      className="flex items-center gap-2 w-full mt-1"
                    >
                      <span className="text-gray-700 text-xs truncate">
                        {searchParams.get('endTime')}
                      </span>
                    </button>
                  )}
                  <div className="h-0.5 bg-gray-200 mt-1"></div>

                  {/* End Date/Time Picker Modal */}
                  {isEndDateOpen && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-50 max-h-96 overflow-y-auto">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Tarih Seç</h3>
                          <input
                            type="date"
                            value={searchParams.get('endDate') || ''}
                            onChange={(e) => handleDateSelect(e.target.value, 'end')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Saat Seç</h3>
                          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                            {generateTimeOptions().map((time) => (
                              <button
                                key={time}
                                onClick={() => {
                                  handleTimeSelect(time, 'end')
                                  setIsEndDateOpen(false)
                                }}
                                className={`p-2 text-xs rounded-lg transition-colors ${
                                  searchParams.get('endTime') === time
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Age */}
                <div className="min-w-0 relative" ref={ageRef}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#593CFB' }}>Yaş</label>
                  <button
                    onClick={() => setIsAgeOpen(!isAgeOpen)}
                    className="flex items-center gap-2"
                  >
                    <span className="text-gray-900 text-sm">{searchParams.get('age') || '30'}</span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="h-0.5 bg-gray-200 mt-1"></div>

                  {/* Age Picker Modal */}
                  {isAgeOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 max-h-64 overflow-y-auto">
                      <h3 className="text-sm font-semibold mb-3">Yaşınızı Seçin</h3>
                      <div className="space-y-1">
                        {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75].map((age) => (
                          <button
                            key={age}
                            onClick={() => handleAgeSelect(age.toString())}
                            className={`w-full px-3 py-2 text-left rounded-lg transition-colors ${
                              (searchParams.get('age') || '30') === age.toString()
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : !isHomePage && (
              // Other pages - Show simple search
              <div className="relative hidden md:block">
                <svg className="w-5 h-5 absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Şehir, havaalanı, adres veya otel"
                  onClick={() => navigate('/')}
                  className="w-80 pl-7 pr-4 py-2 bg-transparent text-gray-900 placeholder-gray-400 border-b border-gray-300 focus:outline-none focus:border-gray-500 transition-colors cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Main Menu Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 md:w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-h-[80vh] overflow-y-auto">
                  {!user && (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-sm font-medium">{t('header.login')}</span>
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span className="text-sm font-medium">{t('header.signup')}</span>
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>
                    </>
                  )}

                  <Link
                    to="/become-host"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="text-sm font-medium">{t('header.become_host')}</span>
                  </Link>

                  <Link
                    to="/why-choose"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">{t('header.why_us')}</span>
                  </Link>

                  <div className="border-t border-gray-100 my-2"></div>

                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-sm font-medium">{t('header.contact')}</span>
                  </Link>

                  <Link
                    to="/insurance"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium">{t('header.insurance')}</span>
                  </Link>

                  <Link
                    to="/calculator"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{t('header.calculator')}</span>
                  </Link>

                  <div className="border-t border-gray-100 my-2"></div>

                  <Link
                    to="/legal"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium">{t('header.legal')}</span>
                  </Link>

                  <Link
                    to="/host-tools"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium">{t('header.host_tools')}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* User Icon */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setIsUserOpen(!isUserOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {isUserOpen && (
                <div className="absolute right-0 mt-2 w-72 md:w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 max-h-[80vh] overflow-y-auto">
                  {user ? (
                    <>
                      <Link
                        to="/favorites"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.favorites')}</span>
                      </Link>

                      <Link
                        to="/trips"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.trips')}</span>
                      </Link>

                      <Link
                        to="/inbox"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.inbox')}</span>
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>

                      <Link
                        to="/profile"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.profile')}</span>
                      </Link>

                      <Link
                        to="/account"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.account')}</span>
                      </Link>

                      <Link
                        to="/become-host"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.become_host_menu')}</span>
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>

                      <Link
                        to="/why-choose"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.why_choose_menu')}</span>
                      </Link>

                      <Link
                        to="/contact"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.contact_support')}</span>
                      </Link>

                      <Link
                        to="/legal"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-normal">{t('header.legal')}</span>
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-sm font-normal text-gray-700">{t('header.logout')}</span>
                      </button>
                    </>
                  ) : (
                    <div className="py-2">
                      <Link
                        to="/login"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-sm font-medium">{t('header.login')}</span>
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setIsUserOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span className="text-sm font-medium">{t('header.signup')}</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header
