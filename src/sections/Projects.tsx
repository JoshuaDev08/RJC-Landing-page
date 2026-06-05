import { motion } from "framer-motion";
import { productConfigs } from "../utils/FeaturedProjects";

const Projects = () => {
  return (
    <section className="hero min-h-screen overflow-hidden bg-gray-300">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl text-zinc-900">
            Featured{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Explore our collection of handcrafted furniture pieces, each
            designed with precision and built to last.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productConfigs.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
              }}
              style={{ perspective: "1000px" }}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-zinc-50 "
            >
              {/* Image */}
              <figure className="relative h-[200px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <button className="btn btn-warning text-black font-semibold">
                    View Details
                  </button>
                </div>
              </figure>

              {/* Card Body */}
              <div className="card-body">
                <h3 className="card-title text-2xl text-zinc-800">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-zinc-600">{product.material}</p>
                  <span className="text-2xl font-bold text-amber-600">
                    {product.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
