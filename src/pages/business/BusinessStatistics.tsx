import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, MousePointerClick, Phone, TrendingUp, Users, ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar";

const statisticsFeatures = [
  {
    icon: Eye,
    title: "Visualizaciones",
    description: "Conoce cuántas personas han visto tu perfil de empresa",
    value: "---"
  },
  {
    icon: MousePointerClick,
    title: "Clics en Contacto",
    description: "Mide cuántos usuarios han intentado contactarte",
    value: "---"
  },
  {
    icon: Phone,
    title: "Llamadas Recibidas",
    description: "Rastrea las llamadas generadas desde la plataforma",
    value: "---"
  },
  {
    icon: Users,
    title: "Visitantes Únicos",
    description: "Número de usuarios únicos que visitaron tu perfil",
    value: "---"
  },
  {
    icon: TrendingUp,
    title: "Tendencia Mensual",
    description: "Analiza el crecimiento de tu visibilidad mes a mes",
    value: "---"
  },
  {
    icon: BarChart3,
    title: "Comparativa Sectorial",
    description: "Compara tu rendimiento con empresas similares",
    value: "---"
  }
];

const BusinessStatistics = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [currentLanguage, setCurrentLanguage] = useState("es");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza la ventana al inicio (arriba izquierda)
  }, []); // Se ejecuta cada vez que el ID o la ruta cambian


  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection={activeSection} onSectionChange={setActiveSection} language="es" />
      
      <main className="pt-32 pb-16">
      {/* <main className="container mx-auto px-4 py-12"> */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Estadísticas de tu Empresa</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Accede a métricas detalladas sobre el rendimiento de tu negocio en la plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {statisticsFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Inicia sesión para ver</p>
                </div>
              </div>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{feature.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Accede a tus estadísticas completas</h2>
          <p className="text-muted-foreground mb-6">
            Inicia sesión en tu panel de control para ver las estadísticas detalladas de tu empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/business-owner/dashboard">
              <Button size="lg">
                Ir al Panel de Control <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/business/register">
              <Button size="lg" variant="outline">
                Registrar mi empresa
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessStatistics;