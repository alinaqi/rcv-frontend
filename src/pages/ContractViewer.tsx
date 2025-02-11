import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { AlertTriangle, CheckCircle, XCircle, Mail, Phone, Globe } from 'lucide-react';

// Mock data for contract analysis
const mockAnalysis = {
  score: 85,
  issues: [
    {
      severity: 'high',
      section: 'Liability Clause',
      description: 'Unlimited liability clause detected - consider adding reasonable caps',
      recommendation: 'Add liability caps based on contract value or insurance coverage'
    },
    {
      severity: 'medium',
      section: 'Payment Terms',
      description: 'Payment terms exceed standard 30-day policy',
      recommendation: 'Adjust payment terms to align with company policy'
    },
    {
      severity: 'low',
      section: 'Notice Period',
      description: 'Notice period shorter than recommended',
      recommendation: 'Consider extending notice period to standard 60 days'
    }
  ],
  suggestions: [
    'Add force majeure clause to address unforeseen circumstances',
    'Include specific performance metrics and KPIs',
    'Add dispute resolution mechanism'
  ]
};

function ContractViewer() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [activeTab, setActiveTab] = useState('issues');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PDF Viewer */}
            <div className="bg-white rounded-lg shadow-md p-4 h-[800px]">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl="/sample-contract.pdf"
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>

            {/* Analysis Panel */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#005776] mb-2">Contract Analysis</h2>
                <div className="flex items-center space-x-2">
                  <div className="text-lg font-semibold">Score:</div>
                  <div className={`text-2xl font-bold ${mockAnalysis.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {mockAnalysis.score}%
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-4">
                  <button
                    className={`py-2 px-4 border-b-2 font-medium ${
                      activeTab === 'issues'
                        ? 'border-[#005776] text-[#005776]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('issues')}
                  >
                    Issues
                  </button>
                  <button
                    className={`py-2 px-4 border-b-2 font-medium ${
                      activeTab === 'suggestions'
                        ? 'border-[#005776] text-[#005776]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('suggestions')}
                  >
                    Suggestions
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {activeTab === 'issues' ? (
                  <div className="space-y-4">
                    {mockAnalysis.issues.map((issue, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {getSeverityIcon(issue.severity)}
                          <span className={`font-semibold ${getSeverityColor(issue.severity)}`}>
                            {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Severity
                          </span>
                        </div>
                        <h3 className="font-semibold mb-1">{issue.section}</h3>
                        <p className="text-gray-600 mb-2">{issue.description}</p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Recommendation:</span> {issue.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockAnalysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <p className="text-gray-600">{suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#005776] text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/59/Ramboll_Logo.svg" 
                alt="Ramboll Logo" 
                className="h-8 mb-4 brightness-0 invert" 
              />
              <p className="text-sm">Empowering better contract decisions with AI-powered analysis.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Support</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:support@ramboll.com" className="hover:text-gray-300">support@ramboll.com</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+4551611000" className="hover:text-gray-300">+45 5161 1000</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <a href="https://www.ramboll.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">www.ramboll.com</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Ramboll. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ContractViewer;