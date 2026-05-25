import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import TableAssembly from "./TableAssembly";

const CanvaScene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
        {/* LIGHTS */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <TableAssembly />

        {/* ENV LIGHT (important for glass realism) */}
        <Environment preset="warehouse" />

        <OrbitControls
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default CanvaScene;
