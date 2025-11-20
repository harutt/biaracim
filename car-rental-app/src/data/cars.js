// Istanbul districts for consistent assignment
const istanbulDistricts = ['Beşiktaş', 'Sarıyer', 'Fatih', 'Şişli', 'Taksim']

// All car listings data - using actual images from public/cars folder
export const allCars = [
  // SEDANS
  {
    id: 1,
    name: 'Toyota Corolla 2021',
    image: '/cars/toyota-corolla-2021.jpg',
    price: 450,
    originalPrice: 480,
    savings: 30,
    rating: 4.9,
    location: 'Istanbul, Sarıyer',
    city: 'sarıyer',
    trips: 120,
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    seats: 5,
    type: 'sedan',
    category: 'Sedan',
    specs: {
      seats: 5,
      gas: 'Benzin',
      mpg: 34,
      transmission: 'Otomatik'
    },
    features: {
      safety: ['Geri görüş kamerası', 'Fren asistanı', 'ABS', 'Airbag'],
      connectivity: ['AUX girişi', 'Bluetooth', 'USB şarj', 'USB girişi'],
      convenience: ['Kiralama ofisini atla', 'Ücretsiz ek sürücü ekle', '30 dakika teslimat toleransı'],
      peaceOfMind: ['Teslimattan önce yıkama gerekmez', 'Temel yol yardımı', '7/24 müşteri desteği']
    },
    distance: 600,
    distanceFee: 5,
    host: {
      name: 'Ahmet Yılmaz',
      trips: 294,
      joinedDate: 'Ara 2024',
      rating: 4.9,
      isAllStar: true,
    },
    reviews: [
      { name: 'Mehmet K.', date: '9 Kasım 2025', rating: 5, text: 'Harika araba, harika ev sahibi. Tekrar kullanacağım.' },
      { name: 'Ayşe Y.', date: '6 Kasım 2025', rating: 5, text: 'Mükemmel deneyim! Araç temiz, güvenilir ve sorunsuzdu.' },
      { name: 'Can D.', date: '26 Ekim 2025', rating: 5, text: 'Temiz araç. Harika müşteri deneyimi ve destek.' }
    ],
    ratings: {
      cleanliness: 4.9,
      maintenance: 4.9,
      communication: 4.9,
      convenience: 4.8,
      accuracy: 4.9
    }
  },
  {
    id: 2,
    name: 'Toyota Corolla 2025',
    image: '/cars/toyota-corolla-2025.jpg',
    price: 520,
    rating: 5.0,
    location: 'Istanbul, Fatih',
    city: 'fatih',
    trips: 15,
    make: 'Toyota',
    year: 2025,
    seats: 5,
    type: 'sedan',
    isNew: true
  },
  {
    id: 3,
    name: 'BMW 3 Series 2022',
    image: '/cars/BMW-3-Series-2022.jpg',
    price: 850,
    rating: 4.95,
    location: 'Istanbul, Şişli',
    city: 'şişli',
    trips: 78,
    make: 'BMW',
    year: 2022,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 4,
    name: 'BMW 5 Series 2021',
    image: '/cars/BMW-5-Series-2021.jpg',
    price: 950,
    rating: 4.92,
    location: 'Ankara',
    city: 'ankara',
    trips: 64,
    make: 'BMW',
    year: 2021,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 5,
    name: 'BMW 5 Series 2022',
    image: '/cars/BMW-5-Series-2022.png',
    price: 1000,
    rating: 4.96,
    location: 'Istanbul, Beşiktaş',
    city: 'beşiktaş',
    trips: 52,
    make: 'BMW',
    year: 2022,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 6,
    name: 'BMW 5 Series 2023',
    image: '/cars/BMW-5-Series-2023.jpg',
    price: 1100,
    rating: 5.0,
    location: 'Ankara',
    city: 'ankara',
    trips: 28,
    make: 'BMW',
    year: 2023,
    seats: 5,
    type: 'sedan',
    isNew: true
  },
  {
    id: 7,
    name: 'Mercedes C-Class 2021',
    image: '/cars/Mercedes-C-Class-2021.jpg',
    price: 900,
    rating: 4.88,
    location: 'Izmir',
    city: 'izmir',
    trips: 71,
    make: 'Mercedes',
    year: 2021,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 8,
    name: 'Mercedes C-Class 2023',
    image: '/cars/Mercedes-C-Class-2023.jpg',
    price: 1200,
    rating: 5.0,
    location: 'Istanbul, Şişli',
    city: 'şişli',
    trips: 31,
    make: 'Mercedes',
    year: 2023,
    seats: 5,
    type: 'sedan',
    isNew: true
  },
  {
    id: 9,
    name: 'Mercedes E-Class 2022',
    image: '/cars/Mercedes-E-Class-2022.jpeg',
    price: 1350,
    rating: 4.94,
    location: 'Ankara',
    city: 'ankara',
    trips: 45,
    make: 'Mercedes',
    year: 2022,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 10,
    name: 'Mercedes E-Class 2023',
    image: '/cars/Mercedes-E-Class-2023.jpg',
    price: 1450,
    rating: 5.0,
    location: 'Istanbul, Beşiktaş',
    city: 'beşiktaş',
    trips: 22,
    make: 'Mercedes',
    year: 2023,
    seats: 5,
    type: 'sedan',
    isNew: true
  },
  {
    id: 11,
    name: 'Mercedes S-Class 2023',
    image: '/cars/Mercedes-S-Class-2023.jpg',
    price: 1900,
    rating: 5.0,
    location: 'Istanbul, Sarıyer',
    city: 'sarıyer',
    trips: 18,
    make: 'Mercedes',
    year: 2023,
    seats: 5,
    type: 'sedan',
    isNew: true
  },
  {
    id: 12,
    name: 'Audi A3 2022',
    image: '/cars/Audi-A3-2022.jpg',
    price: 720,
    rating: 4.87,
    location: 'Izmir',
    city: 'izmir',
    trips: 58,
    make: 'Audi',
    year: 2022,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 13,
    name: 'Honda Civic 2022',
    image: '/cars/Honda-Civic-2022.jpg',
    price: 550,
    rating: 4.9,
    location: 'Ankara',
    city: 'ankara',
    trips: 88,
    make: 'Honda',
    year: 2022,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 14,
    name: 'Honda Civic 2023',
    image: '/cars/Honda-Civic-2023.jpg',
    price: 600,
    rating: 4.93,
    location: 'Istanbul, Taksim',
    city: 'taksim',
    trips: 42,
    make: 'Honda',
    year: 2023,
    seats: 5,
    type: 'sedan',
    isNew: true
  },
  {
    id: 15,
    name: 'Mazda 6 2022',
    image: '/cars/Mazda-6-2022.jpeg',
    price: 580,
    rating: 4.86,
    location: 'Antalya',
    city: 'antalya',
    trips: 67,
    make: 'Mazda',
    year: 2022,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 16,
    name: 'Opel Insignia 2021',
    image: '/cars/Opel-Insignia-2021.jpg',
    price: 480,
    rating: 4.7,
    location: 'Antalya',
    city: 'antalya',
    trips: 92,
    make: 'Opel',
    year: 2021,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 17,
    name: 'Volkswagen Passat 2021',
    image: '/cars/wolkswagen-passat-2021.jpg',
    price: 520,
    rating: 4.82,
    location: 'Ankara',
    city: 'ankara',
    trips: 73,
    make: 'Volkswagen',
    year: 2021,
    seats: 5,
    type: 'sedan'
  },
  {
    id: 18,
    name: 'Volkswagen Passat 2022',
    image: '/cars/wolkswagen-passat-2022.jpg',
    price: 560,
    rating: 4.85,
    location: 'Istanbul, Şişli',
    city: 'şişli',
    trips: 54,
    make: 'Volkswagen',
    year: 2022,
    seats: 5,
    type: 'sedan'
  },

  // HATCHBACKS
  {
    id: 19,
    name: 'Volkswagen Golf 2020',
    image: '/cars/wolkswagen-golf-2020.jpg',
    price: 380,
    rating: 4.8,
    location: 'Istanbul, Taksim',
    city: 'taksim',
    trips: 95,
    make: 'Volkswagen',
    year: 2020,
    seats: 5,
    type: 'hatchback'
  },
  {
    id: 20,
    name: 'Volkswagen Golf 2021',
    image: '/cars/wolkswagen-golf-2021.jpg',
    price: 420,
    rating: 4.83,
    location: 'Ankara',
    city: 'ankara',
    trips: 76,
    make: 'Volkswagen',
    year: 2021,
    seats: 5,
    type: 'hatchback'
  },
  {
    id: 21,
    name: 'Renault Clio 2021',
    image: '/cars/Renault-Clio-2021.jpg',
    price: 320,
    rating: 4.7,
    location: 'Istanbul, Sarıyer',
    city: 'sarıyer',
    trips: 110,
    make: 'Renault',
    year: 2021,
    seats: 5,
    type: 'hatchback'
  },
  {
    id: 22,
    name: 'Renault Megane 2022',
    image: '/cars/Renault-Megane-2022.jpeg',
    price: 400,
    rating: 4.76,
    location: 'Izmir',
    city: 'izmir',
    trips: 68,
    make: 'Renault',
    year: 2022,
    seats: 5,
    type: 'hatchback'
  },
  {
    id: 23,
    name: 'Hyundai i20 2025',
    image: '/cars/Hyundai-i20-2025.jpg',
    price: 380,
    rating: 4.95,
    location: 'Istanbul, Şişli',
    city: 'şişli',
    trips: 12,
    make: 'Hyundai',
    year: 2025,
    seats: 5,
    type: 'hatchback',
    isNew: true
  },
  {
    id: 24,
    name: 'Opel Corsa 2025',
    image: '/cars/Opel-Corsa-2025.png',
    price: 360,
    rating: 4.92,
    location: 'Ankara',
    city: 'ankara',
    trips: 9,
    make: 'Opel',
    year: 2025,
    seats: 5,
    type: 'hatchback',
    isNew: true
  },
  {
    id: 25,
    name: 'Ford Focus 2020',
    image: '/cars/Ford-Focus-2020.jpg',
    price: 400,
    rating: 4.6,
    location: 'Izmir',
    city: 'izmir',
    trips: 102,
    make: 'Ford',
    year: 2020,
    seats: 5,
    type: 'hatchback'
  },

  // SUVs
  {
    id: 26,
    name: 'BMW X5 2023',
    image: '/cars/BMW-X5-2023.jpg',
    price: 1400,
    rating: 5.0,
    location: 'Istanbul, Sarıyer',
    city: 'sarıyer',
    trips: 24,
    make: 'BMW',
    year: 2023,
    seats: 7,
    type: 'suv',
    isNew: true
  },
  {
    id: 27,
    name: 'BMW X7 2023',
    image: '/cars/BMW-X7-2023.jpg',
    price: 1800,
    rating: 5.0,
    location: 'Istanbul, Fatih',
    city: 'fatih',
    trips: 19,
    make: 'BMW',
    year: 2023,
    seats: 7,
    type: 'suv',
    isNew: true
  },
  {
    id: 28,
    name: 'Mercedes GLE 2022',
    image: '/cars/Mercedes-GLE-2022.jpg',
    price: 1500,
    rating: 4.97,
    location: 'Ankara',
    city: 'ankara',
    trips: 33,
    make: 'Mercedes',
    year: 2022,
    seats: 7,
    type: 'suv'
  },
  {
    id: 29,
    name: 'Audi Q7 2023',
    image: '/cars/Audi-Q7-2023.jpg',
    price: 1600,
    rating: 5.0,
    location: 'Istanbul, Taksim',
    city: 'taksim',
    trips: 21,
    make: 'Audi',
    year: 2023,
    seats: 7,
    type: 'suv',
    isNew: true
  },
  {
    id: 30,
    name: 'Hyundai Tucson 2023',
    image: '/cars/Hyundai-Tucson-2023.jpg',
    price: 700,
    rating: 4.88,
    location: 'Istanbul, Beşiktaş',
    city: 'beşiktaş',
    trips: 45,
    make: 'Hyundai',
    year: 2023,
    seats: 5,
    type: 'suv',
    isNew: true
  },
  {
    id: 31,
    name: 'Kia Sportage 2022',
    image: '/cars/Kia-Sportage-2022.png',
    price: 650,
    rating: 4.82,
    location: 'Ankara',
    city: 'ankara',
    trips: 63,
    make: 'Kia',
    year: 2022,
    seats: 5,
    type: 'suv'
  },
  {
    id: 32,
    name: 'Peugeot 3008 2022',
    image: '/cars/Peugeot-3008-2022.jpg',
    price: 620,
    rating: 4.85,
    location: 'Izmir',
    city: 'izmir',
    trips: 58,
    make: 'Peugeot',
    year: 2022,
    seats: 5,
    type: 'suv'
  },
  {
    id: 33,
    name: 'Range Rover Sport 2023',
    image: '/cars/Range-Rover-Sport-2023.jpg',
    price: 2200,
    rating: 5.0,
    location: 'Istanbul, Şişli',
    city: 'şişli',
    trips: 16,
    make: 'Land Rover',
    year: 2023,
    seats: 7,
    type: 'suv',
    isNew: true
  },
  {
    id: 34,
    name: 'Jeep Renegade 2020',
    image: '/cars/Jeep-Renegade-2020.png',
    price: 580,
    rating: 4.75,
    location: 'Antalya',
    city: 'antalya',
    trips: 84,
    make: 'Jeep',
    year: 2020,
    seats: 5,
    type: 'suv'
  },
  {
    id: 35,
    name: 'Porsche Cayenne 2023',
    image: '/cars/Porsche-Cayenne-2023.jpg',
    price: 2500,
    rating: 5.0,
    location: 'Istanbul, Beşiktaş',
    city: 'beşiktaş',
    trips: 13,
    make: 'Porsche',
    year: 2023,
    seats: 5,
    type: 'suv',
    isNew: true
  },

  // TRUCKS
  {
    id: 36,
    name: 'Ford Ranger 2025',
    image: '/cars/Ford-Ranger-2025.jpg',
    price: 850,
    rating: 4.9,
    location: 'Ankara',
    city: 'ankara',
    trips: 8,
    make: 'Ford',
    year: 2025,
    seats: 5,
    type: 'truck',
    isNew: true
  },

  // ELECTRIC
  {
    id: 37,
    name: 'Tesla Model 3 2023',
    image: '/cars/Tesla-Model-3-2023.jpg',
    price: 1100,
    rating: 4.98,
    location: 'Istanbul, Fatih',
    city: 'fatih',
    trips: 27,
    make: 'Tesla',
    year: 2023,
    seats: 5,
    type: 'sedan',
    isElectric: true,
    isNew: true
  },

  // MINIVANS
  {
    id: 38,
    name: 'Honda Odyssey 2024',
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=600&fit=crop',
    price: 950,
    rating: 4.92,
    location: 'Istanbul, Beşiktaş',
    city: 'beşiktaş',
    trips: 87,
    make: 'Honda',
    model: 'Odyssey',
    year: 2024,
    seats: 8,
    type: 'minivan',
    category: 'Minivan'
  },
  {
    id: 39,
    name: 'Volkswagen ID. Buzz 2025',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=600&fit=crop',
    price: 1200,
    rating: 4.95,
    location: 'Istanbul, Şişli',
    city: 'şişli',
    trips: 54,
    make: 'Volkswagen',
    model: 'ID. Buzz',
    year: 2025,
    seats: 7,
    type: 'minivan',
    category: 'Minivan',
    isElectric: true,
    isNew: true
  },
  {
    id: 40,
    name: 'Toyota Sienna 2024',
    image: 'https://images.unsplash.com/photo-1629125135232-5e6bbdc8e0e5?w=800&h=600&fit=crop',
    price: 1050,
    rating: 4.88,
    location: 'Ankara, Çankaya',
    city: 'ankara',
    trips: 62,
    make: 'Toyota',
    model: 'Sienna',
    year: 2024,
    seats: 8,
    type: 'minivan',
    category: 'Minivan'
  },
  {
    id: 41,
    name: 'Chrysler Pacifica 2023',
    image: 'https://images.unsplash.com/photo-1562592306-b6e6c8c7b45e?w=800&h=600&fit=crop',
    price: 900,
    rating: 4.85,
    location: 'Izmir, Bornova',
    city: 'izmir',
    trips: 73,
    make: 'Chrysler',
    model: 'Pacifica',
    year: 2023,
    seats: 7,
    type: 'minivan',
    category: 'Minivan'
  },
  {
    id: 42,
    name: 'Mercedes-Benz V-Class 2024',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop',
    price: 1450,
    rating: 4.96,
    location: 'Istanbul, Beşiktaş',
    city: 'beşiktaş',
    trips: 41,
    make: 'Mercedes-Benz',
    model: 'V-Class',
    year: 2024,
    seats: 8,
    type: 'minivan',
    category: 'Luxury Minivan'
  },
  {
    id: 43,
    name: 'Kia Carnival 2024',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop',
    price: 850,
    rating: 4.90,
    location: 'Antalya, Muratpaşa',
    city: 'antalya',
    trips: 68,
    make: 'Kia',
    model: 'Carnival',
    year: 2024,
    seats: 8,
    type: 'minivan',
    category: 'Minivan'
  }
]

