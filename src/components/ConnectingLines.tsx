import React, { useMemo } from "react";
import * as THREE from "three";

interface ConnectingLinesProps {
  points?: [number, number, number][][];
}

export default function ConnectingLines() {
  // Define precise horizontal and vertical architectural grid connecting lines with blue nodes
  const linesData = useMemo(() => {
    return [
      // Left cluster connections
      { from: [-4.2, 2.8, -1], to: [-1.8, 1.2, 0.5] },
      { from: [-4.2, 2.8, -1], to: [-4.2, -1.5, -0.5] },
      { from: [-2.5, -0.2, 1], to: [-0.8, -0.2, 1] },
      { from: [-3.8, -1.8, 0], to: [-2.0, -1.8, 0] },
      { from: [-2.0, -1.8, 0], to: [-2.0, -3.0, 0] },

      // Right cluster connections
      { from: [1.8, 1.5, 0.5], to: [4.2, 2.5, -1] },
      { from: [3.8, 0.5, 0.8], to: [3.8, -2.5, 0] },
      { from: [1.5, -0.5, 0.5], to: [3.8, -0.5, 0.5] },
      { from: [4.2, 2.5, -1], to: [4.2, -1.2, -1] },
      { from: [2.5, -2.0, 0.5], to: [4.5, -2.0, 0.5] },

      // Subtle cross-floor connecting lines
      { from: [-5.0, -2.8, 2], to: [5.0, -2.8, 2] },
      { from: [-3.0, -2.8, -2], to: [-3.0, -2.8, 3] },
      { from: [3.0, -2.8, -2], to: [3.0, -2.8, 3] },
    ];
  }, []);

  // Anchor points at intersections
  const anchorPoints = useMemo(() => {
    return [
      [-1.8, 1.2, 0.5],
      [-4.2, 2.8, -1],
      [-2.5, -0.2, 1],
      [-0.8, -0.2, 1],
      [-2.0, -1.8, 0],
      [1.8, 1.5, 0.5],
      [4.2, 2.5, -1],
      [3.8, 0.5, 0.8],
      [3.8, -0.5, 0.5],
      [2.5, -2.0, 0.5],
      [-3.0, -2.8, 2],
      [3.0, -2.8, 2],
      [0.0, -2.8, 2],
    ] as [number, number, number][];
  }, []);

  return (
    <group>
      {/* Connecting Lines */}
      {linesData.map((line, idx) => {
        const points = [
          new THREE.Vector3(...line.from as [number, number, number]),
          new THREE.Vector3(...line.to as [number, number, number]),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({
          color: "#0022FF",
          transparent: true,
          opacity: 0.25,
          linewidth: 1,
        });
        const lineObj = new THREE.Line(geometry, material);

        return <primitive key={idx} object={lineObj} />;
      })}

      {/* Small Glowing Blue Anchor Points / Dots */}
      {anchorPoints.map((pos, idx) => (
        <group key={idx} position={pos}>
          {/* Solid blue core */}
          <mesh>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshBasicMaterial color="#0022FF" />
          </mesh>
          {/* Subtle outer glow box */}
          <mesh>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshBasicMaterial color="#0066FF" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
