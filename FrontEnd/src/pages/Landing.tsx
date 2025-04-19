import { useState } from 'react';
import Logo from '/vite.svg'; //TODO: Get logo from chatgt

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0">
            <a href="/">
              <img className="h-8 w-auto" src={Logo} alt="EnergyGrid Logo" />
            </a>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="flex items-center space-x-2 hover:text-green-300">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-6 h-6 text-white"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
>
  {/* Roof */}
  <path d="M3 12l9-9 9 9" />
  {/* House body with rounded corners */}
  <rect x="6" y="12" width="12" height="8" rx="2" ry="2" />
  {/* Simple centered door */}
  <path d="M12 16v4" />
</svg>
              <span>Home</span>
            </a>

            <a href="#" className="flex items-center space-x-2 hover:text-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1110 10A10 10 0 0112 2z" />
              </svg>
              <span>About</span>
            </a>

            <a href="#" className="flex items-center space-x-2 bg-white text-green-600 px-3 py-1 rounded-md hover:bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Get Started</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="flex items-center px-3 py-2 rounded-md space-x-2 hover:bg-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
              </svg>
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 rounded-md space-x-2 hover:bg-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1110 10A10 10 0 0112 2z" />
              </svg>
              <span>About</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 rounded-md space-x-2 bg-white text-green-600 hover:bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Get Started</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
