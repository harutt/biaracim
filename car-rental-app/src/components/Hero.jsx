import { useTranslation } from 'react-i18next'

function Hero() {
  const { t } = useTranslation()

  return (
    <div className="relative bg-gradient-to-r from-cyan-700 via-teal-700 to-cyan-800 text-white overflow-hidden">
      {/* Background Pattern/Image */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&h=600&fit=crop')] bg-cover bg-center"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            {t('description')}
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-2">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Where */}
            <div className="flex-1 p-4">
              <label className="block text-xs text-gray-600 mb-1">Nerede</label>
              <input
                type="text"
                placeholder="Şehir, havaalanı, adres veya otel"
                className="w-full text-gray-800 placeholder-gray-400 focus:outline-none text-sm"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* From Date */}
            <div className="flex-1 p-4">
              <label className="block text-xs text-gray-600 mb-1">{t('search.date_from')}</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 text-gray-800 focus:outline-none text-sm"
                />
                <input
                  type="time"
                  className="flex-1 text-gray-800 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* Until Date */}
            <div className="flex-1 p-4">
              <label className="block text-xs text-gray-600 mb-1">{t('search.date_to')}</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 text-gray-800 focus:outline-none text-sm"
                />
                <input
                  type="time"
                  className="flex-1 text-gray-800 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg transition-colors flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
