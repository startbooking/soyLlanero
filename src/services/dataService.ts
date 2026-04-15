
import { getDataUrl, API_CONFIG } from '@/config/api.config';
// Función auxiliar para manejar las respuestas de la API
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Función auxiliar para realizar peticiones GET
const fetchData = async (endpoint: string) => {
  try {
    // const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const response = await fetch(getDataUrl(endpoint), {
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

// Función auxiliar para realizar peticiones POST
const postData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(getDataUrl(endpoint), {
      method: 'POST',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

// Función auxiliar para realizar peticiones PUT
const putData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(getDataUrl(endpoint), {
      method: 'PUT',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error updating data to ${endpoint}:`, error);
    throw error;
  }
};

// Función auxiliar para realizar peticiones DELETE
const deleteData = async (endpoint: string) => {
  try {
    const response = await fetch(getDataUrl(endpoint), {
      method: 'DELETE',
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error deleting data from ${endpoint}:`, error);
    throw error;
  }
};

export const dataService = {
  // Configuración de la aplic/autación
  getAppConfig: () => fetchData('/app-config'),
  updateAppConfig: (config: any) => putData('/app-config', config),

  // Configuración del footer
  getFooterConfig: () => fetchData('/app-config/footer'),
  updateFooterConfig: (config: any) => putData('/app-config/footer', config),

  // Configuración del slider
  getSliderConfig: () => fetchData('/app-config/sliders'),
  updateSliderConfig: (config: any) => putData('/app-config/sliders', config),

  // Textos de la aplicación
  getAppTexts: () => fetchData('/app-config/texts'),
  updateAppTexts: (texts: any) => putData('/app-config/texts', texts),

  // Empresas
  getBusinesses: () => fetchData('/businesses'),
  getBusinessByCategory: (category: string) => fetchData(`/businesses/${category}`),
  getBusinessById: (id: string) => fetchData(`/businesses/${id}`),
  createBusiness: (business: any) => postData('/businesses', business),
  updateBusiness: (id: string, business: any) => putData(`/businesses/${id}`, business),
  deleteBusiness: (id: string) => deleteData(`/businesses/${id}`),

  // Categorías
  getCategories: () => fetchData('/business-categories'),
  getCategoriesStats: () => fetchData('/business-categories/stats'),
  createCategory: (category: any) => postData('/business-categories', category),
  updateCategory: (id: string, category: any) => putData(`/business-categories/${id}`, category),
  deleteCategory: (id: string) => deleteData(`/business-categories/${id}`),

  // Hoteles
  getHotels: () => fetchData('/hotels'),
  getHotelById: (id: string) => fetchData(`/hotels/${id}`),
  createHotel: (hotel: any) => postData('/hotels', hotel),
  updateHotel: (id: string, hotel: any) => putData(`/hotels/${id}`, hotel),
  deleteHotel: (id: string) => deleteData(`/hotels/${id}`),

  // Tipos de habitaciones
  getRoomTypes: () => fetchData('/room-types'),
  // getRoomTypesByHotel: (hotelId: string) => fetchData(`/room-types/hotel/${hotelId}`),
  getRoomTypesByHotel: (hotelId: string) => fetchData(`/businesses/${hotelId}/room-types`),
  createRoomType: (roomType: any) => postData('/room-types', roomType),
  updateRoomType: (id: string, roomType: any) => putData(`/room-types/${id}`, roomType),
  deleteRoomType: (id: string) => deleteData(`/room-types/${id}`),

  // Experiencias
  getExperiences: () => fetchData('/experiences'),
  getExperienceById: (id: string) => fetchData(`/experiences/${id}`),
  createExperience: (experience: any) => postData('/experiences', experience),
  updateExperience: (id: string, experience: any) => putData(`/experiences/${id}`, experience),
  deleteExperience: (id: string) => deleteData(`/experiences/${id}`),

  // Servicios
  getServices: () => fetchData('/services'),
  getServiceById: (id: string) => fetchData(`/services/${id}`),
  createService: (service: any) => postData('/services', service),
  updateService: (id: string, service: any) => putData(`/services/${id}`, service),
  deleteService: (id: string) => deleteData(`/services/${id}`),

  // Eventos
  getEvents: () => fetchData('/events'),
  getEventById: (id: string) => fetchData(`/events/${id}`),
  createEvent: (event: any) => postData('/events', event),
  updateEvent: (id: string, event: any) => putData(`/events/${id}`, event),
  deleteEvent: (id: string) => deleteData(`/events/${id}`),

  // Puntos de interés
  getPointsOfInterest: () => fetchData('/points'),
  getPointOfInterestById: (id: string) => fetchData(`/points/${id}`),
  createPointOfInterest: (poi: any) => postData('/points', poi),
  updatePointOfInterest: (id: string, poi: any) => putData(`/points/${id}`, poi),
  deletePointOfInterest: (id: string) => deleteData(`/points/${id}`),

  // Usuarios
  getUsers: () => fetchData('/users'),
  getUserById: (id: string) => fetchData(`/users/${id}`),
  createUser: (user: any) => postData('/users', user),
  updateUser: (id: string, user: any) => putData(`/users/${id}`, user),
  deleteUser: (id: string) => deleteData(`/users/${id}`),

  // Autenticación
  login: (credentials: any) => postData('/auth/login', credentials),
  register: (userData: any) => postData('/auth/register', userData),
  logout: () => postData('/auth/logout', {}),

  // Reservas
  getBookings: () => fetchData('/bookings'),
  getBookingById: (id: string) => fetchData(`/bookings/${id}`),
  getBookingsByUser: (userId: string) => fetchData(`/bookings/user/${userId}`),
  createBooking: (booking: any) => postData('/bookings', booking),
  updateBooking: (id: string, booking: any) => putData(`/bookings/${id}`, booking),
  deleteBooking: (id: string) => deleteData(`/bookings/${id}`),

  // Reseñas
  getReviews: () => fetchData('/reviews'),
  getReviewsByBusiness: (businessId: string) => fetchData(`/reviews/business/${businessId}`),
  createReview: (review: any) => postData('/reviews', review),
  updateReview: (id: string, review: any) => putData(`/reviews/${id}`, review),
  deleteReview: (id: string) => deleteData(`/reviews/${id}`),

  // Mensajes
  getMessages: () => fetchData('/messages'),
  getMessageById: (id: string) => fetchData(`/messages/${id}`),
  createMessage: (message: any) => postData('/messages', message),
  updateMessage: (id: string, message: any) => putData(`/messages/${id}`, message),
  deleteMessage: (id: string) => deleteData(`/messages/${id}`),

  // Noticias
  getNews: () => fetchData('/news'),
  getNewsById: (id: string) => fetchData(`/news/${id}`),
  createNews: (news: any) => postData('/news', news),
  updateNews: (id: string, news: any) => putData(`/news/${id}`, news),
  deleteNews: (id: string) => deleteData(`/news/${id}`),

  // Información institucional
  getInstitutionalInfo: () => fetchData('/institutional-info'),
  updateInstitutionalInfo: (info: any) => putData('/institutional-info', info),

  // Estadísticas
  getStatistics: () => fetchData('/businesses/stats'),
  getBusinessStatistics: (businessId: string) => fetchData(`/statistics/business/${businessId}`),
  getUserStatistics: (userId: string) => fetchData(`/statistics/user/${userId}`),

  // Pagos
  processPayment: (paymentData: any) => postData('/payments/process', paymentData),
  getPaymentStatus: (paymentId: string) => fetchData(`/payments/status/${paymentId}`),
  getPaymentHistory: (userId: string) => fetchData(`/payments/history/${userId}`),

  // Configuración de impuestos
  getTaxConfig: () => fetchData('/tax-config'),
  updateTaxConfig: (config: any) => putData('/tax-config', config)
};
