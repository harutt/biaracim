function Insurance() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Sigorta ve Koruma</h1>
          <p className="text-xl opacity-90">Her kiralama için kapsamlı sigorta koruması</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Insurance Plans */}
          <h2 className="text-3xl font-bold mb-8 text-center">Sigorta Paketleri</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <h3 className="text-xl font-bold mb-2">Temel</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">Dahil</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Kaza sigortası</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Üçüncü şahıs sigortası</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Çalınma koruması</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-purple-500 rounded-xl p-6 bg-purple-50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                Önerilen
              </div>
              <h3 className="text-xl font-bold mb-2">Standart</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">+₺50/gün</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Temel paket +</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Cam ve lastik hasarı</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Yol yardımı 7/24</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Hasar muafiyeti %50</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">+₺100/gün</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Standart paket +</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>%100 hasar muafiyeti</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Ek sürücü sigortası</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Yurt dışı kapsamı</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Coverage Details */}
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6">Kapsam Detayları</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🛡️</div>
                <div>
                  <h4 className="font-semibold mb-1">Kaza Sigortası</h4>
                  <p className="text-gray-600">
                    Kiralama süresince meydana gelen kazalarda 1.000.000₺ teminat
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🚗</div>
                <div>
                  <h4 className="font-semibold mb-1">Araç Hasarı</h4>
                  <p className="text-gray-600">
                    Seçtiğiniz pakete göre hasar muafiyeti ve tam kapsam koruması
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">👥</div>
                <div>
                  <h4 className="font-semibold mb-1">Üçüncü Şahıs</h4>
                  <p className="text-gray-600">
                    Üçüncü şahıslara verilen hasarlar için 2.000.000₺ teminat
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🔧</div>
                <div>
                  <h4 className="font-semibold mb-1">Yol Yardımı</h4>
                  <p className="text-gray-600">
                    7/24 yol yardımı hizmeti, çekici ve acil durum desteği
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Sıkça Sorulan Sorular</h3>
            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  Sigorta ne zaman geçerli olur?
                </summary>
                <p className="mt-3 text-gray-600">
                  Sigorta, aracı teslim aldığınız andan iade ettiğiniz ana kadar geçerlidir.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  Kaza durumunda ne yapmalıyım?
                </summary>
                <p className="mt-3 text-gray-600">
                  Hemen 7/24 destek hattımızı arayın ve kaza tutanağı tutun. Gerekli tüm belgeler mobil uygulamamızda mevcuttur.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">
                  Hasar muafiyeti nedir?
                </summary>
                <p className="mt-3 text-gray-600">
                  Hasar durumunda sizden alınacak maksimum tutardır. Premium pakette bu tutar sıfırdır.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Insurance
