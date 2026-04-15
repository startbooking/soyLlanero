-- ===================================
-- BASE DE DATOS COMPLETA CON DATOS DEMO
-- Sistema de Turismo Villavicencio Meta
-- ===================================

CREATE DATABASE IF NOT EXISTS villavicencio_turismo 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE villavicencio_turismo;

-- ===================================
-- TABLAS DE CONFIGURACIÓN DEL SISTEMA
-- ===================================

-- Configuraciones generales de la aplicación
CREATE TABLE app_configuration (
    id INT PRIMARY KEY AUTO_INCREMENT,
    app_name VARCHAR(100) NOT NULL DEFAULT 'Villavicencio Meta Turismo',
    app_description TEXT,
    app_logo_url VARCHAR(500),
    app_favicon_url VARCHAR(500),
    company_name VARCHAR(200) NOT NULL DEFAULT 'Alcaldía de Villavicencio',
    company_address TEXT DEFAULT 'Carrera 29 #37-37, Villavicencio, Meta, Colombia',
    company_phone VARCHAR(20) DEFAULT '+57 8 681 5000',
    company_email VARCHAR(255) DEFAULT 'turismo@villavicencio.gov.co',
    company_website VARCHAR(500) DEFAULT 'https://www.villavicencio.gov.co',
    whatsapp_number VARCHAR(20) DEFAULT '+57 310 123 4567',
    emergency_phone VARCHAR(20) DEFAULT '123',
    tourist_info_phone VARCHAR(20) DEFAULT '+57 8 681 5001',
    facebook_url VARCHAR(500) DEFAULT 'https://facebook.com/AlcaldiaVillavicencio',
    instagram_url VARCHAR(500) DEFAULT 'https://instagram.com/alcaldiavillavicencio',
    twitter_url VARCHAR(500) DEFAULT 'https://twitter.com/AlcaldiaVilla',
    youtube_url VARCHAR(500) DEFAULT 'https://youtube.com/AlcaldiaVillavicencio',
    default_currency VARCHAR(3) DEFAULT 'COP',
    default_timezone VARCHAR(50) DEFAULT 'America/Bogota',
    default_language VARCHAR(5) DEFAULT 'es',
    tax_rate DECIMAL(5, 2) DEFAULT 19.00,
    commission_rate DECIMAL(5, 2) DEFAULT 5.00,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    registration_enabled BOOLEAN DEFAULT TRUE,
    booking_enabled BOOLEAN DEFAULT TRUE,
    review_moderation BOOLEAN DEFAULT TRUE,
    auto_approval_reviews BOOLEAN DEFAULT FALSE,
    featured_businesses_limit INT DEFAULT 12,
    max_upload_size_mb INT DEFAULT 10,
    booking_advance_days INT DEFAULT 1,
    cancellation_deadline_hours INT DEFAULT 24,
    terms_and_conditions_url VARCHAR(500),
    privacy_policy_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Configuraciones específicas del footer
CREATE TABLE footer_configuration (
    id INT PRIMARY KEY AUTO_INCREMENT,
    about_title VARCHAR(100) DEFAULT 'Acerca de Villavicencio',
    about_description TEXT DEFAULT 'Descubre la puerta de entrada a los Llanos Orientales, donde la cultura llanera, la naturaleza exuberante y la hospitalidad se encuentran para ofrecerte experiencias únicas.',
    quick_links_title VARCHAR(100) DEFAULT 'Enlaces Rápidos',
    contact_title VARCHAR(100) DEFAULT 'Contacto',
    social_title VARCHAR(100) DEFAULT 'Síguenos',
    newsletter_title VARCHAR(100) DEFAULT 'Boletín Informativo',
    newsletter_description TEXT DEFAULT 'Suscríbete para recibir las últimas noticias y ofertas turísticas de Villavicencio',
    copyright_text VARCHAR(200) DEFAULT '© 2024 Alcaldía de Villavicencio. Todos los derechos reservados.',
    show_newsletter BOOLEAN DEFAULT TRUE,
    show_social_links BOOLEAN DEFAULT TRUE,
    show_quick_links BOOLEAN DEFAULT TRUE,
    show_contact_info BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Configuraciones del slider principal
CREATE TABLE slider_configuration (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slide_title VARCHAR(200) NOT NULL,
    slide_subtitle VARCHAR(300),
    slide_description TEXT,
    slide_image_url VARCHAR(500) NOT NULL,
    slide_image_mobile_url VARCHAR(500),
    button_text VARCHAR(50),
    button_link VARCHAR(500),
    slide_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    overlay_opacity DECIMAL(3, 2) DEFAULT 0.40,
    text_color VARCHAR(7) DEFAULT '#FFFFFF',
    button_style VARCHAR(20) DEFAULT 'primary',
    animation_type VARCHAR(30) DEFAULT 'fade',
    display_duration INT DEFAULT 5000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active_order (is_active, slide_order)
);

-- Textos dinámicos de la aplicación
CREATE TABLE app_texts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    text_key VARCHAR(100) NOT NULL UNIQUE,
    text_value TEXT NOT NULL,
    text_description VARCHAR(300),
    section VARCHAR(50),
    is_html BOOLEAN DEFAULT FALSE,
    language VARCHAR(5) DEFAULT 'es',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (text_key),
    INDEX idx_section (section),
    INDEX idx_language (language)
);

-- ===================================
-- TABLAS PRINCIPALES DEL SISTEMA
-- ===================================

-- Tabla de roles
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    document_type ENUM('CC', 'CE', 'PASSPORT', 'NIT') DEFAULT 'CC',
    document_number VARCHAR(20),
    phone VARCHAR(20),
    profile_image_url VARCHAR(500),
    role_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_email (email),
    INDEX idx_role (role_id),
    INDEX idx_active (is_active)
);

