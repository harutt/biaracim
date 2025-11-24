import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { allCars } from '../data/cars'
import CarCard from '../components/CarCard'
import { formatPrice } from '../utils/formatters'

function SedanRental() {
  const scrollRef = useRef(null)

  // Filter sedan cars
  const sedanCars = allCars.filter(car =>
    car.type?.toLowerCase().includes('sedan')
  ).slice(0, 12)

  // If not enough sedans, add some general cars
  const displayCars = sedanCars.length >= 8 ? sedanCars : [...sedanCars, ...allCars.filter(c => !sedanCars.find(s => s.id === c.id))].slice(0, 12)

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
              Sedan Kiralama
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
              <Link to="/sedan-rental" className="text-gray-700 hover:text-gray-900 hover:underline">
                Sedan kiralama
              </Link>
              <span className="text-gray-400">→</span>
              <span className="text-gray-900 font-medium">Türkiye</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Sedan Cars Section */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Türkiye'de sedan kiralama
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
            to="/search?type=sedan"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg text-base transition"
          >
            Türkiye'de daha fazla sedan görün
          </Link>
        </div>
      </div>

      {/* Sedan Description Section with Image */}
      <div className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop"
                alt="Türkiye'de sedan kiralama"
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'serif' }}>
                Türkiye'de BiAracım ile sedan kiralayın
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Sedanlar, konfor ve pratikliği bir araya getiren en popüler araç segmentlerinden biridir. İster iş seyahati, ister şehir içi ulaşım veya uzun yol yolculukları için ideal olan sedanlar, geniş iç mekan konforu ve bagaj kapasitesiyle öne çıkar. BiAracım'da Türkiye'nin her yerinde size uygun sedanı bulabilirsiniz.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Ekonomik sedanlardan premium sınıf modellere kadar geniş bir yelpazede araç seçeneklerimizle her bütçeye uygun çözümler sunuyoruz. İster havaalanı transferi, ister günlük kullanım, ister hafta sonu kaçamağı için BiAracım'da mükemmel sedanı bulmak çok kolay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'serif' }}>
            Türkiye'de sedan kiralama: Nasıl çalışır
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. İdeal sedanı bulun</h3>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'de bir tarih ve konum girin, bütçenize ve ihtiyaçlarınıza uygun sedanı bulmak için filtreleyin ve önceki kiracıların incelemelerini okuyun.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Teslimat yeri seçin</h3>
              <p className="text-gray-700 leading-relaxed">
                Yakındaki bir sedan kiralayın veya havaalanları, iş merkezleri, oteller gibi size uygun konumlara teslim edilmesini sağlayın.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Yola çıkın</h3>
              <p className="text-gray-700 leading-relaxed">
                Ev sahibiniz size alış detaylarını gönderir ve konforlu sedanınızla yola çıkmaya hazırsınız! Herhangi bir sorunuz olursa 7/24 destek ekibimiz yanınızda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Rent Sedan Section */}
      <div className="bg-purple-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'serif' }}>
            Neden BiAracım'da sedan kiralayın?
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
                <h3 className="text-xl font-bold text-gray-900">Uygun fiyatlı sedan kiralama</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'nin dört bir yanında ekonomik sedan modellerinden premium araçlara kadar her bütçeye uygun seçenekler. Günlük düşük fiyatlar ve aylık kiralama indirimleri.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Konfor ve güvenilirlik</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Sedanlar geniş iç mekan, konforlu koltuklar ve yeterli bagaj alanıyla hem iş hem de tatil seyahatlerinde mükemmel performans sunar. Tüm araçlar düzenli bakımlı.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Yakıt verimliliği</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Sedanlar aerodinamik tasarımları sayesinde düşük yakıt tüketimine sahiptir. Özellikle uzun yolculuklarda yakıt maliyetlerinden tasarruf edin ve çevreye duyarlı seyahat edin.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              to="/search?type=sedan"
              className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-10 py-4 rounded-lg text-lg transition"
            >
              Mükemmel sedanı kirala
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SedanRental
