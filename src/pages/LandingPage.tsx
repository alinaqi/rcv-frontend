import React from 'react';
import { ArrowRight, Shield, Clock, FileCheck, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <div className="relative h-screen">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.4)' }}
        >
          <source src="https://videos.pexels.com/video-files/3246280/3246280-sd_640_360_25fps.mp4" type="video/mp4" />
        </video>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Streamline Your Contract Validation Process
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              RCV helps Ramboll employees and vendors validate contracts efficiently, ensuring compliance and reducing risks.
            </p>
            <Link
              to="/upload"
              className="bg-[#005776] text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-[#003d52] transition-colors inline-flex items-center"
            >
              Start Validating Now
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#005776] mb-16">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-[#005776]" />,
                title: "Secure Validation",
                description: "Enterprise-grade security for all your contract validation needs"
              },
              {
                icon: <Clock className="w-8 h-8 text-[#005776]" />,
                title: "Quick Processing",
                description: "Validate contracts in minutes, not days"
              },
              {
                icon: <FileCheck className="w-8 h-8 text-[#005776]" />,
                title: "Compliance Check",
                description: "Automatic compliance verification with company policies"
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-[#005776]" />,
                title: "Analytics",
                description: "Comprehensive reports and insights"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#005776]">Why Choose RCV?</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              RCV streamlines the contract validation process, saving time and reducing errors while ensuring compliance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Time Savings",
                description: "Reduce contract validation time by up to 75% with automated processing"
              },
              {
                title: "Error Reduction",
                description: "Minimize human errors with AI-powered validation checks"
              },
              {
                title: "Cost Effective",
                description: "Save resources by streamlining the validation process"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-[#F5F7FA] p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#005776] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/Ramboll_Logo.svg" alt="Ramboll Logo" className="h-8 mb-4 brightness-0 invert" />
              <p className="text-sm">Making your contract validation process efficient and reliable.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-gray-300">Features</a></li>
                <li><a href="#benefits" className="hover:text-gray-300">Benefits</a></li>
                <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-sm">Email: support@ramboll.com</p>
              <p className="text-sm">Phone: +45 5161 1000</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Ramboll. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;