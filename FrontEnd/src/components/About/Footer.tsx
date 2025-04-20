import { Zap } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold">Arkos</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-md">
              Transforming energy insights with cutting-edge AI solutions to drive sustainability and efficiency.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/aichatbot"
                  className="text-gray-400 hover:text-green-400 transition"
                >
                  Arkos Assistant
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-400 hover:text-green-400 transition"
                >
                  Arkos System
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-green-400 transition"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Arkos. All rights reserved.
          </div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