-- Tabla de categorías de empresas
CREATE TABLE business_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7),
    parent_id INT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES business_categories(id),
    INDEX idx_active_order (is_active, sort_order)
);

-- Tabla de empresas turísticas
CREATE TABLE businesses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    phone VARCHAR(20),
    email VARCHAR(255),
    website_url VARCHAR(500),
    whatsapp VARCHAR(20),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    opening_hours JSON,
    price_range ENUM('$', '$$', '$$$', '$$$$'),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    has_tax BOOLEAN DEFAULT TRUE,
    tax_percentage DECIMAL(5, 2) DEFAULT 19.00,
    amenities JSON,
    images JSON,
    videos JSON,
    sustainability_practices TEXT,
    accessibility_features TEXT,
    languages_spoken JSON,
    payment_methods JSON,
    cancellation_policy TEXT,
    terms_and_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES business_categories(id),
    INDEX idx_category (category_id),
    INDEX idx_location (latitude, longitude),
    INDEX idx_rating (rating),
    INDEX idx_active_featured (is_active, is_featured),
    FULLTEXT(name, description, short_description)
);

-- Tabla de tipos de habitaciones (para hoteles)
CREATE TABLE room_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    max_occupancy INT NOT NULL DEFAULT 2,
    bed_type VARCHAR(50),
    room_size DECIMAL(6, 2),
    price_per_night DECIMAL(10, 2) NOT NULL,
    has_tax BOOLEAN DEFAULT TRUE,
    tax_percentage DECIMAL(5, 2) DEFAULT 19.00,
    amenities JSON,
    images JSON,
    is_available BOOLEAN DEFAULT TRUE,
    total_rooms INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    INDEX idx_business (business_id),
    INDEX idx_available (is_available)
);

-- Tabla de puntos de interés
CREATE TABLE points_of_interest (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    category VARCHAR(100),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    opening_hours JSON,
    entry_fee DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'COP',
    images JSON,
    historical_significance TEXT,
    best_time_to_visit TEXT,
    accessibility_info TEXT,
    contact_info JSON,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    visitor_count INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_location (latitude, longitude),
    INDEX idx_category (category),
    INDEX idx_active_featured (is_active, is_featured),
    FULLTEXT(name, description, short_description)
);

-- Tabla de eventos
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organizer_id INT,
    business_id INT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    category VARCHAR(100),
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    location_name VARCHAR(200),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    price DECIMAL(10, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'COP',
    max_capacity INT,
    current_bookings INT DEFAULT 0,
    images JSON,
    requirements TEXT,
    included_services TEXT,
    contact_info JSON,
    is_free BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    registration_required BOOLEAN DEFAULT FALSE,
    registration_deadline DATETIME,
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id),
    FOREIGN KEY (business_id) REFERENCES businesses(id),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_active_featured (is_active, is_featured),
    FULLTEXT(title, description, short_description)
);

-- Tabla de reservas
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    business_id INT NOT NULL,
    room_type_id INT NULL,
    event_id INT NULL,
    booking_type ENUM('hotel', 'restaurant', 'event', 'activity', 'service') NOT NULL,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show') DEFAULT 'pending',
    check_in_date DATE,
    check_out_date DATE,
    booking_date DATETIME NOT NULL,
    num_adults INT NOT NULL DEFAULT 1,
    num_children INT DEFAULT 0,
    guest_document_type ENUM('CC', 'CE', 'PASSPORT', 'NIT') DEFAULT 'CC',
    guest_document_number VARCHAR(20),
    guest_name VARCHAR(200),
    guest_email VARCHAR(255),
    guest_phone VARCHAR(20),
    subtotal_amount DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'COP',
    payment_status ENUM('pending', 'paid', 'refunded', 'failed') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    special_requests TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (business_id) REFERENCES businesses(id),
    FOREIGN KEY (room_type_id) REFERENCES room_types(id),
    FOREIGN KEY (event_id) REFERENCES events(id),
    INDEX idx_user (user_id),
    INDEX idx_business (business_id),
    INDEX idx_status (status),
    INDEX idx_reference (booking_reference)
);

-- Tabla de reseñas
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    images JSON,
    visit_date DATE,
    is_verified BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_business_review (user_id, business_id),
    INDEX idx_business_rating (business_id, rating),
    INDEX idx_user (user_id)
);

-- Tabla de favoritos de usuarios
CREATE TABLE user_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    favoritable_type ENUM('business', 'event', 'poi') NOT NULL,
    favoritable_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_favorite (user_id, favoritable_type, favoritable_id)
);

-- Tabla de mensajes
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    business_id INT,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    message_type ENUM('inquiry', 'booking', 'complaint', 'general') DEFAULT 'general',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (business_id) REFERENCES businesses(id)
);

-- ===================================
-- DATOS DE CONFIGURACIÓN DEMO
-- ===================================

