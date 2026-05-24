import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex items-center pt-28 sm:pt-32 lg:pt-0">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left space-y-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex"
            >
              <span className="px-4 py-2 bg-amber-600/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-sm text-warning inline-flex items-center gap-2">
                <span
                  aria-label="warning"
                  className="status status-warning"
                ></span>
                Premium Custom Furniture
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-tight">
              Crafted for{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Your Space
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Custom Wood, Aluminum & Steel Furniture Designed for You.
              Handcrafted excellence meets modern engineering.
            </p>

            {/* CTA */}
            <div className="flex flex-col mt-4 sm:flex-row items-center lg:items-start gap-4">
              <button className="btn btn-warning rounded-full px-8">
                Explore Designs
              </button>

              <button className="btn btn-soft  rounded-full px-8">
                Customize Now
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[650px] flex items-center justify-center">
            {/* 3D Container */}
            <div className="w-full h-full rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center">
              {/* Temporary Placeholder */}
              <p className="text-zinc-400 text-sm sm:text-base">
                3D Furniture Showcase
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
