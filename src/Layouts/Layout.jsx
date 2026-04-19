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
      {!useHomeChrome && (
        <>
          <Example />
          <div
            aria-hidden
            className="fixed bottom-1 right-2 text-[9px] md:text-[10px] text-gray-500 opacity-20 select-none pointer-events-none tracking-tight"
            style={{ zIndex: 5 }}
          >
            Spot it fast.Two clicks. One secret.
          </div>
        </>
      )}
      <Outlet />
      <WhatsAppFloatButton />
      {!useHomeChrome && <Footer />}
    </div>
  )
}

export default Layout
