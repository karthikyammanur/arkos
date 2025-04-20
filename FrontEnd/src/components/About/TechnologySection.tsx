import { motion } from "framer-motion";
// Technology Section
function TechnologySection() {
    const technologies = [
      {
        name: "React",
        description: "Frontend UI components and state management",
      },
      {
        name: "TensorFlow",
        description: "Deep learning models for energy prediction",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework for styling",
      },
      {
        name: "Framer Motion",
        description: "Animation library for smooth transitions",
      },
      {
        name: "Python",
        description: "Backend data processing and model training",
      },
      { name: "Flask", description: "High-performance API for model serving" },
    ];
  
    return (
      <section id="technology" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Our Technology Stack
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              The tools and technologies powering EnergyAI
            </p>
          </motion.div>
  
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech, index) => (
              <TechCard key={index} tech={tech} index={index} />
            ))}
          </div>
  
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 bg-white rounded-2xl shadow-lg p-6 lg:p-8"
          >
            
          </motion.div>
        </div>
      </section>
    );
  }
  
  interface Tech {
    name: string;
    description: string;
  }
  
  function TechCard({ tech, index }: { tech: Tech; index: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border-l-4 border-green-500"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{tech.name}</h3>
        <p className="text-gray-600">{tech.description}</p>
      </motion.div>
    );
  }
  

  export default TechnologySection;
  