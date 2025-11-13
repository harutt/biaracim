import { useState } from 'react'
import CarCard from './CarCard'

function DeliveredCarListings() {
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [showAddressInput, setShowAddressInput] = useState(false)

  // Sample data for different cities with delivery cars
  const deliveryCities = [
    {
      id: 'istanbul',
      name: 'İstanbul',
      cars: [
        {
          id: 1,
          name: 'Toyota Corolla 2025',
          image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop',
          price: '₺725',
          originalPrice: '₺750',
          savings: '₺25',
          rating: 5.0,
          trips: 7,
          location: 'İstanbul',
          deliveryAvailable: true
        },
        {
          id: 2,
          name: 'Toyota Corolla 2025',
          image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop',
          price: '₺580',
          originalPrice: '₺610',
          savings: '₺30',
          rating: 4.92,
          trips: 76,
          location: 'İstanbul',
          deliveryAvailable: true
        },
        {
          id: 3,
          name: 'Kia Forte 2023',
          image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop',
          price: '₺393',
          originalPrice: '₺430',
          savings: '₺37',
          rating: 5.0,
          trips: 59,
          location: 'İstanbul',
          deliveryAvailable: true
        },
        {
          id: 4,
          name: 'Jeep Renegade 2020',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺460',
          originalPrice: '₺500',
          savings: '₺40',
          rating: 5.0,
          trips: 37,
          location: 'İstanbul',
          deliveryAvailable: true
        },
      ]
    },
    {
      id: 'ankara',
      name: 'Ankara',
      cars: [
        {
          id: 5,
          name: 'Volkswagen Passat 2022',
          image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop',
          price: '₺550',
          originalPrice: '₺590',
          savings: '₺40',
          rating: 4.95,
          trips: 48,
          location: 'Ankara',
          deliveryAvailable: true
        },
        {
          id: 6,
          name: 'BMW 3 Series 2022',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
          price: '₺950',
          originalPrice: '₺1000',
          savings: '₺50',
          rating: 4.88,
          trips: 52,
          location: 'Ankara',
          deliveryAvailable: true
        },
        {
          id: 7,
          name: 'Ford Focus 2022',
          image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
          price: '₺420',
          originalPrice: '₺450',
          savings: '₺30',
          rating: 4.82,
          trips: 45,
          location: 'Ankara',
          deliveryAvailable: true
        },
        {
          id: 8,
          name: 'Hyundai Tucson 2023',
          image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop',
          price: '₺700',
          originalPrice: '₺750',
          savings: '₺50',
          rating: 4.90,
          trips: 41,
          location: 'Ankara',
          deliveryAvailable: true
        },
      ]
    },
    {
      id: 'izmir',
      name: 'İzmir',
      cars: [
        {
          id: 9,
          name: 'Mercedes C-Class 2021',
          image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
          price: '₺1000',
          originalPrice: '₺1100',
          savings: '₺100',
          rating: 4.96,
          trips: 38,
          location: 'İzmir',
          deliveryAvailable: true
        },
        {
          id: 10,
          name: 'Peugeot 3008 2022',
          image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop',
          price: '₺550',
          originalPrice: '₺600',
          savings: '₺50',
          rating: 4.91,
          trips: 44,
          location: 'İzmir',
          deliveryAvailable: true
        },
        {
          id: 11,
          name: 'Audi A4 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺900',
          originalPrice: '₺980',
          savings: '₺80',
          rating: 4.89,
          trips: 36,
          location: 'İzmir',
          deliveryAvailable: true
        },
        {
          id: 12,
          name: 'Opel Insignia 2022',
          image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop',
          price: '₺480',
          originalPrice: '₺520',
          savings: '₺40',
          rating: 4.83,
          trips: 41,
          location: 'İzmir',
          deliveryAvailable: true
        },
      ]
    },
    {
      id: 'antalya',
      name: 'Antalya',
      cars: [
        {
          id: 13,
          name: 'Range Rover Evoque 2020',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺850',
          originalPrice: '₺900',
          savings: '₺50',
          rating: 4.98,
          trips: 60,
          location: 'Antalya',
          deliveryAvailable: true
        },
        {
          id: 14,
          name: 'Honda Civic 2023',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
          price: '₺600',
          originalPrice: '₺650',
          savings: '₺50',
          rating: 4.87,
          trips: 42,
          location: 'Antalya',
          deliveryAvailable: true
        },
        {
          id: 15,
          name: 'Renault Megane 2022',
          image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop',
          price: '₺420',
          originalPrice: '₺450',
          savings: '₺30',
          rating: 4.85,
          trips: 48,
          location: 'Antalya',
          deliveryAvailable: true
        },
        {
          id: 16,
          name: 'BMW 5 Series 2021',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
          price: '₺1200',
          originalPrice: '₺1300',
          savings: '₺100',
          rating: 4.88,
          trips: 53,
          location: 'Antalya',
          deliveryAvailable: true
        },
      ]
    },
  ]

  // Scroll function for horizontal scrolling
  const scrollContainer = (containerId, direction) => {
    const container = document.getElementById(containerId)
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Delivery Info Section */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-12 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">Doğrudan size teslim edilebilecek araçları görün</h3>
              <p className="text-sm text-gray-600 mt-1">Araç sahibi, seçtiğiniz adreste sizi karşılayacak</p>
            </div>
          </div>
          {!showAddressInput ? (
            <button
              onClick={() => setShowAddressInput(true)}
              className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium whitespace-nowrap"
            >
              Adres Gir
            </button>
          ) : (
            <div className="flex gap-2 flex-1 max-w-md">
              <input
                type="text"
                placeholder="Teslimat adresinizi girin..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                onClick={() => console.log('Searching for:', deliveryAddress)}
                className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium whitespace-nowrap"
              >
                Ara
              </button>
            </div>
          )}
        </div>
      </div>

      {/* City Sections */}
      {deliveryCities.map((city) => (
        <div key={city.id} className="mb-12">
          {/* City Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold hover:underline cursor-pointer">
              {city.name}'a teslim edilen araç kiralamalar →
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollContainer(`delivery-${city.id}`, 'left')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Sola kaydır"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollContainer(`delivery-${city.id}`, 'right')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Sağa kaydır"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Scrolling Car Cards */}
          <div
            id={`delivery-${city.id}`}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {city.cars.map((car) => (
              <div key={car.id} className="flex-none w-80">
                <CarCard car={car} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeliveredCarListings
