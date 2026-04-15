
-- Datos iniciales para la aplicación de turismo de Villavicencio

USE villavicencio_turismo;

-- Insertar roles básicos
INSERT INTO roles (name, description, permissions) VALUES 
('admin', 'Administrador del sistema con acceso completo', '["all"]'),
('cluster_admin', 'Administrador del clúster de turismo', '["manage_businesses", "manage_events", "view_analytics", "manage_content"]'),
('business_owner', 'Propietario de empresa turística', '["manage_own_business", "manage_bookings", "view_own_analytics"]'),
('tourist', 'Usuario turista', '["book_services", "write_reviews", "save_favorites"]'),
('guide', 'Guía turístico certificado', '["create_routes", "manage_tours", "interact_with_tourists"]');

-- Insertar categorías de empresas
INSERT INTO business_categories (name, description, icon, color, sort_order) VALUES 
('Hoteles', 'Alojamiento y hospedaje', 'hotel', '#16a34a', 1),
('Restaurantes', 'Gastronomía y comida típica', 'restaurant', '#f59e0b', 2),
('Agencias de Viajes', 'Operadores y agencias turísticas', 'map', '#3b82f6', 3),
('Transporte', 'Servicios de transporte turístico', 'car', '#8b5cf6', 4),
('Entretenimiento', 'Actividades recreativas y culturales', 'music', '#ef4444', 5),
('Aventura', 'Deportes extremos y aventura', 'mountain', '#059669', 6),
('Cultura', 'Sitios históricos y culturales', 'museum', '#dc2626', 7),
('Naturaleza', 'Ecoturismo y naturaleza', 'tree', '#16a34a', 8),
('Compras', 'Artesanías y souvenirs', 'shopping-bag', '#7c3aed', 9),
('Salud y Bienestar', 'Spas y centros de bienestar', 'heart', '#ec4899', 10);

-- Insertar usuario administrador del sistema
INSERT INTO users (email, password_hash, first_name, last_name, role_id, is_active, email_verified) VALUES 
('admin@villavicencio-turismo.com', '$2b$10$rQZ9QmrQX9Qq9Qq9Qq9Qq9Qq9Qq9Qq9Qq9Qq9Qq9Qq9Qq9Qq9Q', 'Administrador', 'Sistema', 1, TRUE, TRUE);

-- Insertar algunos usuarios de ejemplo
INSERT INTO users (email, password_hash, first_name, last_name, phone, role_id, email_verified) VALUES 
('cluster@villavicencio.gov.co', '$2b$10$example_hash_1', 'María', 'González', '+57 300 123 4567', 2, TRUE),
('hotel.orinoco@example.com', '$2b$10$example_hash_2', 'Carlos', 'Rodríguez', '+57 311 234 5678', 3, TRUE),
('restaurant.llanos@example.com', '$2b$10$example_hash_3', 'Ana', 'Martínez', '+57 322 345 6789', 3, TRUE),
('tourist1@example.com', '$2b$10$example_hash_4', 'John', 'Smith', '+1 555 123 4567', 4, TRUE),
('guia.naturaleza@example.com', '$2b$10$example_hash_5', 'Pedro', 'Ramírez', '+57 333 456 7890', 5, TRUE);

-- Insertar empresas de ejemplo
INSERT INTO businesses (owner_id, category_id, name, description, short_description, phone, email, address, latitude, longitude, price_range, is_verified, is_featured, amenities, images) VALUES 
(3, 1, 'Hotel Orinoco Plaza', 'Hotel de lujo en el centro de Villavicencio con vista panorámica a los llanos orientales. Ofrece habitaciones elegantes, restaurante gourmet, spa, piscina y centro de convenciones.', 'Hotel de lujo en el centro con vista a los llanos', '+57 8 123 4567', 'reservas@hotelorinoco.com', 'Carrera 30 #15-45, Centro, Villavicencio', 4.1420, -73.6266, '$$$', TRUE, TRUE, '["WiFi gratuito", "Piscina", "Spa", "Restaurante", "Parqueadero", "Centro de convenciones", "Aire acondicionado", "TV por cable"]', '["https://example.com/hotel1.jpg", "https://example.com/hotel2.jpg"]'),

