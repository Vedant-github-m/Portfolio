'use client';
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';

// Simple computer model created with basic shapes
const Computers = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <group position={[0, -3, 0]} scale={isMobile ? 0.7 : 0.75}>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      
      {/* Monitor base */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 0.5, 2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Monitor stand */}
      <mesh position={[0, 1, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      
      {/* Monitor screen */}
      <group position={[0, 2.5, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[5, 3, 0.2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <boxGeometry args={[4.8, 2.7, 0.05]} />
          <meshStandardMaterial color="#0a0a2e" emissive="#0011ff" emissiveIntensity={0.1} />
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, 0.3, 1.5]} receiveShadow castShadow>
        <boxGeometry args={[3, 0.2, 1]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[2, 0.2, 1.5]} receiveShadow castShadow>
        <boxGeometry args={[0.6, 0.3, 1]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

const CanvasLoader = () => {
  return (
    <group>
      <mesh position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#915eff" wireframe />
      </mesh>
    </group>
  );
};

export default ComputersCanvas; 