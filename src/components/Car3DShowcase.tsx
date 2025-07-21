import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Simple 3D Car placeholder (using basic geometry for now)
function Car3DModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      {/* Car Body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.8]} />
        <meshStandardMaterial 
          color="#1e40af" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Wheels */}
      {[-0.7, 0.7].map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.3, 0.4]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[x, -0.3, -0.4]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#3b82f6" />
      <directionalLight position={[0, 20, 5]} intensity={0.8} castShadow />
    </>
  );
}

const Car3DShowcase = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-64 md:h-80 rounded-3xl overflow-hidden glass border border-primary/20 relative"
    >
      <Canvas
        camera={{ position: [4, 2, 4], fov: 45 }}
        shadows
        className="bg-gradient-to-br from-background to-card"
      >
        <Suspense fallback={null}>
          <Lights />
          <Car3DModel />
          <Environment preset="city" />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <motion.h3 
          className="text-xl font-bold text-primary glow-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          3D Car Preview
        </motion.h3>
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Interactive 3D models coming soon
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Car3DShowcase;