-- Insertar configuración principal de la aplicación
INSERT INTO app_configuration (
    app_name, app_description, company_name, company_address, company_phone, 
    company_email, whatsapp_number, emergency_phone, tourist_info_phone,
    facebook_url, instagram_url, twitter_url, youtube_url
) VALUES (
    'Descubre Villavicencio Meta',
    'Portal oficial de turismo de Villavicencio, Meta. Descubre la puerta de entrada a los Llanos Orientales, donde la cultura llanera, la naturaleza exuberante y la hospitalidad se encuentran.',
    'Alcaldía de Villavicencio - Secretaría de Turismo',
    'Carrera 29 #37-37, Centro, Villavicencio, Meta, Colombia',
    '+57 8 681 5000',
    'turismo@villavicencio.gov.co',
    '+57 310 891 2345',
    '123',
    '+57 8 681 5001',
    'https://facebook.com/AlcaldiaVillavicencio',
    'https://instagram.com/alcaldiavillavicencio',
    'https://twitter.com/AlcaldiaVilla',
    'https://youtube.com/AlcaldiaVillavicencio'
);

-- Insertar configuración del footer
INSERT INTO footer_configuration (
    about_title, about_description, newsletter_description, copyright_text
) VALUES (
    'Descubre Villavicencio Meta',
    'La puerta de entrada a los Llanos Orientales, donde la cultura llanera, la naturaleza exuberante y la hospitalidad se encuentran para ofrecerte experiencias únicas e inolvidables.',
    'Mantente informado sobre eventos, ofertas especiales y las últimas noticias del turismo en Villavicencio y el Meta.',
    '© 2024 Alcaldía de Villavicencio - Secretaría de Turismo. Todos los derechos reservados.'
);

-- Insertar slides del carousel principal
INSERT INTO slider_configuration (slide_title, slide_subtitle, slide_description, slide_image_url, button_text, button_link, slide_order, is_active) VALUES
('Descubre la Puerta de los Llanos', 'Villavicencio Meta te espera', 'Vive experiencias únicas en la capital del Meta, donde la cultura llanera y la naturaleza se encuentran en perfecta armonía.', '/images/slider/villavicencio-hero.jpg', 'Explorar Destinos', '/explore', 1, TRUE),
('Aventura y Naturaleza', 'Bioparque Los Ocarros', 'Conecta con la fauna llanera en su hábitat natural. Una experiencia educativa y emocionante para toda la familia.', '/images/slider/bioparque-ocarros.jpg', 'Conocer Más', '/poi/bioparque-los-ocarros', 2, TRUE),
('Cultura y Tradición', 'Festival Llanero', 'Sumérgete en las tradiciones del joropo, el coleo y la gastronomía típica de los llanos orientales.', '/images/slider/festival-llanero.jpg', 'Ver Eventos', '/events', 3, TRUE),
('Gastronomía Auténtica', 'Sabores de los Llanos', 'Degusta la mamona, las hayacas y todos los sabores tradicionales que hacen única nuestra región.', '/images/slider/gastronomia-llanera.jpg', 'Restaurantes', '/restaurants', 4, TRUE);

-- Insertar textos dinámicos de la aplicación
INSERT INTO app_texts (text_key, text_value, text_description, section) VALUES
('home_welcome_title', '¡Bienvenidos a Villavicencio Meta!', 'Título de bienvenida en la página principal', 'home'),
('home_welcome_subtitle', 'La puerta de entrada a los Llanos Orientales', 'Subtítulo de bienvenida', 'home'),
('home_discover_title', 'Descubre el Meta', 'Título de la sección descubrir', 'home'),
('home_discover_description', 'Explora destinos únicos, vive aventuras inolvidables y conecta con la auténtica cultura llanera.', 'Descripción de la sección descubrir', 'home'),
('categories_hotels_description', 'Encuentra el alojamiento perfecto para tu estadía en Villavicencio', 'Descripción categoría hoteles', 'categories'),
('categories_restaurants_description', 'Disfruta de la auténtica gastronomía llanera en los mejores restaurantes', 'Descripción categoría restaurantes', 'categories'),
('categories_activities_description', 'Vive experiencias únicas con tours y actividades de aventura', 'Descripción categoría actividades', 'categories'),
('categories_events_description', 'Participa en festivales y eventos culturales tradicionales', 'Descripción categoría eventos', 'categories'),
('contact_info_title', 'Información Turística', 'Título sección información de contacto', 'contact'),
('emergency_info_title', 'Números de Emergencia', 'Título sección información de emergencia', 'contact');

-- ===================================
-- DATOS DEMO DEL SISTEMA
-- ===================================

-- Insertar roles básicos
INSERT INTO roles (name, display_name, description, permissions) VALUES 
('admin', 'Administrador', 'Administrador del sistema con acceso completo', '["all"]'),
('cluster_admin', 'Administrador Clúster', 'Administrador del clúster de turismo', '["manage_businesses", "manage_events", "view_analytics"]'),
('business_owner', 'Propietario de Empresa', 'Propietario de empresa turística', '["manage_own_business", "manage_bookings"]'),
('tourist', 'Turista', 'Usuario turista', '["book_services", "write_reviews", "save_favorites"]'),
('guide', 'Guía Turístico', 'Guía turístico certificado', '["create_routes", "manage_tours"]');

