import ModelPart from "../../utils/Modelpart";
import * as THREE from "three";
import useScrollProgress from "../../utils/useScrollProgress";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const TableAssembly = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useScrollProgress();

  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  const heroPosition = new THREE.Vector3(2.8, 0.5, 0.5);
  const aboutPosition = new THREE.Vector3(0, -1, -0.5);

  useFrame(() => {
    if (!groupRef.current) return;

    const t = scrollProgress;

    // -----------------------------
    // POSITION — right (hero) → left (about)
    // -----------------------------
    const enterT = clamp(t / 0.9, 0, 1);

    const targetX = THREE.MathUtils.lerp(
      heroPosition.x,
      aboutPosition.x,
      enterT
    );
    const targetY = THREE.MathUtils.lerp(
      heroPosition.y,
      aboutPosition.y,
      enterT
    );
    const targetZ = THREE.MathUtils.lerp(
      heroPosition.z,
      aboutPosition.z,
      enterT
    );

    groupRef.current.position.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      0.1
    );

    // -----------------------------
    // ROTATION — 180° spin during transition
    // -----------------------------
    const targetRotation = THREE.MathUtils.lerp(0, Math.PI, enterT);
    groupRef.current.rotation.y +=
      (targetRotation - groupRef.current.rotation.y) * 0.09;

    // -----------------------------
    // SCALE — original → big → original (bell curve)
    // -----------------------------
    const baseScale = 0.4;
    const peakScale = 0.7;

    // sin(t * PI) gives a smooth 0 → 1 → 0 arc over the full scroll
    const bellT = Math.sin(enterT * Math.PI / 2); // Adjust frequency for faster/smoother scaling
    const targetScale = THREE.MathUtils.lerp(baseScale, peakScale, bellT);

    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );
  });

  return (
    <group ref={groupRef} scale={0.4}>
      <ModelPart path="/models/Foot.glb" position={[0, 0, 0]} />
      <ModelPart path="/models/Glass.glb" position={[0, 0.01, 0]} />
    </group>
  );
};

export default TableAssembly;
