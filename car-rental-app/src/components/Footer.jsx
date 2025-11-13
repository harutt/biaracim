import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const { t, i18n } = useTranslation()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [currency, setCurrency] = useState('TL')
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

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Top Destinations */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Popüler Şehirler</h4>
            <ul className="space-y-2">
              {turkishCities.map((city) => (
                <li key={city.name}>
                  <Link to={city.path} className="text-gray-600 hover:text-black text-sm transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Explore */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Keşfet</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/become-host" className="hover:text-black transition-colors">Araç Kirala</Link></li>
              <li><Link to="/calculator" className="hover:text-black transition-colors">Kazanç Hesaplayıcı</Link></li>
              <li><Link to="/insurance" className="hover:text-black transition-colors">Sigorta ve Koruma</Link></li>
              <li><Link to="/host-tools" className="hover:text-black transition-colors">Kiralama Yönetimi</Link></li>
            </ul>
          </div>

          {/* Column 3 - About */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Hakkımızda</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/why-choose" className="hover:text-black transition-colors">Neden BiAracım?</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">İletişim</Link></li>
              <li><Link to="/legal" className="hover:text-black transition-colors">Yasal</Link></li>
            </ul>
          </div>

          {/* Column 4 - Download App Placeholder */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Uygulamamızı İndirin</h4>
            <p className="text-gray-600 text-sm mb-4">Yakında App Store ve Google Play'de</p>
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
