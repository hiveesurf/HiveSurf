import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";

const FlipNavWrapper = () => {
  return (
    <div className="bg-blue-50 relative overflow-hidden">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-blue-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-200 rounded-full blur-2xl"></div>
        {/* Large abstract letter-like shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-32 bg-gray-300 rounded-lg blur-2xl opacity-20 transform rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-24 bg-gray-400 rounded-lg blur-3xl opacity-15 transform -rotate-12"></div>
      </div>
      
      <FlipNav />
       <div className="h-1 bg-gradient-to-r from-[var(--primary)] via-to-[var(--accent)]" />
    </div>
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => setIsOpen(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsOpen(false);
  };

  return (
    <nav className="p-6 bg-white border border-gray-300 rounded-lg mx-4 mt-4 flex items-center justify-between relative z-50 shadow-sm w-full">
      <div className="flex items-center gap-4 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="block lg:hidden text-2xl text-gray-950"
          onClick={() => setIsOpen((pv) => !pv)}
        >
          <FiMenu />
        </motion.button>
        <div onClick={scrollToTop} className="cursor-pointer">
          <Logo />
        </div>
      </div>

      {/* Desktop NavLinks (right side) */}
      <div className="hidden lg:flex items-center gap-12 ml-12">
        <ScrollNavLink text="Home" onClick={scrollToTop} />
        <ScrollNavLink text="Services" onClick={() => scrollToSection('our-services')} />
        <ScrollNavLink text="Team" onClick={() => scrollToSection('meet-our-team')} />
        <ScrollNavLink text="Reviews" onClick={() => scrollToSection('testimonials')} />
        <ContactButton />
      </div>

      {/* Mobile NavMenu */}
      <NavMenu isOpen={isOpen} handleLinkClick={handleLinkClick} scrollToSection={scrollToSection} scrollToTop={scrollToTop} />
    </nav>
  );
};


const Logo = () => {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="flex items-center gap-1">
        <img
          src="logo.svg"
          alt="Logo"
          width={28}
          height={20}
          className="object-contain"
        />
        <div className="flex flex-col">
          <span className="text-xs text-blue-400 font-medium">hivesurf</span>
          <span className="text-xs text-blue-300">THINK. BUILD. GROW.</span>
        </div>
      </div>
      <h1 className="text-lg font-bold text-blue-900">HiveSurf</h1>
    </div>
  );
};


const NavLink = ({ text, href }) => {
  return (
    <a
      href={href}
      className="hidden lg:block h-[30px] overflow-hidden font-medium whitespace-nowrap"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-[var(--primary)]">
          {text}
        </span>
      </motion.div>
    </a>
  );
};

const ScrollNavLink = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hidden lg:block h-[30px] overflow-hidden font-medium cursor-pointer whitespace-nowrap"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-[var(--primary)]">
          {text}
        </span>
      </motion.div>
    </button>
  );
};

const ContactButton = () => {
  return (
    <motion.a
      href="/contact"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="hidden lg:block px-4 py-2 bg-white border border-gray-300 rounded-lg text-blue-900 font-medium hover:bg-gray-50 transition-colors"
    >
      Contact Us
    </motion.a>
  );
};

const NavMenu = ({ isOpen, handleLinkClick, scrollToSection, scrollToTop }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4 bg-white z-40"
    >
      <ScrollMenuLink text="Home" onClick={scrollToTop} handleClick={handleLinkClick} />
      <ScrollMenuLink text="Our Services" onClick={() => scrollToSection('our-services')} handleClick={handleLinkClick} />
      <ScrollMenuLink text="Meet Our Team" onClick={() => scrollToSection('meet-our-team')} handleClick={handleLinkClick} />
      <ScrollMenuLink text="Testimonials" onClick={() => scrollToSection('testimonials')} handleClick={handleLinkClick} />
      <MenuLink text="Contact Us" href="/contact" handleClick={handleLinkClick} />
    </motion.div>
  );
};

const MenuLink = ({ text, href, handleClick }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      href={href}
      onClick={handleClick}
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-[var(--primary)]">
          {text}
        </span>
      </motion.div>
    </motion.a>
  );
};

const ScrollMenuLink = ({ text, onClick, handleClick }) => {
  return (
    <motion.button
      variants={menuLinkVariants}
      onClick={() => {
        onClick();
        handleClick();
      }}
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2 cursor-pointer"
    >
      <motion.span variants={menuLinkArrowVariants}>
        <FiArrowRight className="h-[30px] text-gray-950" />
      </motion.span>
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-[var(--primary)]">
          {text}
        </span>
      </motion.div>
    </motion.button>
  );
};

export default FlipNavWrapper;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};