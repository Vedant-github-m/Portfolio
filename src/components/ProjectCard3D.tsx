'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

// 3D Card that rotates based on mouse position
const Card3D = ({ children, project }: any) => {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  
  // Rotate card based on mouse movement
  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (mouse.x * Math.PI) / 10,
      0.1
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      (-mouse.y * Math.PI) / 10,
      0.1
    );
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
    >
      <boxGeometry args={[3, 2, 0.2]} />
      <meshStandardMaterial color="#151030" />
      {children}
    </mesh>
  );
};

// Fallback component for when 3D canvas is loading
const CardFallback = () => (
  <div style={{ 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#151030',
    borderRadius: '20px'
  }}>
    <div style={{ 
      width: '40px', 
      height: '40px', 
      borderRadius: '50%', 
      backgroundColor: '#915eff' 
    }} />
  </div>
);

interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  tags: Array<{ name: string; color: string }>;
  image: string;
  source_code_link: string;
  live_demo_link: string;
}

const ProjectCard3D = ({ 
  index, 
  name, 
  description, 
  tags, 
  image, 
  source_code_link, 
  live_demo_link 
}: ProjectCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{
        backgroundColor: '#151030',
        borderRadius: '20px',
        padding: '20px',
        width: '100%',
        maxWidth: '360px',
        boxShadow: '0px 35px 120px -15px #211e35',
        overflow: 'hidden',
        height: 'fit-content'
      }}
    >
      {/* 3D Card Canvas */}
      <div style={{ 
        width: '100%', 
        height: '230px', 
        borderRadius: '12px', 
        overflow: 'hidden',
        position: 'relative' 
      }}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Card3D project={name}>
              {/* Optional mesh components here */}
            </Card3D>
          </Suspense>
        </Canvas>

        {/* Project name overlay */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.4)',
          color: 'white',
          textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{name}</h3>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                backgroundColor: '#915eff',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 5.36 20.12 9.5 21.52C10 21.62 10.16 21.32 10.16 21.06C10.16 20.82 10.15 20.09 10.15 19.31C7 19.91 6.35 18.12 6.15 17.56C6.04 17.28 5.55 16.4 5.1 16.16C4.73 15.97 4.23 15.37 5.09 15.36C5.9 15.35 6.47 16.04 6.66 16.33C7.56 17.74 8.88 17.59 10.19 17.33C10.29 16.73 10.58 16.32 10.9 16.09C8.58 15.86 6.16 15.04 6.16 11.32C6.16 10.24 6.57 9.35 6.68 8.74C6.43 8.5 6.13 7.44 6.77 6.08C6.77 6.08 7.62 5.82 10.16 7.09C11.06 6.87 12.01 6.76 12.96 6.76C13.91 6.76 14.86 6.87 15.76 7.09C18.3 5.81 19.15 6.08 19.15 6.08C19.79 7.44 19.49 8.5 19.24 8.74C20.25 9.52 20.76 10.66 20.76 11.32C20.76 15.05 18.33 15.86 16.01 16.09C16.42 16.39 16.77 16.97 16.77 17.88C16.77 19.18 16.76 20.72 16.76 21.06C16.76 21.32 16.92 21.63 17.42 21.52C19.5052 20.8052 21.2816 19.4525 22.5306 17.6708C23.7796 15.8891 24.4386 13.7743 24.4086 11.615C24.3786 9.45571 23.6606 7.36149 22.3562 5.61739C21.0518 3.87328 19.2331 2.56463 17.1711 1.90958C15.1091 1.25453 12.9159 1.27777 10.8675 1.97603C8.8191 2.67428 7.0253 4.01774 5.7542 5.78979C4.48311 7.56184 3.80158 9.67572 3.814 11.835C3.82643 13.9943 4.53216 16.0994 5.82 17.86C6.27 18.46 6.22 18.54 5.95 19.04C5.8 19.32 5.53 20.04 5.95 20.04C6.37 20.04 9.15 19.15 10.27 16.39" />
              </svg>
            </div>
            
            <div
              onClick={() => window.open(live_demo_link, "_blank")}
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                backgroundColor: '#915eff',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" />
                <path d="M15 3H21V9" />
                <path d="M10 14L21 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <p style={{ color: '#aaa6c3', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>{description}</p>
      </div>
      
      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tags.map((tag) => (
          <p key={tag.name} style={{ fontSize: '14px', color: tag.color }}>
            #{tag.name}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard3D; 