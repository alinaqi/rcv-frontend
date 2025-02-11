import { getApiUrl, DEFAULT_HEADERS, API_ENDPOINTS } from '../config/api';

/**
 * Type for API response
 */
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
}

/**
 * Generic API error class
 */
export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic function to handle API responses
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(response.status, data.error || 'An error occurred');
  }
  
  return data;
}

/**
 * API service functions
 */
export const apiService = {
  /**
   * Upload a contract for validation
   */
  async uploadContract(file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(getApiUrl(API_ENDPOINTS.UPLOAD_CONTRACT), {
      method: 'POST',
      body: formData,
    });

    return handleResponse(response);
  },

  /**
   * Validate a contract
   */
  async validateContract(contractId: string, data: any): Promise<ApiResponse> {
    const response = await fetch(getApiUrl(API_ENDPOINTS.VALIDATE_CONTRACT), {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ contractId, ...data }),
    });

    return handleResponse(response);
  },

  /**
   * Get contract details
   */
  async getContract(id: string): Promise<ApiResponse> {
    const response = await fetch(getApiUrl(API_ENDPOINTS.GET_CONTRACT(id)), {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });

    return handleResponse(response);
  },
};
