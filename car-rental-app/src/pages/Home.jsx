import { useState } from 'react'
import Hero from '../components/Hero'
import FilterTabs from '../components/FilterTabs'
import CarListings from '../components/CarListings'
import AirportCarListings from '../components/AirportCarListings'
import DeliveredCarListings from '../components/DeliveredCarListings'

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
      case 'delivered':
        return <DeliveredCarListings searchParams={searchParams} />
      default:
        return <CarListings searchParams={searchParams} />
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
