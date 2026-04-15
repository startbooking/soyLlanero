
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Calendar, Building } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Culture = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  const culturalSites = [
    {
      id: 1,
      name: "Casa de la Cultura Jorge Eliécer Gaitán",
      location: "Centro, Villavicencio",
      description: "Principal centro cultural de la ciudad con exposiciones, teatro y eventos artísticos.",
      rating: 4.7,
      schedule: "Lunes a Viernes 8:00 AM - 6:00 PM",
      category: "Centro Cultural",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1564399279473-7e2e4b7b3c47"
    },
    {
      id: 2,
      name: "Museo del Hombre Llanero",
      location: "Restrepo, Meta",
      description: "Museo dedicado a la cultura, tradiciones y costumbres del hombre llanero.",
      rating: 4.8,
      schedule: "Martes a Domingo 9:00 AM - 5:00 PM",
      category: "Museo",
      price: "$8.000",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      id: 3,
      name: "Teatro Corfescu",
      location: "Carrera 31, Villavicencio",
      description: "Teatro principal de la ciudad con presentaciones de obras, danza y música.",
      rating: 4.6,
      schedule: "Según programación",
      category: "Teatro",
      price: "Variable",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35"
    },
    {
      id: 4,
      name: "Catedral Nuestra Señora del Carmen",
      location: "Plaza Los Libertadores",
      description: "Catedral principal de Villavicencio, patrimonio arquitectónico y religioso.",
      rating: 4.5,
      schedule: "Diario 6:00 AM - 7:00 PM",
      category: "Patrimonio Religioso",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c60a"
    },
    {
      id: 5,
      name: "Centro de Historia Los Llanos",
      location: "Barrio La Grama",
      description: "Centro dedicado a preservar la historia y cultura de los llanos orientales.",
      rating: 4.4,
      schedule: "Lunes a Sábado 8:00 AM - 5:00 PM",
      category: "Centro Histórico",
      price: "$5.000",
      image: "https://images.unsplash.com/photo-1481632736104-7ee4e1479f31"
    },
    {
      id: 6,
      name: "Parque de los Fundadores",
      location: "Centro, Villavicencio",
      description: "Parque histórico donde se realizan eventos culturales y festivales tradicionales.",
      rating: 4.3,
      schedule: "24 horas",
      category: "Espacio Público",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
    }
  ];

  const openWaze = (location: string) => {
    window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="culture" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Building className="w-10 h-10 text-primary" />
              Cultura y Patrimonio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre la riqueza cultural y el patrimonio histórico de Villavicencio y los llanos orientales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturalSites.map((site) => (
              <Card key={site.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={site.image} 
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {site.category}
                  </Badge>
                  <div className="absolute top-4 left-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{site.rating}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {site.name}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {site.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {site.schedule}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{site.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">{site.price}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openWaze(site.location)}
                      className="flex items-center gap-1"
                    >
                      <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/waze_logo_icon_168210.png" alt="Waze" className="w-4 h-4" />
                      Ruta
                    </Button>
                  </div>
                  
                  <Button className="w-full">Más Información</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Culture;
