import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GrowthBuildingBlocks() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(4.5, 4.0, 6.5);
    camera.lookAt(0, 0.4, 0);

    // 2. High-Quality WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 3. Multi-point Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.2);
    mainLight.position.set(6, 10, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const blueLight = new THREE.DirectionalLight(0x0022ff, 4.0);
    blueLight.position.set(-5, 2, -3);
    scene.add(blueLight);

    const rimLight = new THREE.PointLight(0x0066ff, 3.5, 12);
    rimLight.position.set(0, 6, 2);
    scene.add(rimLight);

    // 4. Create Geometric Modular "Building Blocks of Growth"
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials Palette (Brikken raw concrete, obsidian dark, electric blue, wireframe)
    const concreteMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0ddd7,
      roughness: 0.85,
      metalness: 0.05,
      clearcoat: 0.1,
    });

    const blueMat = new THREE.MeshPhysicalMaterial({
      color: 0x0022ff,
      emissive: 0x001188,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const darkMat = new THREE.MeshPhysicalMaterial({
      color: 0x111115,
      roughness: 0.4,
      metalness: 0.6,
      clearcoat: 0.8,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0022ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // Define Step-by-Step Growth Blocks Array (ascending tower formation)
    const blockData = [
      // Level 1: Foundation Base Blocks
      { geo: [1.4, 0.4, 1.4], pos: [0, -0.8, 0], mat: darkMat, delay: 0, label: "FOUNDATION" },
      { geo: [0.7, 0.4, 0.7], pos: [-0.9, -0.8, 0.6], mat: concreteMat, delay: 0.2 },
      { geo: [0.6, 0.4, 0.6], pos: [0.9, -0.8, -0.6], mat: concreteMat, delay: 0.4 },

      // Level 2: Brand & Strategy Pillar Blocks
      { geo: [0.9, 0.7, 0.9], pos: [-0.3, -0.2, -0.2], mat: concreteMat, delay: 0.6 },
      { geo: [0.8, 0.6, 0.8], pos: [0.5, -0.25, 0.3], mat: blueMat, delay: 0.8, isGlow: true },
      { geo: [0.5, 0.5, 0.5], pos: [-0.7, -0.3, 0.5], mat: darkMat, delay: 1.0 },

      // Level 3: Digital Product & Platform Blocks
      { geo: [0.7, 0.8, 0.7], pos: [0.1, 0.5, 0.1], mat: darkMat, delay: 1.2 },
      { geo: [0.6, 0.6, 0.6], pos: [-0.5, 0.4, -0.4], mat: blueMat, delay: 1.4, isGlow: true },

      // Level 4: Pinnacle Scale Block (Crowning Growth Node)
      { geo: [0.55, 0.55, 0.55], pos: [0.0, 1.2, 0.0], mat: blueMat, delay: 1.6, isPinnacle: true },
    ];

    interface BlockItem {
      mesh: THREE.Mesh;
      wireMesh?: THREE.Mesh;
      baseY: number;
      targetY: number;
      curY: number;
      scaleY: number;
      targetScaleY: number;
      delay: number;
      rotSpeed: number;
    }

    const blocks: BlockItem[] = [];

    blockData.forEach((b) => {
      const geometry = new THREE.BoxGeometry(b.geo[0], b.geo[1], b.geo[2]);
      const mesh = new THREE.Mesh(geometry, b.mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.set(b.pos[0], b.pos[1], b.pos[2]);

      // Wireframe overlay for architectural blueprint aesthetics
      let wireMesh: THREE.Mesh | undefined;
      if (b.isGlow || b.isPinnacle) {
        const wireGeo = new THREE.BoxGeometry(b.geo[0] * 1.02, b.geo[1] * 1.02, b.geo[2] * 1.02);
        wireMesh = new THREE.Mesh(wireGeo, wireMat);
        mesh.add(wireMesh);
      }

      rootGroup.add(mesh);

      blocks.push({
        mesh,
        wireMesh,
        baseY: b.pos[1],
        targetY: b.pos[1],
        curY: b.pos[1] - 1.5, // Start below for step-by-step ascending animation
        scaleY: 0,
        targetScaleY: 1,
        delay: b.delay,
        rotSpeed: 0.005,
      });
    });

    // Subtly orbiting satellite indicator around the pinnacle
    const orbitRingGeo = new THREE.TorusGeometry(1.6, 0.015, 16, 80);
    const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0x0022ff, transparent: true, opacity: 0.35 });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.5;
    orbitRing.position.y = 0.6;
    rootGroup.add(orbitRing);

    // 5. Mouse Interaction Physics
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouse.targetX = x * 1.2;
      mouse.targetY = y * 1.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // 7. Render Loop with Step-by-Step Growth & Levitation
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Rotate group smoothly with mouse influence
      rootGroup.rotation.y = elapsedTime * 0.2 + mouse.x * 0.6;
      rootGroup.rotation.x = mouse.y * 0.4;

      // Animate each building block in an ascending step-by-step cycle
      blocks.forEach((block) => {
        // Step-by-step growth loop (blocks rhythmically pulse and ascend)
        const blockTime = (elapsedTime + block.delay * 1.5) % 6;
        
        let growthProgress = 1;
        if (blockTime < 1.2) {
          growthProgress = Math.sin((blockTime / 1.2) * (Math.PI / 2));
        }

        // Animate block height scale and subtle float
        const currentScale = 0.3 + growthProgress * 0.7;
        block.mesh.scale.set(1, currentScale, 1);
        block.mesh.position.y = block.baseY + Math.sin(elapsedTime * 1.8 + block.delay * 2) * 0.04;
      });

      // Orbit ring subtle animation
      orbitRing.rotation.z = elapsedTime * 0.3;
      orbitRing.position.y = 0.5 + Math.sin(elapsedTime * 1.5) * 0.08;

      // Overall zero-gravity floating levitation
      rootGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.1;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      concreteMat.dispose();
      blueMat.dispose();
      darkMat.dispose();
      wireMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[300px] sm:min-h-[360px] md:min-h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto select-none"
    />
  );
}
