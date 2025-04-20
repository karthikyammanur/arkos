import { motion } from "framer-motion";
import {
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
    return (
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
                onClick={() => navigate("/")}>
                <Zap className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Arkos
                </span>
              </motion.div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/aichatbot">Arkos Assistant</NavLink>
              <NavLink href="/dashboard">Arkos System</NavLink>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-green-600 hover:text-green-700 transition"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </motion.a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
      <a
        href={href}
        className="text-gray-700 hover:text-green-600 px-3 py-2 font-medium transition duration-150 ease-in-out"
      >
        {children}
      </a>
    );
  }

  export default Navbar;