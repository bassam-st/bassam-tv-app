import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Watch from './pages/Watch'
import League from './pages/League'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:matchId" element={<Watch />} />
          <Route path="/league/:leagueId" element={<League />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
