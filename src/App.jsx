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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/regions" element={<RegionsPage />} />
          <Route path="/regions/:id" element={<RegionDetailPage />} />
          <Route path="/region/:id" element={<RegionDetailPage />} /> {/* Keep for backward compatibility */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
      <CallButton />
      <PeriodicPhonePrompt />
    </div>
  )
}

export default App