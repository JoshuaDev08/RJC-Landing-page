import { motion } from "framer-motion";
import { Sparkles, Palette, Hammer, Package } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Choose Design",
    description: "Browse our collection or start from scratch with your unique vision.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Customize",
    description: "Select materials, dimensions, and finishes using our interactive builder.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Build",
    description: "Our master craftsmen bring your design to life with precision and care.",
  },
  {
    number: "04",
    icon: Package,
    title: "Deliver",
    description: "White-glove delivery and professional installation at your location.",
  },
];


const ProcessTimeline = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl mb-4 text-zinc-900">
            How It <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">Works</span> 
          </h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            From concept to completion, we make custom furniture simple and enjoyable.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 -translate-y-1/2"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 border border-zinc-100 h-full">
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-20 h-20 cursor-pointer bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-600/30 relative"
                      >
                        <Icon className="w-10 h-10 text-white" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm text-zinc-900 shadow-md">
                          {step.number}
                        </div>
                      </motion.div>

                      <h3 className="text-xl mb-3 text-zinc-900">
                        {step.title}
                      </h3>
                      <p className="text-zinc-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-12 z-20">
                      <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 border-t-2 border-r-2 border-amber-600 rotate-45"
                      ></motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline