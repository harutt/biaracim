import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedImage, setSelectedImage] = useState(0)
  const [tripStart, setTripStart] = useState('11/27/2025')
  const [tripEnd, setTripEnd] = useState('11/30/2025')
  const [startTime, setStartTime] = useState('10:00 AM')
  const [endTime, setEndTime] = useState('10:00 AM')
  const [pickupLocation, setPickupLocation] = useState('Miami, FL 33128')

  // Sample car data (in production, this would come from API/state)
  const car = {
    id: 1,
    name: 'Nissan Sentra 2016',
    category: 'SV',
    rating: 5.0,
    totalTrips: 28,
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&h=600&fit=crop',
    ],
    price: 137,
    originalPrice: 138,
    savings: 1,
    specs: {
      seats: 5,
      gas: 'Regular',
      mpg: 34,
      transmission: 'Automatic'
    },
    host: {
      name: 'Sereitel Corp',
      trips: 294,
      joinedDate: 'Dec 2024',
      rating: 4.9,
      isAllStar: true,
      avatar: 'https://via.placeholder.com/100'
    },
    features: {
      safety: ['Backup camera', 'Brake assist'],
      connectivity: ['AUX input', 'Bluetooth', 'USB charger', 'USB input'],
      convenience: ['Skip the rental counter', 'Add additional drivers for free', '30-minute return grace period'],
      peaceOfMind: ['No need to wash the car before returning', 'Access to basic roadside assistance', '24/7 customer support']
    },
    distance: 600,
    distanceFee: 0.16,
    rules: [
      { icon: 'no-smoking', title: 'No smoking allowed', description: 'Smoking in any Turo vehicle will result in a $150 fine' },
      { icon: 'clean', title: 'Keep the vehicle tidy', description: 'Unreasonably dirty vehicles may result in a $150 fine' },
      { icon: 'fuel', title: 'Refuel the vehicle', description: 'Missing fuel may result in an additional fee' },
      { icon: 'no-offroad', title: 'No off-roading', description: '' }
    ],
    reviews: [
      { name: 'V.J.', date: 'November 9, 2025', rating: 5, text: 'Great car, great host. Will use again.' },
      { name: 'Richay', date: 'November 6, 2025', rating: 5, text: 'Great experience! The car was clean, reliable, and drove smoothly with' },
      { name: 'SAMUEL', date: 'October 26, 2025', rating: 5, text: 'Nice and neat car. Great customer experience and well support. I recommend this car to anyone visiting this location' }
    ],
    ratings: {
      cleanliness: 5.0,
      maintenance: 5.0,
      communication: 5.0,
      convenience: 5.0,
      accuracy: 5.0
    }
  }

  const similarCars = [
    { id: 2, name: 'Nissan Sentra 2025', rating: 5.0, trips: 24, price: 238, image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop' },
    { id: 3, name: 'Nissan Sentra 2023', rating: 4.89, trips: 101, price: 230, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop' },
    { id: 4, name: 'Nissan Sentra 2024', rating: 4.9, trips: 172, price: 218, savings: 2, image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop' },
  ]

  const tabs = [
    { id: 'overview', label: t('carDetail.overview') },
    { id: 'features', label: t('carDetail.features') },
    { id: 'reviews', label: t('carDetail.reviews') },
    { id: 'location', label: t('carDetail.location') }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => navigate('/')} className="text-2xl font-bold">BiAracım</button>
            <nav className="hidden md:flex gap-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-medium pb-1 ${
                    activeTab === tab.id
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500 line-through">${car.originalPrice}</div>
              <div className="text-xl font-bold">${car.price} {t('carDetail.total')}</div>
              <div className="text-xs text-gray-600">{t('carDetail.beforeTaxes')}</div>
            </div>
            <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              {t('carDetail.continue')}
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <img
              src={car.images[selectedImage]}
              alt={car.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            {car.images.slice(1, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${car.name} ${idx + 2}`}
                onClick={() => setSelectedImage(idx + 1)}
                className="w-48 h-[245px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>
        <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {car.images.length} {t('carDetail.viewPhotos')}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Car Title & Rating */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
              <div className="text-gray-600 mb-4">{car.category}</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold">{car.rating}</span>
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-gray-600">({car.totalTrips} {t('carDetail.trips')})</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{t('carDetail.allStarHost')}</span>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-gray-700">{car.specs.seats} {t('carDetail.seats')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-gray-700">{t('carDetail.gas')} ({car.specs.gas})</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-gray-700">{car.specs.mpg} MPG</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">{car.specs.transmission} {t('carDetail.transmission')}</span>
              </div>
            </div>

            {/* Hosted By */}
            <div className="border-t border-b border-gray-200 py-8">
              <h3 className="text-2xl font-bold mb-6">{t('carDetail.hostedBy')}</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {car.host.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-lg">{car.host.name}</div>
                  <div className="text-sm text-gray-600">{car.host.trips} {t('carDetail.trips')} • {t('carDetail.joined')} {car.host.joinedDate}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-semibold">{car.host.rating}</span>
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              {car.host.isAllStar && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold mb-1">{t('carDetail.allStarHost')}</div>
                    <div className="text-sm text-gray-600">{car.host.name} {t('carDetail.allStarHostDesc')}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Vehicle Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('carDetail.vehicleFeatures')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-3">{t('carDetail.safety')}</h4>
                  <ul className="space-y-2">
                    {car.features.safety.map((feature, idx) => (
                      <li key={idx} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3">{t('carDetail.connectivity')}</h4>
                  <ul className="space-y-2">
                    {car.features.connectivity.map((feature, idx) => (
                      <li key={idx} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="mt-6 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                {t('carDetail.seeAllFeatures')}
              </button>
            </div>

            {/* Included in the price */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('carDetail.includedInPrice')}</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-4">{t('carDetail.convenience')}</h4>
                  {car.features.convenience.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 mb-4">
                      <svg className="w-6 h-6 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <div className="font-semibold">{item.split(':')[0]}</div>
                        {item.includes(':') && <div className="text-sm text-gray-600 mt-1">{item.split(':')[1]}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-bold mb-4">{t('carDetail.peaceOfMind')}</h4>
                  {car.features.peaceOfMind.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 mb-4">
                      <svg className="w-6 h-6 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="text-gray-700">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ratings and Reviews */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold mb-6">{t('carDetail.ratingsReviews')}</h3>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold">{car.rating}</span>
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-gray-600">({car.totalTrips} {t('carDetail.ratings')})</span>
              </div>

              <div className="space-y-3 mb-8">
                {Object.entries(car.ratings).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-4">
                    <div className="w-32 capitalize text-gray-700">{t(`carDetail.${key}`)}</div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: `${(value / 5) * 100}%` }}></div>
                    </div>
                    <div className="w-12 text-right font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              <div className="text-sm text-gray-600 mb-6">20 {t('carDetail.basedOnRatings')}</div>

              <h4 className="font-bold text-gray-600 uppercase text-sm mb-6">{t('carDetail.reviewsTitle')}</h4>

              <div className="space-y-6">
                {car.reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="font-semibold mb-1">{review.name} • {review.date}</div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>

              <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                {t('carDetail.seeMore')}
              </button>
            </div>

            {/* Rules */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold mb-6">{t('carDetail.rulesOfRoad')}</h3>
              <div className="space-y-6">
                {car.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <div>
                      <div className="font-semibold">{rule.title}</div>
                      {rule.description && <div className="text-sm text-gray-600 mt-1">{rule.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="border-t border-gray-200 pt-8">
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-gray-600">Map placeholder</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="font-bold text-sm text-gray-600 uppercase mb-2">PICKUP AT CAR LOCATION</div>
                  <div className="font-semibold">{pickupLocation}</div>
                </div>

                <div>
                  <div className="font-bold text-sm text-gray-600 uppercase mb-2">PICKUP LOCATIONS</div>
                  <div className="text-gray-700">Miami International Airport</div>
                </div>

                <div>
                  <div className="font-bold text-sm text-gray-600 uppercase mb-2">BRING THE CAR TO ME</div>
                  <div className="text-gray-700">Up to 10 miles</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-lg p-6 shadow-lg">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm text-gray-500 line-through">${car.originalPrice}</span>
                  <span className="text-3xl font-bold">${car.price} {t('carDetail.total')}</span>
                </div>
                <div className="text-sm text-gray-600">{t('carDetail.beforeTaxes')}</div>
                <div className="text-sm text-green-600 font-medium">${car.savings} {t('carDetail.dueNow')}</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">{t('carDetail.tripStart')}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tripStart}
                      onChange={(e) => setTripStart(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>1:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Trip end</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tripEnd}
                      onChange={(e) => setTripEnd(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>1:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold">Pickup & return location</label>
                    <button className="text-sm text-black hover:underline">Edit</button>
                  </div>
                  <div className="text-sm text-gray-700">{pickupLocation}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">3-day discount</span>
                  <span className="text-sm font-semibold text-green-600">${car.savings}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-4">
                {t('carDetail.continue')}
              </button>

              <div className="border-t border-gray-200 pt-4">
                <div className="font-bold mb-2">Cancellation policy</div>
                <div className="flex items-start gap-2 mb-4">
                  <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <div>
                    <div className="font-semibold">Free cancellation</div>
                    <div className="text-sm text-gray-600">Full refund before Nov 26, 10:00 AM</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="font-bold mb-2">Payment options</div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <div>
                    <div className="font-semibold">${car.savings} due now</div>
                    <div className="text-sm text-gray-600">Choose to pay later at checkout at no additional cost.</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="font-bold mb-2">Distance included</div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <div className="font-semibold">{car.distance} mi</div>
                    <div className="text-sm text-gray-600">${car.distanceFee}/mi fee for additional miles driven</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="font-bold mb-4">Insurance & Protection</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Insurance via Travelers</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button className="w-full mt-6 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to favorites
              </button>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 text-center">
                <button className="text-black hover:underline text-sm font-medium">{t('carDetail.reportListing')}</button>
              </div>
              <div className="mt-2 text-center">
                <button className="text-black hover:underline text-sm font-medium">{t('carDetail.cancellationPolicy')}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">{t('carDetail.similarCars')}</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarCars.map((similarCar) => (
              <div
                key={similarCar.id}
                onClick={() => navigate(`/car/${similarCar.id}`)}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={similarCar.image}
                  alt={similarCar.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold mb-2">{similarCar.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{similarCar.rating}</span>
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">({similarCar.trips} {t('carDetail.trips')})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {similarCar.savings && (
                        <div className="text-xs text-green-600 font-medium">{t('carDetail.save')} ${similarCar.savings}</div>
                      )}
                      <div className="font-bold text-lg">${similarCar.price} {t('carDetail.total')}</div>
                      <div className="text-xs text-gray-600">{t('carDetail.beforeTaxes')}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="mt-12 flex items-center gap-2 text-sm text-gray-600">
          <button onClick={() => navigate('/')} className="hover:underline">{t('carDetail.carRental')}</button>
          <span>→</span>
          <button className="hover:underline">{t('carDetail.unitedStates')}</button>
          <span>→</span>
          <button className="hover:underline">İstanbul</button>
          <span>→</span>
          <span className="text-gray-900">{car.name}</span>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
