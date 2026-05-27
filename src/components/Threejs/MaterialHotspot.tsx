import { Html, Line } from "@react-three/drei";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
  onMaterialChange: (material: string) => void;
  selectedMaterial: string;
}

// ✅ Edit these 3 points to reposition the hotspot line
const START: [number, number, number] = [1.3, -0.85, 0];
const MID: [number, number, number] = [2.5, -1, 0];
const END: [number, number, number] = [3.5, -0.5, 0];

const MaterialHotspot = ({
  show,
  onMaterialChange,
  selectedMaterial,
}: Props) => {
  const progress = useRef(0);

  const [linePoints, setLinePoints] = useState<[number, number, number][]>([
    START,
    START,
  ]);
  const [dotX, setDotX] = useState(START[0]);
  const [dotY, setDotY] = useState(START[1]);
  const [showCard, setShowCard] = useState(false);
  const [showDot, setShowDot] = useState(false);

  useFrame(() => {
    const target = show ? 1 : 0;
    const speed = show ? 0.08 : 0.18;
    progress.current += (target - progress.current) * speed;

    if (progress.current < 0.01) progress.current = 0;
    if (progress.current > 0.99) progress.current = 1;

    const p = progress.current;

    let tipX: number, tipY: number;
    let points: [number, number, number][];

    if (p <= 0.5) {
      const t = p / 0.5;
      tipX = START[0] + (MID[0] - START[0]) * t;
      tipY = START[1] + (MID[1] - START[1]) * t;
      points = [START, [tipX, tipY, 0]];
    } else {
      const t = (p - 0.5) / 0.5;
      tipX = MID[0] + (END[0] - MID[0]) * t;
      tipY = MID[1] + (END[1] - MID[1]) * t;
      points = [START, MID, [tipX, tipY, 0]];
    }

    setDotX(tipX);
    setDotY(tipY);
    setLinePoints(points);
    setShowDot(p > 0);
    setShowCard(p > 0.85);
  });

  return (
    <>
      <Line points={linePoints} color="#facc15" lineWidth={1.5} />

      {showDot && (
        <mesh position={[dotX, dotY, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
      )}

      {showCard && (
        <Html position={[END[0], END[1], 0]} style={{ overflow: "visible" }}>
          <AnimatePresence>
            {showCard && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                style={{
                  position: "absolute",
                  top: "-50px", // ✅ half of card height, tweak this number
                  left: "12px",
                  width: "260px",
                  pointerEvents: "auto",
                }}
                className="bg-black/40 backdrop-blur-xl border border-warning/20 rounded-2xl p-5"
              >
                <h3 className="text-warning">Base Types</h3>
                <div className="flex flex-col gap-2 mt-2">
                  {[
                    "Metal Base",
                    "Stainless Steel",
                    "Brushed Aluminum",
                    "Matte Black",
                    "Brass",
                  ].map((material) => (
                    <label
                      key={material}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="material"
                        className="radio radio-warning radio-sm"
                        checked={selectedMaterial === material}
                        onChange={() => onMaterialChange(material)} // ✅ fires on change
                      />
                      <span className="text-sm text-white">{material}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
      )}
    </>
  );
};

export default MaterialHotspot;
