import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Mail, Phone, Globe, AlertCircle as AlertIcon } from 'lucide-react';
import { ContractAnalysis } from '../types/contract';
import DocumentViewer from '../components/DocumentViewer';

function ContractViewer() {
  const [activeTab, setActiveTab] = useState('issues');
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Load analysis from localStorage
    const storedAnalysis = localStorage.getItem('contractAnalysis');
    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis));
    }

    // Load file from localStorage (if stored as base64)
    const storedFile = localStorage.getItem('contractFile');
    if (storedFile) {
      const { name, type, content } = JSON.parse(storedFile);
      const byteCharacters = atob(content);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const file = new File([byteArray], name, { type });
      setFile(file);
    }
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'text-red-700';
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

  const getSeverityBgColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-50';
      case 'high':
        return 'bg-red-50';
      case 'medium':
        return 'bg-yellow-50';
      case 'low':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <AlertIcon className="w-5 h-5 text-red-700" />;
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

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Analysis Data Available</h2>
          <p className="text-gray-500">Please upload a contract to view analysis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Document Viewer */}
            <div className="bg-white rounded-lg shadow-md p-4 h-[800px]">
              <DocumentViewer file={file} issues={analysis.issues} />
            </div>

            {/* Analysis Panel */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#005776] mb-2">Contract Analysis</h2>
                <div className="flex items-center space-x-2">
                  <div className="text-lg font-semibold">Risk Score:</div>
                  <div className={`text-2xl font-bold ${
                    analysis.risk_score <= 30 ? 'text-green-600' : 
                    analysis.risk_score <= 70 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {analysis.risk_score}%
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Analysis performed at: {new Date(analysis.analysis_timestamp).toLocaleString()}
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
                    Issues ({analysis.issues.length})
                  </button>
                  <button
                    className={`py-2 px-4 border-b-2 font-medium ${
                      activeTab === 'suggestions'
                        ? 'border-[#005776] text-[#005776]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('suggestions')}
                  >
                    Suggestions ({analysis.suggestions.length})
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 overflow-auto max-h-[600px] pr-2">
                {activeTab === 'issues' ? (
                  <div className="space-y-4">
                    {analysis.issues.map((issue, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${getSeverityBgColor(issue.severity)}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          {getSeverityIcon(issue.severity)}
                          <span className={`font-semibold ${getSeverityColor(issue.severity)}`}>
                            {issue.type}
                          </span>
                        </div>
                        <div className="text-gray-600 mb-3">{issue.description}</div>
                        <div className="bg-white p-3 rounded border border-gray-200 mb-2">
                          <div className="text-sm text-gray-500 mb-1">Found in paragraph {issue.location.paragraph}:</div>
                          <div className="text-gray-700 italic">"{issue.location.text}"</div>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-[#005776]">Suggestion:</span>
                          <p className="text-gray-600 mt-1">{issue.suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-green-50">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <h3 className="font-semibold text-green-800 mb-2">{suggestion.category}</h3>
                            <p className="text-gray-600 mb-3">{suggestion.description}</p>
                            <div className="bg-white p-3 rounded border border-gray-200">
                              <div className="mb-2">
                                <span className="text-sm font-medium text-gray-500">Current:</span>
                                <p className="text-gray-700 mt-1">{suggestion.current}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-green-600">Suggested:</span>
                                <p className="text-gray-700 mt-1">{suggestion.suggested}</p>
                              </div>
                            </div>
                          </div>
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