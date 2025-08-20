import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import CodPage from './components/CodPage'
import HomePage from './components/HomePage'
import WelcomePage from './components/WelcomePage'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'

function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cod/:code" element={<CodPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  )
}

export default App
