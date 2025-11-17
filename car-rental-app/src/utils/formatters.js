// Format price with currency symbol
export const formatPrice = (price) => {
  return `₺${price.toLocaleString('tr-TR')}`
}

// Format price for display with "/day" suffix
export const formatDailyPrice = (price, suffix = '/gün') => {
  return `${formatPrice(price)}${suffix}`
}

// Format monthly price
export const formatMonthlyPrice = (price) => {
  return formatPrice(price)
}
