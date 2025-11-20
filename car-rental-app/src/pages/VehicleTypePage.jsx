import { useParams, Link } from 'react-router-dom'
import { useRef } from 'react'
import { allCars } from '../data/cars'
import CarCard from '../components/CarCard'
import { formatPrice } from '../utils/formatters'

function VehicleTypePage() {
  const { type } = useParams()
  const scrollRef = useRef(null)

  const vehicleTypes = {
    'car-rental': {
      title: 'Türkiye\'de araç kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: () => true, // All cars
    },
    'economy-rental': {
      title: 'Ekonomik araç kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.price <= 600,
    },
    'midsize-rental': {
      title: 'Orta sınıf araç kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.price > 600 && car.price <= 1200,
    },
    'luxury-rental': {
      title: 'Lüks araç kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.type?.toLowerCase().includes('luxury') || car.price > 1200,
    },
    'suv-rental': {
      title: 'SUV kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.type?.toLowerCase().includes('suv'),
    },
    'sedan-rental': {
      title: 'Sedan kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.type?.toLowerCase().includes('sedan'),
    },
    'hatchback-rental': {
      title: 'Hatchback kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.type?.toLowerCase().includes('hatchback'),
    },
    'wagon-rental': {
      title: 'Station wagon kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.type?.toLowerCase().includes('wagon') || car.type?.toLowerCase().includes('estate'),
    },
    'minivan-rental': {
      title: 'Minivan kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.type?.toLowerCase().includes('minivan') || car.seats >= 7,
    },
    'cargo-van-rental': {
      title: 'Ticari araç kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.type?.toLowerCase().includes('van') || car.type?.toLowerCase().includes('cargo') || car.type?.toLowerCase().includes('ticari'),
    },
    'truck-rental': {
      title: 'Kamyonet kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.type?.toLowerCase().includes('truck') || car.type?.toLowerCase().includes('pickup'),
    },
    'electric-rental': {
      title: 'Elektrikli araç kiralama',
      subtitle: 'BiAracım araç kiralama pazarını keşfedin',
      filter: (car) => car.features?.includes('Elektrikli') || car.fuel === 'Electric' || car.isElectric === true,
    },
  }

  const currentType = vehicleTypes[type] || vehicleTypes['car-rental']

  // Filter cars based on type
  let filteredCars = allCars.filter(currentType.filter)

  // If we don't have enough cars, pad with general cars
  if (filteredCars.length < 8) {
    const otherCars = allCars.filter(car => !filteredCars.find(f => f.id === car.id))
    filteredCars = [...filteredCars, ...otherCars].slice(0, 16)
  } else {
    filteredCars = filteredCars.slice(0, 16)
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean White Background */}
      <div className="bg-white border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
              {currentType.title}
            </h1>
            <p className="text-xl text-gray-600">
              {currentType.subtitle}
            </p>
          </div>

          {/* Simple Search Box - Turo Style */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Where */}
                <div className="flex-1 px-4 py-3 border-r border-gray-200">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nerede</label>
                  <input
                    type="text"
                    placeholder="Şehir, havaalanı, adres veya otel"
                    className="w-full text-gray-900 placeholder-gray-400 border-none outline-none text-base"
                  />
                </div>

                {/* From - Date */}
                <div className="flex-1 px-4 py-3 border-r border-gray-200">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Başlangıç</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tarih ekle"
                      className="flex-1 text-gray-900 placeholder-gray-400 border-none outline-none text-base"
                    />
                    <input
                      type="text"
                      placeholder="10:00"
                      className="w-20 text-gray-900 placeholder-gray-400 border-none outline-none text-base"
                    />
                  </div>
                </div>

                {/* Until - Date */}
                <div className="flex-1 px-4 py-3 border-r border-gray-200">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Bitiş</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tarih ekle"
                      className="flex-1 text-gray-900 placeholder-gray-400 border-none outline-none text-base"
                    />
                    <input
                      type="text"
                      placeholder="10:00"
                      className="w-20 text-gray-900 placeholder-gray-400 border-none outline-none text-base"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-center px-2">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Breadcrumb Links */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-700 hover:text-gray-900 hover:underline">
                Araç kiralama
              </Link>
              <span className="text-gray-400">→</span>
              <span className="text-gray-900 font-medium">{currentType.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Car Rentals Section */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Lüks araç kiralama
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              aria-label="Sola kaydır"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              aria-label="Sağa kaydır"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-4 pb-4">
            {allCars.filter(car => car.price > 1200 || car.type?.toLowerCase().includes('luxury')).slice(0, 12).map((car) => (
              <div key={car.id} className="w-[280px] flex-shrink-0">
                <CarCard car={{
                  ...car,
                  price: formatPrice(car.price),
                  location: car.location
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skip the Counter Section */}
      <div className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
                alt="Araç kiralama"
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
                Geleneksel kiralama ofislerine veda edin
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                BiAracım'da araç kiralamak için geleneksel kiralama şirketlerinin ofislerine gitmenize gerek yok. Türkiye'nin en büyük araç paylaşım pazarında binlerce araç seçeneği arasından size en uygun olanı bulun.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Günlük kullanımdan lüks araçlara kadar geniş bir yelpazede araçları keşfedin ve telefonunuzdan hemen kiralayın. İster iş seyahati, ister tatil, BiAracım ile her yerde, her zaman.
              </p>
              <Link
                to="/search"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition"
              >
                Mükemmel aracı kirala
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Three Columns */}
      <div className="bg-gray-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Sonsuz seçenek
              </h3>
              <p className="text-gray-700 leading-relaxed">
                İster aile yolculuğu için SUV, ister günlük işler için ekonomik araç, ister özel bir gece için klasik spor araba olsun, her türlü ihtiyaç ve bütçe için mükemmel aracı BiAracım'da bulun.
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Kolay teslimat seçenekleri
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Aracınızı size veya gittiğiniz yere teslim edin. Birçok ev sahibi, havaalanları, tren istasyonları ve oteller gibi özel konumlara veya ilgi çekici noktalara teslimat sunmaktadır.
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Hasar koruma sigortası
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Sizin için doğru koruma seviyesini elde etmek için üç koruma planı arasından seçim yapın — Premium, Standart veya Minimum. Araç hasarı veya hırsızlık için daha hafif koruma ile daha düşük ödeme yapın.*
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Category Section */}
      <div className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Kategoriye göre keşfedin
            </h2>
            <div className="flex gap-2">
              <button
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                aria-label="Sola kaydır"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                aria-label="Sağa kaydır"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Sedanlar */}
            <Link to="/sedan-rental" className="group">
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop"
                  alt="Sedanlar"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">Sedanlar</h3>
            </Link>

            {/* Ekonomik Araçlar */}
            <Link to="/economy-rental" className="group">
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src="https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop"
                  alt="Ekonomik Araçlar"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">Ekonomik Araçlar</h3>
            </Link>

            {/* Lüks Araçlar */}
            <Link to="/luxury-rental" className="group">
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400&h=300&fit=crop"
                  alt="Lüks Araçlar"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">Lüks Araçlar</h3>
            </Link>

            {/* Minivanlar */}
            <Link to="/minivan-rental" className="group">
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&h=300&fit=crop"
                  alt="Minivanlar"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">Minivanlar</h3>
            </Link>

            {/* SUV'lar */}
            <Link to="/suv-rental" className="group">
              <div className="relative overflow-hidden rounded-xl mb-3">
                <img
                  src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop"
                  alt="SUV'lar"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-center">SUV'lar</h3>
            </Link>
          </div>
        </div>
      </div>

      {/* Vehicle Rentals Section */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {currentType.title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              aria-label="Sola kaydır"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              aria-label="Sağa kaydır"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-4 pb-4">
            {filteredCars.map((car) => (
              <div key={car.id} className="w-[280px] flex-shrink-0">
                <CarCard car={{
                  ...car,
                  price: formatPrice(car.price),
                  location: car.location
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleTypePage
