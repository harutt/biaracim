import { useState } from 'react'

function ContactSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Support request:', formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Destek Merkezi</h1>
          <p className="text-center text-gray-600 mb-12">
            Size nasıl yardımcı olabiliriz? Sorularınızı bize iletin.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold mb-2">E-posta</h3>
              <p className="text-gray-600 text-sm">destek@arackirala.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-semibold mb-2">Telefon</h3>
              <p className="text-gray-600 text-sm">0850 XXX XX XX</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-semibold mb-2">Canlı Destek</h3>
              <p className="text-gray-600 text-sm">7/24 Aktif</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Bize Ulaşın</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konu
                </label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Konu seçin</option>
                  <option value="reservation">Rezervasyon</option>
                  <option value="payment">Ödeme</option>
                  <option value="vehicle">Araç ile ilgili</option>
                  <option value="account">Hesap ayarları</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajınız
                </label>
                <textarea
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Lütfen sorunuzu veya talebinizi detaylı bir şekilde açıklayın..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-purple-700 transition-colors"
              >
                Gönder
              </button>
            </form>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">Sıkça Sorulan Sorular</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Nasıl rezervasyon yapabilirim?</li>
              <li>• Ödeme yöntemleri nelerdir?</li>
              <li>• İptal politikası nedir?</li>
              <li>• Sigorta kapsamı nedir?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSupport
