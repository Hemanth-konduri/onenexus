import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

interface MousePos {
  x: number;
  y: number;
}

// Curated Vibrant OneNexus Brand Palette for GLTF meshes
const BRAND_PALETTE = [
  { color: "#2554E8", emissive: "#2554E8", emissiveIntensity: 0.35, roughness: 0.15, metalness: 0.4 }, // Vivid Cobalt Blue
  { color: "#0EA5E9", emissive: "#0EA5E9", emissiveIntensity: 0.25, roughness: 0.2, metalness: 0.5 },  // Electric Cyan
  { color: "#111827", emissive: "#000000", emissiveIntensity: 0.0,  roughness: 0.3, metalness: 0.7 },  // Studio Deep Graphite
  { color: "#6366F1", emissive: "#4338CA", emissiveIntensity: 0.2,  roughness: 0.2, metalness: 0.3 },  // Royal Indigo
  { color: "#38BDF8", emissive: "#2554E8", emissiveIntensity: 0.3,  roughness: 0.1, metalness: 0.6 },  // Ice Glow Blue
];

function GLTFModelContainer({ mousePosition }: { mousePosition: MousePos }) {
  const { scene } = useGLTF("/models/3d_scene_for_onenexus.gltf");
  const groupRef = useRef<THREE.Group>(null);

  // Clone scene so node manipulation doesn't pollute global cache
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Map animated meshes with vibrant brand materials
  const animatedObjects = useMemo(() => {
    const objects: {
      mesh: THREE.Object3D;
      initialY: number;
      initialRotX: number;
      initialRotY: number;
      speed: number;
      range: number;
      rotSpeed: number;
      offset: number;
    }[] = [];

    let meshIndex = 0;

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Enable shadows & depth
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Assign vibrant brand colors & metallic highlights
        const palette = BRAND_PALETTE[meshIndex % BRAND_PALETTE.length];
        meshIndex++;

        const newMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.color),
          emissive: new THREE.Color(palette.emissive),
          emissiveIntensity: palette.emissiveIntensity,
          roughness: palette.roughness,
          metalness: palette.metalness,
        });

        mesh.material = newMat;

        const bbox = new THREE.Box3().setFromObject(mesh);
        const size = bbox.getSize(new THREE.Vector3()).length();
        const isLarge = size > 2.0;

        objects.push({
          mesh,
          initialY: mesh.position.y,
          initialRotX: mesh.rotation.x,
          initialRotY: mesh.rotation.y,
          speed: 0.5 + Math.random() * 0.7,
          range: isLarge ? 0.15 : 0.25,
          rotSpeed: 0.3 + Math.random() * 0.5,
          offset: Math.random() * Math.PI * 2,
        });
      }
    });

    return objects;
  }, [clonedScene]);

  // Render Loop: Camera Breathing, Subtle Mouse Parallax & Cube Animations
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const camera = state.camera;

    // 1. Cinematic Breathing Camera Movement
    const baseCamZ = 10.5;
    const breathZ = baseCamZ + Math.sin(t * 0.5) * 0.2;

    // 2. Mouse Parallax
    const targetCamX = mousePosition.x * 0.75;
    const targetCamY = mousePosition.y * 0.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, breathZ, 0.04);

    camera.lookAt(0, 0, 0);

    // 3. Object Animations (Floating cubes & gentle rotation)
    animatedObjects.forEach((obj) => {
      const floatY = Math.sin(t * obj.speed + obj.offset) * obj.range * 0.4;
      const rotDrift = Math.sin(t * obj.rotSpeed + obj.offset) * 0.035;

      obj.mesh.position.y = obj.initialY + floatY;
      obj.mesh.rotation.y = obj.initialRotY + rotDrift;
      obj.mesh.rotation.x = obj.initialRotX + rotDrift * 0.5;
    });
  });

  return (
    <primitive
      object={clonedScene}
      ref={groupRef}
      position={[0, -0.4, 0]}
      scale={1.55}
    />
  );
}

// Preload GLTF model for instantaneous rendering
useGLTF.preload("/models/3d_scene_for_onenexus.gltf");

export default function Contact3DScene() {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 10.5], fov: 44 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <AdaptiveDpr pixelated />
        
        {/* Multi-Colored Studio Lighting Setup */}
        <ambientLight intensity={1.2} color="#F1F5F9" />
        <hemisphereLight intensity={1.0} groundColor="#0F172A" color="#2554E8" />
        {/* Primary Cobalt Blue Key Light */}
        <directionalLight position={[10, 8, 8]} color="#2554E8" intensity={4.5} />
        {/* Cyan Accent Fill Light */}
        <directionalLight position={[-8, 10, 10]} color="#38BDF8" intensity={3.0} />
        {/* Deep Indigo Backlight */}
        <directionalLight position={[0, -10, -5]} color="#6366F1" intensity={2.5} />
        {/* Center Blue Glow Point Light */}
        <pointLight position={[0, 0, 6]} color="#2554E8" intensity={3.5} />

        <Suspense fallback={null}>
          <GLTFModelContainer mousePosition={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
