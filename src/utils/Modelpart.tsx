import { useGLTF } from "@react-three/drei";
import { Group } from "three";

type ModelPartProps = {
  path: string;
  position?: [number, number, number];
  scale?: number;
};

const ModelPart = ({
  path,
  position = [0, 0, 0],
  scale = 1,
}: ModelPartProps) => {
  const { scene } = useGLTF(path) as { scene: Group };

  return <primitive object={scene} position={position} scale={scale} />;
};

export default ModelPart;
