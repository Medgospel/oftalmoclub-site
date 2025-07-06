import { create } from 'apisauce'

// API Response types
export interface ApiResponse<T = any> {
  ok: boolean
  status: number | undefined
  headers: any
  data: T
  problem?: string
  originalError?: any
}

// Base API configuration
const API_BASE_URL = 'https://hope-healing-api.onrender.com/v1'

// Create API instance
export const api = create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds
})

// Request interceptor to add auth token
api.addAsyncRequestTransform(async (request) => {
  const token = localStorage.getItem('auth_token')
  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`
  }
})

// Response interceptor for error handling
api.addMonitor((response) => {
  if (!response.ok) {
    console.error('API Error:', response.problem, response.status, response.data)
    
    // Handle specific error cases
    if (response.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
  }
})

// API endpoints configuration
export const API_ENDPOINTS = {
  // Cadastro endpoint for CodPage
  CADASTRO: {
    CREATE: '/pessoa-fisica/app/',
  },
}

// Helper function to handle API responses
export const handleApiResponse = <T>(response: any): { success: boolean; data?: T; error?: string } => {
  if (response.ok) {
    return { success: true, data: response.data }
  } else {
    const errorMessage = (response.data as any)?.message || response.problem || 'An error occurred'
    return { success: false, error: errorMessage }
  }
}

// Export default API instance
export default api 