// Airport car listings - using cars from allCars
export const airportCars = [
  {
    id: 'ist',
    slug: 'istanbul-havalimani',
    nameKey: 'airports.istanbul',
    code: 'IST',
    cars: [
      {
        ...allCars.find(car => car.id === 33), // Range Rover Sport 2023
        id: 101,
        originalPrice: 2300,
        savings: 100,
        locationKey: 'airports.istanbul'
      },
      {
        ...allCars.find(car => car.id === 18), // VW Passat 2022
        id: 102,
        originalPrice: 590,
        savings: 30,
        locationKey: 'airports.istanbul'
      },
      {
        ...allCars.find(car => car.id === 6), // BMW 5 Series 2023
        id: 103,
        originalPrice: 1200,
        savings: 100,
        locationKey: 'airports.istanbul'
      },
      {
        ...allCars.find(car => car.id === 10), // Mercedes E-Class 2023
        id: 104,
        originalPrice: 1550,
        savings: 100,
        locationKey: 'airports.istanbul'
      },
    ]
  },
  {
    id: 'saw',
    slug: 'sabiha-gokcen',
    nameKey: 'airports.sabihaGokcen',
    code: 'SAW',
    cars: [
      {
        ...allCars.find(car => car.id === 1), // Toyota Corolla 2021
        id: 105,
        originalPrice: 480,
        savings: 30,
        locationKey: 'airports.sabihaGokcen'
      },
      {
        ...allCars.find(car => car.id === 22), // Renault Megane 2022
        id: 106,
        originalPrice: 430,
        savings: 30,
        locationKey: 'airports.sabihaGokcen'
      },
      {
        ...allCars.find(car => car.id === 12), // Audi A3 2022
        id: 107,
        originalPrice: 770,
        savings: 50,
        locationKey: 'airports.sabihaGokcen'
      },
      {
        ...allCars.find(car => car.id === 14), // Honda Civic 2023
        id: 108,
        originalPrice: 650,
        savings: 50,
        locationKey: 'airports.sabihaGokcen'
      },
    ]
  },
  {
    id: 'esb',
    slug: 'ankara-esenboga',
    nameKey: 'airports.ankaraEsenboga',
    code: 'ESB',
    cars: [
      {
        ...allCars.find(car => car.id === 20), // VW Golf 2021
        id: 109,
        originalPrice: 450,
        savings: 30,
        locationKey: 'airports.ankaraEsenboga'
      },
      {
        ...allCars.find(car => car.id === 25), // Ford Focus 2020
        id: 110,
        originalPrice: 430,
        savings: 30,
        locationKey: 'airports.ankaraEsenboga'
      },
      {
        ...allCars.find(car => car.id === 3), // BMW 3 Series 2022
        id: 111,
        originalPrice: 900,
        savings: 50,
        locationKey: 'airports.ankaraEsenboga'
      },
      {
        ...allCars.find(car => car.id === 30), // Hyundai Tucson 2023
        id: 112,
        originalPrice: 750,
        savings: 50,
        locationKey: 'airports.ankaraEsenboga'
      },
    ]
  },
  {
    id: 'adb',
    slug: 'izmir-adnan-menderes',
    nameKey: 'airports.izmirAdnanMenderes',
    code: 'ADB',
    cars: [
      {
        ...allCars.find(car => car.id === 32), // Peugeot 3008 2022
        id: 113,
        originalPrice: 670,
        savings: 50,
        locationKey: 'airports.izmirAdnanMenderes'
      },
      {
        ...allCars.find(car => car.id === 7), // Mercedes C-Class 2021
        id: 114,
        originalPrice: 1000,
        savings: 100,
        locationKey: 'airports.izmirAdnanMenderes'
      },
      {
        ...allCars.find(car => car.id === 16), // Opel Insignia 2021
        id: 115,
        originalPrice: 520,
        savings: 40,
        locationKey: 'airports.izmirAdnanMenderes'
      },
      {
        ...allCars.find(car => car.id === 12), // Audi A3 2022
        id: 116,
        originalPrice: 770,
        savings: 50,
        locationKey: 'airports.izmirAdnanMenderes'
      },
    ]
  },
]

