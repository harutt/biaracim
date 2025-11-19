import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { logOut } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Account() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('personal')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Parse user's display name
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

  const { firstName, lastName } = getUserNames()

  const [personalInfo, setPersonalInfo] = useState({
    firstName: firstName,
    lastName: lastName,
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    dateOfBirth: '',
    address: '',
    city: '',
    postalCode: ''
  })

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMessages: true,
    emailPromotions: false,
    smsBookings: true,
    smsMessages: false,
    pushNotifications: true
  })

  const [preferences, setPreferences] = useState({
    language: 'tr',
    currency: 'TRY',
    distanceUnit: 'km'
  })

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    console.log('Delete account requested')
    setShowDeleteConfirm(false)
    handleLogout()
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kişisel Bilgiler</h2>
        <p className="text-gray-600">Hesabınızla ilgili kişisel bilgilerinizi yönetin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
          <input
            type="email"
            value={personalInfo.email}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">E-posta adresi değiştirilemez</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
            placeholder="+90 5XX XXX XX XX"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Doğum Tarihi</label>
          <input
            type="date"
            value={personalInfo.dateOfBirth}
            onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
          <input
            type="text"
            value={personalInfo.city}
            onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
        <textarea
          value={personalInfo.address}
          onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
        Değişiklikleri Kaydet
      </button>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Güvenlik</h2>
        <p className="text-gray-600">Hesabınızın güvenliğini yönetin</p>
      </div>

      {/* Password */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Şifre</h3>
            <p className="text-sm text-gray-600">Son değişiklik: 3 ay önce</p>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Değiştir
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">İki Faktörlü Kimlik Doğrulama</h3>
            <p className="text-sm text-gray-600">Hesabınıza ekstra bir güvenlik katmanı ekleyin</p>
            <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
              Devre Dışı
            </span>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Etkinleştir
          </button>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Giriş Geçmişi</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-medium text-gray-900">Chrome (Windows)</div>
                <div className="text-sm text-gray-500">İstanbul, Türkiye</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">Şimdi</div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <div>
                <div className="font-medium text-gray-900">Safari (iOS)</div>
                <div className="text-sm text-gray-500">Ankara, Türkiye</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">2 gün önce</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ödeme Yöntemleri</h2>
        <p className="text-gray-600">Kayıtlı ödeme yöntemlerinizi yönetin</p>
      </div>

      <div className="space-y-4">
        {/* Saved Card 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-500">Son kullanma: 12/25</div>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Varsayılan
                </span>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              Sil
            </button>
          </div>
        </div>

        {/* Saved Card 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900">•••• •••• •••• 8888</div>
                <div className="text-sm text-gray-500">Son kullanma: 06/26</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Varsayılan Yap
              </button>
              <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
        + Yeni Kart Ekle
      </button>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bildirim Tercihleri</h2>
        <p className="text-gray-600">Hangi bildirimleri almak istediğinizi seçin</p>
      </div>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">E-posta Bildirimleri</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-gray-900">Rezervasyon Bildirimleri</div>
                <div className="text-sm text-gray-600">Rezervasyon onayları ve güncellemeleri</div>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailBookings}
                onChange={(e) => setNotifications({ ...notifications, emailBookings: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-gray-900">Mesaj Bildirimleri</div>
                <div className="text-sm text-gray-600">Yeni mesajlar geldiğinde</div>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailMessages}
                onChange={(e) => setNotifications({ ...notifications, emailMessages: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-gray-900">Promosyonlar ve Teklifler</div>
                <div className="text-sm text-gray-600">Özel indirimler ve kampanyalar</div>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailPromotions}
                onChange={(e) => setNotifications({ ...notifications, emailPromotions: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
              />
            </label>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Bildirimleri</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-gray-900">Rezervasyon Bildirimleri</div>
                <div className="text-sm text-gray-600">Acil rezervasyon güncellemeleri</div>
              </div>
              <input
                type="checkbox"
                checked={notifications.smsBookings}
                onChange={(e) => setNotifications({ ...notifications, smsBookings: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-gray-900">Mesaj Bildirimleri</div>
                <div className="text-sm text-gray-600">Yeni mesajlar geldiğinde</div>
              </div>
              <input
                type="checkbox"
                checked={notifications.smsMessages}
                onChange={(e) => setNotifications({ ...notifications, smsMessages: e.target.checked })}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
              />
            </label>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Bildirimleri</h3>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="font-medium text-gray-900">Mobil Bildirimler</div>
              <div className="text-sm text-gray-600">Mobil cihazlarda anlık bildirimler</div>
            </div>
            <input
              type="checkbox"
              checked={notifications.pushNotifications}
              onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
              className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
            />
          </label>
        </div>
      </div>
    </div>
  )

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tercihler</h2>
        <p className="text-gray-600">Uygulama tercihlerinizi özelleştirin</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-2 block">Dil</span>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
          </label>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-2 block">Para Birimi</span>
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="TRY">₺ Türk Lirası (TRY)</option>
              <option value="USD">$ US Dollar (USD)</option>
              <option value="EUR">€ Euro (EUR)</option>
              <option value="GBP">£ British Pound (GBP)</option>
            </select>
          </label>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-2 block">Mesafe Birimi</span>
            <select
              value={preferences.distanceUnit}
              onChange={(e) => setPreferences({ ...preferences, distanceUnit: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="km">Kilometre (km)</option>
              <option value="mi">Mil (mi)</option>
            </select>
          </label>
        </div>
      </div>

      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
        Değişiklikleri Kaydet
      </button>
    </div>
  )

  const renderDangerZone = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tehlikeli Alan</h2>
        <p className="text-gray-600">Hesabınızla ilgili kalıcı işlemler</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Hesabı Kapat</h3>
        <p className="text-sm text-red-700 mb-4">
          Hesabınızı kalıcı olarak kapatmak istiyorsanız, tüm verileriniz silinecektir. Bu işlem geri alınamaz.
        </p>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Hesabı Kapat
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Hesabı Kapat?</h3>
              <p className="text-gray-600">
                Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinecektir.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Hesabı Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const sections = [
    { id: 'personal', label: 'Kişisel Bilgiler', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'security', label: 'Güvenlik', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'payment', label: 'Ödeme Yöntemleri', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 'notifications', label: 'Bildirimler', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'preferences', label: 'Tercihler', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'danger', label: 'Tehlikeli Alan', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hesap Ayarları</h1>
          <p className="text-gray-600">Hesabınızı ve tercihlerinizi yönetin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl border border-gray-200 p-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                  </svg>
                  <span className="font-medium text-sm">{section.label}</span>
                </button>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Çıkış Yap
            </button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {activeSection === 'personal' && renderPersonalInfo()}
              {activeSection === 'security' && renderSecurity()}
              {activeSection === 'payment' && renderPaymentMethods()}
              {activeSection === 'notifications' && renderNotifications()}
              {activeSection === 'preferences' && renderPreferences()}
              {activeSection === 'danger' && renderDangerZone()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
