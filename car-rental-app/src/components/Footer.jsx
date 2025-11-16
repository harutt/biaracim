import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const { t, i18n } = useTranslation()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [currency, setCurrency] = useState('TL')
  const [activeTab, setActiveTab] = useState('vehicle-types')
  const [showMore, setShowMore] = useState(false)
  const langRef = useRef(null)
  const currencyRef = useRef(null)

  const FlagIcon = ({ countryCode }) => {
    const flags = {
      TR: (
        <svg className="w-5 h-4" viewBox="0 0 640 480">
          <rect width="640" height="480" fill="#e30a17"/>
          <circle cx="200" cy="240" r="90" fill="#fff"/>
          <circle cx="220" cy="240" r="72" fill="#e30a17"/>
          <polygon points="280,150 310,220 390,220 320,270 350,340 280,290 210,340 240,270 170,220 250,220" fill="#fff"/>
        </svg>
      ),
      EN: (
        <svg className="w-5 h-4" viewBox="0 0 640 480">
          <rect width="640" height="480" fill="#012169"/>
          <path d="M0,0 L640,480 M640,0 L0,480" stroke="#fff" strokeWidth="96"/>
          <path d="M0,0 L640,480 M640,0 L0,480" stroke="#C8102E" strokeWidth="64"/>
          <path d="M320,0 V480 M0,240 H640" stroke="#fff" strokeWidth="160"/>
          <path d="M320,0 V480 M0,240 H640" stroke="#C8102E" strokeWidth="96"/>
        </svg>
      ),
      RU: (
        <svg className="w-5 h-4" viewBox="0 0 640 480">
          <rect width="640" height="160" fill="#fff"/>
          <rect y="160" width="640" height="160" fill="#0039a6"/>
          <rect y="320" width="640" height="160" fill="#d52b1e"/>
        </svg>
      ),
      AR: (
        <svg className="w-5 h-4" viewBox="0 0 640 480">
          <rect width="640" height="160" fill="#000"/>
          <rect y="160" width="640" height="160" fill="#fff"/>
          <rect y="320" width="640" height="160" fill="#ce1126"/>
        </svg>
      )
    }
    return flags[countryCode] || null
  }

  const languages = {
    tr: { name: 'Türkçe', flag: 'TR' },
    en: { name: 'English', flag: 'EN' },
    ru: { name: 'Русский', flag: 'RU' },
    ar: { name: 'العربية', flag: 'AR' }
  }

  const currencies = {
    TL: { symbol: '₺', name: 'TRY' },
    USD: { symbol: '$', name: 'USD' },
    EUR: { symbol: '€', name: 'EUR' }
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setIsLangOpen(false)
  }

  const changeCurrency = (curr) => {
    setCurrency(curr)
    setIsCurrencyOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false)
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const turkishCities = [
    { name: 'İstanbul', path: '/city/istanbul' },
    { name: 'Ankara', path: '/city/ankara' },
    { name: 'İzmir', path: '/city/izmir' },
    { name: 'Antalya', path: '/city/antalya' },
    { name: 'Bursa', path: '/city/bursa' },
    { name: 'Adana', path: '/city/adana' }
  ]

  const footerCategories = {
    'vehicle-types': {
      title: 'ARAÇ TİPLERİ',
      items: [
        { name: 'Araç kiralama', path: '/car-rental' },
        { name: 'Minivan kiralama', path: '/minivan-rental' },
        { name: 'Ticari araç kiralama', path: '/cargo-van-rental' },
        { name: 'Cabrio kiralama', path: '/convertible-rental' },
        { name: 'Lüks araç kiralama', path: '/luxury-rental' },
        { name: 'SUV kiralama', path: '/suv-rental' },
        { name: 'Elektrikli araç', path: '/electric-rental' },
        { name: 'Klasik araç', path: '/classic-rental' },
        { name: 'Spor araç', path: '/sport-rental' },
        { name: 'Van kiralama', path: '/van-rental' },
        { name: 'Kamyonet kiralama', path: '/truck-rental' },
        { name: 'Düğün araçları', path: '/wedding-rental' }
      ]
    },
    'makes-models': {
      title: 'MARKA & MODELLER',
      items: [
        { name: 'BMW kiralama', path: '/bmw' },
        { name: 'Mercedes kiralama', path: '/mercedes' },
        { name: 'Audi kiralama', path: '/audi' },
        { name: 'Volkswagen kiralama', path: '/volkswagen' },
        { name: 'Renault kiralama', path: '/renault' },
        { name: 'Fiat kiralama', path: '/fiat' },
        { name: 'Toyota kiralama', path: '/toyota' },
        { name: 'Honda kiralama', path: '/honda' },
        { name: 'Hyundai kiralama', path: '/hyundai' },
        { name: 'Ford kiralama', path: '/ford' },
        { name: 'Peugeot kiralama', path: '/peugeot' },
        { name: 'Opel kiralama', path: '/opel' }
      ]
    },
    'cities': {
      title: 'ŞEHİRLER',
      items: [
        { name: 'İstanbul kiralama', path: '/istanbul' },
        { name: 'Ankara kiralama', path: '/ankara' },
        { name: 'İzmir kiralama', path: '/izmir' },
        { name: 'Antalya kiralama', path: '/antalya' },
        { name: 'Bursa kiralama', path: '/bursa' },
        { name: 'Adana kiralama', path: '/adana' },
        { name: 'Gaziantep kiralama', path: '/gaziantep' },
        { name: 'Konya kiralama', path: '/konya' },
        { name: 'Mersin kiralama', path: '/mersin' },
        { name: 'Kayseri kiralama', path: '/kayseri' },
        { name: 'Eskişehir kiralama', path: '/eskisehir' },
        { name: 'Denizli kiralama', path: '/denizli' }
      ]
    },
    'airports': {
      title: 'HAVALİMANLARI',
      items: [
        { name: 'İstanbul Havalimanı (IST)', path: '/ist-airport' },
        { name: 'Sabiha Gökçen (SAW)', path: '/saw-airport' },
        { name: 'Antalya Havalimanı (AYT)', path: '/ayt-airport' },
        { name: 'Esenboğa Havalimanı (ESB)', path: '/esb-airport' },
        { name: 'İzmir Adnan Menderes (ADB)', path: '/adb-airport' },
        { name: 'Dalaman Havalimanı (DLM)', path: '/dlm-airport' },
        { name: 'Bodrum Havalimanı (BJV)', path: '/bjv-airport' },
        { name: 'Gaziantep Havalimanı (GZT)', path: '/gzt-airport' },
        { name: 'Trabzon Havalimanı (TZX)', path: '/tzx-airport' },
        { name: 'Adana Havalimanı (ADA)', path: '/ada-airport' }
      ]
    },
    'international': {
      title: 'ULUSLARARASI ŞEHİRLER',
      items: [
        { name: 'Lefkoşa kiralama', path: '/nicosia' },
        { name: 'Girne kiralama', path: '/kyrenia' },
        { name: 'Gazimağusa kiralama', path: '/famagusta' },
        { name: 'Bakü kiralama', path: '/baku' },
        { name: 'Tiflis kiralama', path: '/tbilisi' },
        { name: 'Atina kiralama', path: '/athens' },
        { name: 'Sofya kiralama', path: '/sofia' },
        { name: 'Belgrad kiralama', path: '/belgrade' }
      ]
    },
    'regions': {
      title: 'BÖLGELER',
      items: [
        { name: 'Marmara Bölgesi', path: '/marmara' },
        { name: 'Ege Bölgesi', path: '/ege' },
        { name: 'Akdeniz Bölgesi', path: '/akdeniz' },
        { name: 'İç Anadolu Bölgesi', path: '/ic-anadolu' },
        { name: 'Karadeniz Bölgesi', path: '/karadeniz' },
        { name: 'Doğu Anadolu Bölgesi', path: '/dogu-anadolu' },
        { name: 'Güneydoğu Anadolu Bölgesi', path: '/guneydogu-anadolu' }
      ]
    }
  }

  const currentCategory = footerCategories[activeTab]
  const displayedItems = showMore ? currentCategory.items : currentCategory.items.slice(0, 8)

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container py-12">
        {/* Browse Categories Section with Tabs */}
        <div className="mb-12 pb-12 border-b border-gray-200">
          {/* Tab Headers */}
          <div className="flex flex-wrap gap-6 mb-8 border-b border-gray-300">
            <button
              onClick={() => { setActiveTab('vehicle-types'); setShowMore(false); }}
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                activeTab === 'vehicle-types'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ARAÇ TİPLERİ
            </button>
            <button
              onClick={() => { setActiveTab('makes-models'); setShowMore(false); }}
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                activeTab === 'makes-models'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              MARKA & MODELLER
            </button>
            <button
              onClick={() => { setActiveTab('cities'); setShowMore(false); }}
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                activeTab === 'cities'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ŞEHİRLER
            </button>
            <button
              onClick={() => { setActiveTab('airports'); setShowMore(false); }}
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                activeTab === 'airports'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              HAVALİMANLARI
            </button>
            <button
              onClick={() => { setActiveTab('international'); setShowMore(false); }}
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                activeTab === 'international'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ULUSLARARASI ŞEHİRLER
            </button>
            <button
              onClick={() => { setActiveTab('regions'); setShowMore(false); }}
              className={`pb-3 px-1 text-sm font-semibold transition-colors relative ${
                activeTab === 'regions'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              BÖLGELER
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-3">
            {displayedItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-gray-700 hover:text-black text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Show More/Less Button */}
          {currentCategory.items.length > 8 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-6 text-purple-600 font-semibold text-sm hover:underline"
            >
              {showMore ? 'Daha az göster' : 'Daha fazla göster'}
            </button>
          )}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - BiAracım */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">BiAracım</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-black text-sm transition-colors">Hakkımızda</Link></li>
              <li><Link to="/team" className="text-gray-600 hover:text-black text-sm transition-colors">Ekip</Link></li>
              <li><Link to="/policies" className="text-gray-600 hover:text-black text-sm transition-colors">Politikalar</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-black text-sm transition-colors">Kariyer</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-black text-sm transition-colors">Basın</Link></li>
              <li><Link to="/openroad" className="text-gray-600 hover:text-black text-sm transition-colors">OpenRoad</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-black text-sm transition-colors">BiAracım Mağaza</Link></li>
            </ul>
          </div>

          {/* Column 2 - Locations */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Konumlar</h4>
            <ul className="space-y-3">
              {turkishCities.map((city) => (
                <li key={city.name}>
                  <Link to={city.path} className="text-gray-600 hover:text-black text-sm transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Explore */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Keşfet</h4>
            <ul className="space-y-3">
              <li><Link to="/why-choose" className="text-gray-600 hover:text-black text-sm transition-colors">Neden BiAracım?</Link></li>
              <li><Link to="/weddings" className="text-gray-600 hover:text-black text-sm transition-colors">Düğünler</Link></li>
              <li><Link to="/pitch-trip" className="text-gray-600 hover:text-black text-sm transition-colors">Seyahat Öner</Link></li>
              <li><Link to="/trust-safety" className="text-gray-600 hover:text-black text-sm transition-colors">Güven ve Güvenlik</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-black text-sm transition-colors">Yardım Al</Link></li>
            </ul>
          </div>

          {/* Column 4 - Hosting */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Ev Sahipliği</h4>
            <ul className="space-y-3">
              <li><Link to="/list-car" className="text-gray-600 hover:text-black text-sm transition-colors">Aracını Listele</Link></li>
              <li><Link to="/calculator" className="text-gray-600 hover:text-black text-sm transition-colors">Kazanç Hesaplayıcı</Link></li>
              <li><Link to="/all-star-hosts" className="text-gray-600 hover:text-black text-sm transition-colors">Tüm Yıldız Ev Sahipleri</Link></li>
              <li><Link to="/host-tools" className="text-gray-600 hover:text-black text-sm transition-colors">Ev Sahibi Araçları</Link></li>
              <li><Link to="/insurance" className="text-gray-600 hover:text-black text-sm transition-colors">Sigorta ve Koruma</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons & App Download */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="/blog" className="px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                BLOG
              </a>
            </div>

            {/* App Download Buttons */}
            <div className="flex items-center gap-3">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="App Store'dan indir" className="h-10" />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play'den indir" className="h-10" />
              </a>
            </div>
          </div>
        </div>

        {/* Language & Currency Selector + Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Language and Currency Selectors */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  <FlagIcon countryCode={languages[i18n.language]?.flag || 'TR'} />
                  <span className="text-sm font-medium text-gray-900">{languages[i18n.language]?.name || 'Türkçe'}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isLangOpen && (
                  <div className="absolute bottom-full mb-2 left-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {Object.entries(languages).map(([code, { name, flag }]) => (
                      <button
                        key={code}
                        onClick={() => changeLanguage(code)}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                          i18n.language === code ? 'bg-gray-100' : ''
                        }`}
                      >
                        <FlagIcon countryCode={flag} />
                        <span className="text-sm font-medium text-gray-900">{name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency Selector */}
              <div className="relative" ref={currencyRef}>
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">{currencies[currency].name} ({currencies[currency].symbol})</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isCurrencyOpen && (
                  <div className="absolute bottom-full mb-2 left-0 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {Object.entries(currencies).map(([code, { name, symbol }]) => (
                      <button
                        key={code}
                        onClick={() => changeCurrency(code)}
                        className={`flex items-center justify-between w-full px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                          currency === code ? 'bg-gray-100' : ''
                        }`}
                      >
                        <span className="text-sm font-medium text-gray-900">{name}</span>
                        <span className="text-sm text-gray-600">{symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-600">
              © 2024 BiAracım. Tüm hakları saklıdır.
            </div>
          </div>
        </div>

        {/* Bottom Legal Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          <Link to="/legal/terms" className="hover:text-gray-900 transition-colors">Kullanım Koşulları</Link>
          <span>•</span>
          <Link to="/legal/privacy" className="hover:text-gray-900 transition-colors">Gizlilik Politikası</Link>
          <span>•</span>
          <Link to="/legal/cookies" className="hover:text-gray-900 transition-colors">Çerez Politikası</Link>
          <span>•</span>
          <Link to="/sitemap" className="hover:text-gray-900 transition-colors">Site Haritası</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
