import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart3, Zap, LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Title,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Title,
  Filler,
  Legend
);

export default function Dashboard() {
  const [activeFeature, setActiveFeature] = useState("overview");
  const [forecastData, setForecastData] = useState({ labels: [], data: [] });
  const [optimizerData, setOptimizerData] = useState([]);
  const [emissionsData, setEmissionsData] = useState(null);
  const navigate = useNavigate();

  const features = [
    { id: "forecast", name: "Energy Forecasting", icon: <LineChart /> },
    { id: "optimizer", name: "Smart Grid Optimizer", icon: <Zap /> },
    { id: "emissions", name: "Emissions Estimator", icon: <BarChart3 /> },
  ];

  // Fetch forecast
  useEffect(() => {
    if (activeFeature === "forecast") {
      axios
        .get("http://127.0.0.1:5000/api/forecast")
        .then((res) =>
          setForecastData({ labels: res.data.labels, data: res.data.data })
        )
        .catch((err) => console.error(err));
    }
  }, [activeFeature]);

  // Fetch optimizer
  useEffect(() => {
    if (activeFeature === "optimizer") {
      axios
        .get("http://127.0.0.1:5000/api/optimizer")
        .then((res) => setOptimizerData(res.data))
        .catch((err) => console.error(err));
    }
  }, [activeFeature]);

  // Fetch emissions
  useEffect(() => {
    if (activeFeature === "emissions") {
      axios
        .get("http://127.0.0.1:5000/api/emissions")
        .then((res) => setEmissionsData(res.data))
        .catch((err) => console.error(err));
    }
  }, [activeFeature]);

  // Line chart config
  const lineChartOptions = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      tooltip: { enabled: true },
      title: { display: true, text: "Predicted Demand (kW) by Hour" },
    },
    scales: {
      x: { title: { display: true, text: "Hour of Day" } },
      y: { title: { display: true, text: "Demand (kW)" } },
    },
  };
  const lineChartData = {
    labels: forecastData.labels,
    datasets: [
      {
        label: "Demand (kW)",
        data: forecastData.data,
        fill: true,
        tension: 0.4,
        backgroundColor: "rgba(34,197,94,0.2)",
        borderColor: "rgba(34,197,94,1)",
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  // Bar chart config
  const barChartOptions = {
    responsive: true,
    plugins: {
      tooltip: { enabled: true },
      title: { display: true, text: "Renewable vs Non‑renewable Supply by Hour" },
      legend: { position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Hour of Day" } },
      y: { title: { display: true, text: "Supply (kW)" } },
    },
  };
  const barChartData = {
    labels: optimizerData.map((h) => h.hour),
    datasets: [
      {
        label: "Renewable (kW)",
        data: optimizerData.map((h) => h.renewable_used_kW),
        backgroundColor: "rgba(59,130,246,0.6)",
        borderColor: "rgba(59,130,246,1)",
        borderWidth: 1,
      },
      {
        label: "Non‑renewable (kW)",
        data: optimizerData.map((h) => h.nonrenewable_kW),
        backgroundColor: "rgba(37,99,235,0.6)",
        borderColor: "rgba(37,99,235,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col shadow-xl">
        <div className="flex items-center px-4 py-5 bg-green-800">
          <Zap className="w-6 h-6 text-green-200 mr-2" />
          <h1 className="text-2xl font-bold tracking-tight">Arkos System</h1>
        </div>
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <p className="text-xs font-semibold uppercase text-green-200 mb-4 tracking-wider">
            Features
          </p>
          <ul className="space-y-2">
            {features.map((f) => (
              <li key={f.id}>
                <button
                  onClick={() => setActiveFeature(f.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
                    activeFeature === f.id
                      ? "bg-white text-green-800"
                      : "text-white hover:bg-green-600 hover:text-white/90"
                  }`}
                >
                  <span className="mr-3">{f.icon}</span>
                  <span className="text-sm font-medium">{f.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-4 bg-green-800">
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-300 mr-2"></span>
            <span className="text-xs text-green-200">System Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow rounded-tl-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {features.find((f) => f.id === activeFeature)?.name || "Overview"}
            </h2>
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-green-700 text-sm hover:text-green-800 cursor-pointer"
            >
              <span className="mr-1">Back to Home</span>
              <svg
                className="w-4 h-4 transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="p-6">
          <AnimatePresence exitBeforeEnter>
            {/* Forecast Chart */}
            {activeFeature === "forecast" && (
              <motion.div
                key="forecast"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <Line data={lineChartData} options={lineChartOptions} />
              </motion.div>
            )}

            {/* Optimizer Chart */}
            {activeFeature === "optimizer" && (
              <motion.div
                key="optimizer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <Bar data={barChartData} options={barChartOptions} />
              </motion.div>
            )}

            {/* Emissions Estimator */}
            {activeFeature === "emissions" && emissionsData && (
              <motion.div
                key="emissions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    ["Baseline CO₂ (kg)", emissionsData.baseline_CO2_kg],
                    ["Optimized CO₂ (kg)", emissionsData.optimized_CO2_kg],
                    ["Saved CO₂ (kg)", emissionsData.saved_CO2_kg],
                    ["% CO₂ Saved", emissionsData.percent_saved + "%"],
                    ["Car Miles Avoided", emissionsData.car_miles_avoided],
                    ["Trees Equivalent", emissionsData.trees_planted_equivalent],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-green-50 rounded-lg p-4 border border-green-100"
                    >
                      <p className="text-xs font-semibold text-green-700 uppercase">
                        {label}
                      </p>
                      <p className="mt-1 text-2xl font-bold text-gray-900">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Placeholder */}
            {activeFeature !== "forecast" &&
              activeFeature !== "optimizer" &&
              activeFeature !== "emissions" && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-green-300 rounded-lg">
                    <div className="text-center">
                      <Zap className="mx-auto h-12 w-12 text-green-600" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">
                        Select a feature from the sidebar
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Feature content will be displayed here
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
