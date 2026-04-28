/**
 * API Configuration refactorizada
 */

const getEnvVar = (key: string, defaultValue: string): string => {
  return import.meta.env[key] || defaultValue;
};

export const API_CONFIG = {
  BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000'),
  DATA_ENDPOINT: getEnvVar('VITE_DATA_ENDPOINT', ''),
  AUTH_ENDPOINT: getEnvVar('VITE_AUTH_ENDPOINT', '/auth'),
  REQUEST_TIMEOUT: Number(getEnvVar('VITE_REQUEST_TIMEOUT', '30000')),
  
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

export const getDataUrl = (path: string = '') => 
  `${API_CONFIG.BASE_URL}${API_CONFIG.DATA_ENDPOINT}${path}`;

export const getAuthUrl = (path: string = '') => 
  `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}${path}`;

export const ENV_CONFIG = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;