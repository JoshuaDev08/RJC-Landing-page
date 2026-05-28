import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

interface Props {
  show: boolean;
  onMaterialChange: (material: string) => void;
  selectedGlassMaterial: string;
}

const START = new THREE.Vector3(0.3, 0.6, 0);
const MID = new THREE.Vector3(-3, 1.3, 0);
const END = new THREE.Vector3(-5.5, 1, 0);

const GlassMaterialHotspot = ({
  show,
  onMaterialChange,
  selectedGlassMaterial,
}: Props) => {
  const progress = useRef(0);
  const [showCard, setShowCard] = useState(false);

  const dotRef = useRef<THREE.Mesh>(null);
  const lineGeoRef = useRef<THREE.BufferGeometry>(null);

  // Pre-allocate a flat Float32Array for 3 points (x,y,z each)
  const positions = useRef(
    new Float32Array([
      START.x,
      START.y,
      0,
      START.x,
      START.y,
      0,
      START.x,
      START.y,
      0,
    ])
  );

  useFrame(() => {
    const target = show ? 1 : 0;
    const speed = show ? 0.08 : 0.18;
    progress.current += (target - progress.current) * speed;
    if (progress.current < 0.01) progress.current = 0;
    if (progress.current > 0.99) progress.current = 1;

    const p = progress.current;

    let tipX: number, tipY: number;

    if (p <= 0.5) {
      const t = p / 0.5;
      tipX = START.x + (MID.x - START.x) * t;
      tipY = START.y + (MID.y - START.y) * t;

      // START → tip → tip (second segment has zero length = invisible)
      positions.current[0] = START.x;
      positions.current[1] = START.y;
      positions.current[3] = tipX;
      positions.current[4] = tipY;
      positions.current[6] = tipX;
      positions.current[7] = tipY;
    } else {
      const t = (p - 0.5) / 0.5;
      tipX = MID.x + (END.x - MID.x) * t;
      tipY = MID.y + (END.y - MID.y) * t;

      // START → MID → tip
      positions.current[0] = START.x;
      positions.current[1] = START.y;
      positions.current[3] = MID.x;
      positions.current[4] = MID.y;
      positions.current[6] = tipX;
      positions.current[7] = tipY;
    }

    // Push updated positions to GPU
    if (lineGeoRef.current) {
      const attr = lineGeoRef.current.attributes
        .position as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    // Dot
    if (dotRef.current) {
      dotRef.current.position.set(tipX!, tipY!, 0);
      dotRef.current.visible = p > 0.01;
    }

    // Card — only re-render when it flips
    const shouldShow = p > 0.85;
    if (shouldShow !== showCard) setShowCard(shouldShow);
  });

  return (
    <>
      {/* Raw Three.js line — geometry ref works reliably */}
      <line>
        <bufferGeometry ref={lineGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions.current, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#facc15" linewidth={10} />
      </line>

      <mesh ref={dotRef} visible={false}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#facc15" />
      </mesh>

      {showCard && (
        <Html
          position={[END.x - 8, END.y, 0]}
          style={{ overflow: "visible", pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            style={{
              position: "absolute",
              top: "-10px",
              left: "-20px",
              width: "290px",
              pointerEvents: "auto",
            }}
            className="bg-black/40 backdrop-blur-xl border border-warning/20 rounded-2xl p-5"
          >
            <h3 className="text-warning">Glass Types</h3>
            <div className="flex flex-col gap-2 mt-2">
              {["Clear", "Frosted", "Smoked", "Bronze Tint", "Ultra Clear", "Black"].map(
                (material) => (
                  <label key={material} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="glass-material-global"
                      className="radio radio-warning radio-sm"
                      checked={selectedGlassMaterial === material}
                      onChange={() => onMaterialChange(material)}
                    />
                    <span className="text-sm text-white">{material}</span>
                  </label>
                )
              )}
            </div>
          </motion.div>
        </Html>
      )}
    </>
  )
};

export default GlassMaterialHotspot;
