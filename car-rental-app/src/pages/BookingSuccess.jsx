import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Header from '../components/Header'
import confetti from 'canvas-confetti'

function BookingSuccess() {
  const location = useLocation()
  const navigate = useNavigate()

  // Get booking data from navigation state
  const { car, tripStart, tripEnd, startTime, endTime, pickupLocation, deliveryLocation, total, bookingId } = location.state || {}

  // If no booking data, redirect to home
  useEffect(() => {
    if (!car || !bookingId) {
      navigate('/')
    }
  }, [car, bookingId, navigate])

  // Trigger confetti animation on mount
  useEffect(() => {
    // Fire confetti
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }))
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }))
    }, 250)

    return () => clearInterval(interval)
  }, [])

  if (!car) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-[900px] mx-auto px-8 py-12">
        {/* Success Icon & Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Rezervasyon Tamamlandı! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Ödemeniz başarıyla alındı ve rezervasyonunuz onaylandı.
          </p>
          <p className="text-sm text-gray-500">
            Rezervasyon detayları e-posta adresinize gönderildi.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Rezervasyon Numarası</div>
                <div className="text-2xl font-bold">{bookingId}</div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90 mb-1">Toplam Ödeme</div>
                <div className="text-3xl font-bold">₺{total?.toLocaleString('tr-TR')}</div>
              </div>
            </div>
          </div>

          {/* Car & Trip Details */}
          <div className="p-8">
            {/* Car Info */}
            <div className="flex items-start gap-6 mb-8">
              <img
                src={car.images[0]}
                alt={car.name}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{car.name}</h2>
                <div className="flex items-center gap-1 text-gray-600 mb-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{pickupLocation}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{car.rating}</span>
                  {car.trips && <span className="text-gray-500 text-sm">({car.trips} trips)</span>}
                </div>
              </div>
            </div>

            {/* Trip Timeline */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Kiralama Detayları</h3>

              <div className="space-y-4">
                {/* Pickup */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">Araç Teslim Alma</div>
                    <div className="font-bold text-gray-900">{tripStart} - {startTime}</div>
                    <div className="text-sm text-gray-600 mt-1">{pickupLocation}</div>
                  </div>
                </div>

                {/* Vertical Line */}
                <div className="ml-6 h-8 w-0.5 bg-gray-300"></div>

                {/* Return */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">Araç Teslim Etme</div>
                    <div className="font-bold text-gray-900">{tripEnd} - {endTime}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {deliveryLocation || pickupLocation}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Önemli Bilgiler
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Araç teslim alırken geçerli bir kimlik ve ehliyet gereklidir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Rezervasyon onay maili ile birlikte tüm detaylar gönderilmiştir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Herhangi bir sorunuz olursa 7/24 destek ekibimizle iletişime geçebilirsiniz.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Anasayfa
          </Link>

          <Link
            to="/trips"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Rezervasyonlarım
          </Link>

          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Destek
          </Link>
        </div>

        {/* Download Receipt */}
        <div className="mt-8 text-center">
          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-2 mx-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Makbuzu İndir (PDF)
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccess
