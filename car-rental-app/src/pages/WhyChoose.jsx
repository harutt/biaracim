import { Link } from 'react-router-dom'
import { useState } from 'react'

function WhyChoose() {
  const [activeTab, setActiveTab] = useState('renters')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
              BiAracım Nasıl Çalışır?
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Araç kiralama, yeniden düşünüldü
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
              İster seyahat için araç kiralayın, ister aracınızı paylaşarak kazanın.
              Her iki taraf için de basit, güvenli ve karlı.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Aktif Araç</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600 font-medium">Mutlu Kullanıcı</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-gray-600 font-medium">Şehir</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container">
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 my-6">
              <button
                onClick={() => setActiveTab('renters')}
                className={`px-6 md:px-8 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'renters'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🚗 Araç Kiralamak İstiyorum
              </button>
              <button
                onClick={() => setActiveTab('hosts')}
                className={`px-6 md:px-8 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'hosts'
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                💰 Aracımı Kiraya Vermek İstiyorum
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* For Renters Section */}
      {activeTab === 'renters' && (
        <div className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                3 basit adımda aracınızı kiralayın
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                İhtiyacınız olan aracı bulmak, rezerve etmek ve sürmek hiç bu kadar kolay olmamıştı
              </p>
            </div>

            <div className="max-w-7xl mx-auto space-y-32">
              {/* Step 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">
                      1
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-transparent"></div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Mükemmel aracı bulun
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Binlerce araç arasından tam ihtiyacınıza uygun olanı seçin. Konum, tarih,
                    fiyat ve araç özelliklerine göre filtreleyin.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Binlerce seçenek</div>
                        <div className="text-gray-600">Ekonomik, lüks, SUV, klasik ve daha fazlası</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Gerçek değerlendirmeler</div>
                        <div className="text-gray-600">Önceki kiracıların deneyimlerini okuyun</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Detaylı bilgiler</div>
                        <div className="text-gray-600">Fotoğraflar, özellikler ve her şey</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl transform rotate-3"></div>
                    <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-16 aspect-square flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <svg className="w-64 h-64 text-purple-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <div className="mt-6 text-2xl font-bold text-purple-900">10,000+ Araç</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl transform -rotate-3"></div>
                    <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-16 aspect-square flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <svg className="w-64 h-64 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <div className="mt-6 text-2xl font-bold text-blue-900">Güvenli Ödeme</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">
                      2
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Anında rezerve edin
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Tarihleri seçin, anında rezervasyon yapın. Ödemeleriniz güvenle işlenir
                    ve araç sahibi ile doğrudan iletişime geçebilirsiniz.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Anında onay</div>
                        <div className="text-gray-600">Çoğu rezervasyon hemen onaylanır</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Güvenli ödeme</div>
                        <div className="text-gray-600">SSL şifrelemeli güvenli ödeme sistemi</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Esnek iptal</div>
                        <div className="text-gray-600">Çoğu araç için ücretsiz iptal seçeneği</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">
                      3
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-green-500 to-transparent"></div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Alın ve sürün
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Belirlediğiniz noktadan aracı teslim alın. Kontrolleri yapın,
                    anahtarları alın ve maceraya başlayın!
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Esnek teslim alma</div>
                        <div className="text-gray-600">Havalimanı, şehir merkezi veya kapınızda</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Dijital anahtar</div>
                        <div className="text-gray-600">Temassız teslim alma seçeneği</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">7/24 destek</div>
                        <div className="text-gray-600">Yol yardımı ve acil durum desteği</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl transform rotate-3"></div>
                    <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-16 aspect-square flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <svg className="w-64 h-64 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <div className="mt-6 text-2xl font-bold text-green-900">Her Zaman Destek</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-24">
              <Link
                to="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Hemen Araç Kiralamaya Başla
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* For Hosts Section */}
      {activeTab === 'hosts' && (
        <div className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Aracınızı paylaşın, kazanın
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Kullanmadığınız araçtan aylık 10,000₺ - 25,000₺ ekstra gelir elde edin
              </p>
            </div>

            <div className="max-w-7xl mx-auto space-y-32">
              {/* Host Step 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl transform -rotate-3"></div>
                    <div className="relative bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-16 aspect-square flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <svg className="w-64 h-64 text-orange-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div className="mt-6 text-2xl font-bold text-orange-900">Ücretsiz</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">
                      1
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-indigo-500 to-transparent"></div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Aracınızı listeleyin
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Ücretsiz hesap oluşturun, aracınızın fotoğraflarını yükleyin ve
                    fiyatınızı belirleyin. 10 dakikada hazır!
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Ücretsiz listeleme</div>
                        <div className="text-gray-600">Hiçbir ücret ödemeden başlayın</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Kendi fiyatınızı belirleyin</div>
                        <div className="text-gray-600">Fiyatı ve müsaitliği siz kontrol edin</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Kolay kurulum</div>
                        <div className="text-gray-600">10 dakikada listelemeniz hazır</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Host Step 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">
                      2
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-pink-500 to-transparent"></div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Rezervasyonları yönetin
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Rezervasyon talepleri geldiğinde bildirim alın. Kiracı profillerini
                    inceleyin ve uygun olanları onaylayın.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-xl">
                      <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Anında bildirimler</div>
                        <div className="text-gray-600">Her rezervasyonda bildirim alın</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-xl">
                      <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Doğrulanmış kiracılar</div>
                        <div className="text-gray-600">Tüm kiracılar kimlik doğrulamasından geçer</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-xl">
                      <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Tam kontrol</div>
                        <div className="text-gray-600">Kimlere kiralayacağınıza siz karar verin</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl transform rotate-3"></div>
                    <div className="relative bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-16 aspect-square flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <svg className="w-64 h-64 text-pink-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="mt-6 text-2xl font-bold text-pink-900">Kolay Yönetim</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Host Step 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl transform -rotate-3"></div>
                    <div className="relative bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl p-16 aspect-square flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <svg className="w-64 h-64 text-teal-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="mt-6 text-2xl font-bold text-teal-900">10-25K₺/Ay</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg">
                      3
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-teal-500 to-transparent"></div>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Kazanmaya başlayın
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Kazancınız otomatik olarak hesabınıza yatırılır. Aracınız tam
                    sigorta koruması altında güvende kalır.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl">
                      <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Otomatik ödemeler</div>
                        <div className="text-gray-600">Her kiralama sonrası direkt hesabınıza</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl">
                      <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">Kapsamlı sigorta</div>
                        <div className="text-gray-600">Her kiralama tam sigorta ile korunur</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl">
                      <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">7/24 destek</div>
                        <div className="text-gray-600">Her an yardım için buradayız</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-24">
              <Link
                to="/become-host"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Ev Sahibi Olmaya Başla
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Safety Section - Always visible */}
      <div className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Güvenliğiniz önceliğimiz
              </h2>
              <p className="text-xl text-gray-600">
                Her kiralama kapsamlı koruma ile güvence altında
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Kapsamlı Sigorta</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Tüm kiralamalar 1 milyona kadar mali sorumluluk sigortası ile korunur
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">Doğrulanmış Kullanıcılar</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Her kullanıcı kimlik ve ehliyet doğrulamasından geçer
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">7/24 Destek</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Her an yardım almak için müşteri hizmetleri ve yol yardımı
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChoose
