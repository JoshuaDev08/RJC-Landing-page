import ModelPart from "../../utils/Modelpart";
import * as THREE from "three";
import useScrollProgress from "../../utils/useScrollProgress";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { materialConfigs, glassMaterialConfigs } from "../../utils/materials";

interface TableAssemblyProps {
  material: string;
  glassMaterial: string;
}

const TableAssembly = ({ material, glassMaterial }: TableAssemblyProps) => {
  const config = materialConfigs[material];
  const glassconfig = glassMaterialConfigs[glassMaterial];
  const { camera } = useThree();

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
    // ENTER PHASE
    // -----------------------------
    const enterT = clamp(t / 0.28, 0, 1);


    // -----------------------------
    // POSITION — right → left
    // -----------------------------
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
    // ROTATION — 180° spin
    // -----------------------------
    const targetRotation = THREE.MathUtils.lerp(0, Math.PI, enterT);

    groupRef.current.rotation.y +=
      (targetRotation - groupRef.current.rotation.y) * 0.06;

    // ❌ REMOVED broken exit rotation (it was overriding itself)

    // -----------------------------
    // SCALE — bell curve
    // -----------------------------
    const baseScale = 0.4;
    const peakScale = 0.7;

    const bellT = Math.sin((enterT * Math.PI) / 2);

    const targetScale = THREE.MathUtils.lerp(
      baseScale,
      peakScale,
      bellT
    );

    groupRef.current.scale.lerp(
      new THREE.Vector3(
        targetScale,
        targetScale,
        targetScale
      ),
      0.15
    );

    // -----------------------------
    // CAMERA — move to front on exitT
    // -----------------------------
    const frontCameraPos = new THREE.Vector3(0, 0.5, 3);
    const backCameraPos = new THREE.Vector3(5, 3, 5);
    
    // 0 → 1 → 0 behavior based on scroll
    const cameraT = clamp((t - 0.48) / 0.38, 0, 1);
    
    camera.position.lerp(
      new THREE.Vector3(
        THREE.MathUtils.lerp(backCameraPos.x, frontCameraPos.x, cameraT),
        THREE.MathUtils.lerp(backCameraPos.y, frontCameraPos.y, cameraT),
        THREE.MathUtils.lerp(backCameraPos.z, frontCameraPos.z, cameraT)
      ),
      0.12
    );
    
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef} scale={0.4}>
      <ModelPart
        path="/models/Foot.glb"
        position={[0, 0, 0]}
        materialConfig={config}
      />
      <ModelPart
        path="/models/GlassNew.glb"
        position={[0, 0.05, 0]}
        glassMaterialConfig={glassconfig}
      />
    </group>
  );
};

export default TableAssembly;