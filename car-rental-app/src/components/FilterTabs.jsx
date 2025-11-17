import { useTranslation } from 'react-i18next'

function FilterTabs({ activeFilter, onFilterChange }) {
  const { t } = useTranslation()

  const FilterIcon = ({ type, isActive }) => {
    const strokeClass = `w-4 h-4 ${isActive ? 'text-white' : 'text-black'}`
    const fillClass = `w-4 h-4 ${isActive ? 'fill-white' : 'fill-black'}`
    const icons = {
      car: <svg className={strokeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
      plane: <svg className={fillClass} viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>,
      calendar: <svg className={strokeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      pin: <svg className={strokeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      truck: <svg className={strokeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
      building: <svg className={strokeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    }
    return icons[type] || null
  }

  const filters = [
    { id: 'all', iconType: 'car' },
    { id: 'airports', iconType: 'plane' },
    { id: 'monthly', iconType: 'calendar' },
    { id: 'nearby', iconType: 'pin' },
    { id: 'delivered', iconType: 'truck' },
    { id: 'cities', iconType: 'building' },
  ]

  return (
    <div className="border-b border-gray-200">
      <div className="container py-4">
        <div className="flex justify-center gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={activeFilter === filter.id ? 'btn-filter-active' : 'btn-filter-inactive'}
            >
              <FilterIcon type={filter.iconType} isActive={activeFilter === filter.id} />
              {t(`filters.${filter.id}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterTabs
