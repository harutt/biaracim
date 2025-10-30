function HostTools() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Kiralama Yönetimi</h1>
          <p className="text-xl opacity-90">İşinizi yönetmek için ihtiyacınız olan her şey</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Gelir İzleme</h3>
              <p className="text-gray-600 mb-4">
                Günlük, haftalık ve aylık gelir raporlarınızı görüntüleyin
              </p>
              <button className="text-purple-600 font-semibold hover:underline">
                Raporları Görüntüle →
              </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-3">Rezervasyon Yönetimi</h3>
              <p className="text-gray-600 mb-4">
                Tüm rezervasyonlarınızı tek bir yerden yönetin
              </p>
              <button className="text-purple-600 font-semibold hover:underline">
                Rezervasyonları Gör →
              </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Fiyat Optimizasyonu</h3>
              <p className="text-gray-600 mb-4">
                Otomatik fiyatlandırma ile kazancınızı artırın
              </p>
              <button className="text-purple-600 font-semibold hover:underline">
                Fiyatları Optimize Et →
              </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Mobil Uygulama</h3>
              <p className="text-gray-600 mb-4">
                iOS ve Android uygulamalarıyla her yerden erişim
              </p>
              <button className="text-purple-600 font-semibold hover:underline">
                Uygulamayı İndir →
              </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-bold mb-3">Bildirimler</h3>
              <p className="text-gray-600 mb-4">
                Yeni rezervasyonlar ve mesajlar için anlık bildirimler
              </p>
              <button className="text-purple-600 font-semibold hover:underline">
                Ayarları Düzenle →
              </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-3">İnceleme Yönetimi</h3>
              <p className="text-gray-600 mb-4">
                Müşteri değerlendirmelerini görüntüleyin ve yanıtlayın
              </p>
              <button className="text-purple-600 font-semibold hover:underline">
                İncelemeleri Gör →
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Premium Özellikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">✨</div>
                <div>
                  <h4 className="font-semibold mb-1">Otomatik Mesajlar</h4>
                  <p className="text-gray-600 text-sm">
                    Kiracılara otomatik hoş geldiniz ve teşekkür mesajları
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">📸</div>
                <div>
                  <h4 className="font-semibold mb-1">Profesyonel Fotoğrafçılık</h4>
                  <p className="text-gray-600 text-sm">
                    Aracınız için profesyonel fotoğraf hizmeti
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h4 className="font-semibold mb-1">Gelişmiş Analitik</h4>
                  <p className="text-gray-600 text-sm">
                    Detaylı performans metrikleri ve öneriler
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">🔐</div>
                <div>
                  <h4 className="font-semibold mb-1">Dijital Anahtar</h4>
                  <p className="text-gray-600 text-sm">
                    Fiziksel anahtar değişimi olmadan teslim
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Henüz araç kiralaması yapmıyor musunuz?</h2>
            <p className="text-gray-600 mb-6">
              Bu araçlara erişmek için aracınızı listelemeye başlayın
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Araç Kiralamaya Başla
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostTools
