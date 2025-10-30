import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white flex flex-col">
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
      </AuthProvider>
    </Router>
  )
}

export default App