(4, 2, 'Restaurante Los Llanos', 'Auténtica cocina llanera con los mejores cortes de carne, mamona, hayacas y platos típicos de la región. Ambiente tradicional con música joropo en vivo los fines de semana.', 'Auténtica cocina llanera con ambiente tradicional', '+57 8 234 5678', 'info@restaurantellanos.com', 'Calle 37 #28-15, Villavicencio', 4.1530, -73.6350, '$$', TRUE, TRUE, '["Música en vivo", "Parqueadero", "Terraza", "Bar", "Aire acondicionado", "WiFi"]', '["https://example.com/rest1.jpg", "https://example.com/rest2.jpg"]'),

(3, 3, 'Llanos Adventure Tours', 'Agencia especializada en turismo de aventura y ecoturismo en los llanos orientales. Ofrecemos safaris fotográficos, pesca deportiva, avistamiento de aves y tours culturales.', 'Turismo de aventura y ecoturismo en los llanos', '+57 300 345 6789', 'info@llanosadventure.com', 'Carrera 33 #20-30, Villavicencio', 4.1450, -73.6280, '$$', TRUE, FALSE, '["Transporte incluido", "Guías certificados", "Equipo especializado", "Seguro de viaje"]', '["https://example.com/tour1.jpg", "https://example.com/tour2.jpg"]');

-- Insertar eventos de ejemplo
INSERT INTO events (organizer_id, title, description, start_date, end_date, location_name, address, latitude, longitude, price, is_featured, tags) VALUES 
(2, 'Festival Llanero de Villavicencio 2024', 'El evento cultural más importante de los llanos orientales con música joropo, coleo, bailes tradicionales y gastronomía típica.', '2024-07-15 10:00:00', '2024-07-18 22:00:00', 'Parque Los Fundadores', 'Parque Los Fundadores, Villavicencio', 4.1400, -73.6300, 0.00, TRUE, '["festival", "cultura", "joropo", "tradición"]'),

(2, 'Tour Nocturno por el Centro Histórico', 'Recorrido guiado por los sitios históricos más importantes de Villavicencio con degustación de dulces tradicionales.', '2024-06-20 19:00:00', '2024-06-20 22:00:00', 'Plaza Los Libertadores', 'Plaza Los Libertadores, Centro, Villavicencio', 4.1420, -73.6266, 25000.00, FALSE, '["historia", "centro", "nocturno", "degustación"]'),

(5, 'Safari Fotográfico Bioparque Los Ocarros', 'Experiencia única de avistamiento y fotografía de fauna llanera en su hábitat natural.', '2024-06-25 06:00:00', '2024-06-25 16:00:00', 'Bioparque Los Ocarros', 'Km 7 Vía Puerto López, Villavicencio', 4.0800, -73.5500, 45000.00, TRUE, '["naturaleza", "fauna", "fotografía", "bioparque"]');

-- Insertar puntos de interés
INSERT INTO points_of_interest (name, description, category, latitude, longitude, address, entry_fee, is_featured, tags) VALUES 
('Bioparque Los Ocarros', 'Parque zoológico y de conservación dedicado a la fauna llanera. Hogar de más de 180 especies de animales nativos de los llanos orientales.', 'Naturaleza', 4.0800, -73.5500, 'Km 7 Vía Puerto López, Villavicencio', 25000.00, TRUE, '["fauna", "conservación", "familia", "educativo"]'),

('Catedral Nuestra Señora del Carmen', 'Icónica catedral de Villavicencio, símbolo arquitectónico y religioso de la ciudad. Construida en estilo neogótico.', 'Religioso', 4.1420, -73.6266, 'Carrera 30 con Calle 37, Centro, Villavicencio', 0.00, TRUE, '["religioso", "arquitectura", "centro", "histórico"]'),

('Monumento al Joropo', 'Escultura emblemática que representa la cultura llanera y el baile tradicional del joropo.', 'Cultural', 4.1500, -73.6400, 'Avenida 40, Villavicencio', 0.00, FALSE, '["cultura", "joropo", "monumento", "tradición"]'),

('Parque Los Fundadores', 'Principal parque de la ciudad, lugar de encuentro y eventos culturales con amplias zonas verdes.', 'Recreativo', 4.1400, -73.6300, 'Carrera 35 con Calle 33, Villavicencio', 0.00, TRUE, '["recreativo", "familia", "eventos", "verde"]');

-- Insertar rutas turísticas
INSERT INTO tourist_routes (name, description, difficulty_level, estimated_duration_hours, distance_km, transportation_type, is_featured, created_by, tags) VALUES 
('Ruta del Centro Histórico', 'Recorrido a pie por los principales sitios históricos y culturales del centro de Villavicencio, incluyendo la catedral, museos y plazas.', 'Easy', 3, 2.5, 'walking', TRUE, 2, '["historia", "cultura", "caminata", "centro"]'),

