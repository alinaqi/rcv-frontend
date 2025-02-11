/**
 * API configuration
 */

const isProd = import.meta.env.PROD;

export const API_BASE_URL = isProd 
  ? 'https://rcv-backend.onrender.com'
  : 'http://localhost:8010';

export const API_ENDPOINTS = {
  ANALYZE_CONTRACT: '/api/v1/analyze-contract',
} as const;

/**
 * Helper function to construct API URLs
 */
export const getApiUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = `${API_BASE_URL}${endpoint}`;
  if (!params) return url;

  const queryParams = new URLSearchParams(params);
  return `${url}?${queryParams.toString()}`;
};

/**
 * Common API headers
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}; 