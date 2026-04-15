
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Book, 
  ArrowLeft, 
  Download, 
  User, 
  Building, 
  Calendar, 
  Star, 
  Users, 
  Settings,
  MessageSquare,
  BarChart3,
  MapPin,
  Hotel,
  Search,
  Globe,
  Shield,
  Smartphone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SystemManual = () => {
  const navigate = useNavigate();

  const systemSections = [
    {
      title: "Introducción a la Plataforma",
      icon: Globe,
      content: "La plataforma turística de Villavicencio es un sistema integral diseñado para conectar turistas, empresarios del sector turístico y administradores de la ciudad.",
      subsections: [
        "Portal web responsive y aplicación móvil",
        "Sistema de roles y permisos diferenciados",
        "Gestión integral de servicios turísticos",
        "Comunicación directa entre usuarios y proveedores"
      ]
    },
    {
      title: "Tipos de Usuario y Roles",
      icon: Users,
      content: "El sistema maneja diferentes tipos de usuarios con funcionalidades específicas:",
      subsections: [
        "Administrador: Control total del sistema y contenido",
        "Usuario Administrador: Gestión de contenido y moderación",
        "Empresario: Gestión de empresa turística propia",
        "Usuario Empresario: Empleado de empresa turística",
        "Turista: Visitante que busca actividades y experiencias",
        "Huésped: Cliente de servicios de hospedaje"
      ]
    },
    {
      title: "Funcionalidades Principales",
      icon: Star,
      content: "La plataforma ofrece un conjunto completo de herramientas:",
      subsections: [
        "Catálogo de empresas turísticas (hoteles, restaurantes, etc.)",
        "Sistema de reservas y gestión de disponibilidad",
        "Calendario de eventos turísticos",
        "Sistema de mensajería entre usuarios",
        "Reseñas y calificaciones",
        "Panel de estadísticas y análisis"
      ]
    },
    {
      title: "Navegación y Búsqueda",
      icon: Search,
      content: "Sistema de navegación intuitivo con herramientas de búsqueda avanzada:",
      subsections: [
        "Menú principal con categorías organizadas",
        "Filtros de búsqueda por tipo, ubicación y servicios",
        "Mapa interactivo de ubicaciones",
        "Sistema de favoritos y listas personalizadas"
      ]
    },
    {
      title: "Seguridad y Privacidad",
      icon: Shield,
      content: "La plataforma implementa medidas de seguridad robustas:",
      subsections: [
        "Autenticación segura con roles diferenciados",
        "Protección de datos personales",
        "Moderación de contenido",
        "Sistema de reportes y denuncias"
      ]
    },
    {
      title: "Acceso Móvil",
      icon: Smartphone,
      content: "Experiencia optimizada para dispositivos móviles:",
      subsections: [
        "Diseño responsive para todos los dispositivos",
        "Funcionalidades completas en móvil",
        "Notificaciones push para actualizaciones importantes",
        "Modo offline para información básica"
      ]
    }
  ];

  const roleFeatures = [
    {
      role: "Administrador",
      icon: Settings,
      color: "bg-red-500",
      features: [
        "Gestión completa de usuarios y roles",
        "Configuración del sistema y contenido",
        "Moderación de empresas y eventos",
        "Acceso a estadísticas generales",
        "Gestión de categorías y configuraciones"
      ]
    },
    {
      role: "Empresario",
      icon: Building,
      color: "bg-blue-500",
      features: [
        "Gestión de perfil empresarial",
        "Publicación y edición de servicios",
        "Sistema de mensajería con clientes",
        "Estadísticas de su negocio",
        "Gestión de eventos propios"
      ]
    },
    {
      role: "Turista",
      icon: MapPin,
      color: "bg-green-500",
      features: [
        "Búsqueda y exploración de servicios",
        "Planificación de actividades",
        "Comunicación con proveedores",
        "Gestión de perfil personal",
        "Acceso a eventos y experiencias"
      ]
    },
    {
      role: "Huésped",
      icon: Hotel,
      color: "bg-purple-500",
      features: [
        "Gestión de reservas de hospedaje",
        "Comunicación con hoteles",
        "Sistema de reseñas y calificaciones",
        "Historial de estadías",
        "Solicitud de servicios adicionales"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Inicio
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-3xl">
                <Book className="w-8 h-8 text-primary" />
                Manual General del Sistema Turístico de Villavicencio
              </CardTitle>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
            <p className="text-lg text-muted-foreground">
              Guía completa para el uso de la plataforma turística oficial de Villavicencio
            </p>
            <Badge variant="secondary" className="w-fit">
              Versión 1.0 - 2024
            </Badge>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {systemSections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <section.icon className="w-6 h-6 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{section.content}</p>
                <ul className="space-y-2">
                  {section.subsections.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Funcionalidades por Rol de Usuario</CardTitle>
            <p className="text-muted-foreground">
              Cada tipo de usuario tiene acceso a funcionalidades específicas según su rol
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roleFeatures.map((roleData, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: roleData.color.replace('bg-', '#') }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${roleData.color} text-white`}>
                        <roleData.icon className="w-4 h-4" />
                      </div>
                      {roleData.role}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {roleData.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Información Técnica y Soporte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Soporte Técnico</h3>
                <p className="text-sm text-muted-foreground mb-1">soporte@villavicencio.com</p>
                <p className="text-sm text-muted-foreground mb-1">+57 8 123 4567</p>
                <p className="text-sm text-muted-foreground">WhatsApp: +57 300 123 4567</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Capacitación y Formación</h3>
                <p className="text-sm text-muted-foreground mb-1">capacitacion@villavicencio.com</p>
                <p className="text-sm text-muted-foreground">Talleres programados mensualmente</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Horarios de Atención</h3>
                <p className="text-sm text-muted-foreground mb-1">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p className="text-sm text-muted-foreground mb-1">Sábados: 9:00 AM - 1:00 PM</p>
                <p className="text-sm text-muted-foreground">Domingos: Cerrado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Enlaces Útiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Portal Principal</div>
                  <div className="text-sm text-muted-foreground">Acceso a la plataforma turística</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Videos Tutoriales</div>
                  <div className="text-sm text-muted-foreground">Guías paso a paso en video</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">FAQ - Preguntas Frecuentes</div>
                  <div className="text-sm text-muted-foreground">Respuestas a dudas comunes</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="font-medium">Foro de la Comunidad</div>
                  <div className="text-sm text-muted-foreground">Comparte experiencias con otros usuarios</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemManual;
