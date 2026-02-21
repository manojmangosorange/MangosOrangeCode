// API configuration and helper functions for cPanel PHP backend

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('admin_token', token);
};

// Clear auth token from localStorage
export const clearAuthToken = (): void => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
};

// Generic API fetch helper with JWT auth support
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  skipAuth: boolean = false // NEW: Option to skip auth for public endpoints
): Promise<T> {
  const url = `${API_BASE}/${endpoint.replace(/^\//, '')}`;
  
  const headers: HeadersInit = {
    ...options.headers,
  };

  // Add Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Add Authorization header if token exists (unless skipAuth is true)
  if (!skipAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Parse response
    const contentType = response.headers.get('content-type');
    let data: any;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    // Handle errors
    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `Request failed with status ${response.status}`;
      if (response.status === 401) {
        clearAuthToken();
      }
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, skipAuth: boolean = false) => 
    apiFetch<T>(endpoint, { method: 'GET' }, skipAuth),
  
  post: <T>(endpoint: string, body?: any, skipAuth: boolean = false) =>
    apiFetch<T>(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }, skipAuth),
  
  put: <T>(endpoint: string, body?: any, skipAuth: boolean = false) =>
    apiFetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }, skipAuth),
  
  delete: <T>(endpoint: string, skipAuth: boolean = false) =>
    apiFetch<T>(endpoint, { method: 'DELETE' }, skipAuth),
};
