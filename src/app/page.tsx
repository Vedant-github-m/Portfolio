'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

// Import components with NoSSR to prevent hydration errors
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const ParticlesBackground = dynamic(() => import('@/components/ParticlesBackground'), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative z-0 bg-primary">
      {isLoaded && (
        <>
          <ParticlesBackground />
          <Navbar />
          <div className="relative z-0">
            <Hero />
            <About />
            <Projects />
            <Contact />
          </div>
        </>
      )}
    </main>
  );
} 