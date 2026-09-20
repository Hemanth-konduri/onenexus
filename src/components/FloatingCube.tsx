import React, { useMemo } from "react";
import * as THREE from "three";

interface FloatingCubeProps {
  position: [number, number, number];
  size?: [number, number, number] | number;
  rotation?: [number, number, number];
  speed?: number;
  rotSpeed?: [number, number, number];
  theme?: "blue" | "white" | "dark" | "glass";
  labels?: {
    front?: string[];
    top?: string[];
    side?: string[];
    step?: string;
  };
  roundedRadius?: number;
}

// Generate high-resolution procedural canvas texture with clean typographic labels
function createCubeTexture(
  mainTexts?: string[],
  stepText?: string,
  bgColor: string = "#0022FF",
  textColor: string = "#FFFFFF"
) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background Fill with soft radial gradient
  const grad = ctx.createRadialGradient(256, 256, 50, 256, 256, 360);
  if (bgColor === "#0022FF") {
    grad.addColorStop(0, "#1A40FF");
    grad.addColorStop(1, "#001AD6");
  } else if (bgColor === "#FFFFFF") {
    grad.addColorStop(0, "#FFFFFF");
    grad.addColorStop(1, "#E5E5E5");
  } else {
    grad.addColorStop(0, "#222228");
    grad.addColorStop(1, "#0F0F12");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Subtle border / inner edge line
  ctx.strokeStyle = bgColor === "#FFFFFF" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.25)";
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 472, 472);

  // Technical crosshairs / marks in corners
  ctx.strokeStyle = bgColor === "#FFFFFF" ? "rgba(0,34,255,0.4)" : "rgba(255,255,255,0.4)";
  ctx.lineWidth = 2;
  // Top-left cross
  ctx.beginPath();
  ctx.moveTo(35, 45); ctx.lineTo(55, 45);
  ctx.moveTo(45, 35); ctx.lineTo(45, 55);
  ctx.stroke();

  // Top-right step indicator
  if (stepText) {
    ctx.font = "bold 32px monospace";
    ctx.fillStyle = textColor;
    ctx.textAlign = "right";
    ctx.fillText(stepText, 470, 60);
  }

  // Main Editorial Text Lines in Center
  if (mainTexts && mainTexts.length > 0) {
    ctx.textAlign = "left";
    ctx.fillStyle = textColor;
    let startY = 220 - (mainTexts.length * 28);
    mainTexts.forEach((line, idx) => {
      ctx.font = idx === 0 ? "900 42px sans-serif" : "bold 28px monospace";
      ctx.letterSpacing = "2px";
      ctx.fillText(line.toUpperCase(), 50, startY + idx * 56);
    });
  }

  // Bottom technical tag
  ctx.font = "bold 16px monospace";
  ctx.fillStyle = bgColor === "#FFFFFF" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)";
  ctx.fillText("ONE NEXUS STUDIO // CORE NODE", 50, 470);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function FloatingCube({
  position,
  size = 1.2,
  rotation = [0, 0, 0],
  speed = 1,
  rotSpeed = [0.003, 0.005, 0.002],
  theme = "blue",
  labels,
}: FloatingCubeProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const sizeArr: [number, number, number] = Array.isArray(size) ? size : [size, size, size];

  // Textures for labeled faces
  const frontTexture = useMemo(() => {
    if (!labels?.front) return null;
    return createCubeTexture(
      labels.front,
      labels.step,
      theme === "blue" ? "#0022FF" : theme === "white" ? "#FFFFFF" : "#151518",
      theme === "white" ? "#0F0F12" : "#FFFFFF"
    );
  }, [labels, theme]);

  const sideTexture = useMemo(() => {
    if (!labels?.side) return null;
    return createCubeTexture(
      labels.side,
      labels.step,
      theme === "blue" ? "#0022FF" : theme === "white" ? "#FFFFFF" : "#151518",
      theme === "white" ? "#0F0F12" : "#FFFFFF"
    );
  }, [labels, theme]);

  // Materials
  const materials = useMemo(() => {
    const defaultBlue = new THREE.MeshPhysicalMaterial({
      color: 0x0022ff,
      emissive: 0x001188,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const defaultWhite = new THREE.MeshPhysicalMaterial({
      color: 0xf4f4f6,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    });

    const defaultDark = new THREE.MeshPhysicalMaterial({
      color: 0x18181c,
      roughness: 0.25,
      metalness: 0.9,
      clearcoat: 0.9,
    });

    const defaultMat = theme === "blue" ? defaultBlue : theme === "white" ? defaultWhite : defaultDark;

    if (!frontTexture && !sideTexture) {
      return defaultMat;
    }

    const frontMat = new THREE.MeshPhysicalMaterial({
      map: frontTexture || undefined,
      roughness: 0.2,
      metalness: theme === "white" ? 0.1 : 0.7,
      clearcoat: 0.8,
    });

    const sideMat = new THREE.MeshPhysicalMaterial({
      map: sideTexture || frontTexture || undefined,
      roughness: 0.2,
      metalness: theme === "white" ? 0.1 : 0.7,
      clearcoat: 0.8,
    });

    // Array order: right, left, top, bottom, front, back
    return [
      sideMat,     // right
      defaultMat,  // left
      defaultMat,  // top
      defaultMat,  // bottom
      frontMat,    // front
      defaultMat,  // back
    ];
  }, [theme, frontTexture, sideTexture]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <boxGeometry args={sizeArr} />
      {Array.isArray(materials) ? (
        materials.map((mat, i) => <primitive key={i} object={mat} attach={`material-${i}`} />)
      ) : (
        <primitive object={materials} attach="material" />
      )}
    </mesh>
  );
}
