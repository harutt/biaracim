import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function TripDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showModifyModal, setShowModifyModal] = useState(false)

  // Mock trip data - In a real app, this would come from an API
  const trip = {
    id: 'BIA1732012345',
    status: 'confirmed', // confirmed, completed, cancelled
    car: {
      name: 'BMW 5 Series 2021',
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
        'https://images.unsplash.com/photo-1617531653520-bd466a1bb7e1?w=800',
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800'
      ],
      location: 'İstanbul, Beşiktaş',
      rating: 4.92,
      trips: 64,
      features: ['Otomatik Vites', 'Dizel', '5 Koltuk', 'Klima', 'GPS', 'Bluetooth']
    },
    host: {
      name: 'Mehmet Yılmaz',
      avatar: 'https://ui-avatars.com/api/?name=Mehmet+Yilmaz&background=6366f1&color=fff',
      rating: 4.95,
      responseTime: '1 saat içinde',
      memberSince: '2021'
    },
    dates: {
      start: '15/12/2025',
      end: '18/12/2025',
      startTime: '10:00',
      endTime: '10:00',
      totalDays: 3
    },
    location: {
      pickup: 'Beşiktaş, İstanbul',
      pickupAddress: 'Barbaros Bulvarı No:145, Beşiktaş/İstanbul',
      delivery: 'Beşiktaş, İstanbul',
      deliveryAddress: 'Barbaros Bulvarı No:145, Beşiktaş/İstanbul'
    },
    pricing: {
      dailyRate: 950,
      days: 3,
      subtotal: 2850,
      serviceFee: 285,
      insurance: 450,
      total: 3585
    },
    bookingDate: '12/11/2025',
    cancellationPolicy: 'free',
    daysUntilTrip: 28
  }

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Onaylandı', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      completed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Tamamlandı', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'İptal Edildi', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' }
    }
    const badge = badges[status] || badges.confirmed
    return badge
  }

  const statusBadge = getStatusBadge(trip.status)

  const handleCancelTrip = () => {
    console.log('Cancelling trip:', id)
    setShowCancelModal(false)
    navigate('/trips')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/trips')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Seyahatlerime Dön
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Rezervasyon Detayları</h1>
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusBadge.bg} ${statusBadge.text} flex items-center gap-2`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={statusBadge.icon} />
                </svg>
                {statusBadge.label}
              </span>
            </div>
            <p className="text-gray-600">Rezervasyon No: <span className="font-mono font-semibold">{trip.id}</span></p>
          </div>

          {trip.status === 'confirmed' && (
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setShowModifyModal(true)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Değiştir
              </button>
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-6 py-3 border border-red-300 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                İptal Et
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Details */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Car Images */}
              <div className="grid grid-cols-3 gap-1">
                {trip.car.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${trip.car.name} ${index + 1}`}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
              </div>

              {/* Car Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{trip.car.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{trip.car.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold">{trip.car.rating}</span>
                    <span>({trip.car.trips} trips)</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {trip.car.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trip Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Seyahat Zaman Çizelgesi</h3>
              <div className="space-y-6">
                {/* Pickup */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="w-0.5 h-full bg-gray-300 my-2"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-sm text-gray-600 mb-1">Teslim Alma</div>
                    <div className="font-bold text-xl text-gray-900 mb-1">
                      {trip.dates.start} - {trip.dates.startTime}
                    </div>
                    <div className="text-sm text-gray-600">{trip.location.pickup}</div>
                    <div className="text-xs text-gray-500 mt-1">{trip.location.pickupAddress}</div>
                    {trip.status === 'confirmed' && trip.daysUntilTrip && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {trip.daysUntilTrip} gün kaldı
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">Teslim Etme</div>
                    <div className="font-bold text-xl text-gray-900 mb-1">
                      {trip.dates.end} - {trip.dates.endTime}
                    </div>
                    <div className="text-sm text-gray-600">{trip.location.delivery}</div>
                    <div className="text-xs text-gray-500 mt-1">{trip.location.deliveryAddress}</div>
                  </div>
                </div>
              </div>

              {trip.status === 'confirmed' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Yol Tarifi Al
                  </button>
                </div>
              )}
            </div>

            {/* Host Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ev Sahibi</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={trip.host.avatar}
                  alt={trip.host.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-900">{trip.host.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">{trip.host.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{trip.host.memberSince} yılından beri üye</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Yanıt süresi: {trip.host.responseTime}
                  </div>
                </div>
              </div>
              <Link
                to="/inbox"
                className="w-full py-3 border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Mesaj Gönder
              </Link>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fiyat Detayları</h3>
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">₺{trip.pricing.dailyRate} x {trip.pricing.days} gün</span>
                  <span className="font-medium">₺{trip.pricing.subtotal.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hizmet bedeli</span>
                  <span className="font-medium">₺{trip.pricing.serviceFee.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sigorta</span>
                  <span className="font-medium">₺{trip.pricing.insurance.toLocaleString('tr-TR')}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Toplam</span>
                <span className="text-2xl font-bold text-purple-600">
                  ₺{trip.pricing.total.toLocaleString('tr-TR')}
                </span>
              </div>

              <button className="w-full mt-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Fatura İndir
              </button>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">İptal Politikası</h3>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">Ücretsiz İptal</p>
                  <p>Seyahatten 24 saat öncesine kadar tam iade. Sonrasında iptal için ücret uygulanır.</p>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Yardıma mı ihtiyacınız var?</h3>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Destek Ekibi ile İletişime Geç</span>
                </Link>
                <Link
                  to="/legal"
                  className="flex items-center gap-3 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Kullanım Koşulları</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rezervasyonu İptal Et?</h3>
              <p className="text-gray-600 mb-4">
                Rezervasyonunuzu iptal etmek istediğinizden emin misiniz?
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Ücretsiz iptal:</strong> Seyahatten 24 saat öncesine kadar tam iade alabilirsiniz.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Vazgeç
              </button>
              <button
                onClick={handleCancelTrip}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                İptal Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modify Modal */}
      {showModifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Rezervasyonu Değiştir</h3>
              <p className="text-gray-600">
                Rezervasyon değişikliği için lütfen ev sahibi ile iletişime geçin.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModifyModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Kapat
              </button>
              <Link
                to="/inbox"
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-center"
              >
                Mesaj Gönder
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TripDetail
