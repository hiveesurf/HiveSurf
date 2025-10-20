import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogoClickTracker from "../hooks/useLogoClickTracker";

const Drip = ({ left, height, delay }) => {
  return (
    <motion.div 
      className="absolute top-[99%] origin-top" 
      style={{ left }} 
      initial={{ scaleY: 0.75 }} 
      animate={{ scaleY: [0.75, 1, 0.75] }} 
      transition={{ 
        duration: 2, 
        times: [0, 0.25, 1], 
        delay, 
        ease: "easeIn", 
        repeat: Infinity, 
        repeatDelay: 2, 
      }} 
    > 
      <div 
        style={{ height }} 
        className="w-3 rounded-b-full bg-white transition-colors" 
      /> 
      <svg 
        width="8" 
        height="8" 
        viewBox="0 0 8 8" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute left-full top-0" 
      > 
        <g clipPath="url(#clip0_1077_28)"> 
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M7.2 0H0V7.2C0 3.22353 3.22353 0 7.2 0Z" 
            className="fill-white transition-colors" 
          /> 
        </g> 
        <defs> 
          <clipPath id="clip0_1077_28"> 
            <rect width="8" height="8" fill="white" /> 
          </clipPath> 
        </defs> 
      </svg> 
      <svg 
        width="8" 
        height="8" 
        viewBox="0 0 8 8" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute right-full top-0 rotate-90" 
      > 
        <g clipPath="url(#clip0_1077_28)"> 
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M7.2 0H0V7.2C0 3.22353 3.22353 0 7.2 0Z" 
            className="fill-white transition-colors" 
          /> 
        </g> 
        <defs> 
          <clipPath id="clip0_1077_28"> 
            <rect width="8" height="8" fill="white" /> 
          </clipPath> 
        </defs> 
      </svg> 
      <motion.div 
        initial={{ y: -8, opacity: 1 }} 
        animate={{ y: [-8, 50], opacity: [1, 0] }} 
        transition={{ 
          duration: 2, 
          times: [0, 1], 
          delay, 
          ease: "easeIn", 
          repeat: Infinity, 
          repeatDelay: 2, 
        }} 
        className="absolute top-full h-3 w-3 rounded-full bg-white transition-colors" 
      /> 
    </motion.div>
  );
};

export const Example = () => {
  return <SimpleFloatingNav />;
};

const SimpleFloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isContactPage = location.pathname === '/contact';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    if (isContactPage) {
      // If on contact page, navigate to home page first
      navigate('/');
      // Then scroll to section after a short delay to allow page to load
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    if (isContactPage) {
      navigate('/');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed left-[50%] top-8 z-[9999] w-fit -translate-x-[50%] text-sm text-[var(--primary)]">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 rounded-lg border-[1px] border-neutral-700 bg-neutral-100 p-3 mb-10 relative" style={{ overflow: 'visible' }}>
        <div onClick={scrollToTop} className="cursor-pointer">
          <Logo />
        </div>
        <ScrollNavLink onClick={scrollToTop}>Home</ScrollNavLink>
        <ScrollNavLink onClick={() => scrollToSection('our-services')}>Services</ScrollNavLink>
        <ScrollNavLink onClick={() => scrollToSection('meet-our-team')}>Team</ScrollNavLink>
        <ScrollNavLink onClick={() => scrollToSection('testimonials')}>Reviews</ScrollNavLink>
        <JoinButton to="/contact" />
        
        {/* Paint Drips for entire navigation section */}
        <Drip left="8%" height={40} delay={0.5} />
        <Drip left="22%" height={25} delay={1.2} />
        <Drip left="38%" height={35} delay={0.8} />
        <Drip left="52%" height={20} delay={1.8} />
        <Drip left="68%" height={30} delay={1.5} />
        <Drip left="82%" height={38} delay={2.1} />
        <Drip left="95%" height={22} delay={0.3} />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between bg-neutral-100 rounded-lg border-[1px] border-neutral-700 p-3 w-[90vw] max-w-[400px] relative" style={{ overflow: 'visible' }}>
        <div onClick={scrollToTop} className="cursor-pointer">
          <Logo />
        </div>
        
        {/* Mobile Paint Drips */}
        <Drip left="15%" height={28} delay={0.3} />
        <Drip left="45%" height={22} delay={1.0} />
        <Drip left="75%" height={25} delay={1.7} />
        
        <button
          onClick={toggleMenu}
          className="z-[10000] p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative">
            <span
              className={`absolute h-0.5 w-full bg-[var(--primary)] transition-all duration-300 ${
                isOpen ? "rotate-45 top-2.5" : "top-0"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-full bg-[var(--primary)] top-2 transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-full bg-[var(--primary)] transition-all duration-300 ${
                isOpen ? "-rotate-45 top-2.5" : "top-4"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden absolute top-16 left-[50%] -translate-x-[50%] w-[90vw] max-w-[400px] bg-neutral-100 border-[1px] border-neutral-700 rounded-lg overflow-hidden"
      >
        <div className="flex flex-col p-4 gap-5">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <ScrollNavLink onClick={() => scrollToSection('our-services')}>
            Services
          </ScrollNavLink>
          <ScrollNavLink onClick={() => scrollToSection('meet-our-team')}>
            Team
          </ScrollNavLink>
          <ScrollNavLink onClick={() => scrollToSection('testimonials')}>
            Reviews
          </ScrollNavLink>
          <JoinButton to="/contact" onClick={() => setIsOpen(false)} />
        </div>
      </motion.div>
    </nav>
  );
};

const Logo = () => {
  const { handleClick, getAnimationProps } = useLogoClickTracker();

  return (
    <motion.div
      className="flex items-center gap-2 cursor-pointer relative"
      onClick={handleClick}
      {...getAnimationProps()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src="/logo.svg"
        alt="Logo"
        width={40}
        height={32}
        className="object-contain"
      />
      <p className="text-xl font-bold text-[var(--primary)]">HiveSurf</p>
      
      {/* Click progress visuals removed as requested */}
    </motion.div>
  );
};

const NavLink = ({ children, to, onClick }) => {
  return (
    <Link to={to} className="block overflow-hidden" onClick={onClick}>
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[24px]"
      >
        <span className="flex h-[24px] items-center">{children}</span>
        <span className="flex h-[24px] items-center text-[#090909]">
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

const ScrollNavLink = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="block overflow-hidden cursor-pointer">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[24px]"
      >
        <span className="flex h-[24px] items-center">{children}</span>
        <span className="flex h-[24px] items-center text-[#090909]">
          {children}
        </span>
      </motion.div>
    </button>
  );
};

const JoinButton = ({ to, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border-[1px] 
        border-neutral-700 px-4 py-1.5 font-medium
        text-[var(--primary)] transition-all duration-300
        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-neutral-50
        before:transition-transform before:duration-1000
        before:content-[""]
        hover:scale-105 hover:border-neutral-50 hover:text-[var(--accent)]
        hover:before:translate-y-[0%]
        active:scale-100
      `}
    >
      Contact Us
    </Link>
  );
};