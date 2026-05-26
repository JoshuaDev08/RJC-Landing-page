import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import BuilderOverlay from "../components/BuilderOverlay";

type Section = "hero" | "builder";

interface BuilderProps {
  onSectionChange: (section: Section) => void;
}

const Builder = ({ onSectionChange }: BuilderProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      const entered = rect.top <= 0;
      const exited = rect.top > 0;

      if (entered) {
        setShowContent(true);
        onSectionChange("builder");
      } else if (exited) {
        setShowContent(false);
        onSectionChange("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onSectionChange]);
  return (
    <section
      ref={sectionRef}
      id="builder"
      className="min-h-screen bg-gradient-to-br from-zinc-800 via-amber-950 to-zinc-900 relative overflow-hidden"
    >
      {/* BG Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-warning/10 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, x: -120, scale: 0.95 }}
        animate={
          showContent
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: -120, scale: 0.95 }
        }
        transition={
          showContent
            ? { duration: 0.7, ease: "easeInOut" } // smooth enter when scrolling down
            : { duration: 0.1, ease: "easeInOut" } // instant vanish when scrolling up
        }
        className="container flex mx-auto flex-col items-center justify-center relative z-10"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight">
          Design your Perfect <span className="text-warning">Table</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed">
          Customize every detail to match your vision. See your creation come to
          life in real-time.
        </p>
      </motion.div>
      <BuilderOverlay show={showContent} />
    </section>
  );
};

export default Builder;
