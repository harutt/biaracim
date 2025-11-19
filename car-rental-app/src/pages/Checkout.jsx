import { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'

function Checkout() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  // Get booking data from navigation state
  const { car, tripStart, tripEnd, startTime, endTime, pickupLocation, deliveryLocation } = location.state || {}

  // Parse user's display name to get first and last name
  const getUserNames = () => {
    if (user?.displayName) {
      const names = user.displayName.split(' ')
      return {
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || ''
      }
    }
    return { firstName: '', lastName: '' }
  }

  const { firstName: userFirstName, lastName: userLastName } = getUserNames()

  // Form states - Pre-fill with user data if available
  const [formData, setFormData] = useState({
    firstName: userFirstName,
    lastName: userLastName,
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    licenseNumber: '',
    licenseExpiry: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const [termsAccepted, setTermsAccepted] = useState(false)
  const [insuranceAccepted, setInsuranceAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate days and total
  const calculateDays = () => {
    if (!tripStart || !tripEnd) return 1
    const start = new Date(tripStart.split('/').reverse().join('-'))
    const end = new Date(tripEnd.split('/').reverse().join('-'))
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 1
  }

  const days = calculateDays()
  const basePrice = car?.priceNum || 0
  const subtotal = basePrice * days
  const serviceFee = Math.round(subtotal * 0.1) // 10% service fee
  const insurance = insuranceAccepted ? 150 * days : 0
  const total = subtotal + serviceFee + insurance

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCardInputChange = (e) => {
    const { name, value } = e.target
    setCardData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!termsAccepted) {
      alert('Lütfen kullanım koşullarını kabul edin.')
      return
    }

    if (paymentMethod === 'credit-card') {
      if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
        alert('Lütfen tüm kart bilgilerini doldurun.')
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      navigate('/booking-success', {
        state: {
          car,
          tripStart,
          tripEnd,
          startTime,
          endTime,
          pickupLocation,
          deliveryLocation,
          total,
          bookingId: `BIA${Date.now()}`
        }
      })
    }, 2000)
  }

  // If no booking data, redirect to home
  if (!car) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-[1280px] mx-auto px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Geri Dön
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Rezervasyonu Tamamla</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Kişisel Bilgiler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Driver's License */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Sürücü Belgesi Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ehliyet Numarası
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ehliyet Son Kullanma Tarihi
                  </label>
                  <input
                    type="date"
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Acil Durum İletişim</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İsim Soyisim
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="+90 5XX XXX XX XX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Ek Koruma</h2>
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={insuranceAccepted}
                  onChange={(e) => setInsuranceAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
                />
                <div className="flex-1">
                  <div className="font-semibold mb-1">Tam Kapsamlı Sigorta</div>
                  <div className="text-sm text-gray-600 mb-2">
                    Kaza, hasar ve çalınma durumunda tam koruma sağlar. Muafiyet tutarını sıfırlar.
                  </div>
                  <div className="text-lg font-bold text-purple-600">₺150/gün</div>
                </div>
              </label>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Ödeme Yöntemi</h2>

              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment-method"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-purple-600"
                  />
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="font-medium">Kredi/Banka Kartı</span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'credit-card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kart Üzerindeki İsim
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={cardData.cardName}
                      onChange={handleCardInputChange}
                      placeholder="AD SOYAD"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Son Kullanma Tarihi
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="AA/YY"
                        maxLength="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
                />
                <div className="text-sm text-gray-700">
                  <a href="/legal" className="text-purple-600 hover:underline">
                    Kullanım koşullarını
                  </a>
                  {' '}ve{' '}
                  <a href="/legal" className="text-purple-600 hover:underline">
                    gizlilik politikasını
                  </a>
                  {' '}okudum ve kabul ediyorum.
                </div>
              </label>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Rezervasyon Özeti</h2>

              {/* Car Image & Name */}
              <div className="mb-4">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-lg">{car.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{pickupLocation}</span>
                </div>
              </div>

              {/* Trip Details */}
              <div className="border-t border-gray-200 pt-4 mb-4 space-y-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Başlangıç</div>
                  <div className="font-medium">{tripStart} - {startTime}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Bitiş</div>
                  <div className="font-medium">{tripEnd} - {endTime}</div>
                </div>
                {deliveryLocation && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Teslim Yeri</div>
                    <div className="font-medium text-sm">{deliveryLocation}</div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">₺{basePrice} x {days} gün</span>
                  <span className="font-medium">₺{subtotal.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hizmet bedeli</span>
                  <span className="font-medium">₺{serviceFee.toLocaleString('tr-TR')}</span>
                </div>
                {insuranceAccepted && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sigorta</span>
                    <span className="font-medium">₺{insurance.toLocaleString('tr-TR')}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Toplam</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ₺{total.toLocaleString('tr-TR')}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İşleniyor...
                  </span>
                ) : (
                  'Rezervasyonu Tamamla'
                )}
              </button>

              {/* Security Note */}
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Ödemeniz güvenli şekilde işlenir</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
