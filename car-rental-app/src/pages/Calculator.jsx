import { useState } from 'react'

function Calculator() {
  const [carType, setCarType] = useState('economy')
  const [location, setLocation] = useState('istanbul')
  const [days, setDays] = useState(7)

  const basePrices = {
    economy: 400,
    compact: 550,
    midsize: 700,
    luxury: 1200,
    suv: 900
  }

  const locationMultipliers = {
    istanbul: 1.2,
    ankara: 1.0,
    izmir: 1.1,
    antalya: 1.3,
    bodrum: 1.4
  }

  const calculatePrice = () => {
    const basePrice = basePrices[carType]
    const locationMultiplier = locationMultipliers[location]
    const dailyPrice = basePrice * locationMultiplier

    // Discount for longer rentals
    let discount = 1
    if (days >= 7) discount = 0.9  // 10% off
    if (days >= 14) discount = 0.85 // 15% off
    if (days >= 30) discount = 0.8  // 20% off

    const totalPrice = dailyPrice * days * discount
    return {
      dailyPrice: dailyPrice.toFixed(0),
      totalPrice: totalPrice.toFixed(0),
      discount: ((1 - discount) * 100).toFixed(0)
    }
  }

  const prices = calculatePrice()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Fiyat Hesaplayıcı</h1>
          <p className="text-center text-gray-600 mb-12">
            Kiralama maliyetinizi hemen hesaplayın
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Detayları Girin</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Araç Tipi
                  </label>
                  <select
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="economy">Ekonomik</option>
                    <option value="compact">Kompakt</option>
                    <option value="midsize">Orta</option>
                    <option value="luxury">Lüks</option>
                    <option value="suv">SUV</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konum
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="istanbul">İstanbul</option>
                    <option value="ankara">Ankara</option>
                    <option value="izmir">İzmir</option>
                    <option value="antalya">Antalya</option>
                    <option value="bodrum">Bodrum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kiralama Süresi: {days} gün
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 gün</span>
                    <span>30 gün</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Tahmini Fiyat</h2>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <div className="text-sm opacity-90 mb-1">Günlük Fiyat</div>
                  <div className="text-3xl font-bold">₺{prices.dailyPrice}</div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                  <div className="text-sm opacity-90 mb-1">Toplam Süre</div>
                  <div className="text-3xl font-bold">{days} Gün</div>
                </div>

                {prices.discount > 0 && (
                  <div className="bg-green-500/20 rounded-lg p-4 backdrop-blur border border-green-400">
                    <div className="text-sm opacity-90 mb-1">İndirim</div>
                    <div className="text-2xl font-bold">%{prices.discount} İndirim!</div>
                  </div>
                )}

                <div className="border-t border-white/20 pt-4">
                  <div className="text-sm opacity-90 mb-2">Toplam Tutar</div>
                  <div className="text-5xl font-bold">₺{prices.totalPrice}</div>
                </div>

                <button className="w-full bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Rezervasyon Yap
                </button>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🎉</div>
              <h3 className="font-semibold mb-2">7+ Gün İndirim</h3>
              <p className="text-gray-600 text-sm">
                7 gün ve üzeri kiralamalarda %10 indirim
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-semibold mb-2">14+ Gün İndirim</h3>
              <p className="text-gray-600 text-sm">
                14 gün ve üzeri kiralamalarda %15 indirim
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold mb-2">30+ Gün İndirim</h3>
              <p className="text-gray-600 text-sm">
                Aylık kiralamalarda %20 indirim
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-gray-700">
              <strong>Not:</strong> Bu fiyatlar tahminidir ve gerçek fiyatlar araç sahibi,
              sezon ve kullanılabilirliğe göre değişiklik gösterebilir. Kesin fiyat için
              rezervasyon ekranına gidin.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
