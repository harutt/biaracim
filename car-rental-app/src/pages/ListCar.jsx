import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const steps = [
  { id: 1, title: 'Aracınız', name: 'car' },
  { id: 2, title: 'Profil fotoğrafı', name: 'profile' },
  { id: 3, title: 'Cep telefonu', name: 'phone' },
  { id: 4, title: 'Ehliyet', name: 'license' },
  { id: 5, title: 'Hedefleriniz', name: 'goals' },
  { id: 6, title: 'Araç müsaitliği', name: 'availability' },
  { id: 7, title: 'Araç detayları', name: 'details' },
  { id: 8, title: 'Araç fotoğrafları', name: 'photos' },
  { id: 9, title: 'Ödeme', name: 'payout' },
  { id: 10, title: 'Güvenlik ve kalite standartları', name: 'safety' },
  { id: 11, title: 'Listelemeyi gönder', name: 'submit' },
]

const initialFormData = {
  vin: '',
  make: '',
  model: '',
  year: '',
  phone: '',
  goals: '',
  minRentalDays: '1',
  maxRentalDays: '30',
  availableDays: [],
  mileage: '',
  licensePlate: '',
  fuelType: 'Benzin',
  transmission: 'Otomatik',
  seats: '5',
  features: [],
  dailyPrice: '',
  description: '',
  photos: [],
  profilePhoto: null,
  licensePhoto: null,
  bankName: '',
  iban: '',
  accountHolderName: '',
  termsAccepted: false,
  insuranceConfirmed: false,
  responsibilitiesAccepted: false,
}

