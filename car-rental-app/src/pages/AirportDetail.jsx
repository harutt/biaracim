import { useParams } from 'react-router-dom'
import CarCard from '../components/CarCard'

function AirportDetail() {
  const { airportId } = useParams()

  // Airport data with cars
  const airportsData = {
    'istanbul-havalimani': {
      name: 'İstanbul Havalimanı (IST)',
      code: 'IST',
      description: 'Türkiye\'nin en büyük havalimanı olan İstanbul Havalimanı\'nda geniş araç seçeneklerimizle sizi bekliyoruz.',
      cars: [
        {
          id: 1,
          name: 'Land Rover Range Rover Evoque 2020',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺850',
          originalPrice: '₺900',
          savings: '₺50',
          rating: 4.98,
          trips: 60,
          location: 'İstanbul Havalimanı'
        },
        {
          id: 2,
          name: 'Volkswagen Passat 2022',
          image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop',
          price: '₺550',
          originalPrice: '₺580',
          savings: '₺30',
          rating: 4.95,
          trips: 51,
          location: 'İstanbul Havalimanı'
        },
        {
          id: 3,
          name: 'BMW 5 Series 2021',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
          price: '₺1200',
          originalPrice: '₺1300',
          savings: '₺100',
          rating: 4.88,
          trips: 53,
          location: 'İstanbul Havalimanı'
        },
        {
          id: 4,
          name: 'Mercedes E-Class 2023',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
          price: '₺1500',
          originalPrice: '₺1600',
          savings: '₺100',
          rating: 5.0,
          trips: 45,
          location: 'İstanbul Havalimanı'
        },
        {
          id: 5,
          name: 'Audi A6 2022',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺1100',
          originalPrice: '₺1200',
          savings: '₺100',
          rating: 4.92,
          trips: 38,
          location: 'İstanbul Havalimanı'
        },
        {
          id: 6,
          name: 'Toyota Camry 2023',
          image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop',
          price: '₺600',
          originalPrice: '₺650',
          savings: '₺50',
          rating: 4.90,
          trips: 55,
          location: 'İstanbul Havalimanı'
        },
      ]
    },
    'sabiha-gokcen': {
      name: 'Sabiha Gökçen Havalimanı (SAW)',
      code: 'SAW',
      description: 'Anadolu yakasının en büyük havalimanı Sabiha Gökçen\'de araç kiralama hizmetimiz sizlerle.',
      cars: [
        {
          id: 5,
          name: 'Toyota Corolla 2021',
          image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop',
          price: '₺450',
          originalPrice: '₺480',
          savings: '₺30',
          rating: 4.9,
          trips: 65,
          location: 'Sabiha Gökçen'
        },
        {
          id: 6,
          name: 'Renault Megane 2022',
          image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop',
          price: '₺420',
          originalPrice: '₺450',
          savings: '₺30',
          rating: 4.85,
          trips: 48,
          location: 'Sabiha Gökçen'
        },
        {
          id: 7,
          name: 'Audi A6 2022',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺1100',
          originalPrice: '₺1200',
          savings: '₺100',
          rating: 4.92,
          trips: 38,
          location: 'Sabiha Gökçen'
        },
        {
          id: 8,
          name: 'Honda Civic 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺600',
          originalPrice: '₺650',
          savings: '₺50',
          rating: 4.87,
          trips: 42,
          location: 'Sabiha Gökçen'
        },
      ]
    },
    'ankara-esenboga': {
      name: 'Ankara Esenboğa Havalimanı (ESB)',
      code: 'ESB',
      description: 'Başkentin kapısı Esenboğa Havalimanı\'nda kaliteli ve uygun fiyatlı araçlar sizi bekliyor.',
      cars: [
        {
          id: 9,
          name: 'Volkswagen Golf 2021',
          image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop',
          price: '₺400',
          originalPrice: '₺430',
          savings: '₺30',
          rating: 4.78,
          trips: 55,
          location: 'Ankara Esenboğa'
        },
        {
          id: 10,
          name: 'Ford Focus 2022',
          image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
          price: '₺420',
          originalPrice: '₺450',
          savings: '₺30',
          rating: 4.82,
          trips: 47,
          location: 'Ankara Esenboğa'
        },
        {
          id: 11,
          name: 'BMW 3 Series 2022',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
          price: '₺950',
          originalPrice: '₺1000',
          savings: '₺50',
          rating: 4.95,
          trips: 40,
          location: 'Ankara Esenboğa'
        },
        {
          id: 12,
          name: 'Hyundai Tucson 2023',
          image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop',
          price: '₺700',
          originalPrice: '₺750',
          savings: '₺50',
          rating: 4.88,
          trips: 35,
          location: 'Ankara Esenboğa'
        },
      ]
    },
    'izmir-adnan-menderes': {
      name: 'İzmir Adnan Menderes Havalimanı (ADB)',
      code: 'ADB',
      description: 'Ege\'nin incisi İzmir\'de havalimanından araç kiralama hizmetimizle konforlu yolculuğunuz başlasın.',
      cars: [
        {
          id: 13,
          name: 'Peugeot 3008 2022',
          image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop',
          price: '₺550',
          originalPrice: '₺600',
          savings: '₺50',
          rating: 4.91,
          trips: 44,
          location: 'İzmir Adnan Menderes'
        },
        {
          id: 14,
          name: 'Mercedes C-Class 2021',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
          price: '₺1000',
          originalPrice: '₺1100',
          savings: '₺100',
          rating: 4.96,
          trips: 38,
          location: 'İzmir Adnan Menderes'
        },
        {
          id: 15,
          name: 'Opel Insignia 2022',
          image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop',
          price: '₺480',
          originalPrice: '₺520',
          savings: '₺40',
          rating: 4.83,
          trips: 41,
          location: 'İzmir Adnan Menderes'
        },
        {
          id: 16,
          name: 'Audi A4 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺900',
          originalPrice: '₺980',
          savings: '₺80',
          rating: 4.89,
          trips: 36,
          location: 'İzmir Adnan Menderes'
        },
      ]
    },
  }

  const airport = airportsData[airportId]

  if (!airport) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Havalimanı bulunamadı
        </h1>
        <p className="text-center text-gray-600">
          Aradığınız havalimanı mevcut değil.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-700 via-teal-700 to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {airport.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {airport.description}
            </p>
            <div className="mt-6 inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-sm font-medium">Havalimanı Kodu: {airport.code}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-4 items-center flex-wrap">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              Fiyat
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              Araç Tipi
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              Değerlendirme
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
              Sıralama
            </button>
            <div className="ml-auto text-sm text-gray-600">
              {airport.cars.length} araç bulundu
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {airport.cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {airport.name} Araç Kiralama Bilgileri
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {airport.name} lokasyonumuzda geniş araç filosu ile hizmetinizdeyiz.
                Ekonomik araçlardan lüks segmente kadar her bütçeye uygun seçenekler sunuyoruz.
              </p>
              <p>
                Havalimanından ayrılmadan önce aracınızı teslim alabilir, dönüşünüzde
                kolayca iade edebilirsiniz. 7/24 müşteri desteğimiz her zaman yanınızda.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">✓ Kolay Teslimat</h3>
                  <p className="text-sm">Havalimanında hızlı teslim alım</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">✓ Esnek Saatler</h3>
                  <p className="text-sm">7/24 araç teslim ve iade</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">✓ Geniş Seçenek</h3>
                  <p className="text-sm">Her bütçeye uygun araçlar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirportDetail
