import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 120 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const blueColor = new THREE.Color("#0022FF");
    const whiteColor = new THREE.Color("#FFFFFF");
    const lightBlue = new THREE.Color("#6699FF");

    for (let i = 0; i < count; i++) {
      // Spread across hero volume
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // Color variation
      const r = Math.random();
      const chosenColor = r > 0.6 ? blueColor : r > 0.3 ? lightBlue : whiteColor;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.y = time * 0.5;
    pointsRef.current.rotation.x = Math.sin(time) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}
