import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './Layouts/Layout'
import ContactUsPage from './pages/ContactUsPage'
import GameContainer from './components/GameContainer'
import './styles/gameAnimations.css'

function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      {!isHome && <GameContainer />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
