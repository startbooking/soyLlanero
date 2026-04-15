import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Hotel, UtensilsCrossed, Compass, Calendar, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar";

const businessTypes = [
  {
    icon: Hotel,
    title: "Alojamiento",
    description: "Hoteles, hostales, cabañas, glamping y fincas turísticas",
    link: "/forms/accommodation"
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurante",
    description: "Restaurantes, cafeterías, bares y establecimientos gastronómicos",
    link: "/forms/restaurant"
  },
  {
    icon: Compass,
    title: "Agencia / Operador",
    description: "Agencias de viajes y operadores turísticos",
    link: "/forms/agency"
  },
  {
    icon: Building2,
    title: "Actividad Turística",
    description: "Deportes extremos, ecoturismo, aventura y recreación",
    link: "/forms/activity"
  },
  {
    icon: Calendar,
    title: "Evento",
    description: "Festivales, ferias, conciertos y eventos culturales",
    link: "/forms/event"
  },
  {
    icon: MapPin,
    title: "Punto de Interés",
    description: "Parques, monumentos, miradores y sitios turísticos",
    link: "/forms/point-of-interest"
  },
  {
    icon: Briefcase,
    title: "Otro Servicio",
    description: "Transporte, guías turísticos y otros servicios",
    link: "/forms/other-service"
  }
];

const RegisterBusiness = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian


  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection={activeSection} onSectionChange={setActiveSection} language="es" />      
      {/* <main className="container mx-auto px-4 py-12"> */}
      <main className="pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Registra tu Empresa</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Únete al clúster de turismo de Villavicencio y el Meta. Selecciona el tipo de negocio que deseas registrar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {businessTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={type.link}>
                  <Button className="w-full" variant="outline">
                    Registrar <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            ¿Ya tienes una cuenta? Accede a tu panel de control
          </p>
          <Link to="/business-owner/dashboard">
            <Button variant="default">
              Ir al Panel de Control
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterBusiness;

