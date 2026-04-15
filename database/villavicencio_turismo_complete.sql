
-- Base de datos completa para la aplicación de turismo de Villavicencio
-- Sistema de gestión integral con modelo de integridad referencial
-- Optimizado para MySQL 8.0+

CREATE DATABASE IF NOT EXISTS villavicencio_turismo 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE villavicencio_turismo;

-- ===================================
-- TABLAS DE CONFIGURACIÓN Y SEGURIDAD
-- ===================================

-- Tabla de roles y permisos
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    permissions JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active)
);

-- Tabla de usuarios del sistema
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image_url VARCHAR(500),
    role_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP NULL,
    last_login TIMESTAMP NULL,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    preferences JSON,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT,
    INDEX idx_email (email),
    INDEX idx_role (role_id),
    INDEX idx_active (is_active),
    INDEX idx_verification (email_verification_token),
    INDEX idx_password_reset (password_reset_token)
);

-- Tabla de sesiones de usuario
CREATE TABLE user_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_active (is_active),
    INDEX idx_expires (expires_at)
);

-- ===================================
-- TABLAS DE NEGOCIO PRINCIPAL
-- ===================================

-- Tabla de categorías de empresas
CREATE TABLE business_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7), -- Código hexadecimal
    parent_id INT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES business_categories(id) ON DELETE SET NULL,
    INDEX idx_active_order (is_active, sort_order),
    INDEX idx_parent (parent_id),
    INDEX idx_slug (slug)
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
    facebook_url VARCHAR(500),
    instagram_url VARCHAR(500),
    twitter_url VARCHAR(500),
    youtube_url VARCHAR(500),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    opening_hours JSON, -- Horarios por día de la semana
    price_range ENUM('$', '$$', '$$$', '$$$$'),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_vip_sponsor BOOLEAN DEFAULT FALSE,
    subscription_type ENUM('free', 'basic', 'premium', 'vip') DEFAULT 'free',
    subscription_expires TIMESTAMP NULL,
    amenities JSON, -- Lista de servicios/amenidades
    images JSON, -- URLs de imágenes
    videos JSON, -- URLs de videos
    documents JSON, -- Documentos legales, certificaciones
    sustainability_practices TEXT,
    accessibility_features TEXT,
    languages_spoken JSON,
    payment_methods JSON,
    cancellation_policy TEXT,
    terms_and_conditions TEXT,
    business_hours_note TEXT,
    special_requirements TEXT,
    minimum_age INT,
    maximum_capacity INT,
    advance_booking_required BOOLEAN DEFAULT FALSE,
    booking_deadline_hours INT DEFAULT 24,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    seo_keywords TEXT,
    featured_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (category_id) REFERENCES business_categories(id) ON DELETE RESTRICT,
    INDEX idx_category (category_id),
    INDEX idx_location (latitude, longitude),
    INDEX idx_rating (rating),
    INDEX idx_active_featured (is_active, is_featured),
    INDEX idx_vip (is_vip_sponsor),
    INDEX idx_owner (owner_id),
    INDEX idx_slug (slug),
    INDEX idx_subscription (subscription_type, subscription_expires),
    FULLTEXT(name, description, short_description, seo_keywords)
);

-- Tabla de horarios especiales (días festivos, eventos especiales)
CREATE TABLE business_special_hours (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    date DATE NOT NULL,
    opening_time TIME NULL,
    closing_time TIME NULL,
    is_closed BOOLEAN DEFAULT FALSE,
    note VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_business_date (business_id, date),
    INDEX idx_business (business_id),
    INDEX idx_date (date)
);

-- Tabla de reseñas y calificaciones
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    user_id INT NOT NULL,
    booking_id INT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    pros TEXT,
    cons TEXT,
    images JSON,
    visit_date DATE,
    response_from_business TEXT,
    response_date TIMESTAMP NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    report_count INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT TRUE,
    approved_by INT NULL,
    approved_at TIMESTAMP NULL,
    language VARCHAR(5) DEFAULT 'es',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_business_review (user_id, business_id),
    INDEX idx_business_rating (business_id, rating),
    INDEX idx_user (user_id),
    INDEX idx_verified (is_verified),
    INDEX idx_approved (is_approved),
    INDEX idx_featured (is_featured)
);