// Nearby cars - using cars from allCars with distance info
export const nearbyCars = [
  { ...allCars.find(car => car.id === 37), id: 201, distance: '0.5 km' }, // Tesla Model 3 - uses Fatih from allCars
  { ...allCars.find(car => car.id === 5), id: 202, distance: '1.2 km' }, // BMW 5 Series 2022 - uses Beşiktaş from allCars
  { ...allCars.find(car => car.id === 10), id: 203, distance: '1.8 km' }, // Mercedes E-Class 2023 - uses Beşiktaş from allCars
  { ...allCars.find(car => car.id === 18), id: 205, distance: '2.5 km' }, // VW Passat 2022 - uses Şişli from allCars
  { ...allCars.find(car => car.id === 1), id: 206, distance: '3.0 km' }, // Toyota Corolla 2021 - uses Sarıyer from allCars
  { ...allCars.find(car => car.id === 14), id: 207, distance: '3.4 km' }, // Honda Civic 2023 - uses Taksim from allCars
  { ...allCars.find(car => car.id === 23), id: 208, distance: '3.8 km' }, // Hyundai i20 2025 - uses Şişli from allCars
  { ...allCars.find(car => car.id === 21), id: 211, distance: '4.9 km' }, // Renault Clio 2021 - uses Sarıyer from allCars
]

