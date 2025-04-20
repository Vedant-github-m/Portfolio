'use client';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// Interactive particle field that responds to mouse movement
const ParticleField = ({ count = 3000 }) => {
  const { viewport, mouse } = useThree();
  const points = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  
  // Generate random positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Create a grid distribution but with some random offset
      positions[i3] = (Math.random() - 0.5) * 5;
      positions[i3 + 1] = (Math.random() - 0.5) * 5;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;
    }
    
    return positions;
  }, [count]);

  // Animate the particles to follow mouse movement
  useFrame((state) => {
    if (!points.current) return;
    
    // Rotate based on mouse position
    const x = (mouse.x * viewport.width) / 50;
    const y = (mouse.y * viewport.height) / 50;
    
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, y, 0.05);
    points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, x, 0.05);
    
    // Create a wave effect over time
    const t = state.clock.getElapsedTime() * 0.1;
    points.current.position.z = Math.sin(t) * 0.2;
    
    // Pulse size effect
    const pulse = Math.sin(t * 5) * 0.05 + 0.95;
    points.current.scale.set(pulse, pulse, pulse);

    // Change material properties based on hover
    const material = points.current.material as THREE.PointsMaterial;
    if (material) {
      // Smoothly transition size and color
      const targetSize = hovered ? 0.03 : 0.02;
      const targetColor = hovered ? new THREE.Color('#ff5e91') : new THREE.Color('#915eff');
      
      material.size = THREE.MathUtils.lerp(material.size, targetSize, 0.1);
      material.color.lerp(targetColor, 0.1);
    }
  });

  return (
    <group>
      <Points
        ref={points}
        positions={particlesPosition}
        stride={3}
        frustumCulled={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          color="#915eff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Interactive sphere in the center
const CenterSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);
  
  // Gentle floating animation
  useFrame(({ clock }) => {
    if (!sphereRef.current || !materialRef.current) return;
    
    const t = clock.getElapsedTime();
    sphereRef.current.position.y = Math.sin(t) * 0.1;
    sphereRef.current.rotation.y = t * 0.1;
    
    // Animate scale on hover
    const targetScale = hovered ? 1.2 : 1;
    sphereRef.current.scale.x = THREE.MathUtils.lerp(sphereRef.current.scale.x, targetScale, 0.1);
    sphereRef.current.scale.y = THREE.MathUtils.lerp(sphereRef.current.scale.y, targetScale, 0.1);
    sphereRef.current.scale.z = THREE.MathUtils.lerp(sphereRef.current.scale.z, targetScale, 0.1);
    
    // Animate material properties on hover
    const targetEmissive = hovered ? new THREE.Color('#ff5e91') : new THREE.Color('#915eff');
    const targetRoughness = hovered ? 0.2 : 0.5;
    
    materialRef.current.emissive.lerp(targetEmissive, 0.1);
    materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, targetRoughness, 0.1);
  });

  return (
    <mesh
      ref={sphereRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#915eff"
        emissive="#915eff"
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
};

const ContactScene = () => {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '400px', 
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'grab',
        marginBottom: '30px' 
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#050816']} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} />
        
        <ParticleField />
        <CenterSphere />
        
        {/* Add a subtle glow effect */}
        <fog attach="fog" args={['#070b24', 3.5, 8.5]} />
      </Canvas>
    </div>
  );
};

export default ContactScene; 