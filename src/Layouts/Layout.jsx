import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import WhatsAppFloatButton from '../components/WhatsAppFloatButton'
import { Example } from '../components/SimpleFloatingNav'

function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isContact = pathname === '/contact'
  const isMarketing = pathname.startsWith('/marketing')
  const useHomeChrome = isHome || isContact || isMarketing

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
