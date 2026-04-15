
-- Esquema de internacionalización para la base de datos de turismo de Villavicencio
-- Sistema optimizado para manejo de múltiples idiomas

USE villavicencio_turismo;

-- ===================================
-- TABLAS DE INTERNACIONALIZACIÓN
-- ===================================

-- Tabla de idiomas soportados
CREATE TABLE languages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(5) NOT NULL UNIQUE, -- ISO 639-1 (es, en, fr)
    name VARCHAR(100) NOT NULL, -- Español, English, Français
    native_name VARCHAR(100) NOT NULL, -- Español, English, Français
    flag_icon VARCHAR(10), -- Emoji de bandera o código de icono
    is_active BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code),
    INDEX idx_active (is_active),
    INDEX idx_default (is_default)
);

-- Tabla de traducciones generales del sistema
CREATE TABLE translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    language_code VARCHAR(5) NOT NULL,
    translation_key VARCHAR(200) NOT NULL, -- nav.home, hero.title, etc.
    translation_value TEXT NOT NULL,
    context VARCHAR(100), -- Para agrupar traducciones relacionadas
    description TEXT, -- Descripción para traductores
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (language_code) REFERENCES languages(code) ON DELETE CASCADE,
    UNIQUE KEY unique_lang_key (language_code, translation_key),
    INDEX idx_language (language_code),
    INDEX idx_key (translation_key),
    INDEX idx_context (context),
    INDEX idx_active (is_active)
);

-- Tabla de traducciones para categorías de empresas
CREATE TABLE business_category_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES business_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code) ON DELETE CASCADE,
    UNIQUE KEY unique_category_lang (category_id, language_code),
    INDEX idx_category (category_id),
    INDEX idx_language (language_code)
);

-- Tabla de traducciones para empresas
CREATE TABLE business_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    name VARCHAR(200),
    description TEXT,
    short_description VARCHAR(500),
    address TEXT,
    sustainability_practices TEXT,
    accessibility_features TEXT,
    cancellation_policy TEXT,
    terms_and_conditions TEXT,
    business_hours_note TEXT,
    special_requirements TEXT,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    seo_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code) ON DELETE CASCADE,
    UNIQUE KEY unique_business_lang (business_id, language_code),
    INDEX idx_business (business_id),
    INDEX idx_language (language_code),
    FULLTEXT(name, description, short_description, seo_keywords)
);

-- Tabla de traducciones para eventos
CREATE TABLE event_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    title VARCHAR(200),
    description TEXT,
    short_description VARCHAR(500),
    location_name VARCHAR(200),
    address TEXT,
    requirements TEXT,
    included_services TEXT,
    excluded_services TEXT,
    what_to_bring TEXT,
    cancellation_policy TEXT,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code) ON DELETE CASCADE,
    UNIQUE KEY unique_event_lang (event_id, language_code),
    INDEX idx_event (event_id),
    INDEX idx_language (language_code),
    FULLTEXT(title, description, short_description)
);

-- Tabla de traducciones para paquetes turísticos
CREATE TABLE tour_package_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    package_id INT NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    name VARCHAR(200),
    description TEXT,
    short_description VARCHAR(500),
    physical_requirements TEXT,
    age_restriction VARCHAR(100),
    included_services TEXT,
    excluded_services TEXT,
    requirements TEXT,
    what_to_bring TEXT,
    cancellation_policy TEXT,
    refund_policy TEXT,
    terms_and_conditions TEXT,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (package_id) REFERENCES tour_packages(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code) ON DELETE CASCADE,
    UNIQUE KEY unique_package_lang (package_id, language_code),
    INDEX idx_package (package_id),
    INDEX idx_language (language_code),
    FULLTEXT(name, description, short_description)
);

-- Tabla de traducciones para puntos de interés
CREATE TABLE poi_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    poi_id INT NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    name VARCHAR(200),
    description TEXT,
    short_description VARCHAR(500),
    category VARCHAR(100),
    address TEXT,
    historical_significance TEXT,
    architectural_style VARCHAR(100),
    best_time_to_visit TEXT,
    accessibility_info TEXT,
    transportation_info TEXT,
    parking_info TEXT,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (poi_id) REFERENCES points_of_interest(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code) ON DELETE CASCADE,
    UNIQUE KEY unique_poi_lang (poi_id, language_code),
    INDEX idx_poi (poi_id),
    INDEX idx_language (language_code),
    FULLTEXT(name, description, short_description)
);

-- Tabla de traducciones para rutas turísticas
CREATE TABLE route_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    route_id INT NOT NULL,
    language_code VARCHAR(5) NOT NULL,
    name VARCHAR(200),
    description TEXT,
    short_description VARCHAR(500),
    best_season TEXT,
    weather_considerations TEXT,
    equipment_needed TEXT,
    safety_tips TEXT,
    restrictions TEXT,
    meta_title VARCHAR(150),
    meta_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES tourist_routes(id) ON DELETE CASCADE,
    FOREIGN KEY (language_code) REFERENCES languages(code) ON DELETE CASCADE,
    UNIQUE KEY unique_route_lang (route_id, language_code),
    INDEX idx_route (route_id),
    INDEX idx_language (language_code),
    FULLTEXT(name, description, short_description)
);

-- ===================================
-- DATOS INICIALES DE IDIOMAS
-- ===================================

-- Insertar idiomas soportados
INSERT INTO languages (code, name, native_name, flag_icon, is_active, is_default, sort_order) VALUES 
('es', 'Español', 'Español', '🇪🇸', TRUE, TRUE, 1),
('en', 'English', 'English', '🇺🇸', TRUE, FALSE, 2),
('fr', 'Français', 'Français', '🇫🇷', TRUE, FALSE, 3);

-- Insertar traducciones básicas del sistema
INSERT INTO translations (language_code, translation_key, translation_value, context, description) VALUES 
-- Navegación en español
('es', 'nav.home', 'Inicio', 'navigation', 'Enlace de navegación a página principal'),
('es', 'nav.businesses', 'Empresas', 'navigation', 'Enlace de navegación a directorio de empresas'),
('es', 'nav.events', 'Eventos', 'navigation', 'Enlace de navegación a eventos'),
('es', 'nav.map', 'Mapa', 'navigation', 'Enlace de navegación a mapa interactivo'),
('es', 'nav.experiences', 'Experiencias', 'navigation', 'Enlace de navegación a experiencias'),
('es', 'nav.services', 'Servicios', 'navigation', 'Enlace de navegación a servicios'),
('es', 'nav.news', 'Noticias', 'navigation', 'Enlace de navegación a noticias'),
('es', 'nav.institutional', 'Institucional', 'navigation', 'Enlace de navegación a página institucional'),
('es', 'nav.contact', 'Contacto', 'navigation', 'Enlace de navegación a contacto'),

-- Navegación en inglés
('en', 'nav.home', 'Home', 'navigation', 'Navigation link to home page'),
('en', 'nav.businesses', 'Businesses', 'navigation', 'Navigation link to business directory'),
('en', 'nav.events', 'Events', 'navigation', 'Navigation link to events'),
('en', 'nav.map', 'Map', 'navigation', 'Navigation link to interactive map'),
('en', 'nav.experiences', 'Experiences', 'navigation', 'Navigation link to experiences'),
('en', 'nav.services', 'Services', 'navigation', 'Navigation link to services'),
('en', 'nav.news', 'News', 'navigation', 'Navigation link to news'),
('en', 'nav.institutional', 'Institutional', 'navigation', 'Navigation link to institutional page'),
('en', 'nav.contact', 'Contact', 'navigation', 'Navigation link to contact'),