-- Tabla de eventos
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organizer_id INT,
    business_id INT,
    category_id INT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
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
    min_age INT,
    max_age INT,
    images JSON,
    videos JSON,
    requirements TEXT,
    included_services TEXT,
    excluded_services TEXT,
    what_to_bring TEXT,
    contact_info JSON,
    is_free BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_online BOOLEAN DEFAULT FALSE,
    meeting_url VARCHAR(500),
    registration_required BOOLEAN DEFAULT FALSE,
    registration_deadline DATETIME,
    early_bird_price DECIMAL(10, 2),
    early_bird_deadline DATETIME,
    cancellation_policy TEXT,
    weather_dependent BOOLEAN DEFAULT FALSE,
    language VARCHAR(5) DEFAULT 'es',
    difficulty_level ENUM('beginner', 'intermediate', 'advanced', 'expert'),
    tags JSON,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    view_count INT DEFAULT 0,
    featured_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES business_categories(id) ON DELETE SET NULL,
    INDEX idx_dates (start_date, end_date),
    INDEX idx_location (latitude, longitude),
    INDEX idx_active_featured (is_active, is_featured),
    INDEX idx_organizer (organizer_id),
    INDEX idx_business (business_id),
    INDEX idx_category (category_id),
    INDEX idx_slug (slug),
    INDEX idx_price (price),
    FULLTEXT(title, description, short_description, tags)
);

-- Tabla de paquetes turísticos
CREATE TABLE tour_packages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    duration_days INT NOT NULL,
    duration_hours INT,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'COP',
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    max_participants INT,
    min_participants INT DEFAULT 1,
    difficulty_level ENUM('easy', 'moderate', 'challenging', 'expert'),
    physical_requirements TEXT,
    age_restriction VARCHAR(100),
    included_services TEXT,
    excluded_services TEXT,
    requirements TEXT,
    what_to_bring TEXT,
    itinerary JSON,
    images JSON,
    videos JSON,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    seasonal_availability JSON,
    available_dates JSON,
    booking_advance_days INT DEFAULT 1,
    cancellation_policy TEXT,
    refund_policy TEXT,
    terms_and_conditions TEXT,
    insurance_included BOOLEAN DEFAULT FALSE,
    transportation_included BOOLEAN DEFAULT FALSE,
    meals_included JSON,
    accommodation_included BOOLEAN DEFAULT FALSE,
    guide_included BOOLEAN DEFAULT TRUE,
    equipment_included JSON,
    language VARCHAR(5) DEFAULT 'es',
    tags JSON,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    view_count INT DEFAULT 0,
    booking_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    INDEX idx_business (business_id),
    INDEX idx_price (price),
    INDEX idx_active_featured (is_active, is_featured),
    INDEX idx_duration (duration_days),
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_slug (slug),
    FULLTEXT(name, description, short_description, tags)
);

-- ===================================
-- TABLAS DE RESERVAS Y TRANSACCIONES
-- ===================================

-- Tabla de reservas
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    business_id INT NOT NULL,
    package_id INT,
    event_id INT,
    booking_type ENUM('hotel', 'restaurant', 'package', 'event', 'activity', 'service') NOT NULL,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show', 'refunded') DEFAULT 'pending',
    check_in_date DATE,
    check_out_date DATE,
    booking_date DATETIME NOT NULL,
    service_date DATETIME,
    num_adults INT NOT NULL DEFAULT 1,
    num_children INT DEFAULT 0,
    num_infants INT DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    final_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'COP',
    payment_status ENUM('pending', 'paid', 'partially_paid', 'refunded', 'failed') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    special_requests TEXT,
    guest_details JSON,
    contact_name VARCHAR(200),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    emergency_contact JSON,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP NULL,
    cancelled_by INT NULL,
    refund_amount DECIMAL(10, 2) DEFAULT 0.00,
    refund_date TIMESTAMP NULL,
    notes TEXT,
    internal_notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    confirmation_sent BOOLEAN DEFAULT FALSE,
    review_requested BOOLEAN DEFAULT FALSE,
    language VARCHAR(5) DEFAULT 'es',
    source VARCHAR(50) DEFAULT 'web',
    commission_rate DECIMAL(5, 2) DEFAULT 0.00,
    commission_amount DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE RESTRICT,
    FOREIGN KEY (package_id) REFERENCES tour_packages(id) ON DELETE SET NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL,
    FOREIGN KEY (cancelled_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_business (business_id),
    INDEX idx_status (status),
    INDEX idx_dates (check_in_date, check_out_date),
    INDEX idx_booking_date (booking_date),
    INDEX idx_reference (booking_reference),
    INDEX idx_payment_status (payment_status)
);

