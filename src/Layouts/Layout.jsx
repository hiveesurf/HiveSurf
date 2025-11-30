import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import WhatsAppFloatButton from '../components/WhatsAppFloatButton';
import { Example } from '../components/SimpleFloatingNav';

function Layout() {
  return (
    <div>
        <Example/>
        {/* Subtle Easter egg hint (hard to notice) */}
        <div
          aria-hidden
          className="fixed bottom-1 right-2 text-[9px] md:text-[10px] text-gray-500 opacity-20 select-none pointer-events-none tracking-tight"
          style={{ zIndex: 5 }}
        >
          Spot it fast.Two clicks. One secret.
        </div>
        <WhatsAppFloatButton/>
        {/* Render the nested routes for the User role */}
        <Outlet />
       <Footer/>
      </div>
  );
}

export default Layout;