-- Navegación en francés
('fr', 'nav.home', 'Accueil', 'navigation', 'Lien de navigation vers la page d\'accueil'),
('fr', 'nav.businesses', 'Entreprises', 'navigation', 'Lien de navigation vers le répertoire d\'entreprises'),
('fr', 'nav.events', 'Événements', 'navigation', 'Lien de navigation vers les événements'),
('fr', 'nav.map', 'Carte', 'navigation', 'Lien de navigation vers la carte interactive'),
('fr', 'nav.experiences', 'Expériences', 'navigation', 'Lien de navigation vers les expériences'),
('fr', 'nav.services', 'Services', 'navigation', 'Lien de navigation vers les services'),
('fr', 'nav.news', 'Actualités', 'navigation', 'Lien de navigation vers les actualités'),
('fr', 'nav.institutional', 'Institutionnel', 'navigation', 'Lien de navigation vers la page institutionnelle'),
('fr', 'nav.contact', 'Contact', 'navigation', 'Lien de navigation vers le contact');

-- ===================================
-- VISTAS PARA CONSULTAS OPTIMIZADAS
-- ===================================

-- Vista para obtener empresas con traducciones
CREATE VIEW businesses_with_translations AS
SELECT 
    b.*,
    bt.language_code,
    COALESCE(bt.name, b.name) as translated_name,
    COALESCE(bt.description, b.description) as translated_description,
    COALESCE(bt.short_description, b.short_description) as translated_short_description,
    COALESCE(bt.address, b.address) as translated_address,
    bc.slug as category_slug,
    bct.name as translated_category_name
FROM businesses b
LEFT JOIN business_translations bt ON b.id = bt.business_id
LEFT JOIN business_categories bc ON b.category_id = bc.id
LEFT JOIN business_category_translations bct ON bc.id = bct.category_id AND bct.language_code = bt.language_code
WHERE b.is_active = TRUE;

-- Vista para obtener eventos con traducciones
CREATE VIEW events_with_translations AS
SELECT 
    e.*,
    et.language_code,
    COALESCE(et.title, e.title) as translated_title,
    COALESCE(et.description, e.description) as translated_description,
    COALESCE(et.short_description, e.short_description) as translated_short_description,
    COALESCE(et.location_name, e.location_name) as translated_location_name
FROM events e
LEFT JOIN event_translations et ON e.id = et.event_id
WHERE e.is_active = TRUE;

-- ===================================
-- FUNCIONES ÚTILES
-- ===================================

DELIMITER $$

-- Función para obtener traducción con fallback
CREATE FUNCTION get_translation(
    p_key VARCHAR(200),
    p_language VARCHAR(5),
    p_fallback_language VARCHAR(5) DEFAULT 'es'
) RETURNS TEXT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE result TEXT DEFAULT NULL;
    
    -- Intentar obtener la traducción en el idioma solicitado
    SELECT translation_value INTO result
    FROM translations 
    WHERE translation_key = p_key 
      AND language_code = p_language 
      AND is_active = TRUE
    LIMIT 1;
    
    -- Si no se encuentra, usar el idioma de fallback
    IF result IS NULL THEN
        SELECT translation_value INTO result
        FROM translations 
        WHERE translation_key = p_key 
          AND language_code = p_fallback_language 
          AND is_active = TRUE
        LIMIT 1;
    END IF;
    
    -- Si aún no se encuentra, devolver la clave
    IF result IS NULL THEN
        SET result = p_key;
    END IF;
    
    RETURN result;
END$$

DELIMITER ;

-- ===================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- ===================================

-- Índices compuestos para búsquedas frecuentes
CREATE INDEX idx_business_trans_lang_active ON business_translations(language_code, business_id);
CREATE INDEX idx_event_trans_lang_active ON event_translations(language_code, event_id);
CREATE INDEX idx_poi_trans_lang_active ON poi_translations(language_code, poi_id);
CREATE INDEX idx_route_trans_lang_active ON route_translations(language_code, route_id);
CREATE INDEX idx_package_trans_lang_active ON tour_package_translations(language_code, package_id);
CREATE INDEX idx_category_trans_lang_active ON business_category_translations(language_code, category_id);
