import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Megaphone,
  TrendingUp,
  Users,
  Star,
  BadgeCheck,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar";

const promotionFeatures = [
  {
    icon: Globe,
    title: "Visibilidad en la Plataforma",
    description:
      "Tu negocio aparecerá en los directorios y búsquedas de la plataforma",
  },
  {
    icon: Star,
    title: "Destacado Premium",
    description:
      "Posiciona tu empresa en las secciones destacadas de la página principal",
  },
  {
    icon: Users,
    title: "Alcance de Audiencia",
    description:
      "Llega a miles de turistas que visitan Villavicencio y el Meta",
  },
  {
    icon: BadgeCheck,
    title: "Sello de Calidad",
    description: "Obtén el sello de empresa verificada del clúster de turismo",
  },
  {
    icon: TrendingUp,
    title: "Estadísticas Detalladas",
    description:
      "Accede a métricas de visualizaciones, contactos y conversiones",
  },
  {
    icon: Megaphone,
    title: "Campañas Promocionales",
    description: "Participa en campañas de marketing del destino turístico",
  },
];

const PromoteServices = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [activeSection, setActiveSection] = useState("home");
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
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        language="es"
      />

      {/* <main className="container mx-auto px-4 py-12"> */}
      <main className="pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Promociona tus Servicios
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aumenta la visibilidad de tu negocio y conecta con más turistas a
            través de nuestra plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {promotionFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            ¿Listo para promocionar tu negocio?
          </h2>
          <p className="text-muted-foreground mb-6">
            Accede a tu panel de control para gestionar tu perfil y activar
            opciones de promoción.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/business-owner/dashboard">
              <Button size="lg">
                Ir al Panel de Control <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/afiliacion">
              <Button size="lg" variant="outline">
                Conocer más sobre afiliación
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromoteServices;