-- Insertar categorías de empresas
INSERT INTO business_categories (name, slug, description, icon, color, sort_order) VALUES 
('Hoteles y Alojamiento', 'hoteles', 'Hoteles, hostales y alojamientos turísticos', 'hotel', '#16a34a', 1),
('Restaurantes', 'restaurantes', 'Restaurantes y gastronomía típica llanera', 'utensils', '#f59e0b', 2),
('Agencias de Viajes', 'agencias-viajes', 'Agencias de viajes y operadores turísticos', 'map', '#3b82f6', 3),
('Transporte Turístico', 'transporte', 'Servicios de transporte para turistas', 'car', '#8b5cf6', 4),
('Entretenimiento', 'entretenimiento', 'Actividades recreativas y culturales', 'music', '#ef4444', 5),
('Aventura y Deportes', 'aventura', 'Deportes extremos y turismo de aventura', 'mountain', '#059669', 6),
('Sitios Culturales', 'cultura', 'Museos, sitios históricos y culturales', 'building', '#dc2626', 7),
('Ecoturismo', 'ecoturismo', 'Turismo ecológico y de naturaleza', 'tree', '#16a34a', 8),
('Artesanías y Compras', 'artesanias', 'Tiendas de artesanías y souvenirs', 'shopping-bag', '#7c3aed', 9),
('Salud y Bienestar', 'bienestar', 'Spas y centros de bienestar', 'heart', '#ec4899', 10);

-- Insertar usuarios demo
INSERT INTO users (email, password_hash, first_name, last_name, document_type, document_number, phone, role_id, is_active, email_verified) VALUES 
('admin@villavicencio-turismo.gov.co', '$2b$12$YourHashedPasswordHere', 'Administrador', 'Sistema', 'CC', '12345678', '+57 8 681 5000', 1, TRUE, TRUE),
('turismo@villavicencio.gov.co', '$2b$12$ClusterAdminHash', 'María Elena', 'González Ramírez', 'CC', '40123456', '+57 300 123 4567', 2, TRUE, TRUE),
('hotel.orinoco@gmail.com', '$2b$12$BusinessOwnerHash1', 'Carlos Alberto', 'Rodríguez López', 'CC', '80456789', '+57 311 234 5678', 3, TRUE, TRUE),
('restaurant.llanos@gmail.com', '$2b$12$BusinessOwnerHash2', 'Ana María', 'Martínez Castro', 'CC', '52789123', '+57 322 345 6789', 3, TRUE, TRUE),
('turista.ejemplo@gmail.com', '$2b$12$TouristHash', 'Juan Carlos', 'Pérez Gómez', 'CC', '1012345678', '+57 315 123 4567', 4, TRUE, TRUE),
('guia.naturaleza@gmail.com', '$2b$12$GuideHash', 'Pedro Antonio', 'Ramírez Silva', 'CC', '7456789', '+57 333 456 7890', 5, TRUE, TRUE);

-- Insertar empresas demo
INSERT INTO businesses (owner_id, category_id, name, slug, description, short_description, phone, email, address, latitude, longitude, price_range, is_verified, is_featured, has_tax, tax_percentage, amenities, images) VALUES 
(3, 1, 'Hotel Orinoco Plaza', 'hotel-orinoco-plaza', 'Hotel de lujo en el corazón de Villavicencio con vista panorámica a los llanos orientales. Ofrece habitaciones elegantes con aire acondicionado, restaurante gourmet especializado en cocina llanera, spa completo, piscina al aire libre y moderno centro de convenciones. Perfecto para viajeros de negocios y turistas que buscan comodidad y excelencia en el servicio.', 'Hotel de lujo en el centro con vista panorámica a los llanos', '+57 8 662 3456', 'reservas@hotelorinoco.com', 'Carrera 30 #15-45, Centro, Villavicencio, Meta', 4.1420, -73.6266, '$$$', TRUE, TRUE, TRUE, 19.00, '["WiFi gratuito", "Piscina al aire libre", "Spa completo", "Restaurante gourmet", "Parqueadero privado", "Centro de convenciones", "Aire acondicionado", "TV por cable", "Minibar", "Servicio a la habitación 24h", "Lavandería", "Recepción 24h"]', '["https://images.unsplash.com/photo-1566073771259-6a8506099945", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"]'),

(4, 2, 'Restaurante Los Llanos Tradición', 'restaurante-los-llanos-tradicion', 'Auténtico restaurante de cocina llanera donde podrás degustar los mejores cortes de carne a la llanera, la tradicional mamona, hayacas envueltas en hoja de plátano, pescado de río fresco y todos los platos típicos de la región preparados con recetas ancestrales. Ambiente tradicional decorado con elementos típicos de la cultura llanera, música joropo en vivo los fines de semana y espectáculos de baile tradicional.', 'Auténtica cocina llanera con ambiente tradicional y música joropo', '+57 8 671 2345', 'info@restaurantellanos.com', 'Calle 37 #28-15, Centro, Villavicencio, Meta', 4.1530, -73.6350, '$$', TRUE, TRUE, TRUE, 19.00, '["Música joropo en vivo", "Parqueadero gratuito", "Terraza al aire libre", "Bar especializado", "Aire acondicionado", "WiFi gratuito", "Espectáculos de baile", "Menú infantil", "Carnes a la llanera", "Platos vegetarianos"]', '["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"]'),

(3, 3, 'Llanos Adventure Tours', 'llanos-adventure-tours', 'Agencia especializada en turismo de aventura y ecoturismo en los llanos orientales colombianos. Ofrecemos experiencias únicas como safaris fotográficos para avistar fauna llanera, pesca deportiva en ríos cristalinos, avistamiento de más de 200 especies de aves, tours culturales a hatos ganaderos tradicionales, cabalgatas al amanecer y atardecer, y recorridos en canoa por humedales. Todos nuestros tours incluyen guías especializados certificados, transporte seguro y equipos de alta calidad.', 'Turismo de aventura y ecoturismo especializado en los llanos', '+57 300 345 6789', 'info@llanosadventure.com', 'Carrera 33 #20-30, Local 105, Villavicencio, Meta', 4.1450, -73.6280, '$$', TRUE, TRUE, TRUE, 19.00, '["Transporte especializado", "Guías certificados", "Equipo de aventura", "Seguro de viaje incluido", "Alimentación en tours", "Primeros auxilios", "Radio comunicación", "Fotografía profesional"]', '["https://images.unsplash.com/photo-1441974231531-c6227db76b6e", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"]'),

