import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#005776] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ramboll Contract Validator</h3>
            <p className="text-sm text-gray-300">
              Streamlining contract validation with AI-powered analysis and legal context.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.ramboll.com/contact" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="space-y-2">
              <a 
                href="https://www.ramboll.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                www.ramboll.com
              </a>
              <a 
                href="mailto:contact@ramboll.com" 
                className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                contact@ramboll.com
              </a>
              <a 
                href="https://github.com/alinaqi/rcv-frontend" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub Repository
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Ramboll. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 