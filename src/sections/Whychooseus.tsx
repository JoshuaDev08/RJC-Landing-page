import { motion } from "framer-motion";
import { Hammer, Ruler, Shield, Truck } from "lucide-react";

const features = [
  {
    icon: Hammer,
    title: "Handcrafted Quality",
    description:
      "Every piece is meticulously crafted by skilled artisans with decades of woodworking experience.",
  },
  {
    icon: Ruler,
    title: "Custom Dimensions",
    description:
      "Tailored to fit your exact specifications. No compromise on size, shape, or design.",
  },
  {
    icon: Shield,
    title: "Durable Materials",
    description:
      "Premium solid wood, aerospace-grade aluminum, and industrial steel for lasting beauty.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description:
      "Professional white-glove delivery and installation service across the country.",
  },
];

const Whychooseus = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl mb-4 text-white">
            Why Choose <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">Us?</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            We combine traditional craftsmanship with modern materials to create
            furniture that stands the test of time.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-600/30"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl mb-3 text-white">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Whychooseus;
