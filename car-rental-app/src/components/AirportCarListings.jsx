import { useState } from 'react'
import { Link } from 'react-router-dom'
import CarCard from './CarCard'

function AirportCarListings() {
  // Sample airport data with cars
  const airports = [
    {
      id: 'ist',
      slug: 'istanbul-havalimani',
      name: 'İstanbul Havalimanı (IST)',
      code: 'IST',
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
      ]
    },
    {
      id: 'saw',
      slug: 'sabiha-gokcen',
      name: 'Sabiha Gökçen Havalimanı (SAW)',
      code: 'SAW',
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
    {
      id: 'esb',
      slug: 'ankara-esenboga',
      name: 'Ankara Esenboğa Havalimanı (ESB)',
      code: 'ESB',
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
    {
      id: 'adb',
      slug: 'izmir-adnan-menderes',
      name: 'İzmir Adnan Menderes Havalimanı (ADB)',
      code: 'ADB',
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
    <div className="container py-8">
      {airports.map((airport) => (
        <div key={airport.id} className="mb-12">
          {/* Airport Section Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to={`/airport/${airport.slug}`}>
              <h2 className="text-2xl font-bold hover:underline cursor-pointer">
                {airport.name} araç kiralama →
              </h2>
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => scrollContainer(`airport-${airport.id}`, 'left')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="Sola kaydır"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollContainer(`airport-${airport.id}`, 'right')}
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
            id={`airport-${airport.id}`}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {airport.cars.map((car) => (
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

export default AirportCarListings
