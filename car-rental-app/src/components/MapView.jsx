import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { Link } from 'react-router-dom'

// City and district coordinates (approximate centers)
const cityCoordinates = {
  'istanbul': [41.0082, 28.9784],
  'beşiktaş': [41.0422, 29.0067],
  'besiktas': [41.0422, 29.0067],
  'sarıyer': [41.1667, 29.0500],
  'sariyer': [41.1667, 29.0500],
  'fatih': [41.0186, 28.9497],
  'şişli': [41.0602, 28.9877],
  'sisli': [41.0602, 28.9877],
  'taksim': [41.0369, 28.9850],
  'ankara': [39.9334, 32.8597],
  'izmir': [38.4237, 27.1428],
  'antalya': [36.8969, 30.7133],
}

// Custom marker icon for cars
const createCustomIcon = (price) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="white" stroke-width="2"/>
        <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${price}</text>
      </svg>
    `)}`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  })
}

// Custom marker icon for user location
const createUserLocationIcon = () => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="22" fill="#9333ea" stroke="white" stroke-width="3" opacity="0.3"/>
        <circle cx="24" cy="24" r="10" fill="#9333ea" stroke="white" stroke-width="3"/>
        <circle cx="24" cy="24" r="4" fill="white"/>
      </svg>
    `)}`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24]
  })
}

function MapView({ cars, selectedCarId, onCarSelect, userLat, userLng }) {
  // Calculate center based on user location or cars
  const getMapCenter = () => {
    // If user location is available, center on it
    if (userLat && userLng) {
      return [parseFloat(userLat), parseFloat(userLng)]
    }

    if (cars.length === 0) return [39.9334, 32.8597] // Default to Ankara

    // Get first car's city coordinates
    const firstCarCity = cars[0].city.toLowerCase()
    return cityCoordinates[firstCarCity] || [39.9334, 32.8597]
  }

  // Get car position with slight random offset to avoid overlapping
  const getCarPosition = (car, index) => {
    // Try to get coordinates from city first, then from location
    let cityKey = car.city ? car.city.toLowerCase() : 'istanbul'

    // If coordinates not found for city, try extracting district from location string
    if (!cityCoordinates[cityKey] && car.location) {
      const locationLower = car.location.toLowerCase()
      // Try to match any district name in the location string
      const districtMatch = Object.keys(cityCoordinates).find(key =>
        locationLower.includes(key)
      )
      if (districtMatch) {
        cityKey = districtMatch
      }
    }

    const cityCoords = cityCoordinates[cityKey] || [41.0082, 28.9784] // Default to Istanbul center
    // Add small random offset (±0.01 degrees, roughly ±1km)
    const latOffset = (Math.random() - 0.5) * 0.02
    const lngOffset = (Math.random() - 0.5) * 0.02
    return [cityCoords[0] + latOffset, cityCoords[1] + lngOffset]
  }

  return (
    <MapContainer
      center={getMapCenter()}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Car markers */}
      {cars.map((car, index) => {
        const position = getCarPosition(car, index)
        const priceText = car.price.replace('₺', '')

        return (
          <Marker
            key={car.id}
            position={position}
            icon={createCustomIcon(priceText)}
            eventHandlers={{
              click: () => onCarSelect && onCarSelect(car.id),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <Link to={`/car/${car.id}`} className="block hover:opacity-80">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold text-sm mb-1">{car.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{car.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">{car.rating}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-base">{car.price}</div>
                      <div className="text-xs text-gray-500">per day</div>
                    </div>
                  </div>
                </Link>
              </div>
            </Popup>
          </Marker>
        )
      })}

      {/* User location marker */}
      {userLat && userLng && (
        <Marker
          position={[parseFloat(userLat), parseFloat(userLng)]}
          icon={createUserLocationIcon()}
        >
          <Popup>
            <div className="text-center">
              <div className="font-semibold text-purple-600 mb-1">📍 Konumunuz</div>
              <div className="text-xs text-gray-600">Mevcut konumunuz</div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default MapView
