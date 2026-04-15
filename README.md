
# Plataforma Turística de Villavicencio

Sistema integral de gestión turística para la ciudad de Villavicencio, Meta, Colombia.

## Información del Proyecto

**URL del Proyecto**: https://cluster.sactel.cloud

## Descripción

La Plataforma Turística de Villavicencio es una aplicación web completa diseñada para conectar turistas, empresarios del sector turístico y administradores de la ciudad. Facilita la gestión, promoción y descubrimiento de servicios turísticos en Villavicencio y sus alrededores.

## Características Principales

### 🏨 **Gestión de Servicios Turísticos**
- Catálogo completo de hoteles, restaurantes y servicios
- Sistema de reservas y disponibilidad
- Gestión de tarifas y ofertas especiales
- Galería de imágenes y descripciones detalladas

### 👥 **Sistema Multi-Rol**
- **Administrador**: Control total del sistema
- **Usuario Administrador**: Gestión de contenido y moderación
- **Empresario**: Gestión de empresa turística propia
- **Usuario Empresario**: Empleado de empresa turística
- **Turista**: Búsqueda y planificación de actividades
- **Huésped**: Gestión de reservas de hospedaje

### 📅 **Gestión de Eventos**
- Calendario de eventos turísticos
- Promoción de festivales y actividades culturales
- Sistema de inscripción y seguimiento

### 💬 **Sistema de Comunicación**
- Mensajería directa entre usuarios y proveedores
- Notificaciones en tiempo real
- Sistema de reseñas y calificaciones

### 📊 **Analytics y Reportes**
- Estadísticas de uso por empresa
- Métricas de engagement
- Reportes de reservas y actividad

## Tecnologías Utilizadas

### Frontend
- **React 18.3.1**: Biblioteca principal para la interfaz de usuario
- **TypeScript**: Tipado estático para mayor seguridad
- **Vite**: Herramienta de build y desarrollo
- **Tailwind CSS**: Framework de CSS para diseño responsive
- **Shadcn/UI**: Componentes de interfaz modernos y accesibles

### Gestión de Estado y Datos
- **TanStack React Query 5.56.2**: Gestión de estado del servidor
- **React Router DOM 6.26.2**: Navegación y enrutamiento
- **React Hook Form 7.53.0**: Manejo de formularios

### Componentes UI
- **Radix UI**: Componentes primitivos accesibles
- **Lucide React**: Iconografía moderna
- **Recharts 2.12.7**: Gráficos y visualización de datos
- **Sonner**: Sistema de notificaciones toast

### Herramientas de Desarrollo
- **ESLint**: Linting de código
- **PostCSS**: Procesamiento de CSS
- **Class Variance Authority**: Utilidades para variantes de componentes

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── admin/           # Componentes específicos del administrador
│   ├── business-owner/  # Componentes del empresario
│   ├── guest/           # Componentes del huésped
│   ├── tourist/         # Componentes del turista
│   ├── tour-operator/   # Componentes del operador turístico
│   ├── dashboard/       # Componentes comunes de dashboards
│   ├── header/          # Componentes del header
│   ├── home/            # Componentes de la página principal
│   ├── common/          # Componentes compartidos
│   └── ui/              # Componentes base de UI
├── contexts/            # Contextos de React (Auth, I18n)
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades y configuraciones
├── pages/               # Páginas principales de la aplicación
│   ├── admin/           # Páginas del panel administrativo
│   └── ...              # Otras páginas públicas
└── utils/               # Funciones utilitarias
```

## Configuración de Desarrollo

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm

### Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# Navegar al directorio del proyecto
cd metacluster

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Vista previa de la build de producción
npm run lint         # Ejecuta el linter
```

## Configuración del Sistema

### Variables de Entorno
```env
VITE_API_URL=<URL_DE_LA_API>
VITE_MAPS_API_KEY=<CLAVE_DE_GOOGLE_MAPS>
VITE_WHATSAPP_NUMBER=<NUMERO_DE_WHATSAPP>
```

### Autenticación
El sistema utiliza un contexto de autenticación personalizado que maneja:
- Login/logout de usuarios
- Gestión de roles y permisos
- Persistencia de sesión en localStorage
- Redirección automática según el rol

