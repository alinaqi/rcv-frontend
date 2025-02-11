export interface ContractIssue {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  location: {
    paragraph: number;
    text: string;
  };
  suggestion: string;
}

export interface ContractSuggestion {
  category: string;
  description: string;
  current: string;
  suggested: string;
}

export interface ContractAnalysis {
  issues: ContractIssue[];
  suggestions: ContractSuggestion[];
  risk_score: number;
  analysis_timestamp: string;
}

export interface ContractAnalysisResponse {
  status: 'success' | 'error';
  analysis?: ContractAnalysis;
  error?: string | null;
}