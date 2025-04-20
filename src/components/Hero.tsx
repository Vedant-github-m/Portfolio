'use client';
import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the HeroScene component with no SSR
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#915eff', animation: 'pulse 1.5s infinite' }} />
    </div>
  ),
});

const Hero = () => {
  const [error, setError] = useState(false);

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', margin: '0 auto' }}>
      <div style={{ 
        padding: '0 24px', 
        position: 'absolute', 
        inset: 0, 
        top: '120px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        gap: '20px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#915eff' }} />
          <div style={{ 
            width: '4px', 
            height: '160px', 
            background: 'linear-gradient(-90deg, #804dee 0%, rgba(60, 51, 80, 0) 100%)' 
          }} />
        </div>

        <div>
          <h1 style={{ 
            fontWeight: 900, 
            color: 'white', 
            fontSize: '60px', 
            lineHeight: '98px', 
            marginTop: '8px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Hi, I'm <span style={{ color: '#915eff' }}>Vedant</span>
          </h1>
          <p style={{ 
            color: '#dfd9ff', 
            fontWeight: 500, 
            fontSize: '26px', 
            lineHeight: '40px', 
            marginTop: '8px',
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
          }}>
            Developer <br style={{ display: 'none' }} />
            
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div style={{ width: '100%', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#915eff', animation: 'pulse 1.5s infinite' }} />
        </div>
      }>
        {!error ? (
          <div style={{ height: '60vh', position: 'absolute', width: '100%', top: '15%' }} onError={() => setError(true)}>
            <HeroScene />
          </div>
        ) : (
          <div style={{ width: '100%', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'white', fontSize: '24px' }}>Failed to load 3D scene</div>
          </div>
        )}
      </Suspense>

      <div style={{ 
        position: 'absolute', 
        bottom: '128px', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '24px',
        zIndex: 10
      }}>
        <motion.a 
          href="#about"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: 'rgba(21, 16, 48, 0.7)',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            border: '2px solid #915eff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(4px)'
          }}
        >
          About Me
        </motion.a>
        <motion.a 
          href="#work"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: '#915eff',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(145, 94, 255, 0.3)',
          }}
        >
          View My Work
        </motion.a>
      </div>
    </section>
  );
};

export default Hero; 