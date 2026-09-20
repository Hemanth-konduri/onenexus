import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import FloatingCube from "./FloatingCube";
import WireframeCube from "./WireframeCube";
import ConnectingLines from "./ConnectingLines";
import ParticleField from "./ParticleField";

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const leftCubeRef = useRef<THREE.Group>(null);
  const rightCubeRef = useRef<THREE.Group>(null);
  const bgCubesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const { pointer, clock } = state;
    const t = clock.getElapsedTime();

    // 1. Subtle camera / whole group mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.12,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.08,
        0.05
      );
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
    }

    // 2. Large Left Blue Cube levitation & rotation
    if (leftCubeRef.current) {
      leftCubeRef.current.position.y = 0.5 + Math.sin(t * 1.2) * 0.12;
      leftCubeRef.current.rotation.y = 0.35 + Math.sin(t * 0.6) * 0.08;
      leftCubeRef.current.rotation.x = -0.15 + Math.cos(t * 0.5) * 0.05;
    }

    // 3. Large Right Blue Cube levitation & rotation
    if (rightCubeRef.current) {
      rightCubeRef.current.position.y = 0.3 + Math.sin(t * 1.0 + 1.5) * 0.14;
      rightCubeRef.current.rotation.y = -0.45 + Math.cos(t * 0.55) * 0.08;
      rightCubeRef.current.rotation.x = 0.12 + Math.sin(t * 0.45) * 0.05;
    }

    // 4. Background small floating cubes
    if (bgCubesRef.current) {
      bgCubesRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.002 * (i % 2 === 0 ? 1 : -1);
        child.rotation.y += 0.003 * (i % 3 === 0 ? 1 : -1);
        child.position.y += Math.sin(t * 1.5 + i) * 0.0015;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft Reflective Studio Floor Grid Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#ECE8E1"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Connecting Architectural Grid Lines & Anchor Points */}
      <ConnectingLines />

      {/* Floating Particles in Depth */}
      <ParticleField count={100} />

      {/* ======================================================== */}
      {/* 1. LEFT MAIN COMPOSITION (Matching Reference Image) */}
      {/* ======================================================== */}
      <group ref={leftCubeRef} position={[-3.8, 0.5, 0]}>
        {/* Large Primary Electric Blue Cube */}
        <FloatingCube
          position={[0, 0, 0]}
          size={1.9}
          rotation={[0.15, 0.45, -0.05]}
          theme="blue"
          labels={{
            step: "01",
            front: ["STRATEGY", "DESIGN", "DEVELOP", "GROW"],
            side: ["DISCOVERY", "VELOCITY", "SCALE"],
          }}
        />
      </group>

      {/* Left Supporting White / Concrete Beveled Cubes */}
      <group position={[-4.8, -0.8, 1.2]} rotation={[0.1, -0.2, 0.05]}>
        <FloatingCube
          position={[0, 0, 0]}
          size={1.1}
          theme="white"
          labels={{
            step: "01",
            front: ["+"],
          }}
        />
      </group>

      <group position={[-3.2, -1.2, 0.8]} rotation={[-0.1, 0.3, 0]}>
        <FloatingCube
          position={[0, 0, 0]}
          size={0.9}
          theme="white"
          labels={{
            step: "01",
            front: ["[  ]", "+"],
          }}
        />
      </group>

      {/* Left Background Smaller Blue & Dark Cubes */}
      <group position={[-5.5, 1.8, -1.5]} rotation={[0.4, 0.2, 0]}>
        <FloatingCube position={[0, 0, 0]} size={0.75} theme="blue" />
      </group>

      {/* Left Wireframe Ghost Cube */}
      <WireframeCube
        position={[-2.6, 1.8, -0.5]}
        size={0.8}
        rotation={[0.2, 0.4, 0.1]}
        color="#0022FF"
        opacity={0.4}
      />

      {/* ======================================================== */}
      {/* 2. RIGHT MAIN COMPOSITION (Matching Reference Image) */}
      {/* ======================================================== */}
      <group ref={rightCubeRef} position={[3.8, 0.3, 0]}>
        {/* Large Primary Electric Blue Cube */}
        <FloatingCube
          position={[0, 0, 0]}
          size={2.0}
          rotation={[-0.15, -0.45, 0.05]}
          theme="blue"
          labels={{
            step: "02",
            front: ["BUSINESSES", "PEOPLE", "TECHNOLOGY", "IMPACT"],
            side: ["VENTURES", "RETENTION", "EXPANSION"],
          }}
        />
      </group>

      {/* Right Supporting White & Obsidian Cubes */}
      <group position={[4.6, 1.8, -1.2]} rotation={[0.2, -0.3, 0.1]}>
        <FloatingCube position={[0, 0, 0]} size={0.85} theme="white" />
      </group>

      <group position={[3.2, -1.2, 0.6]} rotation={[-0.2, 0.4, -0.1]}>
        <FloatingCube position={[0, 0, 0]} size={0.95} theme="white" />
      </group>

      {/* Right Foreground Extreme Blur Cube */}
      <group position={[5.2, -1.5, 2.0]} rotation={[0.3, 0.2, -0.2]}>
        <FloatingCube position={[0, 0, 0]} size={1.2} theme="dark" />
      </group>

      {/* Right Wireframe Cube */}
      <WireframeCube
        position={[2.4, 1.4, -0.8]}
        size={0.7}
        rotation={[-0.1, 0.3, 0.2]}
        color="#0022FF"
        opacity={0.35}
      />

      {/* ======================================================== */}
      {/* 3. CENTER / BACKGROUND FLOATING ACCENTS (Keep center clear for text) */}
      {/* ======================================================== */}
      <group ref={bgCubesRef}>
        {/* Deep background small floating blue node */}
        <group position={[-1.8, -1.0, -2.5]}>
          <FloatingCube position={[0, 0, 0]} size={0.5} theme="blue" />
        </group>

        <group position={[2.0, -1.1, -2.5]}>
          <FloatingCube position={[0, 0, 0]} size={0.45} theme="blue" />
        </group>

        {/* Small white cubes in distance */}
        <group position={[-0.5, 2.2, -3.0]}>
          <FloatingCube position={[0, 0, 0]} size={0.35} theme="white" />
        </group>
      </group>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.2, 7.8], fov: 42, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 2]}
      >
        {/* Studio Lighting Setup */}
        <ambientLight intensity={1.5} />
        
        {/* Key White Light from upper-left */}
        <directionalLight
          position={[-6, 8, 6]}
          intensity={3.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Electric Blue Rim Light */}
        <directionalLight
          position={[6, 4, 4]}
          intensity={2.8}
          color="#0022ff"
        />

        {/* Fill Light */}
        <directionalLight
          position={[0, -4, 4]}
          intensity={0.8}
          color="#ffffff"
        />

        {/* Atmospheric Fog */}
        <fog attach="fog" args={["#EFECE6", 8, 16]} />

        {/* 3D Scene Objects */}
        <SceneContent />
      </Canvas>
    </div>
  );
}