(6, 1, 'Eco Lodge Rio Ariari', 'eco-lodge-rio-ariari', 'Lodge ecológico ubicado a orillas del río Ariari, diseñado para huéspedes que buscan una conexión auténtica with la naturaleza llanera. Construcción sostenible con materiales locales, cabañas elevadas con vista al río, restaurante con ingredientes orgánicos de la región, actividades de ecoturismo, observación de aves al amanecer, pesca artesanal y senderos ecológicos. Certificado en turismo sostenible y prácticas ambientales responsables.', 'Lodge ecológico a orillas del río con enfoque sostenible', '+57 314 567 8901', 'reservas@ecolodgeariari.com', 'Vereda El Recreo, Vía Acacías Km 18, Villavicencio, Meta', 4.0892, -73.5234, '$$', TRUE, FALSE, TRUE, 19.00, '["Ubicación sobre río", "Construcción sostenible", "Restaurante orgánico", "Senderos ecológicos", "Observación de aves", "Pesca artesanal", "WiFi en áreas comunes", "Actividades ecoturísticas"]', '["https://images.unsplash.com/photo-1520637836862-4d197d17c5b4", "https://images.unsplash.com/photo-1571896349842-33c89424de2d"]');

-- Insertar tipos de habitaciones para los hoteles
INSERT INTO room_types (business_id, name, description, max_occupancy, bed_type, room_size, price_per_night, has_tax, tax_percentage, amenities, images) VALUES
(1, 'Habitación Estándar', 'Cómoda habitación con todas las comodidades básicas, perfecta para parejas o viajeros de negocios.', 2, 'Cama Doble', 25.00, 180000.00, TRUE, 19.00, '["Aire acondicionado", "TV por cable", "WiFi gratuito", "Minibar", "Caja fuerte", "Escritorio"]', '["https://images.unsplash.com/photo-1611892440504-42a792e24d32", "https://images.unsplash.com/photo-1590490360182-c33d57733427"]'),
(1, 'Habitación Superior', 'Habitación amplia con vista a la ciudad y amenidades mejoradas para mayor confort.', 2, 'Cama King', 32.00, 250000.00, TRUE, 19.00, '["Aire acondicionado", "TV Smart 50 pulgadas", "WiFi gratuito", "Minibar premium", "Caja fuerte", "Escritorio", "Sala de estar", "Vista a la ciudad"]', '["https://images.unsplash.com/photo-1618773928121-c32242e63f39", "https://images.unsplash.com/photo-1595576508898-0ad5c879a061"]'),
(1, 'Suite Ejecutiva', 'Elegante suite con sala de estar independiente, ideal para huéspedes VIP y estancias prolongadas.', 4, '2 Camas Queen', 45.00, 420000.00, TRUE, 19.00, '["Aire acondicionado", "TV Smart 55 pulgadas", "WiFi gratuito", "Minibar premium", "Caja fuerte", "Escritorio ejecutivo", "Sala de estar", "Vista panorámica", "Cafetera", "Bata y pantuflas"]', '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", "https://images.unsplash.com/photo-1564501049412-61c2a3083791"]'),
(4, 'Cabaña Familiar Río', 'Cabaña rústica con capacidad para familias, ubicada frente al río con vista espectacular.', 6, '3 Camas Dobles', 60.00, 320000.00, TRUE, 19.00, '["Ventiladores de techo", "Mosquiteros", "WiFi en área común", "Cocina equipada", "Terraza privada", "Hamacas", "Vista al río", "Fogón para asados"]', '["https://images.unsplash.com/photo-1559827260-dc66d52bef19", "https://images.unsplash.com/photo-1571896349842-33c89424de2d"]'),
(4, 'Cabaña Romántica', 'Cabaña íntima para parejas con jacuzzi privado y vista al río, perfecta para luna de miel.', 2, 'Cama King', 40.00, 480000.00, TRUE, 19.00, '["Ventiladores de techo", "Mosquiteros", "WiFi en área común", "Jacuzzi privado", "Terraza romántica", "Vista al río", "Minibar ecológico", "Decoración especial"]', '["https://images.unsplash.com/photo-1586023492125-27b2c045efd7", "https://images.unsplash.com/photo-1618773928121-c32242e63f39"]');

-- Insertar puntos de interés
INSERT INTO points_of_interest (name, slug, description, short_description, category, latitude, longitude, address, entry_fee, is_featured, historical_significance, best_time_to_visit, accessibility_info, contact_info, tags) VALUES 
('Bioparque Los Ocarros', 'bioparque-los-ocarros', 'El Bioparque Los Ocarros es un zoológico y centro de conservación dedicado exclusivamente a la fauna de los llanos orientales colombianos. Hogar de más de 180 especies de animales nativos incluyendo jaguares, pumas, anacondas, caimanes, dantas, venados, iguanas, tortugas, más de 130 especies de aves como garzas, ibis, loros y guacamayas, además de peces de río típicos de la región. El parque desarrolla importantes programas de conservación, investigación científica y educación ambiental.', 'Zoológico y centro de conservación de fauna llanera con más de 180 especies nativas', 'Naturaleza', 4.0800, -73.5500, 'Kilómetro 7 Vía Puerto López, Villavicencio, Meta', 25000.00, TRUE, 'Fundado en 1986 como centro de rescate y rehabilitación de fauna silvestre, se ha convertido en referente nacional de conservación.', 'Todo el año. Mejor época: temporada seca (diciembre a marzo) para mayor avistamiento de fauna.', 'Senderos pavimentados, rampas de acceso, baños adaptados, sillas de ruedas disponibles.', '{"phone": "+57 8 662 9547", "email": "info@bioparquelosocarros.com", "website": "https://bioparquelosocarros.com"}', '["fauna", "conservación", "familia", "educativo", "naturaleza", "investigación"]'),

