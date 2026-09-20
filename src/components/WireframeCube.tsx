import React from "react";
import * as THREE from "three";

interface WireframeCubeProps {
  position: [number, number, number];
  size?: number | [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  opacity?: number;
}

export default function WireframeCube({
  position,
  size = 1.0,
  rotation = [0, 0, 0],
  color = "#0022FF",
  opacity = 0.35,
}: WireframeCubeProps) {
  const sizeArr: [number, number, number] = Array.isArray(size) ? size : [size, size, size];

  return (
    <group position={position} rotation={rotation}>
      {/* Wireframe box edges */}
      <mesh>
        <boxGeometry args={sizeArr} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Subtle interior translucent volume */}
      <mesh>
        <boxGeometry args={[sizeArr[0] * 0.98, sizeArr[1] * 0.98, sizeArr[2] * 0.98]} />
        <meshPhysicalMaterial
          color={color === "#0022FF" ? 0x0022ff : 0xffffff}
          transparent
          opacity={opacity * 0.25}
          roughness={0.1}
          transmission={0.6}
        />
      </mesh>
    </group>
  );
}
