import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function React3DObject() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Perspective Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 380;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.8;

    // 2. High-Fidelity Antialiased Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 3. Multi-point Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const blueRimLight = new THREE.DirectionalLight(0x0022ff, 4.5);
    blueRimLight.position.set(-6, -4, 4);
    scene.add(blueRimLight);

    const coreLight = new THREE.PointLight(0x0055ff, 5.0, 15);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 4. Create Interconnected "NEXUS" Node Monolith Structure
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Core Icosahedron Monolith (Architectural Obsidian & Electric Bevels)
    const monolithGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const monolithMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0d,
      emissive: 0x0011aa,
      emissiveIntensity: 0.15,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });
    const monolithMesh = new THREE.Mesh(monolithGeo, monolithMat);
    rootGroup.add(monolithMesh);

    // Luminous Wireframe Facet Cage
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x0044ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const wireframeMesh = new THREE.Mesh(monolithGeo, wireframeMat);
    wireframeMesh.scale.setScalar(1.02);
    rootGroup.add(wireframeMesh);

    // Inner Radiant Pulsing Core Diamond
    const coreGeo = new THREE.OctahedronGeometry(0.55, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x0022ff,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 3 Intersecting Orbital Rings (Representing "Brand, Product, Growth" Nexus)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x0022ff,
      emissive: 0x001188,
      metalness: 0.9,
      roughness: 0.2,
    });

    const ring1Geo = new THREE.TorusGeometry(1.85, 0.025, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 4;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = -Math.PI / 6;
    rootGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.35, 0.015, 16, 100);
    const ring3 = new THREE.Mesh(ring3Geo, ringMat);
    ring3.rotation.z = Math.PI / 2.5;
    rootGroup.add(ring3);

    // Orbiting Nexus Data Satellites (Tiny Cubes & Spheres on the perimeter)
    const satellitesGroup = new THREE.Group();
    rootGroup.add(satellitesGroup);

    const satGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x0022ff });

    const satellites: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; tilt: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satellitesGroup.add(satMesh);
      satellites.push({
        mesh: satMesh,
        angle: (i / 8) * Math.PI * 2,
        speed: 0.4 + (i % 3) * 0.2,
        radius: 2.1 + (i % 2) * 0.4,
        tilt: (i % 4) * 0.5,
      });
    }

    // 5. Mouse Interaction Physics
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouse.targetX = x * 1.8;
      mouse.targetY = y * 1.8;
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

    // 7. 60FPS Fluid Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate Monolith with subtle mouse tilt
      monolithMesh.rotation.x = elapsedTime * 0.25 + mouse.y * 0.5;
      monolithMesh.rotation.y = elapsedTime * 0.35 + mouse.x * 0.5;
      wireframeMesh.rotation.copy(monolithMesh.rotation);

      // Inner Core Rapid Spin & Breathing Scale
      coreMesh.rotation.x = -elapsedTime * 0.8;
      coreMesh.rotation.y = -elapsedTime * 0.9;
      const coreScale = 1 + Math.sin(elapsedTime * 3) * 0.08;
      coreMesh.scale.set(coreScale, coreScale, coreScale);

      // Orbital Rings Rotation at Differing Angular Velocities
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;
      ring3.rotation.x = elapsedTime * 0.2;

      // Update Satellites Positions
      satellites.forEach((sat) => {
        const currentAngle = sat.angle + elapsedTime * sat.speed;
        sat.mesh.position.x = Math.cos(currentAngle) * sat.radius;
        sat.mesh.position.y = Math.sin(currentAngle) * sat.radius * Math.cos(sat.tilt);
        sat.mesh.position.z = Math.sin(currentAngle) * sat.radius * Math.sin(sat.tilt);
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Gentle Zero-Gravity Floating Levitation
      rootGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.12;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      monolithGeo.dispose();
      monolithMat.dispose();
      wireframeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      ringMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[320px] sm:min-h-[380px] md:min-h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto select-none"
    />
  );
}
