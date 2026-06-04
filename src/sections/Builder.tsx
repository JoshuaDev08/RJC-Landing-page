import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type Section = "hero" | "builder";

interface BuilderProps {
  onSectionChange: (section: Section) => void;
}

const Builder = ({ onSectionChange }: BuilderProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const [showContent, setShowContent] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("hero");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = sectionRef.current!.getBoundingClientRect();

          const viewport = window.innerHeight;

          // ENTER (first half of section)
          const entered =
            rect.top <= viewport * 0.03 && rect.bottom >= viewport * 0.03;

          // START EXIT (after passing 100vh inside 200vh section)
          const exitStart = rect.top <= -viewport * 0.5;

          const isInside = entered && !exitStart;

          if (isInside) {
            setShowContent(true);

            if (activeSection !== "builder") {
              setActiveSection("builder");
              onSectionChange("builder");
            }
          } else {
            setShowContent(false);

            if (activeSection !== "hero") {
              setActiveSection("hero");
              onSectionChange("hero");
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, onSectionChange]);

  return (
    <section
      ref={sectionRef}
      id="builder"
      className="relative min-h-[200vh] bg-gradient-to-br from-zinc-800 via-amber-950 to-zinc-900"
    >
      {/* BG Glow */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.6,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-warning/10 blur-3xl rounded-full"
          />
        )}
      </AnimatePresence>

      {/* STICKY CONTENT */}
      <div className="sticky top-0 h-screen flex items-start justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key="builder-content"
              initial={{
                opacity: 0,
                y: 120,
                scale: 0.9,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: 80,
                scale: 0.95,
                filter: "blur(10px)",
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="container mx-auto flex flex-col items-center justify-start relative z-10 px-6 text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight">
                Design your Perfect <span className="text-warning">Table</span>
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
                Customize every detail to match your vision. See your creation
                come to life in real-time.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Builder;
