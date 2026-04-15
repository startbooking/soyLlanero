
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Download, User, Building, Calendar, Star, Users, Settings, MessageSquare, BarChart3, MapPin, Hotel } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const UserManualModal = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getManualByRole = () => {
    switch (user?.role) {
      case "administrador":
        return {
          title: "Manual del Administrador General",
          description: "Guía completa para la administración de la plataforma turística de Villavicencio",
          sections: [
            {
              title: "Gestión de Usuarios",
              icon: Users,
              content: "Crear, modificar y eliminar usuarios. Asignar roles y permisos específicos para cada tipo de usuario en la plataforma.",
              steps: [
                "Acceder a la sección de Usuarios desde el panel lateral",
                "Crear nuevos usuarios con roles específicos",
                "Modificar permisos y roles existentes",
                "Gestionar el estado de las cuentas de usuario"
              ]
            },
            {
              title: "Gestión de Empresas",
              icon: Building,
              content: "Administrar todas las empresas registradas en la plataforma turística.",
              steps: [
                "Revisar solicitudes de registro de empresas",
                "Aprobar o rechazar nuevas empresas",
                "Moderar contenido empresarial",
                "Gestionar categorías de empresas"
              ]
            },
            {
              title: "Gestión de Eventos",
              icon: Calendar,
              content: "Crear y moderar eventos turísticos de la ciudad.",
              steps: [
                "Crear eventos desde el panel de administración",
                "Moderar eventos creados por empresarios",
                "Gestionar calendario de eventos",
                "Promover eventos destacados"
              ]
            },
            {
              title: "Configuración del Sistema",
              icon: Settings,
              content: "Modificar configuraciones generales y contenido de la aplicación.",
              steps: [
                "Configurar textos y contenido general",
                "Gestionar slider principal",
                "Administrar categorías del sistema",
                "Configurar footer y enlaces"
              ]
            }
          ]
        };
      case "usuario-administrador":
        return {
          title: "Manual del Usuario Administrador",
          description: "Guía para la gestión de contenido y moderación de la plataforma",
          sections: [
            {
              title: "Gestión de Contenido",
              icon: Book,
              content: "Editar textos, imágenes y contenido de la aplicación.",
              steps: [
                "Actualizar textos de la aplicación",
                "Gestionar imágenes del slider",
                "Moderar contenido de empresas",
                "Actualizar información institucional"
              ]
            },
            {
              title: "Moderación de Empresas",
              icon: Building,
              content: "Revisar y aprobar solicitudes de empresas.",
              steps: [
                "Revisar nuevas solicitudes",
                "Verificar información empresarial",
                "Aprobar o rechazar registros",
                "Gestionar estado de empresas"
              ]
            }
          ]
        };
      case "empresario":
        return {
          title: "Manual del Empresario",
          description: "Guía para gestionar tu empresa turística en la plataforma",
          sections: [
            {
              title: "Mi Perfil Empresarial",
              icon: Building,
              content: "Gestionar información de tu empresa y servicios.",
              steps: [
                "Completar información de la empresa",
                "Agregar servicios y productos",
                "Subir imágenes de alta calidad",
                "Actualizar información de contacto"
              ]
            },
            {
              title: "Gestión de Mensajes",
              icon: MessageSquare,
              content: "Comunicarse con clientes y gestionar consultas.",
              steps: [
                "Responder mensajes de clientes",
                "Gestionar consultas sobre servicios",
                "Mantener comunicación profesional",
                "Seguimiento de conversaciones"
              ]
            },
            {
              title: "Análisis y Estadísticas",
              icon: BarChart3,
              content: "Ver estadísticas de tu negocio y reseñas.",
              steps: [
                "Revisar métricas de visualización",
                "Analizar estadísticas de contacto",
                "Gestionar reseñas de clientes",
                "Monitorear rendimiento del negocio"
              ]
            }
          ]
        };
      case "usuario-empresario":
        return {
          title: "Manual del Usuario Empresario",
          description: "Guía para empleados de empresas turísticas",
          sections: [
            {
              title: "Gestión de Servicios",
              icon: Star,
              content: "Administrar servicios de la empresa.",
              steps: [
                "Actualizar información de servicios",
                "Gestionar disponibilidad",
                "Actualizar precios y ofertas",
                "Mantener información actualizada"
              ]
            },
            {
              title: "Atención al Cliente",
              icon: MessageSquare,
              content: "Responder reseñas y gestionar consultas.",
              steps: [
                "Responder a reseñas de clientes",
                "Gestionar mensajes y consultas",
                "Proporcionar información sobre servicios",
                "Mantener comunicación efectiva"
              ]
            }
          ]
        };
      case "turista":
        return {
          title: "Manual del Turista",
          description: "Guía para disfrutar al máximo tu experiencia turística en Villavicencio",
          sections: [
            {
              title: "Mis Actividades",
              icon: MapPin,
              content: "Gestionar y seguir tus actividades turísticas.",
              steps: [
                "Ver actividades programadas",
                "Seguir el estado de reservas",
                "Acceder a información de eventos",
                "Planificar itinerarios"
              ]
            },
            {
              title: "Comunicación",
              icon: MessageSquare,
              content: "Comunicarse con empresas turísticas.",
              steps: [
                "Enviar consultas a empresas",
                "Recibir confirmaciones de reservas",
                "Solicitar información adicional",
                "Reportar problemas o sugerencias"
              ]
            },
            {
              title: "Perfil Personal",
              icon: User,
              content: "Gestionar información personal y preferencias.",
              steps: [
                "Actualizar información de contacto",
                "Configurar preferencias de viaje",
                "Gestionar historial de actividades",
                "Mantener perfil actualizado"
              ]
            }
          ]
        };
      case "huesped":
        return {
          title: "Manual del Huésped",
          description: "Guía para gestionar tus reservas y experiencias de hospedaje",
          sections: [
            {
              title: "Mis Reservas",
              icon: Calendar,
              content: "Gestionar reservas de hospedaje y servicios.",
              steps: [
                "Ver reservas activas y pasadas",
                "Modificar fechas de reserva",
                "Cancelar reservas según políticas",
                "Confirmar llegadas y salidas"
              ]
            },
            {
              title: "Comunicación con Proveedores",
              icon: MessageSquare,
              content: "Comunicarse con hoteles y proveedores de servicios.",
              steps: [
                "Enviar mensajes a hoteles",
                "Solicitar servicios adicionales",
                "Reportar problemas durante la estadía",
                "Hacer consultas sobre servicios"
              ]
            },
            {
              title: "Reseñas y Experiencias",
              icon: Star,
              content: "Calificar servicios y compartir experiencias.",
              steps: [
                "Escribir reseñas después de la estadía",
                "Calificar servicios recibidos",
                "Subir fotos de la experiencia",
                "Ayudar a otros huéspedes con información"
              ]
            },
            {
              title: "Perfil de Huésped",
              icon: User,
              content: "Gestionar información personal y preferencias.",
              steps: [
                "Actualizar datos de contacto",
                "Configurar preferencias de hospedaje",
                "Gestionar métodos de pago",
                "Revisar historial de estadías"
              ]
            }
          ]
        };
      default:
        return {
          title: "Manual General del Sistema",
          description: "Guía básica para navegar la plataforma turística de Villavicencio",
          sections: [
            {
              title: "Navegación Básica",
              icon: User,
              content: "Cómo navegar por la plataforma de turismo.",
              steps: [
                "Explorar la página principal",
                "Usar el menú de navegación",
                "Buscar servicios y empresas",
                "Acceder a información de eventos"
              ]
            },
            {
              title: "Búsqueda de Servicios",
              icon: Star,
              content: "Encontrar hoteles, restaurantes y experiencias.",
              steps: [
                "Usar filtros de búsqueda",
                "Comparar opciones disponibles",
                "Leer reseñas de otros usuarios",
                "Contactar proveedores de servicios"
              ]
            }
          ]
        };
    }
  };

  const manual = getManualByRole();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Book className="w-4 h-4 mr-2" />
          Manual del Sistema
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Book className="w-5 h-5" />
            {manual.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{manual.description}</p>
          {user && (
            <Badge variant="outline" className="w-fit">
              Usuario: {user.name} - Rol: {user.role}
            </Badge>
          )}
        </DialogHeader>
        <ScrollArea className="h-full max-h-[60vh]">
          <div className="space-y-6 p-1">
            {manual.sections.map((section, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <section.icon className="w-5 h-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{section.content}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Pasos a seguir:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {section.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Información de Contacto y Soporte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Soporte Técnico</p>
                    <p className="text-muted-foreground">soporte@villavicencio.com</p>
                    <p className="text-muted-foreground">+57 8 123 4567</p>
                  </div>
                  <div>
                    <p className="font-medium">Capacitación</p>
                    <p className="text-muted-foreground">capacitacion@villavicencio.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Horarios de Atención</p>
                    <p className="text-muted-foreground">Lun - Vie: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