// Delivered cars by city - using cars from allCars
export const deliveryCities = [
  {
    id: 'istanbul',
    nameKey: 'cities.istanbul',
    cars: [
      {
        ...allCars.find(car => car.id === 2), // Toyota Corolla 2025
        id: 301,
        originalPrice: 550,
        savings: 30,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 19), // VW Golf 2020
        id: 302,
        originalPrice: 410,
        savings: 30,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 37), // Tesla Model 3 2023
        id: 303,
        originalPrice: 1150,
        savings: 50,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 26), // BMW X5 2023
        id: 304,
        originalPrice: 1500,
        savings: 100,
        deliveryAvailable: true
      },
    ]
  },
  {
    id: 'ankara',
    nameKey: 'cities.ankara',
    cars: [
      {
        ...allCars.find(car => car.id === 17), // VW Passat 2021
        id: 305,
        originalPrice: 550,
        savings: 30,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 3), // BMW 3 Series 2022
        id: 306,
        originalPrice: 900,
        savings: 50,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 13), // Honda Civic 2022
        id: 307,
        originalPrice: 580,
        savings: 30,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 31), // Kia Sportage 2022
        id: 308,
        originalPrice: 700,
        savings: 50,
        deliveryAvailable: true
      },
    ]
  },
  {
    id: 'izmir',
    nameKey: 'cities.izmir',
    cars: [
      {
        ...allCars.find(car => car.id === 7), // Mercedes C-Class 2021
        id: 309,
        originalPrice: 950,
        savings: 50,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 32), // Peugeot 3008 2022
        id: 310,
        originalPrice: 670,
        savings: 50,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 22), // Renault Megane 2022
        id: 311,
        originalPrice: 430,
        savings: 30,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 12), // Audi A3 2022
        id: 312,
        originalPrice: 770,
        savings: 50,
        deliveryAvailable: true
      },
    ]
  },
  {
    id: 'antalya',
    nameKey: 'cities.antalya',
    cars: [
      {
        ...allCars.find(car => car.id === 34), // Jeep Renegade 2020
        id: 313,
        originalPrice: 620,
        savings: 40,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 15), // Mazda 6 2022
        id: 314,
        originalPrice: 620,
        savings: 40,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 16), // Opel Insignia 2021
        id: 315,
        originalPrice: 520,
        savings: 40,
        deliveryAvailable: true
      },
      {
        ...allCars.find(car => car.id === 30), // Hyundai Tucson 2023
        id: 316,
        originalPrice: 750,
        savings: 50,
        deliveryAvailable: true
      },
    ]
  },
]

