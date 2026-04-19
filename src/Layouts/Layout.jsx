import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import WhatsAppFloatButton from '../components/WhatsAppFloatButton'
import { Example } from '../components/SimpleFloatingNav'

function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isContact = pathname === '/contact'
  const useHomeChrome = isHome || isContact

  return (
    <div>
      {!useHomeChrome && <Example />}
      <Outlet />
      <WhatsAppFloatButton />
      {!useHomeChrome && <Footer />}
    </div>
  )
}

export default Layout
