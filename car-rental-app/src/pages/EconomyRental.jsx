import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { allCars } from '../data/cars'
import CarCard from '../components/CarCard'
import { formatPrice } from '../utils/formatters'

function EconomyRental() {
  const scrollRef = useRef(null)

  // Filter economy cars (price <= 600 TL)
  const economyCars = allCars.filter(car =>
    car.price <= 600
  ).slice(0, 12)

  // If not enough economy cars, add some general cars
  const displayCars = economyCars.length >= 8 ? economyCars : [...economyCars, ...allCars.filter(c => !economyCars.find(s => s.id === c.id))].slice(0, 12)

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
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'serif' }}>
              Ekonomik Araç Kiralama
            </h1>
            <p className="text-xl text-gray-600">
              BiAracım araç kiralama pazarını keşfedin
            </p>
          </div>

          {/* Simple Search Box */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 px-4 py-3 border-r border-gray-200">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nerede</label>
                  <input
                    type="text"
                    placeholder="Şehir, havaalanı, adres veya otel"
                    className="w-full text-gray-900 placeholder-gray-400 border-none outline-none text-base"
                  />
                </div>

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

          {/* Breadcrumb */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-700 hover:text-gray-900 hover:underline">
                Araç kiralama
              </Link>
              <span className="text-gray-400">→</span>
              <Link to="/economy-rental" className="text-gray-700 hover:text-gray-900 hover:underline">
                Ekonomik araç kiralama
              </Link>
              <span className="text-gray-400">→</span>
              <span className="text-gray-900 font-medium">Türkiye</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Economy Cars Section */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Türkiye'de ekonomik araç kiralama
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
            {displayCars.map((car) => (
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

        {/* See More Button */}
        <div className="text-center mt-8">
          <Link
            to="/search?type=economy"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg text-base transition"
          >
            Türkiye'de daha fazla ekonomik araç görün
          </Link>
        </div>
      </div>

      {/* Economy Car Description Section with Image */}
      <div className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop"
                alt="Türkiye'de ekonomik araç kiralama"
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'serif' }}>
                Türkiye'de BiAracım ile ekonomik araç kiralayın
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Bütçenize uygun seyahat etmenin en akıllı yolu ekonomik araç kiralamadır. Küçük ve orta boy araçlar, şehir içi kullanımda park kolaylığı, düşük yakıt tüketimi ve uygun günlük kiralama ücretleriyle ideal bir seçimdir. BiAracım'da Türkiye'nin her noktasında binlerce ekonomik araç seçeneği sizi bekliyor.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                İster günlük şehir içi işleriniz, ister hafta sonu kaçamakları veya havaalanı transferleri için ekonomik araçlar mükemmel bir çözümdür. Renault Clio, Fiat Egea, Hyundai i20 gibi popüler modelleri uygun fiyatlarla kiralayabilir, hem cebinizi hem de çevreyi koruyabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'serif' }}>
            Türkiye'de ekonomik araç kiralama: Nasıl çalışır
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 rounded-full p-8">
                  <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. En uygun aracı bulun</h3>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'de konum ve tarih belirleyin, bütçenize uygun ekonomik araçları görüntüleyin ve gerçek kullanıcı yorumlarını okuyarak karar verin.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 rounded-full p-8">
                  <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Teslimat noktası seçin</h3>
              <p className="text-gray-700 leading-relaxed">
                Size en yakın konumdan aracı alın veya havaalanı, otel, istasyon gibi size uygun yerlere teslimat seçeneğini değerlendirin. Esneklik sizde.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 rounded-full p-8">
                  <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Tasarruflu yolculuk yapın</h3>
              <p className="text-gray-700 leading-relaxed">
                Araç sahibi size teslim detaylarını iletir ve ekonomik aracınızla yola koyulursunuz. Düşük yakıt maliyetleri ve uygun günlük ücretlerle keyfini çıkarın!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Rent Economy Car Section */}
      <div className="bg-purple-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'serif' }}>
            Neden BiAracım'da ekonomik araç kiralayın?
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Bütçe dostu fiyatlar</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Günlük 300-600 TL arası uygun fiyatlarla ekonomik araç kiralayın. Uzun süreli kiralamada ekstra indirimler ve özel kampanyalardan yararlanın. Gizli ücret yok, şeffaf fiyatlandırma.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Düşük yakıt tüketimi</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ekonomik araçlar küçük motor hacimleriyle 100 km'de ortalama 4-6 litre yakıt tüketir. Şehir içinde ve şehirlerarası yolculuklarda cebinizi koruyun, çevreye duyarlı seyahat edin.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Kolay park ve kullanım</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Kompakt boyutlarıyla şehir trafiğinde rahatça manevra yapın ve dar sokaklarda kolayca park edin. Yeni sürücüler için ideal, kullanımı kolay ve güvenli ekonomik araçlar.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              to="/search?type=economy"
              className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-10 py-4 rounded-lg text-lg transition"
            >
              Ekonomik araç kirala
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EconomyRental
