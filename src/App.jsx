import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { OnboardingProvider } from './context/OnboardingContext'
import Onboarding from './pages/Onboarding'
import CoverLetterReview from './pages/CoverLetterReview'
import Done from './pages/Done'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding/1" replace />} />
          <Route path="/onboarding/:step" element={<Onboarding />} />
          <Route path="/cover-letter" element={<CoverLetterReview />} />
          <Route path="/done" element={<Done />} />
          <Route path="/dashboard/:clientId" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </OnboardingProvider>
    </BrowserRouter>
  )
}
