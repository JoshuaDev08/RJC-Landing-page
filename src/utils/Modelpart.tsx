// ModelPart.tsx
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import type { MaterialConfig, GlassMaterialConfig } from "./materials";

// Cache textures
const textureCache = new Map<string, THREE.Texture>();

const loadTexture = (path: string): THREE.Texture => {
  if (textureCache.has(path)) return textureCache.get(path)!;

  const tex = new THREE.TextureLoader().load(path);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);

  textureCache.set(path, tex);
  return tex;
};

type ModelPartProps = {
  path: string;
  position?: [number, number, number];
  scale?: number;
  materialConfig?: MaterialConfig;
  glassMaterialConfig?: GlassMaterialConfig;
};

const ModelPart = ({
  path,
  position = [0, 0, 0],
  scale = 1,
  materialConfig,
  glassMaterialConfig,
}: ModelPartProps) => {
  const { scene } = useGLTF(path);

  useEffect(() => {
    if (!materialConfig && !glassMaterialConfig) return;

    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;

      const mesh = child as THREE.Mesh;

      // =================================================
      // GLASS MATERIAL (PRIORITY)
      // =================================================
      if (glassMaterialConfig) {
        let glassMat = mesh.material as THREE.MeshPhysicalMaterial;

        // reuse material if possible
        if (!glassMat || glassMat.type !== "MeshPhysicalMaterial") {
          glassMat = new THREE.MeshPhysicalMaterial();
        }

        glassMat.color = new THREE.Color(glassMaterialConfig.color);
        glassMat.transmission = glassMaterialConfig.transmission;
        glassMat.opacity = glassMaterialConfig.opacity;
        glassMat.roughness = glassMaterialConfig.roughness;
        glassMat.metalness = glassMaterialConfig.metalness;
        glassMat.thickness = glassMaterialConfig.thickness;
        glassMat.ior = glassMaterialConfig.ior;

        glassMat.transparent = true;
        glassMat.envMapIntensity = 1.5;

        mesh.material = glassMat;
        return;
      }

      // =================================================
      // NORMAL MATERIAL
      // =================================================
      if (materialConfig) {
        const baseMat = mesh.material as THREE.MeshStandardMaterial;

        const cloned = baseMat.clone();

        cloned.color.set(materialConfig.color);
        cloned.metalness = materialConfig.metalness;
        cloned.roughness = materialConfig.roughness;

        cloned.map = materialConfig.map
          ? loadTexture(materialConfig.map)
          : null;

        cloned.roughnessMap = materialConfig.roughnessMap
          ? loadTexture(materialConfig.roughnessMap)
          : null;

        cloned.normalMap = materialConfig.normalMap
          ? loadTexture(materialConfig.normalMap)
          : null;

        cloned.needsUpdate = true;

        mesh.material = cloned;
      }
    });
  }, [materialConfig, glassMaterialConfig, scene]);

  return <primitive object={scene} position={position} scale={scale} />;
};

export default ModelPart;