import { motion } from "framer-motion";

interface BuilderOverlayProps {
  show: boolean;
}

const BuilderOverlay = ({ show }: BuilderOverlayProps) => {
  return (
    <>
      {/* LINE */}
      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={
          show
            ? {
                width: 220,
                opacity: 1,
              }
            : {
                width: 0,
                opacity: 0,
              }
        }
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[32%]
          left-[52%]
          h-[2px]
          bg-warning
          origin-left
          z-30
        "
      >
        {/* DOT */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: show ? 1 : 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.3,
          }}
          className="
            absolute
            -right-2
            -top-[5px]
            w-3
            h-3
            rounded-full
            bg-warning
            shadow-[0_0_15px_#facc15]
          "
        />
      </motion.div>

      {/* BUILDER CARD */}
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={
          show
            ? {
                opacity: 1,
                x: 0,
              }
            : {
                opacity: 0,
                x: -20,
              }
        }
        transition={{
          delay: 0.7,
          duration: 0.5,
        }}
        className="
          absolute
          bottom-[26%]
          left-[68%]
          z-40
          bg-black/40
          backdrop-blur-xl
          border
          border-warning/20
          rounded-2xl
          p-5
          w-[260px]
        "
      >
        <h2 className="text-warning text-sm uppercase tracking-widest mb-3">
          Material
        </h2>

        <h1 className="text-white text-2xl font-bold">Stainless Steel</h1>

        <p className="text-zinc-400 text-sm mt-2">
          Premium powder-coated frame with matte finish.
        </p>
      </motion.div>
    </>
  );
};

export default BuilderOverlay;
