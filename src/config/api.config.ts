/**
 * API Configuration
 * 
 * Centraliza todas las URLs y configuraciones del backend.
 * Para cambiar el entorno (desarrollo/producción), actualiza estas variables.
 */

export const API_CONFIG = {
  // URL base del backend
  // BASE_URL: 'https://soyllanero.com/apiRest',
  BASE_URL: 'http://backend.lan/meta',
  // BASE_URL: 'http://localhost:3000',
  
  // Endpoints principales
  //DATA_ENDPOINT: '/api',
  DATA_ENDPOINT: '',
  
  AUTH_ENDPOINT: '/auth',
  
  // Timeout para las peticiones (ms)
  REQUEST_TIMEOUT: 30000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * Construye la URL completa para el endpoint de datos
 */
export const getDataUrl = (path: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.DATA_ENDPOINT}${path}`;
};

/**
 * Construye la URL completa para el endpoint de autenticación
 */
export const getAuthUrl = (path: string = '') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_ENDPOINT}${path}`;
};

/**
 * Configuración del entorno
 */
export const ENV_CONFIG = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;
