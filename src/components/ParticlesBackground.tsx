'use client';
import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();
  
  // Colors for particles
  const particleColors = [
    '#915eff', // purple
    '#ff5e91', // pink
    '#5e91ff', // blue
    '#5eff91', // green
    '#ff9d5e'  // orange
  ];
  
  // Initialize particles and canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setDimensions({ width: canvas.width, height: canvas.height });
      }
    };
    
    // Create initial particles
    const initParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 20); // Adjust density based on screen width
      const particles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
      
      particlesRef.current = particles;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    initParticles();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reset if out of bounds or randomly respawn some particles
        if (
          particle.x < -50 || 
          particle.x > dimensions.width + 50 || 
          particle.y < -50 || 
          particle.y > dimensions.height + 50 ||
          Math.random() < 0.0005 // Chance to respawn even if in bounds
        ) {
          particlesRef.current[index] = createParticle();
        }
      });
      
      // Add new particles occasionally
      if (Math.random() < 0.05 && particlesRef.current.length < 100) {
        particlesRef.current.push(createParticle());
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dimensions]);
  
  // Create a new particle
  const createParticle = (): Particle => {
    const size = Math.random() * 4 + 1;
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y;
    
    // Position particle just outside the screen from a random side
    switch (side) {
      case 0: // top
        x = Math.random() * (dimensions.width + 100) - 50;
        y = -20;
        break;
      case 1: // right
        x = dimensions.width + 20;
        y = Math.random() * (dimensions.height + 100) - 50;
        break;
      case 2: // bottom
        x = Math.random() * (dimensions.width + 100) - 50;
        y = dimensions.height + 20;
        break;
      case 3: // left
      default:
        x = -20;
        y = Math.random() * (dimensions.height + 100) - 50;
        break;
    }
    
    return {
      x,
      y,
      size,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.6 + 0.2,
    };
  };
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default ParticlesBackground; 