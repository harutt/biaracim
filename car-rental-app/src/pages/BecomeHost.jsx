function BecomeHost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Aracınızı Kiraya Verin
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Aracınızı kiraya vererek ekstra gelir elde edin
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Hemen Başlayın
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Neden Araç Kiralamalısınız?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">Ekstra Gelir</h3>
            <p className="text-gray-600">
              Aracınız boş dururken aylık ortalama 10,000₺ - 25,000₺ kazanın
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-3">Güvenli</h3>
            <p className="text-gray-600">
              Kapsamlı sigorta ve 7/24 destek ile aracınız her zaman güvende
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Kolay Yönetim</h3>
            <p className="text-gray-600">
              Mobil uygulama ile rezervasyonlarınızı kolayca yönetin
            </p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Aracınızı Listeleyin</h3>
                <p className="text-gray-600">
                  Aracınızın fotoğraflarını ve detaylarını ekleyin. Sadece 10 dakika sürer.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fiyatınızı Belirleyin</h3>
                <p className="text-gray-600">
                  Kendi fiyatınızı siz belirleyin veya otomatik fiyatlandırmayı kullanın.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Kazanmaya Başlayın</h3>
                <p className="text-gray-600">
                  Rezervasyonları onaylayın ve kazancınız hesabınıza otomatik yatırılsın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Hemen Başlayın</h2>
          <p className="text-xl mb-8 opacity-90">
            İlk listelemenizi oluşturun ve kazanmaya başlayın
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Ücretsiz Başlayın
          </button>
        </div>
      </div>
    </div>
  )
}

export default BecomeHost