('Catedral Nuestra Señora del Carmen', 'catedral-nuestra-senora-del-carmen', 'Majestuosa catedral católica y símbolo arquitectónico más importante de Villavicencio. Construida en estilo neogótico con influencias coloniales, fue erigida a mediados del siglo XX para reemplazar la antigua iglesia colonial. Sus imponentes torres gemelas de 45 metros de altura dominan el skyline del centro histórico. En su interior alberga valiosas obras de arte religioso, vitrales coloridos que narran pasajes bíblicos, un órgano de tubos de origen europeo y la imagen venerada de la Virgen del Carmen, patrona de los llaneros.', 'Icónica catedral neogótica, símbolo religioso y arquitectónico de la ciudad', 'Religioso', 4.1420, -73.6266, 'Carrera 30 con Calle 37, Centro, Villavicencio, Meta', 0.00, TRUE, 'Construida entre 1950-1960, reemplazó la iglesia colonial original. Centro espiritual de la región llanera.', 'Todo el año. Misas dominicales tienen mayor concurrencia cultural. Evitar horarios de misa para visitas turísticas.', 'Acceso principal sin escalones, rampa lateral disponible, capacidad para sillas de ruedas en nave principal.', '{"phone": "+57 8 662 2180", "email": "parroquia@catedralvillavicencio.org"}', '["religioso", "arquitectura", "centro histórico", "colonial", "cultura"]'),

('Monumento al Joropo', 'monumento-al-joropo', 'Emblemática escultura en bronce que representa la esencia de la cultura llanera a través del baile tradicional del joropo. La obra muestra una pareja de bailarines en pleno movimiento, capturando la pasión, elegancia y energía característica de este baile típico declarado Patrimonio Cultural de la Nación. Ubicado en una rotonda estratégica de la ciudad, el monumento se ha convertido en punto de encuentro y referencia urbana. Especialmente impactante durante la noche cuando la iluminación artística resalta cada detalle de la escultura.', 'Escultura emblemática que representa la cultura llanera y el joropo tradicional', 'Cultural', 4.1500, -73.6400, 'Avenida 40 con Carrera 33, Villavicencio, Meta', 0.00, TRUE, 'Inaugurado en 1995 como homenaje al joropo, declarado patrimonio cultural inmaterial de Colombia.', 'Todo el año. Mejor apreciación al atardecer con iluminación nocturna artística.', 'Ubicado en espacio público abierto, accesible desde todas las direcciones, sin barreras arquitectónicas.', '{"phone": "+57 8 681 5000"}', '["cultura", "joropo", "monumento", "tradición", "música", "baile"]'),

('Parque Los Fundadores', 'parque-los-fundadores', 'Parque principal y corazón verde de Villavicencio, diseñado como espacio de encuentro ciudadano y escenario de los eventos culturales más importantes de la ciudad. Sus amplias zonas verdes incluyen jardines temáticos con flora nativa, senderos para caminar, áreas de juegos infantiles, canchas deportivas, concha acústica para presentaciones artísticas y el tradicional kiosco central donde se realizan retretas y actividades culturales. Durante los fines de semana y festividades, el parque cobra vida con presentaciones de música joropo, bailes tradicionales, ferias gastronómicas y actividades familiares.', 'Principal parque urbano, centro de eventos culturales y punto de encuentro ciudadano', 'Recreativo', 4.1400, -73.6300, 'Carrera 35 con Calle 33, Centro, Villavicencio, Meta', 0.00, TRUE, 'Construido en 1962 en honor a los fundadores de la ciudad, ha sido remodelado múltiples veces manteniendo su esencia.', 'Todo el año. Mejor ambiente los fines de semana con actividades culturales y gastronómicas.', 'Senderos pavimentados, rampas de acceso, baños públicos adaptados, estacionamiento cercano.', '{"phone": "+57 8 681 5000"}', '["recreativo", "familia", "eventos", "verde", "cultural", "música", "deportes"]'),

('Plaza Los Libertadores', 'plaza-los-libertadores', 'Plaza principal e histórica de Villavicencio, considerada el kilómetro cero de la ciudad y punto de partida para la exploración del centro histórico. Rodeada por edificaciones coloniales y republicanas que albergan instituciones gubernamentales, museos, bibliotecas y comercio tradicional. En el centro se erige el monumento a Los Libertadores, dedicado a Simón Bolívar y los próceres de la independencia. La plaza ha sido testigo de los eventos históricos más importantes de la región y continúa siendo escenario de actos cívicos, culturales y celebraciones patrias.', 'Plaza histórica central, kilómetro cero de la ciudad y corazón del centro histórico', 'Histórico', 4.1420, -73.6280, 'Carrera 29 con Calle 37, Centro, Villavicencio, Meta', 0.00, TRUE, 'Plaza fundacional de 1840, punto de partida del desarrollo urbano de Villavicencio y escenario de eventos históricos.', 'Todo el año. Mañanas y tardes para mejor apreciación arquitectónica. Evitar mediodía por calor intenso.', 'Plaza completamente pavimentada, accesible desde todas las calles circundantes, sin barreras.', '{"phone": "+57 8 681 5000"}', '["histórico", "centro", "libertadores", "colonial", "gobierno", "arquitectura"]');

