import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { useEffect } from "react";
import * as THREE from "three";

type ModelPartProps = {
  path: string;
  position?: [number, number, number];
  scale?: number;
  color?: string;  // ✅ optional color
};

const ModelPart = ({
  path,
  position = [0, 0, 0],
  scale = 1,
  color
}: ModelPartProps) => {
  const { scene } = useGLTF(path) as { scene: Group };

  useEffect(() => {
    if (!color) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // ✅ apply color to every mesh in the model
        (mesh.material as THREE.MeshStandardMaterial).color.set(color);
      }
    });
  }, [color, scene]);

  return <primitive object={scene} position={position} scale={scale} />;
};

export default ModelPart;
