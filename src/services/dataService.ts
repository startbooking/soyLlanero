import { getDataUrl, API_CONFIG } from '@/config/api.config';

// --- Tipos e Interfaces ---
interface AvailabilityParams {
  room_id: number | string;
  check_in: string;
  check_out: string;
  guests: number;
}

interface AvailabilityResponse {
  available: boolean;
  message?: string;
  price_total?: number;
  remaining_units?: number;
}

interface WompiPaymentParams {
  referencia: string;
  total: number;
  hotel_id: number | string;
  habitacion_id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  identification: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  children: number;
  subtotal: number;
  taxes: number;
}

interface WompiSignatureResponse {
  status: 'success' | 'error';
  data: {
    signature: string;
    publicKey: string;
    referencia: string;
    env: 'sandbox' | 'production';
  };
}

/**
 * Función núcleo para peticiones con Timeout y manejo de errores
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : getDataUrl(endpoint);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('La petición ha excedido el tiempo de espera (Timeout)');
    }
    console.error(`API Error [${options.method || 'GET'}] ${endpoint}:`, error);
    throw error;
  }
}

// --- Servicio de Datos ---
export const dataService = {
  // --- Reservas y Disponibilidad ---
  checkAvailability: (params: AvailabilityParams) =>
    request<AvailabilityResponse>(`/hotel/${params.hotel_id}/check-availability`, {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  getRoomTypesByHotel: (hotelId: number | string) =>
    request<any[]>(`/hotel/${hotelId}/room-types`),

  // --- Módulo de Pagos Wompi ---
  /**
   * Registra la reserva como PENDIENTE en MySQL y obtiene la firma de Wompi
   */
  prepareWompiPayment: (params: WompiPaymentParams) =>
    request<WompiSignatureResponse>('/wompi/prepare-payment', {
      method: 'POST',
      body: JSON.stringify(params),
    }),

  /**
   * Consulta el estado de una transacción después del checkout (opcional)
   */
  getWompiTransactionStatus: (id: string) =>
    request(`/wompi/status/${id}`),

  // --- Negocios (Businesses) ---
  getBusinesses: () => request<any[]>('/businesses'),
  getBusinessByCategory: (category: string) => request(`/businesses/${category}`),
  getBusinessById: (id: string | number) => request(`/businesses/${id}`),
  createBusiness: (data: any) => request('/businesses', { method: 'POST', body: JSON.stringify(data) }),
  updateBusiness: (id: string, data: any) => request(`/businesses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBusiness: (id: string) => request(`/businesses/${id}`, { method: 'DELETE' }),

  // --- Hoteles ---
  getHotels: () => request<any[]>('/hotels'),
  getHotelById: (id: string | number) => request(`/hotels/${id}`),
  createHotel: (data: any) => request('/hotels', { method: 'POST', body: JSON.stringify(data) }),
  updateHotel: (id: string, data: any) => request(`/hotels/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteHotel: (id: string) => request(`/hotels/${id}`, { method: 'DELETE' }),

  // --- Configuración de Aplicación ---
  getAppConfig: () => request('/app-config'),
  getFooterConfig: () => request('/app-config/footer'),
  getSliderConfig: () => request('/app-config/sliders'),
  getAppTexts: () => request('/app-config/texts'),
  updateAppConfig: (data: any) => request('/app-config', { method: 'PUT', body: JSON.stringify(data) }),

  // --- Categorías ---
  getCategories: () => request('/business-categories'),
  getCategoriesStats: () => request('/business-categories/stats'),

  // --- Experiencias y Servicios ---
  getExperiences: () => request('/experiences'),
  getExperienceById: (id: string) => request(`/experiences/${id}`),
  getServices: () => request('/services'),
  getEvents: () => request('/events'),

  // --- Autenticación ---
  login: (credentials: any) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData: any) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  logout: () => request('/auth/logout', { method: 'POST' }),

  // --- Reservas (Bookings) ---
  getBookings: () => request('/bookings'),
  getBookingsByUser: (userId: string) => request(`/bookings/user/${userId}`),
  createBooking: (data: any) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),

  // --- Pagos ---
  processPayment: (data: any) => request('/payments/process', { method: 'POST', body: JSON.stringify(data) }),
  getPaymentStatus: (id: string) => request(`/payments/status/${id}`),

  // --- Utilidades ---
  getStatistics: () => request('/businesses/stats'),
  getNews: () => request('/news'),
};