-- Tabla de pagos
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    payment_reference VARCHAR(100) NOT NULL UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'COP',
    payment_method ENUM('credit_card', 'debit_card', 'bank_transfer', 'cash', 'pse', 'nequi', 'daviplata', 'paypal', 'stripe') NOT NULL,
    payment_gateway VARCHAR(50),
    gateway_reference VARCHAR(100),
    status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    gateway_response JSON,
    transaction_fee DECIMAL(10, 2) DEFAULT 0.00,
    processed_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking (booking_id),
    INDEX idx_reference (payment_reference),
    INDEX idx_status (status),
    INDEX idx_method (payment_method),
    INDEX idx_gateway (payment_gateway)
);

-- ===================================
-- TABLAS DE CONTENIDO Y NAVEGACIÓN
-- ===================================

-- Tabla de puntos de interés turístico
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
    videos JSON,
    audio_guides JSON,
    historical_significance TEXT,
    architectural_style VARCHAR(100),
    construction_year INT,
    best_time_to_visit TEXT,
    estimated_visit_duration INT, -- en minutos
    accessibility_info TEXT,
    nearby_services JSON,
    transportation_info TEXT,
    parking_info TEXT,
    contact_info JSON,
    website_url VARCHAR(500),
    social_media JSON,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    visitor_count INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    tags JSON,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    language VARCHAR(5) DEFAULT 'es',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_location (latitude, longitude),
    INDEX idx_category (category),
    INDEX idx_active_featured (is_active, is_featured),
    INDEX idx_rating (rating),
    INDEX idx_slug (slug),
    FULLTEXT(name, description, short_description, tags)
);

-- Tabla de rutas turísticas
CREATE TABLE tourist_routes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    difficulty_level ENUM('easy', 'moderate', 'challenging', 'expert'),
    estimated_duration_hours INT,
    distance_km DECIMAL(8, 2),
    elevation_gain_m INT,
    route_points JSON, -- Array de coordenadas lat/lng
    waypoints JSON, -- Puntos de interés en la ruta
    transportation_type ENUM('walking', 'cycling', 'driving', 'mixed', 'boat'),
    best_season TEXT,
    weather_considerations TEXT,
    equipment_needed TEXT,
    safety_tips TEXT,
    restrictions TEXT,
    cost_estimate DECIMAL(10, 2),
    images JSON,
    videos JSON,
    gpx_file_url VARCHAR(500),
    kml_file_url VARCHAR(500),
    map_image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    usage_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    created_by INT,
    verified_by INT,
    verified_at TIMESTAMP NULL,
    tags JSON,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    language VARCHAR(5) DEFAULT 'es',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_transportation (transportation_type),
    INDEX idx_active_featured (is_active, is_featured),
    INDEX idx_creator (created_by),
    INDEX idx_rating (rating),
    INDEX idx_slug (slug),
    FULLTEXT(name, description, short_description, tags)
);

-- ===================================
-- TABLAS DE INTERACCIÓN SOCIAL
-- ===================================

-- Tabla de favoritos de usuarios
CREATE TABLE user_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    favoritable_type ENUM('business', 'event', 'poi', 'route', 'package') NOT NULL,
    favoritable_id INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_favorite (user_id, favoritable_type, favoritable_id),
    INDEX idx_user (user_id),
    INDEX idx_favoritable (favoritable_type, favoritable_id)
);

-- Tabla de seguimientos (empresas que sigue un usuario)
CREATE TABLE user_follows (
    id INT PRIMARY KEY AUTO_INCREMENT,
    follower_id INT NOT NULL,
    following_type ENUM('business', 'user') NOT NULL,
    following_id INT NOT NULL,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_follow (follower_id, following_type, following_id),
    INDEX idx_follower (follower_id),
    INDEX idx_following (following_type, following_id)
);

-- ===================================
-- TABLAS DE COMUNICACIÓN
-- ===================================

-- Tabla de notificaciones
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error', 'marketing', 'booking', 'review', 'follow') DEFAULT 'info',
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    action_text VARCHAR(100),
    data JSON,
    image_url VARCHAR(500),
    expires_at TIMESTAMP NULL,
    sent_via JSON, -- email, push, sms
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read),
    INDEX idx_type (type),
    INDEX idx_priority (priority),
    INDEX idx_created (created_at),
    INDEX idx_expires (expires_at)
);

