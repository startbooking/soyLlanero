
-- Base de datos para la aplicación de turismo de Villavicencio
-- Esquema optimizado para MySQL 8.0+

CREATE DATABASE IF NOT EXISTS villavicencio_turismo 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE villavicencio_turismo;

-- Tabla de roles de usuario
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSON,
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
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7), -- Código hexadecimal
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active_order (is_active, sort_order)
);

-- Tabla de empresas turísticas
CREATE TABLE businesses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    phone VARCHAR(20),
    email VARCHAR(255),
    website_url VARCHAR(500),
    whatsapp VARCHAR(20),
    facebook_url VARCHAR(500),
    instagram_url VARCHAR(500),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    opening_hours JSON, -- Horarios por día de la semana
    price_range ENUM('$', '$$', '$$$', '$$$$'),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    amenities JSON, -- Lista de servicios/amenidades
    images JSON, -- URLs de imágenes
    videos JSON, -- URLs de videos
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
    INDEX idx_owner (owner_id),
    FULLTEXT(name, description, short_description)
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
    INDEX idx_user (user_id),
    INDEX idx_verified (is_verified)
);

-- Tabla de eventos
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    organizer_id INT,
    business_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category VARCHAR(100),
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    location_name VARCHAR(200),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    price DECIMAL(10, 2),
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
    INDEX idx_location (latitude, longitude),
    INDEX idx_active_featured (is_active, is_featured),
    INDEX idx_organizer (organizer_id),
    INDEX idx_business (business_id),
    FULLTEXT(title, description, short_description)
);

-- Tabla de paquetes turísticos
CREATE TABLE tour_packages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    duration_days INT NOT NULL,
    duration_hours INT,
    price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'COP',
    discount_percentage DECIMAL(5, 2) DEFAULT 0.00,
    max_participants INT,
    min_participants INT DEFAULT 1,
    difficulty_level ENUM('Easy', 'Moderate', 'Challenging', 'Expert'),
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
    cancellation_policy TEXT,
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id),
    INDEX idx_business (business_id),
    INDEX idx_price (price),
    INDEX idx_active_featured (is_active, is_featured),
    INDEX idx_duration (duration_days),
    FULLTEXT(name, description, short_description)
);

-- Tabla de reservas
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    business_id INT NOT NULL,
    package_id INT,
    event_id INT,
    booking_type ENUM('hotel', 'restaurant', 'package', 'event', 'activity') NOT NULL,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show') DEFAULT 'pending',
    check_in_date DATE,
    check_out_date DATE,
    booking_date DATETIME NOT NULL,
    num_adults INT NOT NULL DEFAULT 1,
    num_children INT DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'COP',
    payment_status ENUM('pending', 'paid', 'refunded', 'failed') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    special_requests TEXT,
    contact_name VARCHAR(200),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (business_id) REFERENCES businesses(id),
    FOREIGN KEY (package_id) REFERENCES tour_packages(id),
    FOREIGN KEY (event_id) REFERENCES events(id),
    INDEX idx_user (user_id),
    INDEX idx_business (business_id),
    INDEX idx_status (status),
    INDEX idx_dates (check_in_date, check_out_date),
    INDEX idx_booking_date (booking_date),
    INDEX idx_reference (booking_reference)
);

-- Tabla de puntos de interés turístico
CREATE TABLE points_of_interest (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category VARCHAR(100),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    address TEXT,
    opening_hours JSON,
    entry_fee DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'COP',
    images JSON,
    videos JSON,
    historical_significance TEXT,
    best_time_to_visit TEXT,
    accessibility_info TEXT,
    nearby_services JSON,
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
    INDEX idx_rating (rating),
    FULLTEXT(name, description, short_description)
);

-- Tabla de rutas turísticas
CREATE TABLE tourist_routes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    difficulty_level ENUM('Easy', 'Moderate', 'Challenging', 'Expert'),
    estimated_duration_hours INT,
    distance_km DECIMAL(8, 2),
    route_points JSON, -- Array de coordenadas lat/lng
    waypoints JSON, -- Puntos de interés en la ruta
    transportation_type ENUM('walking', 'cycling', 'driving', 'mixed'),
    best_season TEXT,
    equipment_needed TEXT,
    safety_tips TEXT,
    images JSON,
    gpx_file_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    usage_count INT DEFAULT 0,
    created_by INT,
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_transportation (transportation_type),
    INDEX idx_active_featured (is_active, is_featured),
    INDEX idx_creator (created_by),
    INDEX idx_rating (rating),
    FULLTEXT(name, description, short_description)
);

-- Tabla de favoritos de usuarios
CREATE TABLE user_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    favoritable_type ENUM('business', 'event', 'poi', 'route', 'package') NOT NULL,
    favoritable_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_favorite (user_id, favoritable_type, favoritable_id),
    INDEX idx_user (user_id),
    INDEX idx_favoritable (favoritable_type, favoritable_id)
);

-- Tabla de notificaciones
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error', 'marketing') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    data JSON,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read),
    INDEX idx_type (type),
    INDEX idx_created (created_at)
);

-- Tabla de mensajes/comunicación
CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    business_id INT,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    message_type ENUM('inquiry', 'booking', 'complaint', 'general') DEFAULT 'general',
    is_read BOOLEAN DEFAULT FALSE,
    parent_message_id INT,
    attachments JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (business_id) REFERENCES businesses(id),
    FOREIGN KEY (parent_message_id) REFERENCES messages(id),
    INDEX idx_sender (sender_id),
    INDEX idx_receiver (receiver_id),
    INDEX idx_business (business_id),
    INDEX idx_read (is_read),
    INDEX idx_type (message_type)
);

-- Tabla de estadísticas y analytics
CREATE TABLE analytics_events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    event_type VARCHAR(50) NOT NULL,
    event_data JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(100),
    page_url VARCHAR(500),
    referrer_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_event_type (event_type),
    INDEX idx_user (user_id),
    INDEX idx_session (session_id),
    INDEX idx_created (created_at)
);

-- Tabla de configuración del sistema
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id),
    INDEX idx_key (setting_key),
    INDEX idx_public (is_public)
);