### Usuarios de Prueba
```javascript
// Administrador
email: admin@villavicencio.com
password: admin123

// Usuario Administrador  
email: user.admin@villavicencio.com
password: useradmin123

// Empresario
email: empresario@hotel.com
password: empresario123

// Turista
email: turista@gmail.com
password: turista123

// Huésped
email: cliente@hotel.com
password: cliente123
```

## Funcionalidades por Rol

### Administrador
- ✅ Gestión completa de usuarios
- ✅ Configuración del sistema
- ✅ Moderación de contenido
- ✅ Estadísticas generales
- ✅ Gestión de empresas y eventos

### Empresario
- ✅ Gestión de perfil empresarial
- ✅ Publicación de servicios
- ✅ Sistema de mensajería
- ✅ Estadísticas de negocio
- ✅ Gestión de disponibilidad

### Turista
- ✅ Exploración de servicios
- ✅ Planificación de actividades
- ✅ Comunicación con proveedores
- ✅ Gestión de perfil personal

### Huésped
- ✅ Gestión de reservas
- ✅ Comunicación con hoteles
- ✅ Sistema de reseñas
- ✅ Historial de estadías

## Despliegue

### Utilizando Lovable
1. Abrir el [proyecto en Lovable](https://cluster.sactel.cloud)
2. Hacer clic en "Share" → "Publish"
3. La aplicación se desplegará automáticamente

## Base de Datos

### Esquema Principal
La aplicación utiliza las siguientes entidades principales:
- **Usuarios**: Gestión de cuentas y roles
- **Empresas**: Información de negocios turísticos
- **Servicios**: Catálogo de ofertas turísticas
- **Eventos**: Calendario de actividades
- **Reservas**: Sistema de bookings
- **Mensajes**: Comunicación entre usuarios
- **Reseñas**: Sistema de calificaciones

### Scripts SQL
```sql
-- Ubicados en database/
schema.sql        # Estructura de la base de datos
seed_data.sql     # Datos de prueba
i18n_schema.sql   # Esquema de internacionalización
turismo_app.sql   # Schema completo
```

## Internacionalización

### Idiomas Soportados
- 🇪🇸 Español (por defecto)
- 🇺🇸 Inglés
- 🇫🇷 Francés

### Configuración
```typescript
// src/utils/translations.ts
export const useTranslations = (language: string) => {
  // Lógica de traducción
}
```

## Capacitor (Móvil)

### Configuración para Móvil
```javascript
// capacitor.config.ts
{
  appId: 'com.cluster.turismo',
  appName: 'Cluster de Turismo Villavicencio y el Meta',
  webDir: 'dist',
  bundledWebRuntime: false
}
```

### Plataformas Soportadas
- 📱 iOS (7.3.0)
- 🤖 Android (7.3.0)

## Contribución

### Guías de Código
- Utilizar TypeScript para tipado estático
- Seguir convenciones de nomenclatura de React
- Implementar componentes reutilizables
- Documentar funciones complejas
- Utilizar Prettier para formateo de código

### Pull Requests
1. Fork del repositorio
2. Crear rama feature/bugfix
3. Hacer commits descriptivos
4. Ejecutar tests y linting
5. Crear Pull Request con descripción detallada

## Soporte y Documentación

### Enlaces Útiles
- 📖 [Manual del Sistema](./src/pages/SystemManual.tsx)

### Contacto
- **Soporte Técnico**: soporte@sactel.cloud
- **Capacitación**: capacitacion@sactel.cloud 
- **Teléfono**: +57 317 484 8930
- **WhatsApp**: +57 320 697 6285

## Licencia

Este proyecto está licenciado bajo los términos del Cluser de Turismo Villavicencio y el Meta para uso en la promoción turística de la ciudad.

## Changelog

### Versión 1.0.0 (2024)
- ✅ Sistema multi-rol completo
- ✅ Dashboards específicos por usuario
- ✅ Sistema de mensajería integrado
- ✅ Gestión de empresas turísticas
- ✅ Calendario de eventos
- ✅ Sistema de reseñas y calificaciones
- ✅ Manuales de usuario personalizados
- ✅ Diseño responsive y accesible

---

**Desarrollado con ❤️ para promover el turismo en Villavicencio y el Meta, Colombia**
# sactel
# soyLlanero