function ListCar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSteps, setShowSteps] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  // Sayfa yüklendiğinde sessionStorage'dan verileri yükle
  useEffect(() => {
    const savedFormData = sessionStorage.getItem('listCarFormData')
    const savedStep = sessionStorage.getItem('listCarCurrentStep')

    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData)
        setFormData(parsedData)
        // Verileri yükledikten sonra sessionStorage'ı temizle
        sessionStorage.removeItem('listCarFormData')
      } catch (error) {
        console.error('Error loading saved form data:', error)
      }
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep))
      sessionStorage.removeItem('listCarCurrentStep')
    }
  }, [])

  const handleNext = () => {
    // Son adımda (11. adım - submit), kullanıcı girişi kontrolü yap
    if (currentStep === steps.length) {
      if (!user) {
        setShowAuthModal(true)
        return
      }
      // Kullanıcı giriş yaptıysa formu kaydet
      handleSubmit()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Form verilerini kaydetme işlemi
    console.log('Form data to be saved:', formData)
    // TODO: Firebase'e kaydetme işlemi eklenecek
    alert('Araç listeleme başvurunuz alındı! En kısa sürede onaylayacağız.')
  }

  const handleAuthRedirect = (type) => {
    // Form verilerini sessionStorage'a kaydet
    sessionStorage.setItem('listCarFormData', JSON.stringify(formData))
    sessionStorage.setItem('listCarCurrentStep', currentStep.toString())

    // Login veya Signup sayfasına yönlendir
    if (type === 'login') {
      navigate('/login?redirect=/list-car')
    } else {
      navigate('/signup?redirect=/list-car')
    }
  }

  const currentStepData = steps[currentStep - 1]
  const progress = (currentStep / steps.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">VIN</h2>
              <p className="text-gray-600 mb-4">
                Aracınızın VIN (Şasi) numarasını kullanarak otomatik olarak bilgilerini dolduracağız
              </p>
              <a href="#" className="text-purple-600 hover:underline text-sm">
                VIN numaramı nerede bulabilirim?
              </a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                VIN numaranızı girin
              </label>
              <input
                type="text"
                placeholder="17 haneli VIN kodunu girin"
                value={formData.vin}
                onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                maxLength={17}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="no-vin"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="no-vin" className="ml-2 text-sm text-gray-700">
                Aracım VIN numarasına sahip değil
              </label>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Profil fotoğrafı</h2>
              <p className="text-gray-600 mb-6">
                Kiracıların sizi tanıması için bir profil fotoğrafı ekleyin
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Fotoğraf Yükle
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Cep telefonu numaranız</h2>
              <p className="text-gray-600 mb-6">
                Kiracılarla iletişim kurmak için cep telefonu numaranızı girin
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon numarası
              </label>
              <input
                type="tel"
                placeholder="+90 5XX XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ehliyet bilgileriniz</h2>
              <p className="text-gray-600 mb-6">
                Kimlik doğrulaması için ehliyetinizin fotoğrafını yükleyin
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Ehliyetinizin ön ve arka yüzünü yükleyin
              </p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Dosya Seç
              </button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Hedefleriniz neler?</h2>
              <p className="text-gray-600 mb-6">
                Aracınızı kiraya vererek ne kadar kazanmak istiyorsunuz?
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                <input
                  type="radio"
                  name="goal"
                  value="extra"
                  checked={formData.goals === 'extra'}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="h-4 w-4 text-purple-600"
                />
                <span className="ml-3 text-gray-700">Ekstra gelir elde etmek</span>
              </label>
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                <input
                  type="radio"
                  name="goal"
                  value="cover"
                  checked={formData.goals === 'cover'}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="h-4 w-4 text-purple-600"
                />
                <span className="ml-3 text-gray-700">Araç masraflarımı karşılamak</span>
              </label>
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                <input
                  type="radio"
                  name="goal"
                  value="business"
                  checked={formData.goals === 'business'}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="h-4 w-4 text-purple-600"
                />
                <span className="ml-3 text-gray-700">Bir iş kurmak</span>
              </label>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Araç müsaitliği</h2>
              <p className="text-gray-600 mb-6">
                Aracınızı hangi günlerde kiraya vermek istiyorsunuz?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum kiralama süresi
                </label>
                <select
                  value={formData.minRentalDays}
                  onChange={(e) => setFormData({ ...formData, minRentalDays: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="1">1 gün</option>
                  <option value="2">2 gün</option>
                  <option value="3">3 gün</option>
                  <option value="7">1 hafta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimum kiralama süresi
                </label>
                <select
                  value={formData.maxRentalDays}
                  onChange={(e) => setFormData({ ...formData, maxRentalDays: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="7">1 hafta</option>
                  <option value="14">2 hafta</option>
                  <option value="30">1 ay</option>
                  <option value="90">3 ay</option>
                  <option value="unlimited">Sınırsız</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Müsait olduğunuz günler
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map((day) => (
                    <label key={day} className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.availableDays.includes(day)}
                        onChange={(e) => {
                          const newDays = e.target.checked
                            ? [...formData.availableDays, day]
                            : formData.availableDays.filter(d => d !== day)
                          setFormData({ ...formData, availableDays: newDays })
                        }}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-700">Takvimi daha sonra özelleştirebilirsiniz</p>
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Araç detayları</h2>
              <p className="text-gray-600 mb-6">
                Aracınızın özelliklerini ve detaylarını girin
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kilometre
                  </label>
                  <input
                    type="number"
                    placeholder="Örn: 50000"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plaka
                  </label>
                  <input
                    type="text"
                    placeholder="34 ABC 123"
                    value={formData.licensePlate}
                    onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yakıt türü
                  </label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option>Benzin</option>
                    <option>Dizel</option>
                    <option>Elektrik</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vites türü
                  </label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option>Otomatik</option>
                    <option>Manuel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Koltuk sayısı
                </label>
                <select
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>2</option>
                  <option>4</option>
                  <option>5</option>
                  <option>7</option>
                  <option>8+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Araç özellikleri
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Klima', 'Bluetooth', 'GPS', 'Arka Kamera', 'Park Sensörü', 'Sunroof'].map((feature) => (
                    <label key={feature} className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={(e) => {
                          const newFeatures = e.target.checked
                            ? [...formData.features, feature]
                            : formData.features.filter(f => f !== feature)
                          setFormData({ ...formData, features: newFeatures })
                        }}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Günlük fiyat (₺)
                </label>
                <input
                  type="number"
                  placeholder="Örn: 450"
                  value={formData.dailyPrice}
                  onChange={(e) => setFormData({ ...formData, dailyPrice: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-500">Ortalama günlük fiyat: ₺400-600</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Araç açıklaması
                </label>
                <textarea
                  rows={4}
                  placeholder="Aracınız hakkında kiracıların bilmesini istediğiniz detayları yazın..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Araç fotoğrafları</h2>
              <p className="text-gray-600 mb-6">
                Aracınızın en az 5 fotoğrafını yükleyin. Kaliteli fotoğraflar daha fazla kiralama almanıza yardımcı olur.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-sm text-gray-600">
                  Fotoğrafları sürükleyip bırakın veya tıklayarak seçin
                </p>
                <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                  Fotoğraf Seç
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">İpuçları:</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Aracın dış cephesini farklı açılardan çekin</li>
                  <li>İç mekan fotoğrafları ekleyin (torpido, koltuklar, bagaj)</li>
                  <li>Varsa hasarları dürüstçe gösterin</li>
                  <li>Gün ışığında net fotoğraflar çekin</li>
                  <li>Kilometre göstergesinin fotoğrafını ekleyin</li>
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-gray-400 text-sm">Fotoğraf {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ödeme bilgileri</h2>
              <p className="text-gray-600 mb-6">
                Kazancınızın aktarılacağı banka hesabı bilgilerinizi girin
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banka seçin
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>Banka seçin...</option>
                  <option>Ziraat Bankası</option>
                  <option>İş Bankası</option>
                  <option>Garanti BBVA</option>
                  <option>Yapı Kredi</option>
                  <option>Akbank</option>
                  <option>QNB Finansbank</option>
                  <option>Denizbank</option>
                  <option>TEB</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IBAN numarası
                </label>
                <input
                  type="text"
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  maxLength={32}
                  value={formData.iban}
                  onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hesap sahibinin adı
                </label>
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={formData.accountHolderName}
                  onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-purple-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-purple-900">Güvenli ödeme</h4>
                    <p className="text-sm text-purple-800 mt-1">
                      Banka bilgileriniz 256-bit SSL şifrelemesi ile korunur. Ödemeler her pazartesi otomatik olarak hesabınıza aktarılır.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Tahmini kazanç</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Günlük fiyat:</span>
                    <span className="font-medium">₺450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform ücreti (%15):</span>
                    <span className="font-medium text-red-600">-₺68</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between">
                    <span className="font-medium text-gray-900">Günlük kazancınız:</span>
                    <span className="font-bold text-green-600">₺382</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 10:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Güvenlik ve kalite standartları</h2>
              <p className="text-gray-600 mb-6">
                Platform kullanım koşullarını ve standartlarımızı okuyup kabul edin
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Araç sahibi sorumlulukları</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Aracın temiz, bakımlı ve güvenli olduğundan emin olun</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Aracın güncel sigorta ve trafik sigortası olmalı</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Doğru ve güncel bilgi sağlayın</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Kiracılara zamanında yanıt verin</p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Teslim ve iade işlemlerini zamanında yapın</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-blue-900">Sigorta koruması</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Her kiralama 1 milyon ₺'ye kadar hasar koruması içerir. Ayrıntılar için sigorta sayfasını ziyaret edin.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-0.5"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    <a href="/legal" className="text-purple-600 hover:underline">Kullanım Şartları</a> ve <a href="/legal" className="text-purple-600 hover:underline">Gizlilik Politikası</a>'nı okudum ve kabul ediyorum
                  </span>
                </label>

                <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.insuranceConfirmed}
                    onChange={(e) => setFormData({ ...formData, insuranceConfirmed: e.target.checked })}
                    className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-0.5"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Aracımın güncel sigorta ve ruhsatının olduğunu onaylıyorum
                  </span>
                </label>

                <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.responsibilitiesAccepted}
                    onChange={(e) => setFormData({ ...formData, responsibilitiesAccepted: e.target.checked })}
                    className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-0.5"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    Araç sahibi sorumlulukları ve standartları kabul ediyorum
                  </span>
                </label>
              </div>
            </div>
          </div>
        )

      case 11:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2">Listelemeniz hazır!</h2>
              <p className="text-gray-600 mb-6">
                Tüm bilgilerinizi kontrol edin ve listelemenizi gönderin
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Özet</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Araç:</span>
                  <span className="font-medium">Toyota Corolla 2020</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Günlük fiyat:</span>
                  <span className="font-medium">₺450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Konum:</span>
                  <span className="font-medium">İstanbul, Kadıköy</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{currentStepData.title}</h2>
              <p className="text-gray-600">Bu adım için form alanları eklenecek...</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Aracınızı listeleyin</h1>
            <p className="text-gray-600">
              Adım {currentStep}/{steps.length} | Sonraki: {steps[currentStep]?.title || 'Tamamla'}
            </p>
          </div>
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
          >
            Tüm adımları gör
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps Modal */}
        {showSteps && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Aracınızı listeleyin</h3>
                  <button
                    onClick={() => setShowSteps(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        step.id === currentStep ? 'bg-purple-50' : ''
                      } ${step.id < currentStep ? 'text-gray-400' : ''}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                          step.id < currentStep
                            ? 'bg-green-500 text-white'
                            : step.id === currentStep
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {step.id < currentStep ? '✓' : step.id}
                      </div>
                      <span className={step.id === currentStep ? 'font-medium' : ''}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Giriş Yapın</h3>
                <p className="text-gray-600">
                  Araç listeleme işlemini tamamlamak için önce giriş yapmanız veya kayıt olmanız gerekiyor
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleAuthRedirect('login')}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={() => handleAuthRedirect('signup')}
                  className="w-full px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-md hover:bg-purple-50 transition-colors font-medium"
                >
                  Kayıt Ol
                </button>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="w-full px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  İptal
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-6">
                Form bilgileriniz güvenli bir şekilde saklanacak ve giriş yaptıktan sonra kaldığınız yerden devam edebileceksiniz.
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Geri
            </button>
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              {currentStep === steps.length ? 'Gönder' : 'İleri'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCar
