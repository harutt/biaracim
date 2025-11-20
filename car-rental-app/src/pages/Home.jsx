import { useState } from 'react'
import Hero from '../components/Hero'
import FilterTabs from '../components/FilterTabs'
import CarListings from '../components/CarListings'
import AirportCarListings from '../components/AirportCarListings'
import DeliveredCarListings from '../components/DeliveredCarListings'
import MonthlyRentals from '../components/MonthlyRentals'
import NearbyCarListings from '../components/NearbyCarListings'
import CategorySections from '../components/CategorySections'
import RecentSearches from '../components/RecentSearches'
import CitiesSection from '../components/CitiesSection'

function Home() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchParams, setSearchParams] = useState(null)

  const handleSearch = (searchData) => {
    setSearchParams(searchData)
    // Auto-scroll to results
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    })
  }

  const renderContent = () => {
    switch (activeFilter) {
      case 'airports':
        return <AirportCarListings searchParams={searchParams} />
      case 'monthly':
        return <MonthlyRentals />
      case 'nearby':
        return <NearbyCarListings searchParams={searchParams} />
      case 'delivered':
        return <DeliveredCarListings searchParams={searchParams} />
      case 'cities':
        return <CitiesSection />
      default:
        return (
          <>
            <RecentSearches />
            <CategorySections />
            <CarListings searchParams={searchParams} />
          </>
        )
    }
  }

  return (
    <>
      <Hero onSearch={handleSearch} />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      {renderContent()}
    </>
  )
}

export default Home
