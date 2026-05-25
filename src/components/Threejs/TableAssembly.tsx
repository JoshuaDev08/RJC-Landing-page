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

  const basePosition = new THREE.Vector3(2.8, 0.5, 0.5);
  const centerPosition = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    if (!groupRef.current) return;
  
    const t = scrollProgress;
  
    // -----------------------------
    // POSITION — hero → center
    // -----------------------------
    const enterT = clamp(t / 0.6, 0, 1);
  
    const targetX = THREE.MathUtils.lerp(basePosition.x, 0, enterT);
    const targetY = THREE.MathUtils.lerp(basePosition.y, 0, enterT);
    const targetZ = THREE.MathUtils.lerp(basePosition.z, 0, enterT);
  
    groupRef.current.position.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      0.1
    );
  
    // -----------------------------
    // ROTATION — full spin during entry
    // -----------------------------
    const targetRotation = THREE.MathUtils.lerp(0, Math.PI, enterT);
    groupRef.current.rotation.y +=
      (targetRotation - groupRef.current.rotation.y) * 0.1;
  
    // -----------------------------
    // SCALE — zoom in → peak at t=0.5 → zoom out to workspace size
    // No hard snap, lerp handles it all
    // -----------------------------
    const baseScale = 0.4;
    const focusScale = 0.55;
    const workspaceScale = 1.0;
  
    let targetScale: number;
  
    if (t < 0.5) {
      // zoom IN: t 0.0 → 0.5
      const zoomInT = clamp(t / 0.5, 0, 1);
      targetScale = THREE.MathUtils.lerp(baseScale, focusScale, zoomInT);
    } else {
      // zoom OUT all the way to workspace scale: t 0.5 → 1.0
      const zoomOutT = clamp((t - 0.5) / 0.5, 0, 1);
      targetScale = THREE.MathUtils.lerp(focusScale, workspaceScale, zoomOutT);
    }
  
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1  // smooth — no snap
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
