import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Building,
  Target,
  Award,
  FileText,
  Phone,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCachedData } from "@/hooks/useCachedData";
import { dataService } from "@/services/dataService";
import { useAppConfig } from "@/contexts/AppConfigContext";
import { useNavigate } from "react-router-dom";


/* interface AppConfig {
  objectives: string[];
  } */

const toSafeArray = (data) => {
  if (Array.isArray(data)) {
    return data; // Si ya es un array, devolverlo tal cual.
  }
  if (data === null || data === undefined) {
    return []; // Si es null o undefined, devolver un array vacío.
  }
  // Si es cualquier otra cosa (ej: un string, un número), envolverlo en un array.
  return JSON.parse(data);
};

const Institutional = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const { appConfig } = useAppConfig();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "María González",
      position: "Directora del Clúster de Turismo",
      email: "maria.gonzalez@villavicencio.gov.co",
      phone: "+57 8 123 4567",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b169",
    },
    {
      name: "Carlos Rodríguez",
      position: "Coordinador de Desarrollo Turístico",
      email: "carlos.rodriguez@villavicencio.gov.co",
      phone: "+57 8 234 5678",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    {
      name: "Ana Martínez",
      position: "Especialista en Marketing Digital",
      email: "ana.martinez@villavicencio.gov.co",
      phone: "+57 8 345 6789",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
  ];

  const achievements = [
    {
      year: "2024",
      title: "Certificación de Destino Turístico Sostenible",
      description:
        "Villavicencio recibió la certificación como destino turístico sostenible por parte del Ministerio de Comercio.",
    },
    {
      year: "2023",
      title: "120+ Empresas Afiliadas",
      description:
        "Alcanzamos más de 120 empresas turísticas registradas en nuestra plataforma digital.",
    },
    {
      year: "2023",
      title: "Premio Nacional de Turismo Rural",
      description:
        "Reconocimiento por el desarrollo del turismo rural en los llanos orientales.",
    },
    {
      year: "2022",
      title: "Lanzamiento Oficial del Clúster",
      description:
        "Constitución oficial del Clúster de Turismo de Villavicencio con 85 empresas fundadoras.",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <Header
        activeSection="institutional"
        onSectionChange={() => {}}
        language={currentLanguage}
      />

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Building className="w-10 h-10 text-primary" />
              {appConfig?.app_name || "SACTel APP Turismo"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {appConfig?.app_description || "SACTel APP Turismo"}
            </p>
          </div>

          {/* Misión, Visión y Objetivos */}
          {isLoading ? (
            <div className="flex justify-center mb-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Card className="text-center">
                  <CardHeader>
                    <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>Misión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-justify">
                      {appConfig?.mision}
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>Visión</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-justify">
                      {appConfig?.vision}
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>Objetivos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {toSafeArray(appConfig?.objetivos).map((item, index) => {
                      if (typeof item === "string" && item.trim().length > 0) {
                        return (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs text-justify text-muted-foreground rounded-sm"
                          >
                            {item}
                          </Badge>
                        );
                      }
                      return null;
                    })}
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Equipo de Trabajo */}
          {/* <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Nuestro Equipo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{member.position}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Contactar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}

          {/* Logros y Reconocimientos */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Logros y Reconocimientos
            </h2>
            <div className="space-y-6">
              {toSafeArray(appConfig?.achievements).map(
                (achievement, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">
                          {achievement.year}
                        </Badge>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
                            {achievement.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>

          {/* Información de Contacto */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{appConfig.company_name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-sm text-muted-foreground">
                        {appConfig.company_address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-sm text-muted-foreground">
                        {appConfig.company_phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {appConfig.company_email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Horario de Atención</p>
                      <p className="text-sm text-muted-foreground">
                        {appConfig.horario_atencion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate("/contact")}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contactar Clúster
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Institutional;
