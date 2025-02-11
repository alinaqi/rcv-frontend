export interface ContractIssue {
  location: {
    paragraph: number;
    text: string;
  };
  description: string;
  severity: string;
  suggestion: string;
}

export interface Redline {
  original_text: string;
  suggested_text: string;
  location: {
    paragraph: number;
    text: string;
  };
}

export interface Law {
  title: string;
  description: string;
  relevance: string;
  source: string;
  reference_type: 'law';
}

export interface Case {
  title: string;
  description: string;
  relevance: string;
  source: string;
  reference_type: 'case';
}

export interface LegalContext {
  topic: string;
  jurisdiction: string;
  summary: string;
  laws: Law[];
  cases: Case[];
}

export interface ContractAnalysis {
  issues: ContractIssue[];
  suggestions: string[];
  risk_assessment: string;
  legal_context: LegalContext;
  redlines: Redline[];
}

export interface ContractAnalysisResponse {
  analysis: ContractAnalysis;
  legal_context: LegalContext;
}