-- Tabla de mensajes entre usuarios
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_id VARCHAR(100) NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    business_id INT,
    booking_id INT,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    message_type ENUM('inquiry', 'booking', 'complaint', 'support', 'general') DEFAULT 'general',
    is_read BOOLEAN DEFAULT FALSE,
    is_important BOOLEAN DEFAULT FALSE,
    parent_message_id INT,
    attachments JSON,
    automated BOOLEAN DEFAULT FALSE,
    template_id INT,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE SET NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_message_id) REFERENCES messages(id) ON DELETE SET NULL,
    INDEX idx_conversation (conversation_id),
    INDEX idx_sender (sender_id),
    INDEX idx_receiver (receiver_id),
    INDEX idx_business (business_id),
    INDEX idx_booking (booking_id),
    INDEX idx_read (is_read),
    INDEX idx_type (message_type),
    INDEX idx_created (created_at)
);

-- ===================================
-- TABLAS DE ANALÍTICAS Y REPORTES
-- ===================================

-- Tabla de eventos de analíticas
CREATE TABLE analytics_events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_id VARCHAR(100),
    event_type VARCHAR(50) NOT NULL,
    event_category VARCHAR(50),
    event_action VARCHAR(50),
    event_label VARCHAR(100),
    event_value DECIMAL(10, 2),
    page_url VARCHAR(500),
    page_title VARCHAR(200),
    referrer_url VARCHAR(500),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),
    utm_content VARCHAR(100),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    operating_system VARCHAR(100),
    ip_address VARCHAR(45),
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    user_agent TEXT,
    screen_resolution VARCHAR(20),
    language VARCHAR(10),
    event_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_event_type (event_type),
    INDEX idx_user (user_id),
    INDEX idx_session (session_id),
    INDEX idx_created (created_at),
    INDEX idx_category_action (event_category, event_action),
    INDEX idx_utm (utm_source, utm_medium, utm_campaign)
);

-- Tabla de métricas de empresas
CREATE TABLE business_metrics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    date DATE NOT NULL,
    views INT DEFAULT 0,
    profile_visits INT DEFAULT 0,
    clicks_phone INT DEFAULT 0,
    clicks_email INT DEFAULT 0,
    clicks_website INT DEFAULT 0,
    clicks_directions INT DEFAULT 0,
    bookings_initiated INT DEFAULT 0,
    bookings_completed INT DEFAULT 0,
    reviews_received INT DEFAULT 0,
    favorites_added INT DEFAULT 0,
    shares INT DEFAULT 0,
    revenue DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_business_date (business_id, date),
    INDEX idx_business (business_id),
    INDEX idx_date (date),
    INDEX idx_views (views),
    INDEX idx_bookings (bookings_completed)
);

-- ===================================
-- TABLAS DE CONFIGURACIÓN DEL SISTEMA
-- ===================================

-- Tabla de configuración del sistema
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json', 'text') DEFAULT 'string',
    category VARCHAR(50) DEFAULT 'general',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    is_required BOOLEAN DEFAULT FALSE,
    validation_rules JSON,
    default_value TEXT,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_key (setting_key),
    INDEX idx_category (category),
    INDEX idx_public (is_public)
);

-- Tabla de logs del sistema
CREATE TABLE system_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    level ENUM('debug', 'info', 'warning', 'error', 'critical') NOT NULL,
    message TEXT NOT NULL,
    context JSON,
    user_id INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    url VARCHAR(500),
    method VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_level (level),
    INDEX idx_user (user_id),
    INDEX idx_created (created_at)
);

-- ===================================
-- TABLAS DE CONTENIDO MULTIMEDIA
-- ===================================

-- Tabla de archivos multimedia
CREATE TABLE media_files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_type ENUM('image', 'video', 'audio', 'document', 'other') NOT NULL,
    width INT,
    height INT,
    duration INT, -- para videos y audios en segundos
    alt_text VARCHAR(255),
    caption TEXT,
    uploaded_by INT NOT NULL,
    entity_type VARCHAR(50), -- business, event, poi, etc.
    entity_id INT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_type (file_type),
    INDEX idx_uploader (uploaded_by),
    INDEX idx_featured (is_featured),
    INDEX idx_public (is_public)
);

-- ===================================
-- DATOS INICIALES DEL SISTEMA
-- ===================================

