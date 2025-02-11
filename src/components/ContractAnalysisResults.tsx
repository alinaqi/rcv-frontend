import React from 'react';
import { AlertTriangle, AlertCircle, Info, Check, Book, Gavel, FileText, AlertOctagon } from 'lucide-react';
import { ContractAnalysis } from '../types/contract';
import { CollapsibleSection } from './CollapsibleSection';

interface ContractAnalysisResultsProps {
  analysis: ContractAnalysis;
}

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'low':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default:
      return 'text-blue-600 bg-blue-50 border-blue-200';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'high':
      return <AlertTriangle className="w-5 h-5" />;
    case 'medium':
      return <AlertCircle className="w-5 h-5" />;
    case 'low':
      return <Info className="w-5 h-5" />;
    default:
      return <Check className="w-5 h-5" />;
  }
};

export const ContractAnalysisResults: React.FC<ContractAnalysisResultsProps> = ({ analysis }) => {
  return (
    <div className="space-y-4">
      {/* Risk Assessment */}
      <CollapsibleSection 
        title="Risk Assessment" 
        icon={<AlertOctagon />}
        defaultOpen={true}
        className="bg-white"
      >
        <p className="text-gray-700">{analysis.risk_assessment}</p>
      </CollapsibleSection>

      {/* Issues */}
      <CollapsibleSection 
        title={`Issues Found (${analysis.issues.length})`}
        icon={<AlertTriangle />}
        defaultOpen={true}
        className="bg-white"
      >
        <div className="space-y-4">
          {analysis.issues.map((issue, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${getSeverityColor(issue.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getSeverityIcon(issue.severity)}
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{issue.location.text}</div>
                  <p className="mt-1 text-sm">{issue.description}</p>
                  <div className="mt-2 text-sm font-medium">
                    Suggestion: {issue.suggestion}
                  </div>
                  <div className="mt-1 text-xs">
                    Location: Paragraph {issue.location.paragraph}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Suggestions */}
      <CollapsibleSection 
        title="Improvement Suggestions"
        icon={<FileText />}
        className="bg-white"
      >
        <ul className="list-disc list-inside space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="text-gray-700">{suggestion}</li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Legal Context */}
      <CollapsibleSection 
        title="Legal Context"
        icon={<Book />}
        className="bg-white"
      >
        <div className="space-y-6">
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Summary</h4>
            <p className="text-gray-700">{analysis.legal_context.summary}</p>
          </div>

          {/* Laws */}
          <CollapsibleSection 
            title="Applicable Laws"
            icon={<Book />}
          >
            <div className="space-y-4">
              {analysis.legal_context.laws.map((law, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-[#005776]">{law.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{law.description}</p>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Relevance:</span> {law.relevance}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Cases */}
          <CollapsibleSection 
            title="Relevant Cases"
            icon={<Gavel />}
          >
            <div className="space-y-4">
              {analysis.legal_context.cases.map((case_, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-[#005776]">{case_.title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{case_.description}</p>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Relevance:</span> {case_.relevance}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </CollapsibleSection>
    </div>
  );
}; 