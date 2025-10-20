import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './Layouts/Layout'
import ContactUsPage from './pages/ContactUsPage'
import CustomCursor from './components/CustomCursor'
import GameContainer from './components/GameContainer'
import './styles/gameAnimations.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomCursor />
      <GameContainer />
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