-- Insertar roles básicos
INSERT INTO roles (name, display_name, description, permissions) VALUES 
('super_admin', 'Super Administrador', 'Acceso completo al sistema', '["*"]'),
('admin', 'Administrador', 'Administrador del sistema con acceso amplio', '["manage_all_businesses", "manage_users", "manage_events", "manage_content", "view_analytics", "manage_settings"]'),
('cluster_admin', 'Administrador del Clúster', 'Administrador del clúster de turismo', '["manage_businesses", "manage_events", "view_analytics", "manage_content", "approve_businesses"]'),
('business_owner', 'Propietario de Empresa', 'Propietario de empresa turística', '["manage_own_business", "manage_bookings", "view_own_analytics", "respond_reviews"]'),
('business_staff', 'Personal de Empresa', 'Empleado de empresa turística', '["view_own_business", "manage_bookings", "respond_reviews"]'),
('guide', 'Guía Turístico', 'Guía turístico certificado', '["create_routes", "manage_tours", "interact_with_tourists"]'),
('tourist', 'Turista', 'Usuario turista registrado', '["book_services", "write_reviews", "save_favorites", "create_routes"]'),
('guest', 'Invitado', 'Usuario no registrado', '["view_content", "search"]');

-- Insertar categorías de empresas
INSERT INTO business_categories (name, slug, description, icon, color, sort_order) VALUES 
('Hoteles y Alojamiento', 'hoteles', 'Hoteles, hostales y alojamientos turísticos', 'hotel', '#1f2937', 1),
('Restaurantes y Gastronomía', 'restaurantes', 'Restaurantes, cafeterías y gastronomía típica', 'utensils', '#f59e0b', 2),
('Agencias de Viajes', 'agencias-viajes', 'Operadores y agencias de turismo', 'map', '#3b82f6', 3),
('Transporte Turístico', 'transporte', 'Servicios de transporte y traslados', 'car', '#8b5cf6', 4),
('Entretenimiento', 'entretenimiento', 'Actividades recreativas y de entretenimiento', 'music', '#ef4444', 5),
('Aventura y Deportes', 'aventura', 'Deportes extremos y turismo de aventura', 'mountain', '#059669', 6),
('Cultura y Patrimonio', 'cultura', 'Sitios históricos, museos y cultura', 'building', '#dc2626', 7),
('Naturaleza y Ecoturismo', 'naturaleza', 'Ecoturismo, parques y naturaleza', 'tree-pine', '#16a34a', 8),
('Compras y Artesanías', 'compras', 'Tiendas, artesanías y souvenirs', 'shopping-bag', '#7c3aed', 9),
('Salud y Bienestar', 'salud-bienestar', 'Spas, wellness y centros de salud', 'heart', '#ec4899', 10),
('Servicios Profesionales', 'servicios', 'Servicios profesionales para turistas', 'briefcase', '#64748b', 11),
('Eventos y Convenciones', 'eventos', 'Centros de eventos y convenciones', 'calendar', '#f97316', 12);

-- Insertar configuraciones básicas del sistema
INSERT INTO system_settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES 
('app_name', 'Villavicencio Turismo', 'string', 'general', 'Nombre de la aplicación', TRUE),
('app_version', '2.0.0', 'string', 'general', 'Versión actual de la aplicación', TRUE),
('app_url', 'https://villavicencio-turismo.com', 'string', 'general', 'URL principal de la aplicación', TRUE),
('contact_email', 'info@villavicencio-turismo.com', 'string', 'contact', 'Email de contacto principal', TRUE),
('contact_phone', '+57 8 123 4567', 'string', 'contact', 'Teléfono de contacto principal', TRUE),
('contact_address', 'Carrera 35 #15-30, Villavicencio, Meta', 'string', 'contact', 'Dirección física', TRUE),
('currency', 'COP', 'string', 'payment', 'Moneda por defecto', TRUE),
('currency_symbol', '$', 'string', 'payment', 'Símbolo de moneda', TRUE),
('timezone', 'America/Bogota', 'string', 'general', 'Zona horaria del sistema', FALSE),
('language_default', 'es', 'string', 'general', 'Idioma por defecto', TRUE),
('languages_available', '["es", "en", "fr"]', 'json', 'general', 'Idiomas disponibles', TRUE),
('max_file_size_mb', '10', 'number', 'files', 'Tamaño máximo de archivos en MB', FALSE),
('allowed_file_types', '["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"]', 'json', 'files', 'Tipos de archivo permitidos', FALSE),
('booking_cancellation_hours', '24', 'number', 'booking', 'Horas mínimas para cancelar reserva', TRUE),
('featured_businesses_limit', '10', 'number', 'display', 'Límite de empresas destacadas en homepage', FALSE),
('vip_businesses_limit', '6', 'number', 'display', 'Límite de empresas VIP en homepage', FALSE),
('review_moderation_enabled', 'true', 'boolean', 'reviews', 'Activar moderación de reseñas', FALSE),
('auto_approve_businesses', 'false', 'boolean', 'businesses', 'Aprobar empresas automáticamente', FALSE),
('commission_rate_default', '5.0', 'number', 'payment', 'Comisión por defecto (%)', FALSE),
('email_notifications_enabled', 'true', 'boolean', 'notifications', 'Notificaciones por email activadas', FALSE),
('sms_notifications_enabled', 'false', 'boolean', 'notifications', 'Notificaciones por SMS activadas', FALSE),
('push_notifications_enabled', 'true', 'boolean', 'notifications', 'Notificaciones push activadas', FALSE),
('maintenance_mode', 'false', 'boolean', 'general', 'Modo de mantenimiento', FALSE),
('registration_enabled', 'true', 'boolean', 'users', 'Registro de usuarios habilitado', TRUE),
('guest_booking_enabled', 'true', 'boolean', 'booking', 'Reservas sin registro habilitadas', TRUE),
('google_analytics_id', '', 'string', 'analytics', 'ID de Google Analytics', FALSE),
('facebook_pixel_id', '', 'string', 'analytics', 'ID de Facebook Pixel', FALSE),
('social_facebook', 'https://facebook.com/villavicencioturismo', 'string', 'social', 'URL de Facebook', TRUE),
('social_instagram', 'https://instagram.com/villavicencioturismo', 'string', 'social', 'URL de Instagram', TRUE),
('social_twitter', 'https://twitter.com/villaviturismo', 'string', 'social', 'URL de Twitter', TRUE),
('social_youtube', 'https://youtube.com/villavicencioturismo', 'string', 'social', 'URL de YouTube', TRUE);