-- Insertar eventos demo
INSERT INTO events (organizer_id, title, slug, description, short_description, category, start_date, end_date, location_name, address, latitude, longitude, price, is_featured, is_free, max_capacity, registration_required, tags) VALUES 
(2, 'Festival Mundial del Joropo 2024', 'festival-mundial-joropo-2024', 'El evento cultural más importante de los llanos orientales que celebra la música, danza y tradiciones llaneras. Durante cuatro días, la ciudad se viste de fiesta con presentaciones de los mejores exponentes del joropo a nivel nacional e internacional, competencias de baile, torneos de coleo, exhibiciones ecuestres, muestras gastronómicas, artesanías típicas y actividades para toda la familia. El festival incluye la coronación de la Reina Mundial del Joropo, conciertos gratuitos en tarimas populares, conferencias sobre cultura llanera y talleres de música tradicional.', 'Festival cultural que celebra la música joropo y tradiciones llaneras', 'Cultural', '2024-07-15 10:00:00', '2024-07-18 23:00:00', 'Parque Los Fundadores', 'Parque Los Fundadores, Centro, Villavicencio, Meta', 4.1400, -73.6300, 0.00, TRUE, TRUE, 50000, FALSE, '["festival", "cultura", "joropo", "tradición", "música", "baile", "coleo"]'),

(2, 'Tour Nocturno Centro Histórico', 'tour-nocturno-centro-historico', 'Recorrido guiado especializado por los sitios históricos y arquitectónicos más emblemáticos del centro de Villavicencio bajo la mágica iluminación nocturna. El tour incluye visitas a la Catedral Nuestra Señora del Carmen, Plaza Los Libertadores, edificaciones coloniales, el Teatro Corfecali, antiguas casonas republicanas y termina con degustación de dulces tradicionales llaneros como cocadas, alegría, arequipe de ahuyama y guarapo. Los guías especializados narran anécdotas históricas, leyendas urbanas y curiosidades arquitectónicas que dan vida al patrimonio cultural de la ciudad.', 'Recorrido histórico nocturno con degustación de dulces tradicionales', 'Histórico', '2024-08-10 19:00:00', '2024-08-10 22:00:00', 'Plaza Los Libertadores', 'Plaza Los Libertadores, Centro, Villavicencio, Meta', 4.1420, -73.6266, 35000.00, TRUE, FALSE, 25, TRUE, '["historia", "centro", "nocturno", "degustación", "arquitectura", "cultural"]'),

(5, 'Safari Fotográfico Bioparque Los Ocarros', 'safari-fotografico-bioparque-ocarros', 'Experiencia única de avistamiento y fotografía de fauna llanera en su hábitat natural dentro del Bioparque Los Ocarros. Acompañados por biólogos especializados y fotógrafos profesionales, los participantes aprenderán técnicas de fotografía de vida silvestre mientras observan jaguares, pumas, anacondas, caimanes, dantas, más de 130 especies de aves y otros animales nativos. El safari incluye equipo fotográfico profesional (opcional), talleres prácticos de composición y iluminación natural, información científica sobre conservación y comportamiento animal. Termina con sesión de edición básica y selección de mejores fotografías.', 'Safari fotográfico educativo con fauna llanera y técnicas profesionales', 'Naturaleza', '2024-08-25 06:00:00', '2024-08-25 16:00:00', 'Bioparque Los Ocarros', 'Km 7 Vía Puerto López, Villavicencio, Meta', 4.0800, -73.5500, 85000.00, TRUE, FALSE, 15, TRUE, '["naturaleza", "fauna", "fotografía", "bioparque", "conservación", "educativo"]'),

(3, 'Cabalgata Llanera al Amanecer', 'cabalgata-llanera-amanecer', 'Experiencia auténtica de cabalgata por las sabanas cercanas a Villavicencio al amanecer, cuando la naturaleza llanera despierta en todo su esplendor. Montando caballos criollos entrenados y acompañados por vaqueros expertos, los jinetes recorrerán paisajes típicos de la región, observarán fauna silvestre como venados, chigüiros, aves migratorias y disfrutarán del legendario amanecer llanero con el canto de los turpiales. La cabalgata incluye desayuno típico con carne a la llanera, arepa, queso fresco y café tinto en una finca ganadera tradicional, además de demostración de ordeño manual y elaboración de queso artesanal.', 'Cabalgata tradicional al amanecer con desayuno típico en finca llanera', 'Aventura', '2024-09-05 05:30:00', '2024-09-05 10:00:00', 'Finca Los Samanes', 'Vereda San Luis, Vía Acacías Km 12, Villavicencio, Meta', 4.0654, -73.5123, 120000.00, FALSE, FALSE, 12, TRUE, '["cabalgata", "amanecer", "finca", "desayuno", "tradición", "caballos", "naturaleza"]');

