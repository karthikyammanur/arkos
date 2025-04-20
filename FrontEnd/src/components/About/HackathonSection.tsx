import { motion } from "framer-motion";

// Hackathon Section
function HackathonSection() {
  return (
    <section
      id="hackathon"
      className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-6">About Arkos</h2>
          <p className="text-green-100 mb-6">
            We first envisioned Arkos as a solution when we noticed how
            tedious it was for companies and households to manually sift
            through energy reports. Arkos is an app powered by a
            conversational chatbot that ingests PDF or CSV energy consumption
            reports—whether from a corporate annual report or a home's meter
            readings—and provides clear, actionable insights.
          </p>
          <p className="text-green-100 mb-6">
            To bring Arkos to life, our team divided responsibilities: Karthik
            and Shaheem focused on building and training the machine-learning
            models as well as the RAG-powered chatbot pipeline for deep report
            analysis, while Tejas and Aaroh architected and implemented the
            Flask backend and crafted a smooth, intuitive React frontend to
            seamlessly connect the AI services with a friendly UI/UX.
          </p>
          <p className="text-green-100">
            Under the hood, we leverage an LSTM network to forecast energy
            demand patterns, and deploy Retrieval-Augmented Generation
            for our chatbot—allowing Arkos to both predict future usage and
            intelligently answer user queries by reading and summarizing
            company or household energy reports.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HackathonSection;