-- Crear índices compuestos adicionales para optimización
CREATE INDEX idx_businesses_active_featured_vip ON businesses(is_active, is_featured, is_vip_sponsor);
CREATE INDEX idx_businesses_category_rating ON businesses(category_id, rating DESC);
CREATE INDEX idx_events_dates_active ON events(start_date, end_date, is_active);
CREATE INDEX idx_bookings_business_status ON bookings(business_id, status);
CREATE INDEX idx_reviews_business_approved ON reviews(business_id, is_approved, rating DESC);
CREATE INDEX idx_analytics_date_type ON analytics_events(DATE(created_at), event_type);

-- Crear vistas útiles para consultas frecuentes
CREATE VIEW active_businesses AS
SELECT 
    b.*,
    bc.name as category_name,
    u.first_name as owner_first_name,
    u.last_name as owner_last_name,
    u.email as owner_email
FROM businesses b
JOIN business_categories bc ON b.category_id = bc.id
JOIN users u ON b.owner_id = u.id
WHERE b.is_active = TRUE;

CREATE VIEW business_stats AS
SELECT 
    b.id,
    b.name,
    b.rating,
    b.review_count,
    COALESCE(bm.total_views, 0) as total_views,
    COALESCE(bm.total_bookings, 0) as total_bookings
FROM businesses b
LEFT JOIN (
    SELECT 
        business_id,
        SUM(views) as total_views,
        SUM(bookings_completed) as total_bookings
    FROM business_metrics
    GROUP BY business_id
) bm ON b.id = bm.business_id;

-- Crear triggers para mantener estadísticas actualizadas
DELIMITER $$

CREATE TRIGGER update_business_rating_on_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE businesses 
    SET 
        rating = (SELECT AVG(rating) FROM reviews WHERE business_id = NEW.business_id AND is_approved = TRUE),
        review_count = (SELECT COUNT(*) FROM reviews WHERE business_id = NEW.business_id AND is_approved = TRUE)
    WHERE id = NEW.business_id;
END$$

CREATE TRIGGER update_business_rating_on_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
    UPDATE businesses 
    SET 
        rating = (SELECT AVG(rating) FROM reviews WHERE business_id = NEW.business_id AND is_approved = TRUE),
        review_count = (SELECT COUNT(*) FROM reviews WHERE business_id = NEW.business_id AND is_approved = TRUE)
    WHERE id = NEW.business_id;
END$$

CREATE TRIGGER update_business_rating_on_review_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
    UPDATE businesses 
    SET 
        rating = COALESCE((SELECT AVG(rating) FROM reviews WHERE business_id = OLD.business_id AND is_approved = TRUE), 0),
        review_count = (SELECT COUNT(*) FROM reviews WHERE business_id = OLD.business_id AND is_approved = TRUE)
    WHERE id = OLD.business_id;
END$$

DELIMITER ;
