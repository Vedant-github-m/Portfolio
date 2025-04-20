'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const navLinks = [
  {
    id: 'home',
    title: 'Home',
  },
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check if we're at the top of the page
      if (scrollTop < 100) {
        setActive('Home');
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Map the section IDs to the correct titles
            const titleMap: { [key: string]: string } = {
              'home': 'Home',
              'about': 'About',
              'work': 'Work',
              'contact': 'Contact'
            };
            if (titleMap[id]) {
              setActive(titleMap[id]);
            }
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-100px 0px'
      }
    );

    // Observe all sections
    const sections = ['about', 'work', 'contact'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    // Initial check
    handleResize();
    handleScroll(); // Initial scroll check

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleHomeClick = () => {
    setIsScrolling(true);
    setActive('Home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <nav style={{ 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '15px 0', 
      position: 'fixed', 
      top: 0, 
      zIndex: 20, 
      backgroundColor: scrolled ? 'rgba(5, 8, 22, 0.9)' : '#050816',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: isScrolling ? 'none' : 'all 0.3s ease-in-out'
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <Image src="/images/logo.svg" alt="logo" width={36} height={36} style={{ objectFit: 'contain' }} />
          <p style={{ 
            color: 'white', 
            fontSize: '18px', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            display: 'flex' 
          }}>
            Vedant's<span style={{ color: '#915eff' }}>Portfolio</span> <span style={{ display: 'none' }}>&nbsp;| Creative Studio</span>
          </p>
        </Link>
        
        {/* Desktop Navigation */}
        <ul style={{ 
          listStyle: 'none', 
          display: 'flex', 
          flexDirection: 'row', 
          gap: '40px',
          marginLeft: 'auto'
        }}>
          {navLinks.map((link) => (
            <li
              key={link.id}
              style={{
                color: active === link.title ? 'white' : '#aaa6c3',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                position: 'relative',
                padding: '4px 0'
              }}
              onClick={() => {
                if (link.id === 'home') {
                  handleHomeClick();
                } else {
                  setActive(link.title);
                }
              }}
              onMouseEnter={() => !isScrolling && setActive(link.title)}
              onMouseLeave={() => !isScrolling && setActive(active)}
            >
              <a 
                href={link.id === 'home' ? '/' : `#${link.id}`} 
                style={{ 
                  position: 'relative',
                  textDecoration: 'none',
                  color: 'inherit',
                  pointerEvents: isScrolling ? 'none' : 'auto'
                }}
                onClick={(e) => {
                  if (link.id === 'home') {
                    e.preventDefault();
                    handleHomeClick();
                  }
                }}
              >
                {link.title}
                {active === link.title && (
                  <motion.div 
                    style={{
                      position: 'absolute',
                      bottom: '-6px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#915eff',
                      borderRadius: '4px'
                    }}
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Toggle */}
        <div 
          style={{ 
            display: isMobile ? 'block' : 'none',
            cursor: 'pointer',
            zIndex: 10,
            marginLeft: '20px'
          }}
          onClick={() => setToggle(!toggle)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d={toggle ? "M18 6L6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              stroke="#fff" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Mobile Navigation Menu */}
        <div style={{
          display: toggle ? 'flex' : 'none',
          padding: '24px',
          position: 'absolute',
          top: '80px',
          right: 0,
          margin: '16px 8px',
          minWidth: '140px',
          zIndex: 10,
          borderRadius: '12px',
          background: 'linear-gradient(to right, #434343, #000000)'
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <li
                key={link.id}
                style={{
                  color: active === link.title ? 'white' : '#aaa6c3',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(link.title);
                }}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 