('Ruta Ecoturística Los Ocarros', 'Circuito que combina visita al Bioparque Los Ocarros con observación de aves en humedales cercanos.', 'Moderate', 6, 15.0, 'driving', TRUE, 5, '["ecoturismo", "fauna", "naturaleza", "bioparque"]'),

('Ruta Gastronómica Llanera', 'Tour culinario por los mejores restaurantes de comida típica llanera, mercados tradicionales y fincas productoras.', 'Easy', 4, 8.0, 'driving', FALSE, 2, '["gastronomía", "cultura", "tradición", "sabores"]');

-- Insertar paquetes turísticos
INSERT INTO tour_packages (business_id, name, description, duration_days, price, max_participants, difficulty_level, included_services, itinerary, is_featured, tags) VALUES 
(3, 'Aventura Llanera Completa', 'Paquete de 3 días que incluye safari fotográfico, pesca deportiva, visita a hatos ganaderos y espectáculo de joropo tradicional.', 3, 450000.00, 8, 'Moderate', 'Transporte, alojamiento, alimentación, guía especializado, seguro de viaje', '[{"day": 1, "activities": ["Safari fotográfico", "Almuerzo típico", "Visita hato ganadero"]}, {"day": 2, "activities": ["Pesca deportiva", "Avistamiento de aves", "Espectáculo joropo"]}, {"day": 3, "activities": ["Tour gastronómico", "Compras artesanías", "Despedida"]}]', TRUE, '["aventura", "naturaleza", "cultura", "completo"]'),

(3, 'Ecoturismo Los Ocarros', 'Experiencia de un día enfocada en la conservación y observación de fauna llanera en el Bioparque Los Ocarros.', 1, 120000.00, 15, 'Easy', 'Transporte, entrada al bioparque, guía especializado, almuerzo', '[{"day": 1, "activities": ["Recorrido bioparque", "Charla conservación", "Almuerzo ecológico", "Taller fotografía fauna"]}]', FALSE, '["ecoturismo", "familia", "educativo", "conservación"]');

-- Insertar algunas reseñas de ejemplo
INSERT INTO reviews (business_id, user_id, rating, title, comment, visit_date) VALUES 
(1, 5, 5, 'Excelente servicio y ubicación', 'Hotel fantástico en el centro de Villavicencio. Habitaciones cómodas, personal muy amable y desayuno delicioso. La vista desde la terraza es espectacular.', '2024-05-15'),
(2, 5, 4, 'Auténtica comida llanera', 'La mamona estaba deliciosa y el ambiente muy tradicional. Los precios son justos y las porciones generosas. Recomendado para probar la gastronomía local.', '2024-05-20'),
(3, 4, 5, 'Aventura inolvidable', 'El tour fue increíble, vimos muchísimos animales y el guía era muy conocedor. La organización fue perfecta y cumplieron todo lo prometido.', '2024-05-10');

-- Insertar configuraciones del sistema
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES 
('app_name', 'Villavicencio Turismo', 'string', 'Nombre de la aplicación', TRUE),
('app_version', '1.0.0', 'string', 'Versión actual de la aplicación', TRUE),
('contact_email', 'info@villavicencio-turismo.com', 'string', 'Email de contacto principal', TRUE),
('contact_phone', '+57 8 123 4567', 'string', 'Teléfono de contacto principal', TRUE),
('currency', 'COP', 'string', 'Moneda por defecto', TRUE),
('timezone', 'America/Bogota', 'string', 'Zona horaria del sistema', FALSE),
('max_file_size_mb', '10', 'number', 'Tamaño máximo de archivos en MB', FALSE),
('booking_cancellation_hours', '24', 'number', 'Horas mínimas para cancelar reserva', TRUE),
('featured_businesses_limit', '10', 'number', 'Límite de empresas destacadas en homepage', FALSE),
('review_moderation_enabled', 'true', 'boolean', 'Activar moderación de reseñas', FALSE);

-- Actualizar contadores de reseñas en businesses
UPDATE businesses SET 
    rating = (SELECT AVG(rating) FROM reviews WHERE business_id = businesses.id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE business_id = businesses.id)
WHERE id IN (SELECT DISTINCT business_id FROM reviews);
