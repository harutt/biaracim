import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { allCars } from '../data/cars'
import CarCard from '../components/CarCard'
import { formatPrice } from '../utils/formatters'

function LuxuryRental() {
  const scrollRef = useRef(null)

  // Filter luxury cars
  const luxuryCars = allCars.filter(car =>
    car.price > 1200 || car.type?.toLowerCase().includes('luxury')
  ).slice(0, 12)

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
              Lüks Araç Kiralama
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
              <Link to="/luxury-rental" className="text-gray-700 hover:text-gray-900 hover:underline">
                Lüks ve egzotik kiralama
              </Link>
              <span className="text-gray-400">→</span>
              <span className="text-gray-900 font-medium">Türkiye</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Luxury Cars Section */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Türkiye'de lüks ve egzotik araç kiralama
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
            {luxuryCars.map((car) => (
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
            to="/search?type=luxury"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg text-base transition"
          >
            Türkiye'de daha fazla lüks araç görün
          </Link>
        </div>
      </div>

      {/* Luxury Car Description Section with Image */}
      <div className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop"
                alt="Türkiye'de lüks araç kiralama"
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'serif' }}>
                Türkiye'de BiAracım ile lüks araç kiralayın
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Avrupa ve Asya'nın kesiştiği noktada yer alan ve zengin tarih ile modern yaşamın iç içe geçtiği Türkiye, muhteşem bir otomotiv mirasına sahiptir. Lüks araç kiralama Türkiye'de oldukça popülerdir ve BiAracım'da bu eşsiz ülkeyi keşfetmek için mükemmel premium aracı bulabilirsiniz.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Orta motorlu egzotik araçlardan klasik muscle car'lara kadar BiAracım'da her şeyi bulabilirsiniz ve bunları kiralamak oldukça kolaydır. İster Antalya'nın turkuaz sahillerinde cabrio ile keyif yapmak, ister İstanbul'un tarihi sokaklarında premium bir SUV ile gezmek isteyin, BiAracım ile otomotiv hayalleriniz elinizin altında.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'serif' }}>
            Türkiye'de lüks araç kiralama: Nasıl çalışır
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Mükemmel aracı bulun</h3>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'de (veya daha ötede) bir tarih ve konum girin, size en uygun aracı bulmak için filtreleyin ve önceki kiracıların incelemelerini okuyun.
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
                Yakındaki bir aracı kiralayın veya havaalanları, tren istasyonları, oteller, belki de eviniz dahil olmak üzere çeşitli destinasyonlara teslim edilmesini sağlayın.
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
                Ev sahibiniz size alış detaylarını gönderir ve Türkiye yollarına çıkmaya hazırsınız! Sorularınız varsa, kolayca ev sahibinizle sohbet edebilir veya destek ile iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Rent Luxury Car Section */}
      <div className="bg-purple-50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16" style={{ fontFamily: 'serif' }}>
            Neden BiAracım'da lüks araç kiralayın?
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
                <h3 className="text-xl font-bold text-gray-900">Uygun fiyatlı Türkiye lüks araç kiralama</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'de ve tüm Türkiye'de günlük kullanımdan olağanüstüye kadar her türlü sürüşte fırsatlar bulun. Bütçenize uygun mükemmel aracı kiralayın.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Kolay Türkiye lüks araç kiralama alış seçenekleri</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Aracınızı size veya gittiğiniz yere teslim edin. Birçok ev sahibi, Türkiye'deki havaalanları, tren istasyonları ve oteller gibi özel konumlara veya ilgi çekici noktalara teslimat sunmaktadır.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Destek ve hasar koruma ile rahatlayın</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                7/24 destek ve yol yardımı, yardımın sadece bir telefon kadar yakın olduğu anlamına gelir, ayrıca çeşitli koruma planları arasından seçim yapabilirsiniz.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Link
              to="/search?type=luxury"
              className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-10 py-4 rounded-lg text-lg transition"
            >
              Mükemmel aracı kirala
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LuxuryRental
