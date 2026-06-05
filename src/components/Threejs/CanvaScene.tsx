import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import TableAssembly from "./TableAssembly";
import { useRef, useEffect } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import MaterialHotspot from "./MaterialHotspot";
import WoodMaterialHotspot from "./WoodMaterialHotspot";
import GlassMaterialHotspot from "./GlassMaterialHotspot";
import InfoHotspot from "./InfoHotspot";
import { useState } from "react";

type Section = "hero" | "builder" | "projects";

interface CanvaSceneProps {
  section: Section;
}

const CanvaScene = ({ section }: CanvaSceneProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState("Metal Base");
  const [selectedGlassMaterial, setSelectedGlassMaterial] = useState("Clear");
  const orbitRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (section === "hero" && orbitRef.current) {
      orbitRef.current.reset(); // ← resets rotation back to original when returning to hero
    }
  }, [section]);

  const shouldRender =
    section === "hero" || section === "builder" || section === 'projects' ;

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-10">
      <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
        <ambientLight intensity={section === "builder" ? 1.5 : 1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={section === "builder" ? 3 : 2}
        />

        <TableAssembly
          material={selectedMaterial}
          glassMaterial={selectedGlassMaterial}
        />
        <MaterialHotspot
          show={section === "builder"}
          selectedMaterial={selectedMaterial}
          onMaterialChange={setSelectedMaterial}
        />
        <WoodMaterialHotspot
          show={section === "builder"}
          selectedMaterial={selectedMaterial}
          onMaterialChange={setSelectedMaterial}
        />
        <GlassMaterialHotspot
          show={section === "builder"}
          selectedGlassMaterial={selectedGlassMaterial}
          onMaterialChange={setSelectedGlassMaterial}
        />
        <InfoHotspot
          show={section === "builder"}
          selectedGlassMaterial={selectedGlassMaterial}
          selectedMaterial={selectedMaterial}
        />
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