// Monthly rental categories - using cars from allCars
export const monthlyCategories = [
  {
    id: 'suv',
    titleKey: 'monthlyRentals.istanbulSuv',
    cars: [
      {
        ...allCars.find(car => car.id === 26), // BMW X5 2023
        id: 401,
        monthlyPrice: 36000,
        dailyEquivalent: 1200,
        savings: 6000
      },
      {
        ...allCars.find(car => car.id === 28), // Mercedes GLE 2022
        id: 402,
        monthlyPrice: 39000,
        dailyEquivalent: 1300,
        savings: 6000
      },
      {
        ...allCars.find(car => car.id === 29), // Audi Q7 2023
        id: 403,
        monthlyPrice: 42000,
        dailyEquivalent: 1400,
        savings: 6000
      },
      {
        ...allCars.find(car => car.id === 33), // Range Rover Sport 2023
        id: 404,
        monthlyPrice: 57000,
        dailyEquivalent: 1900,
        savings: 9000
      }
    ]
  },
  {
    id: 'sedan',
    titleKey: 'monthlyRentals.ankaraSedan',
    cars: [
      {
        ...allCars.find(car => car.id === 6), // BMW 5 Series 2023
        id: 405,
        monthlyPrice: 28500,
        dailyEquivalent: 950,
        savings: 4500
      },
      {
        ...allCars.find(car => car.id === 9), // Mercedes E-Class 2022
        id: 406,
        monthlyPrice: 35100,
        dailyEquivalent: 1170,
        savings: 5400
      },
      {
        ...allCars.find(car => car.id === 12), // Audi A3 2022
        id: 407,
        monthlyPrice: 18600,
        dailyEquivalent: 620,
        savings: 3000
      },
      {
        ...allCars.find(car => car.id === 37), // Tesla Model 3 2023
        id: 408,
        monthlyPrice: 28500,
        dailyEquivalent: 950,
        savings: 4500
      }
    ]
  },
  {
    id: 'luxury',
    titleKey: 'monthlyRentals.izmirLuxury',
    cars: [
      {
        ...allCars.find(car => car.id === 35), // Porsche Cayenne 2023
        id: 409,
        monthlyPrice: 65000,
        dailyEquivalent: 2167,
        savings: 10000
      },
      {
        ...allCars.find(car => car.id === 27), // BMW X7 2023
        id: 410,
        monthlyPrice: 46800,
        dailyEquivalent: 1560,
        savings: 7200
      },
      {
        ...allCars.find(car => car.id === 11), // Mercedes S-Class 2023
        id: 411,
        monthlyPrice: 49400,
        dailyEquivalent: 1647,
        savings: 7600
      },
      {
        ...allCars.find(car => car.id === 33), // Range Rover Sport 2023
        id: 412,
        monthlyPrice: 57000,
        dailyEquivalent: 1900,
        savings: 9000
      }
    ]
  }
]

