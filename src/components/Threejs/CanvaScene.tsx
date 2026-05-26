import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import TableAssembly from "./TableAssembly";
import { useRef, useEffect } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Section = "hero" | "builder";

interface CanvaSceneProps {
  section: Section;
}

const CanvaScene = ({ section }: CanvaSceneProps) => {
  const orbitRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (section === "hero" && orbitRef.current) {
      orbitRef.current.reset(); // ← resets rotation back to original when returning to hero
    }
  }, [section]);

  return (
    <div className="fixed inset-0 z-10">
      <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
        <ambientLight intensity={section === "builder" ? 1.5 : 1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={section === "builder" ? 3 : 2}
        />

        <TableAssembly />

        <Environment preset="warehouse" />

        <OrbitControls
          ref={orbitRef}
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default CanvaScene;