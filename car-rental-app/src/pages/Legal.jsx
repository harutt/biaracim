function Legal() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Yasal Bilgiler</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Kullanım Şartları</h2>
            <div className="prose prose-gray">
              <p className="text-gray-700 mb-4">
                Bu platformu kullanarak aşağıdaki şartları kabul etmiş olursunuz:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>18 yaşından büyük olmalı ve geçerli bir ehliyete sahip olmalısınız</li>
                <li>Sağlanan bilgilerin doğru ve güncel olduğunu garanti edersiniz</li>
                <li>Kiraladığınız aracı iyi durumda teslim etmeyi kabul edersiniz</li>
                <li>Platform kurallarına uygun hareket edeceğinizi taahhüt edersiniz</li>
              </ul>
            </div>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Gizlilik Politikası</h2>
            <div className="prose prose-gray">
              <p className="text-gray-700 mb-4">
                Kişisel verileriniz KVKK kapsamında korunmaktadır:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Verileriniz şifrelenerek güvenli bir şekilde saklanır</li>
                <li>Üçüncü taraflarla paylaşılmaz</li>
                <li>İstediğiniz zaman verilerinizi silebilirsiniz</li>
                <li>Sadece hizmet kalitesini artırmak için kullanılır</li>
              </ul>
            </div>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">Sorumluluk Reddi</h2>
            <p className="text-gray-700 mb-4">
              Platform, araç sahipleri ve kiracılar arasında bir aracı görevi görür.
              Araçların durumu ve kiralama koşulları araç sahibinin sorumluluğundadır.
            </p>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">İptal ve İade Politikası</h2>
            <div className="prose prose-gray">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>48 saat öncesine kadar tam iade</li>
                <li>24-48 saat arası %50 iade</li>
                <li>24 saatten az süre kalan rezervasyonlar için iade yapılmaz</li>
              </ul>
            </div>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4">İletişim</h2>
            <p className="text-gray-700">
              Yasal konularda bizimle iletişime geçmek için:{' '}
              <a href="mailto:legal@arackirala.com" className="text-purple-600 hover:underline">
                legal@arackirala.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Legal
