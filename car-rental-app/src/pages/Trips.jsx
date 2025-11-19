import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Trips() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('upcoming')

  // Mock data - In a real app, this would come from an API
  const trips = {
    upcoming: [
      {
        id: 'BIA1732012345',
        car: {
          name: 'BMW 5 Series 2021',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
          location: 'İstanbul, Beşiktaş'
        },
        startDate: '15/12/2025',
        endDate: '18/12/2025',
        startTime: '10:00',
        endTime: '10:00',
        totalPrice: 3300,
        status: 'confirmed',
        daysUntil: 28
      },
      {
        id: 'BIA1732098765',
        car: {
          name: 'Mercedes-Benz C-Class 2022',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
          location: 'Ankara, Çankaya'
        },
        startDate: '20/12/2025',
        endDate: '23/12/2025',
        startTime: '14:00',
        endTime: '14:00',
        totalPrice: 3900,
        status: 'confirmed',
        daysUntil: 33
      }
    ],
    past: [
      {
        id: 'BIA1731456789',
        car: {
          name: 'Audi A4 2020',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
          location: 'İstanbul, Kadıköy'
        },
        startDate: '10/11/2025',
        endDate: '13/11/2025',
        startTime: '10:00',
        endTime: '10:00',
        totalPrice: 2700,
        status: 'completed',
        daysAgo: 7
      },
      {
        id: 'BIA1730123456',
        car: {
          name: 'Toyota Corolla 2023',
          image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
          location: 'İzmir, Konak'
        },
        startDate: '01/11/2025',
        endDate: '03/11/2025',
        startTime: '09:00',
        endTime: '09:00',
        totalPrice: 1600,
        status: 'completed',
        daysAgo: 16
      },
      {
        id: 'BIA1729876543',
        car: {
          name: 'Volkswagen Passat 2021',
          image: 'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800',
          location: 'Antalya, Muratpaşa'
        },
        startDate: '15/10/2025',
        endDate: '20/10/2025',
        startTime: '11:00',
        endTime: '11:00',
        totalPrice: 4500,
        status: 'completed',
        daysAgo: 33
      }
    ],
    cancelled: [
      {
        id: 'BIA1728765432',
        car: {
          name: 'Ford Focus 2022',
          image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800',
          location: 'Bursa, Nilüfer'
        },
        startDate: '25/10/2025',
        endDate: '27/10/2025',
        startTime: '10:00',
        endTime: '10:00',
        totalPrice: 1800,
        status: 'cancelled',
        cancelledDate: '20/10/2025'
      }
    ]
  }

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        label: 'Onaylandı'
      },
      completed: {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        label: 'Tamamlandı'
      },
      cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        label: 'İptal Edildi'
      }
    }

    const badge = badges[status] || badges.completed

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    )
  }

  const renderTrips = (tripList) => {
    if (tripList.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Henüz rezervasyon yok
          </h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'upcoming' ? 'Yaklaşan bir seyahatiniz bulunmuyor.' :
             activeTab === 'past' ? 'Geçmiş seyahatiniz bulunmuyor.' :
             'İptal edilmiş rezervasyonunuz bulunmuyor.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Araba Kirala
          </Link>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {tripList.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Car Image */}
              <div className="flex-shrink-0">
                <img
                  src={trip.car.image}
                  alt={trip.car.name}
                  className="w-full md:w-64 h-40 object-cover rounded-lg"
                />
              </div>

              {/* Trip Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{trip.car.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{trip.car.location}</span>
                    </div>
                  </div>
                  {getStatusBadge(trip.status)}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Başlangıç</div>
                    <div className="font-semibold text-gray-900">
                      {trip.startDate} - {trip.startTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Bitiş</div>
                    <div className="font-semibold text-gray-900">
                      {trip.endDate} - {trip.endTime}
                    </div>
                  </div>
                </div>

                {/* Price and Booking ID */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Toplam Tutar</div>
                      <div className="text-2xl font-bold text-purple-600">
                        ₺{trip.totalPrice.toLocaleString('tr-TR')}
                      </div>
                    </div>
                    <div className="h-12 w-px bg-gray-300"></div>
                    <div>
                      <div className="text-sm text-gray-600">Rezervasyon No</div>
                      <div className="font-mono font-semibold text-gray-900">{trip.id}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {activeTab === 'upcoming' && trip.status === 'confirmed' && (
                      <>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          Değiştir
                        </button>
                        <button className="px-4 py-2 border border-red-300 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors">
                          İptal Et
                        </button>
                      </>
                    )}
                    <Link
                      to={`/trip/${trip.id}`}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      Detaylar
                    </Link>
                    {activeTab === 'past' && trip.status === 'completed' && (
                      <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                        Tekrar Kirala
                      </button>
                    )}
                  </div>
                </div>

                {/* Additional Info */}
                {trip.daysUntil && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{trip.daysUntil} gün sonra başlıyor</span>
                  </div>
                )}
                {trip.cancelledDate && (
                  <div className="mt-4 text-sm text-red-600">
                    {trip.cancelledDate} tarihinde iptal edildi
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seyahatlerim</h1>
          <p className="text-gray-600">
            Tüm rezervasyonlarınızı buradan görüntüleyebilir ve yönetebilirsiniz
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'upcoming'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yaklaşan Seyahatler
              {trips.upcoming.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs font-bold">
                  {trips.upcoming.length}
                </span>
              )}
              {activeTab === 'upcoming' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'past'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Geçmiş Seyahatler
              {trips.past.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                  {trips.past.length}
                </span>
              )}
              {activeTab === 'past' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === 'cancelled'
                  ? 'text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              İptal Edilenler
              {trips.cancelled.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                  {trips.cancelled.length}
                </span>
              )}
              {activeTab === 'cancelled' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Trips List */}
        {renderTrips(trips[activeTab])}
      </div>
    </div>
  )
}

export default Trips
