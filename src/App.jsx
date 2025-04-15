import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import RegionDetailPage from './pages/RegionDetailPage'
import RegionsPage from './pages/RegionsPage'
import AdminPage from './pages/AdminPage'
import Header from './components/Header'
import Footer from './components/Footer'
import CallButton from './components/CallButton'
import PeriodicPhonePrompt from './components/PeriodicPhonePrompt'

function App() {
  const [hasSubmittedPhoneNumber, setHasSubmittedPhoneNumber] = useState(false);
  
  // Check if user has already submitted a phone number
  useEffect(() => {
    const checkPhoneSubmission = () => {
      const hasSubmitted = localStorage.getItem('oneroot_phone_submitted') === 'true';
      setHasSubmittedPhoneNumber(hasSubmitted);
    };
    
    // Check on initial load
    checkPhoneSubmission();
    
    // Set up event listeners to detect changes
    const handleStorageChange = () => checkPhoneSubmission();
    const handlePhoneSubmitted = () => setHasSubmittedPhoneNumber(true);
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('phoneNumberSubmitted', handlePhoneSubmitted);
    
    // Check periodically
    const intervalCheck = setInterval(checkPhoneSubmission, 5000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('phoneNumberSubmitted', handlePhoneSubmitted);
      clearInterval(intervalCheck);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<RegionsPage />} />
          <Route path="/regions" element={<RegionsPage />} />
          <Route path="/regions/:id" element={<RegionDetailPage />} />
          <Route path="/region/:id" element={<RegionDetailPage />} /> {/* Keep for backward compatibility */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
      <CallButton />
      {!hasSubmittedPhoneNumber && <PeriodicPhonePrompt />}
    </div>
  )
}

export default App