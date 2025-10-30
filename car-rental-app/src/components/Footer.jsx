import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('app_name')}</h3>
            <p className="text-gray-400">
              {t('description')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.search')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.how_it_works')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              Türkiye
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {t('app_name')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
