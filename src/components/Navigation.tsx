import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <nav className={`relative z-10 ${isLandingPage ? 'bg-white/95' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/Ramboll_Logo.svg" alt="Ramboll Logo" className="h-8" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/#features" className="text-[#005776] hover:text-[#003d52] font-medium">Features</Link>
              <Link to="/#benefits" className="text-[#005776] hover:text-[#003d52] font-medium">Benefits</Link>
              <Link to="/#contact" className="text-[#005776] hover:text-[#003d52] font-medium">Contact</Link>
              <Link
                to="/upload"
                className="bg-[#005776] text-white px-4 py-2 rounded-md hover:bg-[#003d52] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;