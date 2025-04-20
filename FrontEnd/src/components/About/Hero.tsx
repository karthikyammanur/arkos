import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

function HeroSection() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="">About </span>
            <span className=" text-green-600">Arkos</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Arkos is an AI-powered energy platform that forecasts demand,
            estimates carbon emissions, and lets you query PDF reports via an
            intelligent chatbot.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 lg:p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Lightbulb className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
  We wanted to use AI to transform the way we traditionally view data. Our mission is to empower businesses and homeowners to visualize their energy consumption with interactive graphs and accurate forecasting models, and to speed through lengthy reports using an intelligent chatbot.
</p>
<p className="text-gray-600">
  Born out of our 24-hour HackAI competition, Arkos embodies this vision: the Arkos System tool delivers clear visualizations of energy usage and CO₂ emissions, while the Arkos Assistant ingests PDF reports and answers specific queries to help you find insights instantly.
</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
