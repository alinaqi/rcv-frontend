/**
 * API configuration and utilities
 */

export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('API_URL is not defined in environment variables');
}

/**
 * Helper function to construct API endpoints
 * @param path - The endpoint path
 * @returns Full API URL
 */
export const getApiUrl = (path: string): string => {
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * Common API headers
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  // Add your endpoints here
  VALIDATE_CONTRACT: '/validate',
  UPLOAD_CONTRACT: '/upload',
  GET_CONTRACT: (id: string) => `/contracts/${id}`,
} as const; 