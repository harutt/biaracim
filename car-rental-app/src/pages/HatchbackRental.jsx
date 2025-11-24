import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { allCars } from '../data/cars'
import CarCard from '../components/CarCard'
import { formatPrice } from '../utils/formatters'

function HatchbackRental() {
  const scrollRef = useRef(null)

  // Filter hatchback cars
  const hatchbackCars = allCars.filter(car =>
    car.type?.toLowerCase().includes('hatchback')
  ).slice(0, 12)

  // If not enough hatchbacks, add some general cars
  const displayCars = hatchbackCars.length >= 8 ? hatchbackCars : [...hatchbackCars, ...allCars.filter(c => !hatchbackCars.find(s => s.id === c.id))].slice(0, 12)

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
              Hatchback Kiralama
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
              <Link to="/hatchback-rental" className="text-gray-700 hover:text-gray-900 hover:underline">
                Hatchback kiralama
              </Link>
              <span className="text-gray-400">→</span>
              <span className="text-gray-900 font-medium">Türkiye</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Hatchback Cars Section */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Türkiye'de hatchback kiralama
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
            to="/search?type=hatchback"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg text-base transition"
          >
            Türkiye'de daha fazla hatchback görün
          </Link>
        </div>
      </div>

      {/* Hatchback Description Section with Image */}
      <div className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
                alt="Türkiye'de hatchback kiralama"
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'serif' }}>
                Türkiye'de BiAracım ile hatchback kiralayın
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Hatchback araçlar, kompakt boyutları ve geniş iç hacim dengesini mükemmel şekilde yakalayan pratik şehir araçlarıdır. Üst açılır bagaj kapısı sayesinde kolay yükleme imkanı sunan hatchback'ler, hem günlük kullanımda hem de hafta sonu kaçamakları için idealdir. BiAracım'da Türkiye'nin her yerinde size uygun hatchback modeli bulabilirsiniz.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Volkswagen Polo, Peugeot 208, Ford Fiesta gibi popüler hatchback modellerinden dilediğinizi seçebilirsiniz. Dar sokaklarda kolay manevra, ekonomik yakıt tüketimi ve dinamik sürüş deneyimi arayanlar için hatchback araçlar en akıllı tercihtir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'serif' }}>
            Türkiye'de hatchback kiralama: Nasıl çalışır
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Hatchback modelini seçin</h3>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'de tarih ve konum belirleyin, ihtiyaçlarınıza uygun hatchback modelini bulmak için filtreleri kullanın ve kullanıcı yorumlarını inceleyin.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Alış noktası belirleyin</h3>
              <p className="text-gray-700 leading-relaxed">
                Yakınınızdan bir hatchback kiralayın veya havaalanı, şehir merkezi, otel gibi size uygun konumlara teslimat seçeneğini değerlendirin.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Pratik yolculuğa başlayın</h3>
              <p className="text-gray-700 leading-relaxed">
                Ev sahibi alış detaylarını gönderir ve çevik hatchback'inizle şehrin her köşesine kolayca ulaşırsınız. Pratik park, dinamik sürüş keyfini yaşayın!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Rent Hatchback Section */}
      <div className="bg-purple-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'serif' }}>
            Neden BiAracım'da hatchback kiralayın?
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Çok yönlü kullanım alanı</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Hatchback'ler günlük işler için kompakt, alışverişler için geniş bagaj hacimleriyle her ihtiyaca cevap verir. Arka koltukları katlayarak daha fazla yük taşıma alanı elde edin.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Şehir trafiğinde çevik</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Kompakt boyutları sayesinde dar sokaklarda ve yoğun trafikte rahatça manevra yapın. Küçük park yerlerine kolayca sığan hatchback'ler şehir yaşamı için tasarlanmıştır.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Dinamik sürüş keyfi</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Hatchback'ler hafif yapıları ve dengeli ağırlık dağılımıyla virajlarda üstün yol tutuş sunar. Şehir içinde eğlenceli ve dinamik bir sürüş deneyimi yaşayın.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              to="/search?type=hatchback"
              className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-10 py-4 rounded-lg text-lg transition"
            >
              Hatchback kirala
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HatchbackRental
