
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ArrowLeft, Download, User, Building, Calendar, Star, Users, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserManual = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getManualByRole = () => {
    switch (user?.role) {
      case "administrador":
        return {
          title: "Manual del Administrador General",
          sections: [
            {
              title: "Gestión de Usuarios",
              icon: Users,
              content: "Crear, modificar y eliminar usuarios. Asignar roles y permisos."
            },
            {
              title: "Gestión de Empresas",
              icon: Building,
              content: "Administrar todas las empresas registradas en la plataforma."
            },
            {
              title: "Gestión de Eventos",
              icon: Calendar,
              content: "Crear y moderar eventos turísticos de la ciudad."
            },
            {
              title: "Configuración del Sistema",
              icon: Settings,
              content: "Modificar configuraciones generales y contenido de la app."
            }
          ]
        };
      case "usuario-administrador":
        return {
          title: "Manual del Usuario Administrador",
          sections: [
            {
              title: "Gestión de Contenido",
              icon: Book,
              content: "Editar textos, imágenes y contenido de la aplicación."
            },
            {
              title: "Moderación de Empresas",
              icon: Building,
              content: "Revisar y aprobar solicitudes de empresas."
            },
            {
              title: "Gestión de Eventos",
              icon: Calendar,
              content: "Crear y gestionar eventos turísticos."
            }
          ]
        };
      case "empresario":
        return {
          title: "Manual del Empresario",
          sections: [
            {
              title: "Mi Perfil Empresarial",
              icon: Building,
              content: "Gestionar información de tu empresa y servicios."
            },
            {
              title: "Gestión de Eventos",
              icon: Calendar,
              content: "Crear eventos relacionados con tu negocio."
            },
            {
              title: "Análisis y Reportes",
              icon: Star,
              content: "Ver estadísticas de tu negocio y reseñas."
            }
          ]
        };
      case "usuario-empresario":
        return {
          title: "Manual del Usuario Empresario",
          sections: [
            {
              title: "Gestión de Servicios",
              icon: Star,
              content: "Administrar servicios de la empresa."
            },
            {
              title: "Atención al Cliente",
              icon: Users,
              content: "Responder reseñas y gestionar consultas."
            }
          ]
        };
      default:
        return {
          title: "Manual del Usuario",
          sections: [
            {
              title: "Navegación Básica",
              icon: User,
              content: "Cómo navegar por la plataforma de turismo."
            },
            {
              title: "Búsqueda de Servicios",
              icon: Star,
              content: "Encontrar hoteles, restaurantes y experiencias."
            }
          ]
        };
    }
  };

  const manual = getManualByRole();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5" />
                {manual.title}
              </CardTitle>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Manual específico para: {user?.name} - Rol: {user?.role}
            </p>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {manual.sections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <section.icon className="w-5 h-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{section.content}</p>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
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
    </div>
  );
};

export default UserManual;
