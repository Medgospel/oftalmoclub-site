import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import CodPage from './components/CodPage'
import HomePage from './components/HomePage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cod/:code" element={<CodPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