-- Insertar algunas reseñas demo
INSERT INTO reviews (business_id, user_id, rating, title, comment, visit_date) VALUES 
(1, 5, 5, 'Excelente hotel y ubicación perfecta', 'Nos hospedamos en el Hotel Orinoco Plaza durante nuestro viaje familiar a Villavicencio y la experiencia fue excepcional. Las habitaciones son amplias, muy limpias y cómodas, el personal extremadamente amable y profesional. El desayuno buffet es delicioso con opciones tradicionales llaneras. La ubicación en el centro es perfecta para caminar a los sitios históricos. La vista desde la terraza del hotel hacia los llanos es espectacular, especialmente al atardecer. Sin duda regresaremos y lo recomendamos ampliamente.', '2024-06-15'),
(2, 5, 5, 'Auténtica comida llanera, sabores únicos', 'La mamona estaba perfecta, muy bien preparada y con un sabor tradicional auténtico que no habíamos probado en otros lugares. Las hayacas envueltas en hoja de plátano estaban deliciosas, el pescado fresco de río muy bien preparado y las porciones son generosas. El ambiente es muy tradicional con decoración típica llanera y la música joropo en vivo los sábados es excelente. Los precios son justos para la calidad y cantidad de comida. Los meseros conocen bien los platos y dan buenas recomendaciones. Altamente recomendado para conocer la gastronomía local.', '2024-06-20'),
(3, 4, 5, 'Tour de aventura inolvidable', 'Contratamos el paquete completo de 3 días con Llanos Adventure Tours y fue una experiencia increíble que superó nuestras expectativas. Vimos muchísimos animales en su hábitat natural: chigüiros, venados, caimanes, anacondas y más de 50 especies de aves diferentes. El guía era muy conocedor de la fauna y flora, nos enseñó mucho sobre conservación. La organización fue perfecta, cumplieron todo lo prometido en el itinerario, la comida excelente y el alojamiento en la finca muy cómodo. Los equipos de seguridad y fotografía de primera calidad. Vale cada peso invertido.', '2024-06-10'),
(1, 4, 4, 'Muy buen servicio, habitaciones cómodas', 'Hotel muy bien ubicado en el centro de Villavicencio, cerca de restaurantes y sitios turísticos. La habitación superior que reservamos era amplia, limpia y con buena vista a la ciudad. El aire acondicionado funciona perfecto, importante en el clima de Villavicencio. El personal de recepción muy atento y servicial. El único detalle menor es que el WiFi en algunas zonas es un poco lento, pero en general muy recomendado para turismo y negocios.', '2024-07-02');

-- Actualizar contadores de reseñas y ratings
UPDATE businesses SET 
    rating = (SELECT AVG(rating) FROM reviews WHERE business_id = businesses.id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE business_id = businesses.id)
WHERE id IN (SELECT DISTINCT business_id FROM reviews);

-- Insertar reserva demo
INSERT INTO bookings (user_id, business_id, room_type_id, booking_type, booking_reference, status, check_in_date, check_out_date, booking_date, num_adults, num_children, guest_document_type, guest_document_number, guest_name, guest_email, guest_phone, subtotal_amount, tax_amount, total_amount, payment_status, special_requests) VALUES
(5, 1, 1, 'hotel', 'VT-2024-001234', 'confirmed', '2024-08-15', '2024-08-17', '2024-07-10 14:30:00', 2, 0, 'CC', '1012345678', 'Juan Carlos Pérez Gómez', 'turista.ejemplo@gmail.com', '+57 315 123 4567', 360000.00, 68400.00, 428400.00, 'paid', 'Habitación en piso alto con vista a los llanos si es posible. Llegada aproximada 3:00 PM.');

-- ===================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- ===================================

-- Índices para consultas frecuentes de búsqueda
CREATE INDEX idx_businesses_search ON businesses(is_active, is_featured, category_id, rating DESC);
CREATE INDEX idx_events_upcoming ON events(is_active, start_date ASC) WHERE start_date >= CURDATE();
CREATE INDEX idx_poi_location_active ON points_of_interest(is_active, latitude, longitude);
CREATE INDEX idx_reviews_recent ON reviews(business_id, created_at DESC);
CREATE INDEX idx_bookings_user_recent ON bookings(user_id, booking_date DESC);

-- ===================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- ===================================

/*
ESTRUCTURA DE LA BASE DE DATOS - SISTEMA DE TURISMO VILLAVICENCIO META

1. CONFIGURACIÓN DEL SISTEMA:
   - app_configuration: Configuraciones generales de la aplicación
   - footer_configuration: Configuraciones específicas del pie de página
   - slider_configuration: Slides del carrusel principal
   - app_texts: Textos dinámicos y editables de la aplicación

2. GESTIÓN DE USUARIOS:
   - roles: Roles del sistema (admin, business_owner, tourist, etc.)
   - users: Información de usuarios registrados

3. EMPRESAS Y SERVICIOS:
   - business_categories: Categorías de empresas turísticas
   - businesses: Empresas turísticas registradas
   - room_types: Tipos de habitaciones para hoteles
   - reviews: Reseñas y calificaciones de usuarios

4. CONTENIDO TURÍSTICO:
   - points_of_interest: Puntos de interés turístico
   - events: Eventos y actividades programadas
   - bookings: Reservas realizadas por usuarios

5. CARACTERÍSTICAS IMPORTANTES:
   - Sistema de impuestos configurable por empresa
   - Geolocalización para empresas y puntos de interés
   - Sistema de calificaciones y reseñas
   - Gestión de reservas con diferentes tipos
   - Configuración flexible del sistema
   - Soporte multiidioma en estructura
   - Optimización para búsquedas y consultas frecuentes

6. DATOS DEMO INCLUIDOS:
   - Configuración completa del sistema
   - Usuarios de ejemplo con diferentes roles
   - Empresas turísticas representativas
   - Puntos de interés principales de Villavicencio
   - Eventos culturales y turísticos
   - Reseñas y reservas de ejemplo
*/