// Helper function to get car details with all required fields for detail page
export function getCarDetails(carId) {
  const car = allCars.find(c => c.id === parseInt(carId))
  if (!car) return null

  // Return car with enriched data
  return {
    ...car,
    images: car.images || [
      car.image,
      car.image,
      car.image,
      car.image,
      car.image,
      car.image,
    ],
    originalPrice: car.originalPrice || Math.floor(car.price * 1.1),
    savings: car.savings || Math.floor(car.price * 0.1),
    category: car.category || (car.type.charAt(0).toUpperCase() + car.type.slice(1)),
    location: car.location || `${car.city.charAt(0).toUpperCase() + car.city.slice(1)}, Merkez`,
    city: car.city,
    specs: car.specs || {
      seats: car.seats || 5,
      gas: car.isElectric ? 'Elektrik' : 'Benzin',
      mpg: car.isElectric ? 0 : 32,
      transmission: 'Otomatik'
    },
    features: car.features || {
      safety: ['Geri görüş kamerası', 'Fren asistanı', 'ABS', 'Airbag'],
      connectivity: ['AUX girişi', 'Bluetooth', 'USB şarj', 'USB girişi'],
      convenience: ['Kiralama ofisini atla', 'Ücretsiz ek sürücü ekle', '30 dakika teslimat toleransı'],
      peaceOfMind: ['Teslimattan önce yıkama gerekmez', 'Temel yol yardımı', '7/24 müşteri desteği']
    },
    distance: car.distance || 600,
    distanceFee: car.distanceFee || 5,
    host: car.host || {
      name: 'Ahmet Yılmaz',
      trips: 294,
      joinedDate: 'Ara 2024',
      rating: 4.9,
      isAllStar: true,
    },
    reviews: car.reviews || [
      { name: 'Mehmet K.', date: '9 Kasım 2025', rating: 5, text: 'Harika araba, harika ev sahibi. Tekrar kullanacağım.' },
      { name: 'Ayşe Y.', date: '6 Kasım 2025', rating: 5, text: 'Mükemmel deneyim! Araç temiz, güvenilir ve sorunsuzdu.' },
      { name: 'Can D.', date: '26 Ekim 2025', rating: 5, text: 'Temiz araç. Harika müşteri deneyimi ve destek.' }
    ],
    ratings: car.ratings || {
      cleanliness: car.rating || 5.0,
      maintenance: car.rating || 5.0,
      communication: car.rating || 5.0,
      convenience: car.rating || 5.0,
      accuracy: car.rating || 5.0
    }
  }
}
