import { Link } from 'react-router-dom'

function WhyChoose() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nasıl Çalışır?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bireylerden araç kiralamak hiç bu kadar kolay olmamıştı.
            Hem kiracılar hem de araç sahipleri için basit adımlarla başlayın.
          </p>
        </div>
      </div>

      {/* For Renters Section */}
      <div className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Kiracılar İçin</h2>
            <p className="text-lg text-gray-600">İhtiyacınız olan aracı 3 basit adımda kiralayın</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-3xl font-bold mb-4">Araç Seçin</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Binlerce araç arasından size en uygun olanı bulun. Konum, tarih, fiyat ve
                  araç özelliklerine göre filtreleme yapın. Her araç için detaylı açıklamalar,
                  fotoğraflar ve önceki kiracıların değerlendirmelerini görün.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Ekonomikten lükse binlerce araç seçeneği</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Gerçek kullanıcı değerlendirmeleri</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Detaylı fotoğraflar ve açıklamalar</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <svg className="w-48 h-48 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <svg className="w-48 h-48 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-3xl font-bold mb-4">Rezervasyon Yapın</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Tarihleri seçin ve anında rezervasyon yapın. Ödeme güvenli bir şekilde işlenir
                  ve araç sahibi ile doğrudan iletişime geçebilirsiniz. Tüm detaylar mobil uygulamamızda.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Anında onay</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Güvenli ödeme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Esnek iptal politikası</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-3xl font-bold mb-4">Aracı Alın ve Sürün</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Belirlediğiniz yerde aracı teslim alın. Kontrolleri yapın, anahtarları alın
                  ve yola çıkın! Kiralama süreniz boyunca 7/24 destek hizmetimiz sizinle.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Esnek teslim alma noktaları</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Dijital anahtar seçeneği</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">7/24 yol yardımı</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <svg className="w-48 h-48 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/" className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors">
              Araç Aramaya Başla
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* For Hosts Section */}
      <div className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Araç Sahipleri İçin</h2>
            <p className="text-lg text-gray-600">Aracınızı paylaşın ve ekstra gelir elde edin</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-24">
            {/* Host Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <svg className="w-48 h-48 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-3xl font-bold mb-4">Aracınızı Listeleyin</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Ücretsiz hesap oluşturun ve aracınızın bilgilerini girin. Fotoğraflar ekleyin,
                  özelliklerini belirtin ve fiyatınızı siz belirleyin. Sadece 10 dakika sürer.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Ücretsiz listeleme</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Kendi fiyatınızı belirleyin</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Müsaitliğinizi siz kontrol edin</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Host Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-3xl font-bold mb-4">Rezervasyonları Onaylayın</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Rezervasyon talepleri geldiğinde bildirim alın. Kiracı profillerini inceleyin,
                  mesajlaşın ve uygun olanları onaylayın. Tamamen sizin kontrolünüzde.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Anında bildirimler</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Doğrulanmış kiracılar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Esnek onay süreci</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <svg className="w-48 h-48 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Host Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-12 aspect-square flex items-center justify-center">
                  <svg className="w-48 h-48 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-3xl font-bold mb-4">Kazanmaya Başlayın</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Kiracılar araçlarını aldıktan sonra kazancınız otomatik olarak hesabınıza yatırılır.
                  Aylık ortalama 10,000₺ - 25,000₺ arası ekstra gelir elde edin.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Otomatik ödemeler</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Kapsamlı sigorta koruması</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">7/24 destek</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link to="/become-host" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors">
              Ev Sahibi Olmaya Başla
            </Link>
          </div>
        </div>
      </div>

      {/* Trust & Safety Section */}
      <div className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Güven ve Güvenlik</h2>
            <p className="text-lg text-gray-600 mb-12">
              Her kiralama kapsamlı sigorta ile korunur ve tüm kullanıcılar doğrulanır
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Sigorta Koruması</h3>
                <p className="text-gray-600">
                  Tüm kiralamalar kapsamlı sigorta ile korunur
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2">Doğrulanmış Kullanıcılar</h3>
                <p className="text-gray-600">
                  Tüm kullanıcılar kimlik ve ehliyet doğrulamasından geçer
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold mb-2">7/24 Destek</h3>
                <p className="text-gray-600">
                  Her an yardım almak için destek ekibimiz hazır
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
