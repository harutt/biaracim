function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Tümü', icon: '🚗' },
    { id: 'airports', label: 'Havaalanları', icon: '✈️' },
    { id: 'nearby', label: 'Yakınımda', icon: '📍' },
    { id: 'delivered', label: 'Teslimat', icon: '🚚' },
    { id: 'cities', label: 'Şehirler', icon: '🏙️' },
  ]

  return (
    <div className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <span className="mr-2">{filter.icon}</span> {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterTabs
