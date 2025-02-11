import React, { useEffect, useState } from 'react';
import { DocumentViewer } from '../components/DocumentViewer';
import { ContractAnalysisResults } from '../components/ContractAnalysisResults';
import { ContractAnalysis } from '../types/contract';

export default function ContractViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Load contract file from localStorage
      const storedFile = localStorage.getItem('contractFile');
      if (storedFile) {
        const fileData = JSON.parse(storedFile);
        const base64Response = fileData.content;
        const binaryString = window.atob(base64Response.split(',')[1]);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: fileData.type });
        setFile(new File([blob], fileData.name, { type: fileData.type }));
      }

      // Load analysis from localStorage
      const storedAnalysis = localStorage.getItem('contractAnalysis');
      if (storedAnalysis) {
        setAnalysis(JSON.parse(storedAnalysis));
      }
    } catch (err) {
      console.error('Error accessing storage:', err);
      setError('Unable to load contract data. Please try uploading the contract again.');
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!file || !analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Contract Found</h2>
          <p className="text-gray-500">Please upload a contract to view analysis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Document Viewer */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#005776] mb-4">Contract Document</h2>
          <DocumentViewer 
            file={file} 
            redlines={analysis.redlines} 
            issues={analysis.issues}
          />
        </div>

        {/* Analysis Results */}
        <div className="lg:max-h-screen lg:overflow-y-auto">
          <ContractAnalysisResults analysis={analysis} />
        </div>
      </div>
    </div>
  );
}