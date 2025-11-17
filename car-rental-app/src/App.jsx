import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BecomeHost from './pages/BecomeHost'
import WhyChoose from './pages/WhyChoose'
import ContactSupport from './pages/ContactSupport'
import Legal from './pages/Legal'
import Insurance from './pages/Insurance'
import HostTools from './pages/HostTools'
import Calculator from './pages/Calculator'
import ListCar from './pages/ListCar'
import AirportDetail from './pages/AirportDetail'
import CarDetail from './pages/CarDetail'
import SearchResults from './pages/SearchResults'

function AppContent() {
  const location = useLocation()
  const isCarDetailPage = location.pathname.startsWith('/car/')
  const isSearchResultsPage = location.pathname.startsWith('/search')

  if (isCarDetailPage) {
    // Car detail page with its own layout
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="w-full bg-white flex flex-col min-h-screen">
          <main className="flex-1">
            <Routes>
              <Route path="/car/:id" element={<CarDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    )
  }

  if (isSearchResultsPage) {
    // Search results page with wider layout
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="w-full bg-white flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
        </div>
      </div>
    )
  }

  // Other pages with standard layout
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-[1280px] mx-auto w-full bg-white shadow-sm flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/become-host" element={<BecomeHost />} />
            <Route path="/why-choose" element={<WhyChoose />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/host-tools" element={<HostTools />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/list-car" element={<ListCar />} />
            <Route path="/airport/:airportId" element={<AirportDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
