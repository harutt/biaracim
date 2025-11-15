import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('genel-bakis')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showStickyTabs, setShowStickyTabs] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [tripStart, setTripStart] = useState('27/11/2025')
  const [tripEnd, setTripEnd] = useState('30/11/2025')
  const [startTime, setStartTime] = useState('10:00')
  const [endTime, setEndTime] = useState('10:00')
  const [pickupLocation, setPickupLocation] = useState('İstanbul, Kadıköy')

  // Refs for scroll spy
  const overviewRef = useRef(null)
  const featuresRef = useRef(null)
  const reviewsRef = useRef(null)
  const locationRef = useRef(null)

  // Sample car data
  const car = {
    id: 1,
    name: 'Nissan Sentra 2016',
    category: 'SV',
    rating: 5.0,
    totalTrips: 28,
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&h=600&fit=crop',
    ],
    price: 1137,
    originalPrice: 1238,
    savings: 101,
    specs: {
      seats: 5,
      gas: 'Benzin',
      mpg: 34,
      transmission: 'Otomatik'
    },
    host: {
      name: 'Ahmet Yılmaz',
      trips: 294,
      joinedDate: 'Ara 2024',
      rating: 4.9,
      isAllStar: true,
    },
    features: {
      safety: ['Geri görüş kamerası', 'Fren asistanı'],
      connectivity: ['AUX girişi', 'Bluetooth', 'USB şarj', 'USB girişi'],
      convenience: ['Kiralama ofisini atla', 'Ücretsiz ek sürücü ekle', '30 dakika teslimat toleransı'],
      peaceOfMind: ['Teslimattan önce yıkama gerekmez', 'Temel yol yardımı', '7/24 müşteri desteği']
    },
    distance: 600,
    distanceFee: 5,
    rules: [
      { title: 'Sigara içilmez', description: 'Araçta sigara içmek 500₺ cezaya tabidir' },
      { title: 'Aracı temiz tutun', description: 'Aşırı kirli araç 500₺ cezaya tabidir' },
      { title: 'Yakıt doldurun', description: 'Eksik yakıt ek ücrete tabidir' },
      { title: 'Arazi kullanımı yasaktır', description: '' }
    ],
    reviews: [
      { name: 'Mehmet K.', date: '9 Kasım 2025', rating: 5, text: 'Harika araba, harika ev sahibi. Tekrar kullanacağım.' },
      { name: 'Ayşe Y.', date: '6 Kasım 2025', rating: 5, text: 'Mükemmel deneyim! Araç temiz, güvenilir ve sorunsuzdu.' },
      { name: 'Can D.', date: '26 Ekim 2025', rating: 5, text: 'Temiz araç. Harika müşteri deneyimi ve destek. Bu lokasyonu ziyaret eden herkese tavsiye ederim' }
    ],
    ratings: {
      cleanliness: 5.0,
      maintenance: 5.0,
      communication: 5.0,
      convenience: 5.0,
      accuracy: 5.0
    }
  }

  const tabs = [
    { id: 'genel-bakis', label: 'GENEL BAKIŞ', ref: overviewRef },
    { id: 'ozellikler', label: 'ÖZELLİKLER', ref: featuresRef },
    { id: 'yorumlar', label: 'YORUMLAR', ref: reviewsRef },
    { id: 'konum', label: 'KONUM', ref: locationRef }
  ]

  // Handle scroll for sticky tabs
  useEffect(() => {
    const handleScroll = () => {
      // Show sticky tabs after scrolling past images (around 500px)
      setShowStickyTabs(window.scrollY > 500)

      // Auto-highlight tabs based on scroll position
      const scrollPosition = window.scrollY + 200

      if (locationRef.current && scrollPosition >= locationRef.current.offsetTop) {
        setActiveTab('konum')
      } else if (reviewsRef.current && scrollPosition >= reviewsRef.current.offsetTop) {
        setActiveTab('yorumlar')
      } else if (featuresRef.current && scrollPosition >= featuresRef.current.offsetTop) {
        setActiveTab('ozellikler')
      } else {
        setActiveTab('genel-bakis')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Initial Header with Search - FULL SCREEN WIDTH */}
      <div className="w-full bg-white border-b border-gray-200 py-4">
        <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-xl font-bold">BiAracım</button>
            <div className="relative">
              <svg className="w-5 h-5 absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Şehir, havaalanı, adres veya otel"
                className="w-80 pl-7 pr-4 py-2 bg-transparent text-gray-900 placeholder-gray-400 border-b border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Tabs (appears on scroll) - FULL SCREEN WIDTH - Turo style */}
      <div className={`w-full sticky top-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${showStickyTabs ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/')} className="text-xl font-bold py-4">BiAracım</button>
              <nav className="flex gap-1 ml-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.ref)}
                    className={`px-4 py-4 text-sm font-semibold transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-purple-600'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>


      {/* TURO EXACT CONTAINER - max-width: 1120px, centered, padding: 24px */}
      <div className="w-full mx-auto" style={{ maxWidth: '1120px', padding: '0 24px' }}>
        {/* Main Hero Image */}
        <div className="relative w-full h-[480px] mb-2">
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={() => setShowGalleryModal(true)}
          />
          {/* Favorite button - Top right */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Photo Gallery Grid - RESPONSIVE: 4 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {car.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="w-full h-[160px]">
              <img
                src={img}
                alt={`${car.name} ${idx + 2}`}
                onClick={() => setShowGalleryModal(true)}
                className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-start justify-center overflow-y-auto">
          <div className="bg-white w-full max-w-5xl my-8 rounded-lg relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
              <h2 className="text-xl font-bold">{car.name} • {car.rating}⭐</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowGalleryModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {car.images.map((img, idx) => (
                <div key={idx} className="aspect-video">
                  <img
                    src={img}
                    alt={`${car.name} ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT - TURO EXACT LAYOUT: 70% LEFT + 30% RIGHT */}
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT COLUMN - 70% WIDTH */}
          <div className="flex-1 lg:w-[70%] space-y-8">
            {/* Overview Section */}
            <div ref={overviewRef} id="genel-bakis">
              <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
              <div className="text-gray-600 mb-4">{car.category}</div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold">{car.rating}</span>
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-gray-600">({car.totalTrips} sürüş)</span>
              </div>

              {/* Specs */}
              <div className="flex gap-6 flex-wrap pb-8 border-b">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-gray-700">{car.specs.seats} koltuk</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-gray-700">{car.specs.gas}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{car.specs.transmission}</span>
                </div>
              </div>

              {/* Hosted By */}
              <div className="py-8 border-b">
                <h3 className="text-2xl font-bold mb-6">Sahibi</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {car.host.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{car.host.name}</div>
                    <div className="text-sm text-gray-600">{car.host.trips} sürüş • Katılma {car.host.joinedDate}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-semibold">{car.host.rating}</span>
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div ref={featuresRef} id="ozellikler" className="py-8 border-b">
              <h3 className="text-2xl font-bold mb-6">Araç Özellikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-3">Güvenlik</h4>
                  <ul className="space-y-2">
                    {car.features.safety.map((feature, idx) => (
                      <li key={idx} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Bağlantı</h4>
                  <ul className="space-y-2">
                    {car.features.connectivity.map((feature, idx) => (
                      <li key={idx} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div ref={reviewsRef} id="yorumlar" className="py-8 border-b">
              <h3 className="text-2xl font-bold mb-6">Değerlendirmeler ve Yorumlar</h3>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold">{car.rating}</span>
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-600">({car.totalTrips} değerlendirme)</span>
              </div>

              <div className="space-y-3 mb-8">
                {Object.entries(car.ratings).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4">
                    <div className="w-32 capitalize text-gray-700">
                      {key === 'cleanliness' && 'Temizlik'}
                      {key === 'maintenance' && 'Bakım'}
                      {key === 'communication' && 'İletişim'}
                      {key === 'convenience' && 'Rahatlık'}
                      {key === 'accuracy' && 'Doğruluk'}
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(value / 5) * 100}%` }}></div>
                    </div>
                    <div className="w-12 text-right font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-gray-600 uppercase text-sm mb-6">YORUMLAR</h4>

              <div className="space-y-6">
                {car.reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="font-semibold mb-1">{review.name} • {review.date}</div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div ref={locationRef} id="konum" className="py-8">
              <h3 className="text-2xl font-bold mb-6">Konum</h3>
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-gray-600">Harita</div>
                </div>
              </div>
              <div className="font-semibold">{pickupLocation}</div>
            </div>
          </div>

          {/* RIGHT COLUMN - 30% WIDTH - STICKY PRICING PANEL */}
          <div className="lg:w-[30%] lg:block hidden">
            <div className="sticky top-5 rounded-xl p-6 ml-10" style={{
              borderRadius: '12px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm text-gray-500 line-through">₺{car.originalPrice}</span>
                  <span className="text-3xl font-bold">₺{car.price} toplam</span>
                </div>
                <div className="text-sm text-gray-600">Vergiler hariç</div>
                <div className="text-sm text-green-600 font-medium">₺{car.savings} tasarruf</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Başlangıç</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tripStart}
                      onChange={(e) => setTripStart(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Bitiş</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tripEnd}
                      onChange={(e) => setTripEnd(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold">Alış & İade Konumu</label>
                    <button className="text-sm text-purple-600 hover:underline">Düzenle</button>
                  </div>
                  <div className="text-sm text-gray-700">{pickupLocation}</div>
                </div>
              </div>

              <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-4">
                Devam Et
              </button>

              <div className="border-t border-gray-200 pt-4 text-sm">
                <div className="font-bold mb-2">İptal politikası</div>
                <div className="text-gray-600">Rezervasyon tarihinden 24 saat önce ücretsiz iptal</div>
              </div>
            </div>
          </div>

          {/* MOBILE PRICING PANEL - Full width below 1024px */}
          <div className="lg:hidden w-full mt-8">
            <div className="rounded-xl p-6 bg-white" style={{
              borderRadius: '12px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm text-gray-500 line-through">₺{car.originalPrice}</span>
                  <span className="text-3xl font-bold">₺{car.price} toplam</span>
                </div>
                <div className="text-sm text-gray-600">Vergiler hariç</div>
                <div className="text-sm text-green-600 font-medium">₺{car.savings} tasarruf</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Başlangıç</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tripStart}
                      onChange={(e) => setTripStart(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Bitiş</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tripEnd}
                      onChange={(e) => setTripEnd(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold">Alış & İade Konumu</label>
                    <button className="text-sm text-purple-600 hover:underline">Düzenle</button>
                  </div>
                  <div className="text-sm text-gray-700">{pickupLocation}</div>
                </div>
              </div>

              <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-4">
                Devam Et
              </button>

              <div className="border-t border-gray-200 pt-4 text-sm">
                <div className="font-bold mb-2">İptal politikası</div>
                <div className="text-gray-600">Rezervasyon tarihinden 24 saat önce ücretsiz iptal</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Cars Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Benzer araçlar</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 2, name: 'Nissan Sentra 2025', rating: 5.0, trips: 24, price: 2238, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop' },
              { id: 3, name: 'Nissan Sentra 2023', rating: 4.89, trips: 101, price: 2130, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop' },
              { id: 4, name: 'Nissan Sentra 2024', rating: 4.9, trips: 172, price: 2018, savings: 102, image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop' },
            ].map((similarCar) => (
              <div
                key={similarCar.id}
                onClick={() => navigate(`/car/${similarCar.id}`)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={similarCar.image}
                  alt={similarCar.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold mb-2">{similarCar.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{similarCar.rating}</span>
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">({similarCar.trips} sürüş)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {similarCar.savings && (
                        <div className="text-xs text-green-600 font-medium">₺{similarCar.savings} tasarruf</div>
                      )}
                      <div className="font-bold text-lg">₺{similarCar.price} toplam</div>
                      <div className="text-xs text-gray-600">Vergiler hariç</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Breadcrumb */}
          <div className="mt-12 flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:underline">Araç kiralama</button>
            <span>→</span>
            <button className="hover:underline">Türkiye</button>
            <span>→</span>
            <button className="hover:underline">İstanbul</button>
            <span>→</span>
            <span className="text-gray-900">{car.name}</span>
          </div>
        </div>
      </div>

      {/* Footer Sections */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-[1280px] mx-auto px-8">
          {/* Vehicle Types & Makes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="font-bold mb-4">Araç Tipleri</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <a href="#" className="text-gray-700 hover:underline">Araç kiralama</a>
                <a href="#" className="text-gray-700 hover:underline">Lüks araç kiralama</a>
                <a href="#" className="text-gray-700 hover:underline">Klasik araç kiralama</a>
                <a href="#" className="text-gray-700 hover:underline">Minivan kiralama</a>
                <a href="#" className="text-gray-700 hover:underline">Cabrio araç kiralama</a>
                <a href="#" className="text-gray-700 hover:underline">Spor araç kiralama</a>
                <a href="#" className="text-gray-700 hover:underline">Elektrikli araç kiralama</a>
                <a href="#" className="text-gray-700 hover:underline">SUV kiralama</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Markalar</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <a href="#" className="text-gray-700 hover:underline">Audi</a>
                <a href="#" className="text-gray-700 hover:underline">Lamborghini</a>
                <a href="#" className="text-gray-700 hover:underline">BMW</a>
                <a href="#" className="text-gray-700 hover:underline">Mercedes-Benz</a>
                <a href="#" className="text-gray-700 hover:underline">Ferrari</a>
                <a href="#" className="text-gray-700 hover:underline">Porsche</a>
                <a href="#" className="text-gray-700 hover:underline">Jeep</a>
                <a href="#" className="text-gray-700 hover:underline">Tesla</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8"></div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* BiAracım Column */}
            <div>
              <h5 className="font-bold mb-4">BiAracım</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-700 hover:underline">Hakkımızda</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Ekip</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Politikalar</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Kariyer</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Basın</a></li>
              </ul>
            </div>

            {/* Lokasyonlar Column */}
            <div>
              <h5 className="font-bold mb-4">Lokasyonlar</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-700 hover:underline">İstanbul</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Ankara</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">İzmir</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Antalya</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Bursa</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Adana</a></li>
              </ul>
            </div>

            {/* Keşfet Column */}
            <div>
              <h5 className="font-bold mb-4">Keşfet</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-700 hover:underline">Neden BiAracım</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Düğünler</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Güven & Güvenlik</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Yardım</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Sigorta & Koruma</a></li>
              </ul>
            </div>

            {/* Ev Sahibi Column */}
            <div>
              <h5 className="font-bold mb-4">Ev Sahibi</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-700 hover:underline">Aracını Listele</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Hesaplayıcı</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">All-Star Hosts</a></li>
                <li><a href="#" className="text-gray-700 hover:underline">Ev Sahibi Araçları</a></li>
              </ul>
            </div>
          </div>

          {/* Social & Apps */}
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-300 pt-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <a href="#" className="p-2 hover:bg-gray-200 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-gray-200 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-gray-200 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a href="#" className="border border-gray-400 rounded-lg px-4 py-2 hover:bg-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-xs">
                    <div>Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
              </a>
              <a href="#" className="border border-gray-400 rounded-lg px-4 py-2 hover:bg-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-xs">
                    <div>GET IT ON</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-300 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
            <div>© 2025 BiAracım</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:underline">Şartlar</a>
              <a href="#" className="hover:underline">Gizlilik</a>
              <a href="#" className="hover:underline">Çerez Tercihleri</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CarDetail
